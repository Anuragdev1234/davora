import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './UnderstandProblemSection.module.css';

export function UnderstandProblemSection() {
  const reduced = useReducedMotion();

  const previewOutput = [
    '*',
    '* *',
    '* * *',
    '* * * *',
    '* * * * *',
  ];

  return (
    <section className={styles.section} id="understand-problem" aria-label="01 Understand the Problem">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>01 / Understand the Problem</div>
          <h2 className={styles.sectionTitle}>Define the Goal Before Coding</h2>
          <p className={styles.sectionDesc}>
            Great software engineering begins by defining the target output with absolute
            clarity before writing a single line of C code.
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
              “Your task is to print a right half pyramid using stars.”
            </div>
            <p className={styles.statementBody}>
              Write a C program that asks the user for the number of rows and prints a pattern
              containing one star in the first row, two stars in the second row, and so on,
              until the specified number of rows is reached.
            </p>

            <ul className={styles.requirementsList}>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Input must come dynamically from the user (e.g. 1 to 10 rows).</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Stars align to the left margin without preceding spaces.</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span>Each row ends with an explicit newline sequence (\n).</span>
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
              <strong>Notice the transformation:</strong> From row to row, the star count
              increments by exactly 1. Row 1 has 1 star; Row 5 has 5 stars.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
