import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ThinkLikeAHumanSection.module.css';

interface ThinkLikeAHumanSectionProps {
  selectedRow: number;
  onSelectRow: (row: number) => void;
}

export function ThinkLikeAHumanSection({
  selectedRow,
  onSelectRow,
}: ThinkLikeAHumanSectionProps) {
  const reduced = useReducedMotion();

  const observations = [
    {
      id: 1,
      tag: 'Observation 1',
      title: 'The Top Row Starts at Maximum Width',
      formula: 'Row 1 → i = 5 (5 stars)',
      desc: 'The very first row printed is the widest. When n = 5, the first row outputs exactly 5 stars.',
    },
    {
      id: 2,
      tag: 'Observation 2',
      title: 'Each Successive Row Decrements by 1',
      formula: 'Row 2 → i = 4 (4 stars)',
      desc: 'Moving to the second row, we lose 1 star. Row 2 outputs 4 stars; row 3 outputs 3 stars.',
    },
    {
      id: 3,
      tag: 'Observation 3',
      title: 'The Bottom Row Terminates at 1 Star',
      formula: 'Row 5 → i = 1 (1 star)',
      desc: 'The pattern continues decreasing until the final row terminates with exactly a single star.',
    },
  ];

  // 5 rows representing inverted pattern:
  // row 1: 5 stars (i=5)
  // row 2: 4 stars (i=4)
  // row 3: 3 stars (i=3)
  // row 4: 2 stars (i=2)
  // row 5: 1 star  (i=1)
  const rows = [
    { rowNum: 1, stars: 5, iVal: 5 },
    { rowNum: 2, stars: 4, iVal: 4 },
    { rowNum: 3, stars: 3, iVal: 3 },
    { rowNum: 4, stars: 2, iVal: 2 },
    { rowNum: 5, stars: 1, iVal: 1 },
  ];

  const currentRowData = rows.find((r) => r.rowNum === selectedRow) || rows[0];

  return (
    <section className={styles.section} id="think-like-human" aria-label="02 Think Like a Human">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>02 / Think Like a Human</div>
          <h2 className={styles.sectionTitle}>Recognize the Reverse Rule</h2>
          <div className={styles.sectionQuestion}>Before writing code, what does the human eye notice?</div>
          <p className={styles.sectionDesc}>
            While humans see the inverted shape as a whole, a programmer analyzes the row-by-row decrement:
            each successive row contains one less star than the row directly above it.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Human Observations & The Rule */}
          <div className={styles.observationsList}>
            {observations.map((obs) => {
              const isActive =
                selectedRow === obs.id || (obs.id === 3 && selectedRow >= 3);
              return (
                <motion.div
                  key={obs.id}
                  className={`${styles.observationCard} ${
                    isActive ? styles.observationCardActive : ''
                  }`}
                  onClick={() => onSelectRow(obs.id === 3 ? 5 : obs.id)}
                  initial={reduced ? undefined : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: obs.id * 0.1 }}
                >
                  <div className={styles.observationHeader}>
                    <span className={styles.observationTag}>{obs.tag}</span>
                    <span className={styles.observationFormula}>{obs.formula}</span>
                  </div>
                  <div className={styles.observationTitle}>{obs.title}</div>
                  <p className={styles.observationBody}>{obs.desc}</p>
                </motion.div>
              );
            })}

            {/* The Foundational Reverse Rule */}
            <motion.div
              className={styles.ruleCard}
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className={styles.ruleBadge}>Reverse Rule</div>
              <div className={styles.ruleContent}>
                <div className={styles.ruleStatement}>
                  Counting outer loop down from N to 1 gives us the exact star count!
                </div>
                <div className={styles.ruleDesc}>
                  If we initialize outer counter <code>i = n</code> and decrement <code>i--</code> down to <code>1</code>,
                  then on each row, <code>i</code> directly dictates how many stars to print: <code>j = 1</code> to <code>i</code>!
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Measurement Visualization */}
          <motion.div
            className={styles.patternVisualCard}
            initial={reduced ? undefined : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className={styles.visualCardHeader}>
              <span className={styles.visualCardLabel}>Row-by-Row Inverse Inspection</span>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                Inspecting: Row {currentRowData.rowNum}
              </span>
            </div>

            <div className={styles.visualRowsList}>
              {rows.map((r) => {
                const isSelected = selectedRow === r.rowNum;
                return (
                  <div
                    key={r.rowNum}
                    className={`${styles.visualRowItem} ${
                      isSelected ? styles.visualRowItemActive : ''
                    }`}
                    onClick={() => onSelectRow(r.rowNum)}
                  >
                    <span className={styles.visualRowNumber}>Row {r.rowNum}</span>
                    <div className={styles.starsRowWrapper}>
                      {Array.from({ length: r.stars }).map((_, starIdx) => (
                        <span key={starIdx} className={styles.starGlyph}>
                          *
                        </span>
                      ))}
                    </div>
                    <span className={styles.measurementTag}>
                      i = {r.iVal} &rarr; {r.stars} {r.stars === 1 ? 'star' : 'stars'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.measurementCallout}>
              <Sparkles size={18} className={styles.measurementIcon} />
              <div className={styles.measurementText}>
                <strong>Outer Variable Mapping:</strong> In visual row {currentRowData.rowNum},
                the reverse outer counter is <code>i = {currentRowData.iVal}</code>.
                The inner loop executes from <code>j = 1</code> up to <code>j &lt;= {currentRowData.iVal}</code>,
                printing exactly <code>{currentRowData.stars}</code> stars!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
