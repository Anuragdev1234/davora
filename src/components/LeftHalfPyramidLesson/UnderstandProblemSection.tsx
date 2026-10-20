import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './UnderstandProblemSection.module.css';

export function UnderstandProblemSection() {
  const reduced = useReducedMotion();

  // For n = 5
  const rows = [
    { rowNum: 1, spaces: 4, stars: 1 },
    { rowNum: 2, spaces: 3, stars: 2 },
    { rowNum: 3, spaces: 2, stars: 3 },
    { rowNum: 4, spaces: 1, stars: 4 },
    { rowNum: 5, spaces: 0, stars: 5 },
  ];

  return (
    <section className={styles.section} id="understand-problem" aria-label="01 Understand the Problem">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>01 / Understand the Problem</div>
          <h2 className={styles.sectionTitle}>The Right-Aligned Star Shape</h2>
          <p className={styles.sectionDesc}>
            Clear algorithmic engineering begins with understanding the terminal&apos;s physical constraints.
            Standard consoles print characters strictly from left to right. To make stars align along the right margin,
            we must actively print whitespace padding before each group of stars.
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
              &ldquo;Print a left-aligned, right-sloping pyramid using stars for n rows.&rdquo;
            </div>
            <p className={styles.statementBody}>
              Write a complete C program that accepts an integer <code>n</code> from the user and outputs
              a left half pyramid where each row <code>i</code> (from 1 to <code>n</code>) pushes its stars to
              the right margin by printing exactly <code>n - i</code> leading space units, followed by
              <code>i</code> star units.
            </p>

            <ul className={styles.requirementsList}>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span><strong>Dynamic Input:</strong> The user specifies row count <code>n</code> (1 to 10).</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span><strong>Dual Row Operations:</strong> Each row first outputs leading spaces, then outputs asterisks.</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span><strong>Inverse Space Count:</strong> Row 1 starts with <code>n - 1</code> spaces, tapering down to 0 spaces on the final row.</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span><strong>Linear Star Growth:</strong> Row <code>i</code> prints exactly <code>i</code> asterisks.</span>
              </li>
              <li className={styles.requirementItem}>
                <span className={styles.requirementDot} />
                <span><strong>Row Delimiter:</strong> Every row must terminate with an explicit newline character (<code>\n</code>).</span>
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
              <span className={styles.previewTitle}>Target Output Visualizer</span>
              <span className={styles.previewBadge}>Sample: n = 5</span>
            </div>

            <div className={styles.outputTerminal}>
              {rows.map((r) => (
                <div key={r.rowNum} className={styles.terminalLine}>
                  <span className={styles.spaceUnit}>
                    {'· '.repeat(r.spaces)}
                  </span>
                  <span className={styles.starUnit}>
                    {'* '.repeat(r.stars)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.legendBar}>
              <div className={styles.legendItem}>
                <span className={styles.legendDotSpace} />
                <span>· Space unit (&quot;  &quot;)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDotStar} />
                <span>* Star unit (&quot;* &quot;)</span>
              </div>
            </div>

            <div className={styles.captionBox} style={{ marginTop: '1.25rem' }}>
              <strong>The Terminal Reality:</strong> You cannot jump directly to column 5 to print a star.
              You must emit 4 space units (8 console columns), then print the star. This reveals why <em>two inner loops</em> are required.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
