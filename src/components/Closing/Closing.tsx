import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import {
  fadeUp,
  fadeIn,
  pathDraw,
  viewportConfig,
} from '../../utils/motion';
import { useReducedMotion, useScrollTo } from '../../hooks/useMotion';
import styles from './Closing.module.css';

const PROGRESS_STEPS = [
  { index: '01', label: 'Explore', x: 50 },
  { index: '02', label: 'Understand', x: 216 },
  { index: '03', label: 'Experiment', x: 383 },
  { index: '04', label: 'Build', x: 550 },
];

export function Closing() {
  const reduced = useReducedMotion();
  const scrollTo = useScrollTo();

  const handleStartLearning = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('twoworlds');
  };

  return (
    <section id="closing" className={styles.section} aria-label="Closing Section">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Step 1: Section label */}
          <motion.div
            variants={reduced ? undefined : fadeIn}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
            custom={0}
          >
            <span className={styles.sectionLabel}>07 / CLOSING</span>
          </motion.div>

          {/* Step 2: Heading */}
          <motion.h2
            className={styles.heading}
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
            custom={1}
          >
            Your first program starts with a better question.
          </motion.h2>

          {/* Step 3: Supporting text */}
          <motion.p
            className={styles.supportingText}
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
            custom={2}
          >
            Explore. Understand. Experiment. Build.
          </motion.p>

          {/* Step 4: Progress Indicator */}
          <motion.div
            className={styles.indicatorWrapper}
            variants={reduced ? undefined : fadeIn}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
            custom={2.5}
            aria-label="Conceptual learning sequence: Explore, Understand, Experiment, Build"
          >
            <svg
              className={styles.progressSvg}
              viewBox="0 0 600 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <title>Learning Sequence Indicator</title>
              <desc>A continuous connecting path linking Explore, Understand, Experiment, and Build</desc>

              {/* Background guide track */}
              <line
                x1="50"
                y1="24"
                x2="550"
                y2="24"
                stroke="#E2E3DE"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Animated drawing line (draws once) */}
              <motion.path
                d="M 50 24 L 550 24"
                stroke="#9BC44A"
                strokeWidth="2"
                strokeLinecap="round"
                variants={reduced ? undefined : pathDraw}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={viewportConfig}
                custom={1}
              />

              {/* Milestones */}
              {PROGRESS_STEPS.map((step, idx) => (
                <g key={step.index}>
                  {/* Step index badge above */}
                  <text
                    x={step.x}
                    y="12"
                    textAnchor="middle"
                    fill="#A0A39C"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {step.index}
                  </text>

                  {/* Node Outer Ring */}
                  <circle
                    cx={step.x}
                    cy="24"
                    r="8"
                    fill="#F5F5F1"
                    stroke="#C8CAC4"
                    strokeWidth="1.5"
                  />

                  {/* Node Core Dot */}
                  <circle
                    cx={step.x}
                    cy="24"
                    r="4"
                    fill={idx === 3 ? '#9BC44A' : '#191B19'}
                  />

                  {/* Step Label below */}
                  <text
                    x={step.x}
                    y="56"
                    textAnchor="middle"
                    fill="#191B19"
                    fontFamily="Inter, sans-serif"
                    fontSize="13"
                    fontWeight="500"
                    letterSpacing="-0.01em"
                  >
                    {step.label}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Step 5: CTA Button */}
          <motion.div
            className={styles.ctaContainer}
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
            custom={4}
          >
            <button
              type="button"
              onClick={handleStartLearning}
              className={styles.ctaBtn}
              aria-label="Start Learning C - Jump to learning worlds"
            >
              <span>Start Learning C</span>
              <ArrowRight className={styles.arrowIcon} aria-hidden="true" />
            </button>
            <span className={styles.ctaSub}>Free &amp; open-source foundational resource</span>
          </motion.div>
        </div>

        {/* Step 6: Footer */}
        <div className={styles.footerDivider} role="separator" />

        <motion.footer
          className={styles.footer}
          variants={reduced ? undefined : fadeIn}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={viewportConfig}
          custom={5}
        >
          <div className={styles.footerLeft}>
            <div className={styles.brand}>
              <span className={styles.brandDot} aria-hidden="true" />
              <span>DEVORA</span>
            </div>
            <div className={styles.copyright}>
              Copyright &copy; 2023 DEVORA. All rights reserved.
            </div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.brand}>
              <Terminal size={14} aria-hidden="true" />
              <span>DEVORA</span>
            </div>
            <div className={styles.tagline}>Inside the Logic.</div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

export default Closing;
