import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SpotlightLoadingScreen.module.css';

// 300 frames of the 30fps video loop (supports both naming schemes)
const DEFAULT_FRAME_URLS = Array.from(
  { length: 300 },
  (_, i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

export function buildSpotlightClipPath(
  cx: number,
  cy: number,
  radiusPercent: number,
  maskShape: string = 'blob',
  morphPhase: number = 0,
  aspect: number = 1.77,
  wobbleIntensity: number = 1.0,
  velocityScale: number = 1.0
): string {
  if (maskShape === 'circle') {
    return `circle(${radiusPercent.toFixed(2)}% at ${cx.toFixed(2)}% ${cy.toFixed(2)}%)`;
  }

  const vertexCount = 48;
  const points: string[] = [];
  const baseWobble = radiusPercent > 50 ? 0.02 : 0.85 * wobbleIntensity;

  for (let i = 0; i < vertexCount; i++) {
    const theta = (i / vertexCount) * Math.PI * 2;
    const harmonic =
      1 +
      baseWobble *
        (0.12 * Math.sin(2 * theta + morphPhase * 1.8) +
          0.08 * Math.cos(3 * theta - morphPhase * 2.2) +
          0.04 * Math.sin(5 * theta + morphPhase * 3.1) +
          0.02 * Math.cos(7 * theta - morphPhase * 1.4));

    const rx = radiusPercent * harmonic * velocityScale;
    const ry =
      (radiusPercent * harmonic * Math.min(1.35, Math.max(0.85, aspect * 0.78))) /
      velocityScale;

    const px = cx + Math.cos(theta) * rx;
    const py = cy + Math.sin(theta) * ry;
    points.push(`${px.toFixed(2)}% ${py.toFixed(2)}%`);
  }

  return `polygon(${points.join(', ')})`;
}

interface SpotlightLoadingScreenProps {
  frames?: string[];
  fps?: number;
  loadingDurationMs?: number;
  maskShape?: 'blob' | 'circle';
  onComplete?: () => void;
  onEnterDevora?: () => void;
}

export default function SpotlightLoadingScreen({
  frames = DEFAULT_FRAME_URLS,
  fps = 30,
  loadingDurationMs = 3800,
  maskShape = 'blob',
  onComplete,
  onEnterDevora,
}: SpotlightLoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef<number>(0);
  const lastValidImageRef = useRef<HTMLImageElement | null>(null);

  // States: 'loading' -> 'reveal' (1.2s expansion) -> 'complete' (pure full-screen video)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'complete'>('loading');
  const [progress, setProgress] = useState<number>(0);
  const [runId, setRunId] = useState<number>(1);
  const [revealScale, setRevealScale] = useState<number>(18);

  // Physics-based cursor tracking
  const mouseTargetRef = useRef<{ x: number; y: number; hasMoved: boolean; lastMoveTime: number }>({
    x: 50,
    y: 50,
    hasMoved: false,
    lastMoveTime: 0,
  });
  const mouseCurrentRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 50,
    y: 50,
    vx: 0,
    vy: 0,
  });
  const [clipPathString, setClipPathString] = useState<string>(() =>
    buildSpotlightClipPath(50, 50, 18, maskShape, 0, 1.77)
  );

  const totalFrames = frames.length;

  // Draw frame to canvas with high-DPR backing store
  const drawFrameToCanvas = useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const width = rect.width || window.innerWidth || 1280;
      const height = rect.height || window.innerHeight || 720;
      const targetW = Math.max(1, Math.round(width * dpr));
      const targetH = Math.max(1, Math.round(height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const preloaded = imagesRef.current;
      const candidate = preloaded[idx];
      let img =
        candidate && candidate.complete && candidate.naturalWidth > 0
          ? candidate
          : lastValidImageRef.current;

      if (!img) {
        for (let i = 0; i < preloaded.length; i++) {
          if (preloaded[i] && preloaded[i].complete && preloaded[i].naturalWidth > 0) {
            img = preloaded[i];
            break;
          }
        }
      }

      if (!img || !img.naturalWidth || !img.naturalHeight) return;
      lastValidImageRef.current = img;

      // Object-cover mathematics
      const canvasRatio = targetW / targetH;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;

      if (imgRatio > canvasRatio) {
        drawH = targetH;
        drawW = targetH * imgRatio;
        offsetX = (targetW - drawW) / 2;
        offsetY = 0;
      } else {
        drawW = targetW;
        drawH = targetW / imgRatio;
        offsetX = 0;
        offsetY = (targetH - drawH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    []
  );

  // Background Image Preloader + exact 30fps requestAnimationFrame Loop
  useEffect(() => {
    let isCancelled = false;
    const preloaded = new Array<HTMLImageElement>(totalFrames);
    imagesRef.current = preloaded;

    drawFrameToCanvas(0);

    frames.forEach((src, index) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (isCancelled) return;
        const commit = () => {
          preloaded[index] = img;
          if (index === 0 || !lastValidImageRef.current) {
            lastValidImageRef.current = img;
            drawFrameToCanvas(frameIndexRef.current);
          }
        };
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {}).finally(commit);
        } else {
          commit();
        }
      };
      img.onerror = () => {
        // Fallback to alternative naming if needed
        if (src.includes('ezgif-frame-')) {
          const num = src.match(/ezgif-frame-(\d+)/);
          if (num && num[1]) {
            img.src = `/frames/frame_${parseInt(num[1], 10)}.jpg`;
          }
        } else if (src.includes('frame_')) {
          const num = src.match(/frame_(\d+)/);
          if (num && num[1]) {
            img.src = `/frames/ezgif-frame-${String(num[1]).padStart(3, '0')}.jpg`;
          }
        }
      };
      img.src = src;
    });

    const frameInterval = 1000 / fps;
    let lastTime = performance.now();
    let rafId: number | null = null;

    const tickSequence = (now: number) => {
      rafId = requestAnimationFrame(tickSequence);
      const delta = now - lastTime;
      if (delta >= frameInterval) {
        const steps = Math.max(1, Math.floor(delta / frameInterval));
        lastTime = now - (delta % frameInterval);
        frameIndexRef.current = (frameIndexRef.current + steps) % totalFrames;
        drawFrameToCanvas(frameIndexRef.current);
      }
    };

    const handleResize = () => drawFrameToCanvas(frameIndexRef.current);
    window.addEventListener('resize', handleResize);
    rafId = requestAnimationFrame(tickSequence);

    return () => {
      isCancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [frames, fps, totalFrames, drawFrameToCanvas]);

  // Cursor-following blob with fluid inertia
  useEffect(() => {
    let rafId: number | null = null;
    let lastTime = performance.now();
    let morphPhase = 0;

    const updateBlobPhysics = (now: number) => {
      rafId = requestAnimationFrame(updateBlobPhysics);
      const dt = Math.min(64, now - lastTime);
      lastTime = now;

      const idleTime = now - mouseTargetRef.current.lastMoveTime;
      const isAutoDrifting = !mouseTargetRef.current.hasMoved || idleTime > 3500;

      let targetX = mouseTargetRef.current.x;
      let targetY = mouseTargetRef.current.y;

      if (isAutoDrifting && phase !== 'reveal' && phase !== 'complete') {
        const tSec = now * 0.001;
        targetX = 50 + Math.sin(tSec * 0.8) * 16 + Math.cos(tSec * 0.35) * 6;
        targetY = 50 + Math.cos(tSec * 0.7) * 14 + Math.sin(tSec * 0.42) * 5;
      }

      const lerpFactor = 0.095;
      const cur = mouseCurrentRef.current;
      cur.vx = (targetX - cur.x) * lerpFactor;
      cur.vy = (targetY - cur.y) * lerpFactor;
      cur.x += cur.vx;
      cur.y += cur.vy;

      morphPhase += dt * 0.0022;

      const speed = Math.sqrt(cur.vx * cur.vx + cur.vy * cur.vy);
      const velocityScale = 1 + Math.min(0.2, speed * 0.06);
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);

      let currentRadius = 18;
      if (phase === 'reveal') {
        currentRadius = revealScale;
      } else if (phase === 'complete') {
        currentRadius = 160;
      }

      const nextClip = buildSpotlightClipPath(
        cur.x,
        cur.y,
        currentRadius,
        maskShape,
        morphPhase,
        aspect,
        phase === 'reveal' ? 0.05 : 1.0,
        velocityScale
      );

      setClipPathString(nextClip);
    };

    rafId = requestAnimationFrame(updateBlobPhysics);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maskShape, phase, revealScale]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    mouseTargetRef.current = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
      hasMoved: true,
      lastMoveTime: performance.now(),
    };
  }, []);

  const revealRafRef = useRef<number | null>(null);

  // 1.2s smooth cubic-bezier ease-in-out expansion to full screen (160%+)
  const triggerRevealTransition = useCallback(() => {
    setPhase('reveal');

    const revealStart = performance.now();
    const duration = 1200;

    const animateReveal = (now: number) => {
      const elapsed = now - revealStart;
      const t = Math.min(1, elapsed / duration);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentR = 18 + (160 - 18) * eased;
      setRevealScale(currentR);

      if (t < 1) {
        revealRafRef.current = requestAnimationFrame(animateReveal);
      } else {
        setPhase('complete');
        setRevealScale(160);
        if (typeof onComplete === 'function') {
          onComplete();
        }
      }
    };

    revealRafRef.current = requestAnimationFrame(animateReveal);
  }, [onComplete]);

  useEffect(() => {
    return () => {
      if (revealRafRef.current) {
        cancelAnimationFrame(revealRafRef.current);
      }
    };
  }, []);

  // 0 -> 100% counter
  useEffect(() => {
    setProgress(0);
    setPhase('loading');
    setRevealScale(18);

    const startTime = performance.now();
    let rafId: number | null = null;

    const tickCounter = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / loadingDurationMs) * 100));
      setProgress(pct);

      if (elapsed < loadingDurationMs) {
        rafId = requestAnimationFrame(tickCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          triggerRevealTransition();
        }, 120);
      }
    };

    rafId = requestAnimationFrame(tickCounter);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [runId, loadingDurationMs, triggerRevealTransition]);

  // Keyboard shortcut: Press 'R' to replay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setRunId((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.container} onPointerMove={handlePointerMove}>
      {/* Bottom Layer: Counter & Loading Label */}
      <div className={styles.bottomLayer}>
        <div className={styles.counterRow}>
          <div className={styles.counterWrap}>
            <span id="loading-percentage-counter" className={styles.percentageNum}>
              {progress}
            </span>
            <span className={styles.percentSign}>%</span>
          </div>

          <div className={styles.loadingCol}>
            <div className={styles.loadingBadge}>
              <span className={styles.loadingPingDot} />
              <span id="loading-label" className={styles.loadingText}>
                LOADING
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Layer: Masked Canvas Video Sequence */}
      <div
        id="spotlight-mask-container"
        className={styles.maskContainer}
        style={{
          clipPath: phase === 'complete' ? 'none' : clipPathString,
          WebkitClipPath: phase === 'complete' ? 'none' : clipPathString,
          transition: 'none',
        }}
      >
        <canvas id="sequence-canvas" ref={canvasRef} className={styles.sequenceCanvas} />
      </div>

      {/* Enter DEVORA Button (appears once reveal completes) */}
      {phase === 'complete' && (
        <div className={styles.enterBox}>
          <button
            type="button"
            onClick={() => {
              if (typeof onEnterDevora === 'function') {
                onEnterDevora();
              }
            }}
            className={styles.enterBtn}
          >
            ENTER DEVORA
          </button>
        </div>
      )}
    </div>
  );
}
