import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './UnderstandProblemSection.module.css';

export function UnderstandProblemSection() {
  const reduced = useReducedMotion();

  const previewOutput = [
    '* * * * *',
    '* * * *',
    '* * *',
    '* *',
    '*',
  ];

  return (
    <section className={styles.section} id="understand-problem" aria-label="01 Understand the Problem">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>01 / Understand the Problem</div>
          <h2 className={styles.sectionTitle}>Define the Reverse Shape</h2>
          <p className={styles.sectionDesc}>
            Clear engineering begins by observing the inverse relationship: instead of growing from 1 to N,
            the inverted pyramid starts with N stars and shrinks systematically until reaching 1.
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
            <div className={styles.promptLabel}>The Challenge</div>
            <div className={styles.statementQuote}>
              “Your task is to print an inverted right half pyramid using stars.”
            </div>
            <p className={styles.statementBody}>
              Write a robust C program that accepts the number of rows from the user and outputs
              an inverted right half pyramid, starting with N stars on row 1 and reducing by one star
              on each subsequent row until the final row prints exactly one star.
            </p>

            <ul className={styles.requirementsList}>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Dynamic row input: The user chooses the height N (1 to 10 rows).</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Decreasing width: Top row has N stars; bottom row has exactly 1 star.</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Flush left margin: All stars are left-aligned without preceding spaces.</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Explicit row endings: Each completed row outputs a newline (\n).</span>
              </li>
            </ul>
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
              <span className={styles.previewTitle}>Expected Target Output</span>
              <span className={styles.previewBadge}>Sample: n = 5</span>
            </div>

            <pre className={styles.outputTerminal}>
              {previewOutput.map((row, idx) => (
                <div key={idx}>{row}</div>
              ))}
            </pre>

            <div className={styles.captionBox}>
              <strong>Notice the reverse pattern:</strong> From row to row, the star count
              decrements by exactly 1. Row 1 has 5 stars, Row 2 has 4, Row 3 has 3, Row 4 has 2, and Row 5 has 1 star.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
