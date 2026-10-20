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
      title: 'The First Row',
      formula: 'i = 1 → 1 star',
      desc: 'The very first row begins with a single star. Row 1 has exactly 1 star.',
    },
    {
      id: 2,
      tag: 'Observation 2',
      title: 'The Next Row',
      formula: 'i = 2 → 2 stars',
      desc: 'Moving to the second row, we see two stars side by side. Row 2 has exactly 2 stars.',
    },
    {
      id: 3,
      tag: 'Observation 3',
      title: 'The Pattern Continues',
      formula: 'i = k → k stars',
      desc: 'Every consecutive row contains exactly one more star than the row directly above it.',
    },
  ];

  const rows = [1, 2, 3, 4, 5];

  return (
    <section className={styles.section} id="think-like-human" aria-label="02 Think Like a Human">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>02 / Think Like a Human</div>
          <h2 className={styles.sectionTitle}>Recognize the Human Pattern</h2>
          <div className={styles.sectionQuestion}>Before writing code, what do you notice?</div>
          <p className={styles.sectionDesc}>
            When we look at the pyramid, we can see that the number of stars increases by
            one on each new row.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Human Observations & The Rule */}
          <div className={styles.observationsList}>
            {observations.map((obs) => {
              const isActive = selectedRow === obs.id || (obs.id === 3 && selectedRow >= 3);
              return (
                <motion.div
                  key={obs.id}
                  className={`${styles.observationCard} ${
                    isActive ? styles.observationCardActive : ''
                  }`}
                  onClick={() => onSelectRow(obs.id === 3 ? 3 : obs.id)}
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

            {/* The Foundational Rule */}
            <motion.div
              className={styles.ruleCard}
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className={styles.ruleBadge}>The Rule</div>
              <div className={styles.ruleContent}>
                <div className={styles.ruleStatement}>Row i contains i stars.</div>
                <div className={styles.ruleDesc}>
                  This fundamental relationship will govern both our algorithm and our inner loop condition.
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
              <span className={styles.visualCardLabel}>Row-by-Row Inspection</span>
              <span style={{ fontSize: '0.75rem', color: '#2563eb' }}>
                Active: Row {selectedRow}
              </span>
            </div>

            <div className={styles.visualRowsList}>
              {rows.map((r) => {
                const isSelected = selectedRow === r;
                return (
                  <div
                    key={r}
                    className={`${styles.visualRowItem} ${
                      isSelected ? styles.visualRowItemActive : ''
                    }`}
                    onClick={() => onSelectRow(r)}
                  >
                    <span className={styles.visualRowNumber}>Row {r}</span>
                    <div className={styles.starsRowWrapper}>
                      {Array.from({ length: r }).map((_, starIdx) => (
                        <span key={starIdx} className={styles.starGlyph}>
                          *
                        </span>
                      ))}
                    </div>
                    <span className={styles.measurementTag}>
                      {r} {r === 1 ? 'star' : 'stars'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.measurementCallout}>
              <Sparkles size={18} className={styles.measurementIcon} />
              <div className={styles.measurementText}>
                <strong>Direct Mapping:</strong> When the outer loop reaches row{' '}
                <code>i = {selectedRow}</code>, the inner loop must run exactly{' '}
                <code>{selectedRow}</code> times from <code>j = 1</code> to{' '}
                <code>j = {selectedRow}</code>.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
