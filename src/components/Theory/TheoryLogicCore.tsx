import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useMousePosition } from '../../hooks/useMotion';
import styles from './TheoryLogicCore.module.css';

interface CalloutData {
  id: 'code' | 'system' | 'execution';
  title: string;
  desc: string;
  positionClass: string;
}

const CALLOUTS: CalloutData[] = [
  {
    id: 'code',
    title: 'Code',
    desc: 'High-level idea to machine instruction',
    positionClass: styles.calloutTop,
  },
  {
    id: 'system',
    title: 'System',
    desc: 'Memory, control and data working together',
    positionClass: styles.calloutBottomLeft,
  },
  {
    id: 'execution',
    title: 'Execution',
    desc: 'The machine brings logic to life',
    positionClass: styles.calloutRight,
  },
];

export function TheoryLogicCore() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const [activeCallout, setActiveCallout] = useState<string | null>(null);

  // Gentle pointer tilt
  const tiltX = reduced ? 0 : (mouse.x - 0.5) * 8;
  const tiltY = reduced ? 0 : (mouse.y - 0.5) * 8;

  return (
    <div
      ref={containerRef}
      className={styles.visualContainer}
      aria-label="Devora Logic Core 3D Computational Sculpture"
    >
      {/* Ambient background glow */}
      <div className={styles.ambientBacklight} aria-hidden="true" />

      {/* 3D C Sculpture with subtle parallax tilt */}
      <div
        className={styles.sculptureWrap}
        style={{
          transform: `perspective(800px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`,
        }}
      >
        <img
          src="/images/theory_hero_reference.jpg"
          alt="Devora Logic Core — 3D machined metallic and optical glass structure"
          className={styles.sculptureImage}
          loading="eager"
        />
      </div>

      {/* Leader Lines SVG Canvas */}
      <svg
        className={styles.calloutsSvg}
        viewBox="0 0 500 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Callout 1: Code -> Top arc */}
        <path
          d="M 175 42 L 235 42 L 265 80"
          className={`${styles.leaderPath} ${
            activeCallout === 'code' ? styles.leaderPathActive : ''
          }`}
        />
        <circle
          cx="265"
          cy="80"
          r="3"
          className={`${styles.anchorCircle} ${
            activeCallout === 'code' ? styles.anchorCircleActive : ''
          }`}
        />

        {/* Callout 2: System -> Lower left prism */}
        <path
          d="M 160 300 L 210 300 L 245 270"
          className={`${styles.leaderPath} ${
            activeCallout === 'system' ? styles.leaderPathActive : ''
          }`}
        />
        <circle
          cx="245"
          cy="270"
          r="3"
          className={`${styles.anchorCircle} ${
            activeCallout === 'system' ? styles.anchorCircleActive : ''
          }`}
        />

        {/* Callout 3: Execution -> Inner right core */}
        <path
          d="M 410 115 L 375 115 L 340 145"
          className={`${styles.leaderPath} ${
            activeCallout === 'execution' ? styles.leaderPathActive : ''
          }`}
        />
        <circle
          cx="340"
          cy="145"
          r="3"
          className={`${styles.anchorCircle} ${
            activeCallout === 'execution' ? styles.anchorCircleActive : ''
          }`}
        />
      </svg>

      {/* Callout Badges */}
      {CALLOUTS.map((callout) => {
        const isActive = activeCallout === callout.id;
        return (
          <motion.div
            key={callout.id}
            className={`${styles.calloutItem} ${callout.positionClass}`}
            onMouseEnter={() => setActiveCallout(callout.id)}
            onMouseLeave={() => setActiveCallout(null)}
            onFocus={() => setActiveCallout(callout.id)}
            onBlur={() => setActiveCallout(null)}
            tabIndex={0}
            role="note"
            aria-label={`${callout.title}: ${callout.desc}`}
          >
            <div className={`${styles.calloutTitle} ${isActive ? styles.calloutTitleActive : ''}`}>
              {callout.title}
            </div>
            <div className={styles.calloutText}>{callout.desc}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default TheoryLogicCore;
