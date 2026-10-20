import { useState, useEffect } from 'react';
import {
  Brain,
  Layers,
  LayoutGrid,
  Globe,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import { HERO_FEATURE_STRIP, HERO_STAIRCASE_NODES } from '../../data/recursionLessonData';
import styles from './RecursionHero.module.css';

export function RecursionHero() {
  // Stepper state for hero animation:
  // 0: Initial call factorial(5)
  // 1: factorial(4)
  // 2: factorial(3)
  // 3: factorial(2)
  // 4: factorial(1)
  // 5: factorial(0) Base Case reached!
  // 6: factorial(0) returns 1
  // 7: factorial(1) returns 1
  // 8: factorial(2) returns 2
  // 9: factorial(3) returns 6
  // 10: factorial(4) returns 24
  // 11: factorial(5) returns 120 (Completed!)
  const [heroStep, setHeroStep] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setHeroStep((prev) => {
          if (prev < 11) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 11;
          }
        });
      }, 1600);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  const handleNextStep = () => {
    setIsPlaying(false);
    setHeroStep((prev) => (prev < 11 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setHeroStep(0);
  };

  const handleTogglePlay = () => {
    if (heroStep >= 11) {
      setHeroStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToContent = () => {
    const el = document.getElementById('section-what-is-recursion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine which staircase node is active
  // During descent (0..5), node index corresponds to step
  // During unwinding (6..11), node index corresponds to 11 - step
  const activeNodeIdx = heroStep <= 5 ? heroStep : 11 - heroStep;
  const isUnwinding = heroStep > 5;

  // Active stack frames in call stack panel
  // During descent: 0..heroStep frames are present
  // During unwinding: 0..(11 - heroStep) frames are present
  const maxStackVisibleIdx = heroStep <= 5 ? heroStep : 11 - heroStep;
  const visibleStackFrames = HERO_STAIRCASE_NODES.slice(0, maxStackVisibleIdx + 1);

  return (
    <header className={styles.heroWrapper} id="hero">
      {/* Background Campus Photograph */}
      <div className={styles.heroBackground} />
      <div className={styles.scrimOverlay} />
      <div className={styles.bottomFadeOverlay} />

      <div className={styles.heroContainer}>
        {/* ── LEFT COLUMN ── */}
        <div className={styles.leftColumn}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDash} />
            <span>MODULE 08 · RECURSION</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span>Recursion</span>
            <span>
              in <span className={styles.titleAccentC}>C</span>
            </span>
          </h1>

          <p className={styles.leadParagraph}>
            A function that calls itself to solve a problem by breaking it into smaller versions of
            the same problem.
          </p>

          <div className={styles.ctaButtonGroup}>
            <button type="button" className={styles.ctaPrimary} onClick={scrollToContent}>
              <span>Start Learning</span>
              <span>↓</span>
            </button>
            <button
              type="button"
              className={styles.ctaSecondary}
              onClick={() => {
                setHeroStep(0);
                setIsPlaying(true);
              }}
            >
              <Play size={14} fill="currentColor" />
              <span>Watch Intro</span>
            </button>
          </div>

          {/* 4 Feature Strip */}
          <div className={styles.featureStrip}>
            {HERO_FEATURE_STRIP.map((item) => {
              const Icon =
                item.iconName === 'Brain'
                  ? Brain
                  : item.iconName === 'Layers'
                  ? Layers
                  : item.iconName === 'LayoutGrid'
                  ? LayoutGrid
                  : Globe;
              return (
                <div key={item.id} className={styles.featureItem}>
                  <Icon size={16} className={styles.featureIcon} />
                  <span className={styles.featureLabel}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN: RECURSIVE STAIRCASE & CALL STACK ── */}
        <div className={styles.rightStage}>
          {/* Staircase Section */}
          <div className={styles.staircaseContainer}>
            {/* Flow direction indicators */}
            <div className={styles.staircaseFlowIndicator}>
              <div className={styles.flowLabelDown}>
                <ArrowDown size={11} />
                <span>Calls</span>
              </div>
              <div className={styles.flowLabelUp}>
                <ArrowUp size={11} />
                <span>Returns</span>
              </div>
            </div>

            {HERO_STAIRCASE_NODES.map((node, idx) => {
              const isCurrent = idx === activeNodeIdx;
              const isBase = node.isBase;
              // Indent each node slightly to create descending staircase
              const xOffset = idx * 16;

              return (
                <div
                  key={node.call}
                  className={`${styles.staircaseNode} ${
                    isCurrent
                      ? isUnwinding
                        ? styles.staircaseNodeReturning
                        : styles.staircaseNodeActive
                      : ''
                  } ${isBase ? styles.staircaseNodeBase : ''}`}
                  style={{
                    marginLeft: `${xOffset}px`,
                  }}
                >
                  <span className={styles.nodeCallText}>{node.call}</span>
                  {isBase ? (
                    <span className={`${styles.nodeBadge} ${styles.badgeBase}`}>Base Case</span>
                  ) : isCurrent && isUnwinding ? (
                    <span className={`${styles.nodeBadge} ${styles.badgeReturn}`}>
                      {node.returnVal}
                    </span>
                  ) : null}
                </div>
              );
            })}

            {/* Playback Controls */}
            <div className={styles.heroControlStrip}>
              <button
                type="button"
                className={styles.heroControlBtn}
                onClick={handleTogglePlay}
                title={isPlaying ? 'Pause' : 'Play Trace'}
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
                <span style={{ marginLeft: 4 }}>{isPlaying ? 'Pause' : 'Play Trace'}</span>
              </button>
              <button
                type="button"
                className={styles.heroControlBtn}
                onClick={handleNextStep}
                title="Next Step"
              >
                <ChevronRight size={13} />
              </button>
              <button
                type="button"
                className={styles.heroControlBtn}
                onClick={handleReset}
                title="Reset"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Call Stack Panel */}
          <div className={styles.callStackPanel}>
            <div className={styles.callStackHeader}>
              <span className={styles.callStackTitle}>Call Stack</span>
              <span className={styles.callStackStatus}>
                {isUnwinding ? (
                  <>
                    <ArrowUp size={11} style={{ display: 'inline', marginRight: 3 }} />
                    Unwinding Phase ({HERO_STAIRCASE_NODES[activeNodeIdx].unwindFormula})
                  </>
                ) : (
                  <>
                    <ArrowDown size={11} style={{ display: 'inline', marginRight: 3 }} />
                    Descent: Pushing Frame
                  </>
                )}
              </span>
            </div>

            <div className={styles.stackFramesList}>
              {visibleStackFrames.map((frame, idx) => {
                const isTopFrame = idx === visibleStackFrames.length - 1;
                return (
                  <div
                    key={frame.call}
                    className={`${styles.stackFrameItem} ${
                      isTopFrame ? styles.stackFrameActive : ''
                    } ${frame.isBase ? styles.stackFrameBase : ''}`}
                  >
                    <span>{frame.call}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                      {frame.isBase ? 'ret 1' : `ret n!`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.stackReturnsIndicator}>
              <ArrowUp size={13} />
              <span>Returns flow back (LIFO)</span>
            </div>
          </div>

          {/* Handwritten Annotation */}
          <div className={styles.annotationCluster}>
            <div className={styles.annotationText}>
              Break<br />
              the problem.<br />
              Call yourself.<br />
              Solve bigger<br />
              things.
            </div>
            {/* Curved arrow underline */}
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
              <path
                d="M 5 6 C 25 18, 45 18, 55 10"
                stroke="#475569"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 50 14 L 56 10 L 51 6"
                stroke="#475569"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
