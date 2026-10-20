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
  const presets = [3, 5, 7, 10];

  return (
    <section className={styles.section} id="give-input" aria-label="03 Give the Computer an Input">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>03 / Give the Computer an Input</div>
          <h2 className={styles.sectionTitle}>Parameterize the Problem</h2>
          <p className={styles.sectionDesc}>
            A good program should not depend on a fixed number of rows. It should ask the
            user how many rows they want.
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
                <span className={styles.metaTitle}>Selected Rows</span>
                <span className={styles.metaValue}>{rowCount}</span>
                <span className={styles.metaFormula}>n = {rowCount}</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Stars</span>
                <span className={styles.metaValue}>{totalStars}</span>
                <span className={styles.metaFormula}>n(n+1)/2 = {totalStars}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Dynamic Pattern Canvas */}
          <motion.div
            className={styles.previewCanvasCard}
            initial={reduced ? undefined : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className={styles.canvasHeader}>
              <span className={styles.canvasLabel}>Live Dynamic Preview</span>
              <span className={styles.canvasStatus}>
                Rendering {rowCount} {rowCount === 1 ? 'row' : 'rows'}
              </span>
            </div>

            <div className={styles.patternRows}>
              {Array.from({ length: rowCount }).map((_, idx) => {
                const rowNum = idx + 1;
                return (
                  <motion.div
                    key={rowNum}
                    className={styles.dynamicRow}
                    initial={reduced ? undefined : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                  >
                    <span className={styles.dynamicRowIndex}>Row {rowNum}</span>
                    <div className={styles.dynamicStars}>
                      {Array.from({ length: rowNum }).map((_, sIdx) => (
                        <span key={sIdx} className={styles.dynamicStar}>
                          *
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
