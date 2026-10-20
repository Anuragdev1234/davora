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
      title: 'The Total Height Equals n Rows',
      formula: 'Rows = n (Outer loop i: 1 to n)',
      desc: 'The outer loop runs exactly n times from top to bottom. Each iteration handles one full horizontal line.',
    },
    {
      id: 2,
      tag: 'Observation 2',
      title: 'Dual Changes Per Row: Spaces Shrink, Stars Grow',
      formula: 'Spaces = n - i | Stars = i',
      desc: 'As row number i increments, the number of leading spaces decreases linearly while the number of stars increases at the exact same rate.',
    },
    {
      id: 3,
      tag: 'Observation 3',
      title: 'Constant Row Width (The Invariant Sum)',
      formula: '(n - i) + i = n characters',
      desc: 'Every single line occupies exactly n logical slots. The spaces and stars complement each other perfectly to form a right triangle.',
    },
  ];

  // For n = 5
  const n = 5;
  const rows = [
    { rowNum: 1, spaces: 4, stars: 1 },
    { rowNum: 2, spaces: 3, stars: 2 },
    { rowNum: 3, spaces: 2, stars: 3 },
    { rowNum: 4, spaces: 1, stars: 4 },
    { rowNum: 5, spaces: 0, stars: 5 },
  ];

  const currentRowData = rows.find((r) => r.rowNum === selectedRow) || rows[0];

  return (
    <section className={styles.section} id="think-like-human" aria-label="02 Think Like a Human">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>02 / Think Like a Human</div>
          <h2 className={styles.sectionTitle}>Deconstruct the Dual Patterns</h2>
          <div className={styles.sectionQuestion}>How does a programmer transform visual shape into mathematical rules?</div>
          <p className={styles.sectionDesc}>
            While human eyes see an angled slope of stars, computers require an exact instruction sequence:
            how many spaces to emit first, followed by how many stars to emit second, before finishing with a newline.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Human Observations & Golden Rule */}
          <div className={styles.observationsList}>
            {observations.map((obs) => {
              const isActive = selectedRow === obs.id || (obs.id === 3 && selectedRow >= 3);
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

            {/* The Golden Rule Box */}
            <motion.div
              className={styles.ruleCard}
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className={styles.ruleBadge}>The Golden Rule</div>
              <div className={styles.ruleContent}>
                <div className={styles.ruleStatement}>
                  Two consecutive inner loops inside one outer loop.
                </div>
                <div className={styles.ruleDesc}>
                  In row <code>i</code>: first run Loop 1 (<code>j = 1; j &lt;= n - i; j++</code>) to print leading spaces.
                  Then run Loop 2 (<code>k = 1; k &lt;= i; k++</code>) to print asterisks.
                  Finally, print <code>\n</code>.
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
              <span className={styles.visualCardLabel}>Row-by-Row Invariant Inspector</span>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                Selected: Row {currentRowData.rowNum}
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
                    <span className={styles.visualRowNumber}>Row {r.rowNum} (i={r.rowNum})</span>
                    <div className={styles.rowVisualComposition}>
                      <span className={styles.spacesSpan}>
                        {'· '.repeat(r.spaces)}
                      </span>
                      <span className={styles.starsSpan}>
                        {'* '.repeat(r.stars)}
                      </span>
                    </div>
                    <span className={styles.measurementTag}>
                      {r.spaces} sp + {r.stars} st = 5
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Row Detail Breakdown */}
            <div className={styles.rowDetailBreakdown}>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Outer Loop Counter</span>
                <span className={styles.breakdownVal}>i = {currentRowData.rowNum} of {n}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Leading Spaces (Loop 1)</span>
                <span className={styles.breakdownVal}>
                  j: 1 to (n - i) &rarr; {currentRowData.spaces} {currentRowData.spaces === 1 ? 'unit' : 'units'}
                </span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Asterisks (Loop 2)</span>
                <span className={styles.breakdownVal}>
                  k: 1 to i &rarr; {currentRowData.stars} {currentRowData.stars === 1 ? 'star' : 'stars'}
                </span>
              </div>
              <div className={styles.breakdownRow} style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem' }}>
                <span className={styles.breakdownLabel}>Total Visual Slots</span>
                <span className={styles.breakdownVal} style={{ color: '#2563eb' }}>
                  {currentRowData.spaces} + {currentRowData.stars} = {n} slots
                </span>
              </div>
            </div>

            <div className={styles.measurementCallout}>
              <Sparkles size={18} className={styles.measurementIcon} />
              <div className={styles.measurementText}>
                <strong>Mathematical Guarantee:</strong> Notice that row 5 has <code>5 - 5 = 0</code> spaces.
                Loop 1 condition <code>j &lt;= 0</code> evaluates to false immediately, meaning 0 spaces are printed and 5 stars print flush to the left!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
