import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './InvertedRightHalfPyramidHero.module.css';

export function InvertedRightHalfPyramidHero() {
  const reduced = useReducedMotion();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  // Rows for n = 5 inverted pattern:
  // Row 1 (i = 5): 5 stars
  // Row 2 (i = 4): 4 stars
  // Row 3 (i = 3): 3 stars
  // Row 4 (i = 2): 2 stars
  // Row 5 (i = 1): 1 star
  const defaultRows = [
    { rowNum: 1, iVal: 5, stars: 5 },
    { rowNum: 2, iVal: 4, stars: 4 },
    { rowNum: 3, iVal: 3, stars: 3 },
    { rowNum: 4, iVal: 2, stars: 2 },
    { rowNum: 5, iVal: 1, stars: 1 },
  ];

  const activeRowData = defaultRows.find((r) => r.rowNum === activeRow);

  return (
    <section className={styles.heroSection} aria-label="Inverted Right Half Pyramid Lesson Hero">
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
            <span>DEVORA / PROGRAMS / PATTERN PROGRAMS / INVERTED RIGHT HALF PYRAMID</span>
          </motion.div>

          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className={styles.eyebrowDot} />
            <span>PATTERN PROGRAMS · 02 · REVERSE LOOP LOGIC</span>
          </motion.div>

          <motion.h1
            className={styles.heroHeading}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Think in Reverse.
            <br />
            Code with Precision.
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Learn how human spatial reasoning inverts a geometric shape, how reverse-counting
            loops count downwards from N to 1, and how a computer systematically decreases inner loop iterations.
          </motion.p>

          <motion.div
            className={styles.badgeStrip}
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className={styles.badge}>INVERTED RIGHT HALF PYRAMID</span>
            <span className={`${styles.badge} ${styles.badgeHighlight}`}>REVERSE LOOP</span>
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
            <span className={styles.stageLabel}>Visual Pattern · 5 Rows (Inverted)</span>
            <span className={styles.interactiveHint}>Click any row to inspect</span>
          </div>

          <div className={styles.patternCanvas} role="region" aria-label="5-Row Inverted Star Pattern">
            {defaultRows.map((row, idx) => {
              const isSelected = activeRow === row.rowNum;
              return (
                <motion.div
                  key={row.rowNum}
                  className={`${styles.starRow} ${isSelected ? styles.starRowActive : ''}`}
                  onClick={() => setActiveRow(isSelected ? null : row.rowNum)}
                  initial={reduced ? undefined : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
                >
                  <span className={styles.rowIndex}>Row {row.rowNum}</span>

                  <div className={styles.starsGroup}>
                    {Array.from({ length: row.stars }).map((_, starIdx) => (
                      <span key={starIdx} className={styles.starChar}>
                        *
                      </span>
                    ))}
                  </div>

                  <span className={styles.rowCountPill}>
                    i = {row.iVal} &rarr; {row.stars} {row.stars === 1 ? 'star' : 'stars'}
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
              <span className={styles.annotationTitle}>The Reverse Rule</span>
              <span className={styles.annotationDesc}>
                {activeRowData
                  ? `Row ${activeRowData.rowNum} has outer counter i = ${activeRowData.iVal}. The inner loop runs j = 1 to ${activeRowData.iVal}, printing exactly ${activeRowData.stars} ${activeRowData.stars === 1 ? 'star' : 'stars'}.`
                  : 'Start wide at N stars on row 1, then decrement the outer loop counter (i--) after every row until i reaches 1.'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
