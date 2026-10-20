import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './UserInputSection.module.css';

interface UserInputSectionProps {
  rowCount: number;
  onRowCountChange: (n: number) => void;
}

export function UserInputSection({
  rowCount,
  onRowCountChange,
}: UserInputSectionProps) {
  const reduced = useReducedMotion();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 10) {
      onRowCountChange(val);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= 1 && val <= 10) {
        onRowCountChange(val);
      }
    }
  };

  const handleIncrement = () => {
    if (rowCount < 10) onRowCountChange(rowCount + 1);
  };

  const handleDecrement = () => {
    if (rowCount > 1) onRowCountChange(rowCount - 1);
  };

  const totalStars = (rowCount * (rowCount + 1)) / 2;
  const totalSpaces = (rowCount * (rowCount - 1)) / 2;
  const totalUnits = totalStars + totalSpaces;
  const presets = [3, 5, 7, 10];

  // Generate rows for preview
  const previewRows = Array.from({ length: rowCount }, (_, idx) => {
    const i = idx + 1;
    const spaces = rowCount - i;
    const stars = i;
    return { i, spaces, stars };
  });

  return (
    <section className={styles.section} id="give-input" aria-label="03 Give the Computer an Input">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>03 / Give the Computer an Input</div>
          <h2 className={styles.sectionTitle}>Parameterize the Star Pyramid</h2>
          <p className={styles.sectionDesc}>
            A robust C program dynamically adapts to the learner&apos;s choice. By modifying row count <code>n</code>,
            we dynamically scale the number of leading spaces and asterisks required to maintain a perfect triangular slope.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Control Panel */}
          <motion.div
            className={styles.controlSurface}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.controlHeader}>
              <span className={styles.controlLabel}>User Input Control</span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Range: 1 – 10 rows</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="row-input" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>
                Number of Rows (n)
              </label>

              <div className={styles.inputRow}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={handleDecrement}
                  disabled={rowCount <= 1}
                  aria-label="Decrease rows"
                >
                  −
                </button>

                <input
                  id="row-input"
                  type="number"
                  min="1"
                  max="10"
                  className={styles.numberInput}
                  value={rowCount}
                  onChange={handleNumberChange}
                  aria-label="Number of rows"
                />

                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={handleIncrement}
                  disabled={rowCount >= 10}
                  aria-label="Increase rows"
                >
                  +
                </button>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={rowCount}
                onChange={handleSliderChange}
                className={styles.rangeSlider}
                aria-label="Row count slider"
              />
            </div>

            {/* Quick Presets */}
            <div className={styles.presetsStrip}>
              <span className={styles.presetLabel}>Presets:</span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`${styles.presetBtn} ${
                    rowCount === preset ? styles.presetBtnActive : ''
                  }`}
                  onClick={() => onRowCountChange(preset)}
                >
                  n = {preset}
                </button>
              ))}
            </div>

            {/* Derived Mathematical Metadata */}
            <div className={styles.metaGrid}>
              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Rows</span>
                <span className={styles.metaValue}>{rowCount}</span>
                <span className={styles.metaFormula}>n = {rowCount} rows</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Stars</span>
                <span className={styles.metaValue} style={{ color: '#2563eb' }}>{totalStars}</span>
                <span className={styles.metaFormula}>n(n+1)/2</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Space Units</span>
                <span className={styles.metaValue}>{totalSpaces}</span>
                <span className={styles.metaFormula}>n(n-1)/2</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Grid Units</span>
                <span className={styles.metaValue}>{totalUnits}</span>
                <span className={styles.metaFormula}>n² units</span>
              </div>
            </div>
          </motion.div>

          {/* Right Live Preview Box */}
          <motion.div
            className={styles.previewSurface}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className={styles.previewHeader}>
              <span className={styles.previewTitle}>Live Monospace Preview</span>
              <span className={styles.previewBadge}>n = {rowCount}</span>
            </div>

            <div className={styles.patternContainer}>
              {previewRows.map((r) => (
                <div key={r.i} className={styles.patternRow}>
                  <span className={styles.spaceUnitPreview}>
                    {'· '.repeat(r.spaces)}
                  </span>
                  <span className={styles.starUnitPreview}>
                    {'* '.repeat(r.stars)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.previewFooter}>
              <span>Columns: {rowCount} units wide</span>
              <span>Characters: {totalUnits * 2 + rowCount} bytes</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
