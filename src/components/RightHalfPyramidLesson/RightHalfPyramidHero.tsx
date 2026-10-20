import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './RightHalfPyramidHero.module.css';

export function RightHalfPyramidHero() {
  const reduced = useReducedMotion();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const defaultRows = [1, 2, 3, 4, 5];

  return (
    <section className={styles.heroSection} aria-label="Right Half Pyramid Lesson Hero">
      <div className={styles.container}>
        {/* Left Column: Editorial & Problem Context */}
        <div className={styles.leftColumn}>
          <motion.div
            className={styles.breadcrumb}
            initial={reduced ? undefined : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.breadcrumbDash} />
            <span>DEVORA / PROGRAMS / PATTERN PROGRAMS / RIGHT HALF PYRAMID</span>
          </motion.div>

          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className={styles.eyebrowDot} />
            <span>PATTERN PROGRAMS · 01</span>
          </motion.div>

          <motion.h1
            className={styles.heroHeading}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Think in Patterns.
            <br />
            Code with Logic.
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Learn how a simple observation becomes an algorithm, how an algorithm
            becomes a flowchart, and how a computer turns it into a working C program.
          </motion.p>

          <motion.div
            className={styles.badgeStrip}
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className={styles.badge}>RIGHT HALF PYRAMID</span>
            <span className={`${styles.badge} ${styles.badgeHighlight}`}>BEGINNER</span>
            <span className={styles.badge}>NESTED LOOPS</span>
            <span className={styles.badge}>TIME: O(N²)</span>
          </motion.div>
        </div>

        {/* Right Column: Interactive Real Star Pattern Visualization */}
        <motion.div
          className={styles.rightStage}
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.stageHeader}>
            <span className={styles.stageLabel}>Visual Pattern · 5 Rows</span>
            <span className={styles.interactiveHint}>Click any row to inspect</span>
          </div>

          <div className={styles.patternCanvas} role="region" aria-label="5-Row Star Pattern">
            {defaultRows.map((rowCount, idx) => {
              const isSelected = activeRow === rowCount;
              return (
                <motion.div
                  key={rowCount}
                  className={`${styles.starRow} ${isSelected ? styles.starRowActive : ''}`}
                  onClick={() => setActiveRow(isSelected ? null : rowCount)}
                  initial={reduced ? undefined : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
                >
                  <span className={styles.rowIndex}>Row {rowCount}</span>

                  <div className={styles.starsGroup}>
                    {Array.from({ length: rowCount }).map((_, starIdx) => (
                      <span key={starIdx} className={styles.starChar}>
                        *
                      </span>
                    ))}
                  </div>

                  <span className={styles.rowCountPill}>
                    {rowCount} {rowCount === 1 ? 'star' : 'stars'}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Connected Callout Annotation */}
          <div className={styles.annotationBox}>
            <svg
              className={styles.annotationConnector}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 4 4 L 4 14 L 18 14"
                stroke="#2563eb"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="14" r="2.5" fill="#2563eb" />
            </svg>

            <div className={styles.annotationText}>
              <span className={styles.annotationTitle}>One Simple Rule</span>
              <span className={styles.annotationDesc}>
                {activeRow
                  ? `Row ${activeRow} prints exactly ${activeRow} ${
                      activeRow === 1 ? 'star' : 'stars'
                    }. The star count always equals the row index i.`
                  : 'Each row prints as many stars as its row number. Row i prints i stars.'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
