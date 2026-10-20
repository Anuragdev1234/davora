import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './UnderstandProblemSection.module.css';

export function UnderstandProblemSection() {
  const reduced = useReducedMotion();

  // For n = 5
  const rows = [
    { rowNum: 1, spaces: 4, stars: 1 },
    { rowNum: 2, spaces: 3, stars: 3 },
    { rowNum: 3, spaces: 2, stars: 5 },
    { rowNum: 4, spaces: 1, stars: 7 },
    { rowNum: 5, spaces: 0, stars: 9 },
  ];

  return (
    <section className={styles.section} id="understand-problem" aria-label="01 Understand the Pattern">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>01 / Understand the Pattern</div>
          <h2 className={styles.sectionTitle}>The Symmetrical Star Structure</h2>
          <p className={styles.sectionDesc}>
            Creating an equilateral, centered pyramid requires precise mathematical symmetry.
            Instead of growing from the left margin, every row is centered by coordinating a decreasing number of
            leading whitespace columns with an odd arithmetic series of asterisks.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Problem Statement Card */}
          <motion.div
            className={styles.leftCard}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.promptLabel}>Problem Statement</div>
            <div className={styles.statementQuote}>
              &ldquo;Write a C program that asks the user for the number of rows and prints a centered full pyramid using stars.&rdquo;
            </div>
            <p className={styles.statementBody}>
              Unlike half pyramids that align to the left or right, a full pyramid forms an isosceles triangle with vertical symmetry.
              To preserve this central apex, the computer must calculate how many spaces precede the first star on every line.
            </p>

            <div className={styles.observationsList}>
              <div className={styles.observationItem}>
                <span className={styles.observationDot} />
                <div className={styles.observationContent}>
                  <strong>Observation 1 &mdash; The First Row:</strong> Contains exactly 1 star placed at the apex, padded by <code>n - 1</code> leading spaces.
                </div>
              </div>

              <div className={styles.observationItem}>
                <span className={styles.observationDot} />
                <div className={styles.observationContent}>
                  <strong>Observation 2 &mdash; Each New Row:</strong> Has one fewer leading space and two more stars (one on the left of the axis, one on the right).
                </div>
              </div>

              <div className={styles.observationItem}>
                <span className={styles.observationDot} />
                <div className={styles.observationContent}>
                  <strong>Observation 3 &mdash; The Last Row:</strong> Contains zero leading spaces (flush with left margin) and spans <code>2n - 1</code> stars.
                </div>
              </div>
            </div>

            <div className={styles.ruleBox}>
              <strong>The Fundamental Rule:</strong> Row <code>i</code> (from 1 to <code>n</code>) contains exactly <code>n - i</code> leading spaces followed by <code>2i - 1</code> stars.
            </div>
          </motion.div>

          {/* Expected Output Preview */}
          <motion.div
            className={styles.rightCard}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className={styles.previewHeader}>
              <span className={styles.previewTitle}>Expected Output Visualizer</span>
              <span className={styles.previewBadge}>Sample: n = 5</span>
            </div>

            <div className={styles.outputTerminal}>
              <div className={styles.terminalCenterGuide} aria-hidden="true" title="Vertical Symmetry Axis" />
              {rows.map((r) => (
                <div key={r.rowNum} className={styles.terminalLine}>
                  <span style={{ color: '#475569', letterSpacing: '0.12em', userSelect: 'none' }}>{'·'.repeat(r.spaces)}</span>
                  <span className={styles.starGroup}>
                    {'*'.repeat(r.stars)}
                  </span>
                  <span style={{ visibility: 'hidden', letterSpacing: '0.12em', userSelect: 'none' }}>{'·'.repeat(r.spaces)}</span>
                </div>
              ))}
            </div>

            <div className={styles.captionBox}>
              <strong>Central Alignment in Monospace:</strong> In a monospaced terminal, adding 2 stars per row while decreasing leading spaces by 1 guarantees that the middle star of every row falls on the exact same vertical symmetry axis!
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
