import React from 'react';
import { motion } from 'framer-motion';
import styles from './UserInputSection.module.css';

interface UserInputSectionProps {
  rowCount: number;
  onRowCountChange: (count: number) => void;
}

export const UserInputSection: React.FC<UserInputSectionProps> = ({
  rowCount,
  onRowCountChange,
}) => {
  const presets = [3, 5, 7, 10];

  const handleDecrement = () => {
    if (rowCount > 1) {
      onRowCountChange(rowCount - 1);
    }
  };

  const handleIncrement = () => {
    if (rowCount < 10) {
      onRowCountChange(rowCount + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= 1 && val <= 10) {
        onRowCountChange(val);
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRowCountChange(parseInt(e.target.value, 10));
  };

  const baseStars = 2 * rowCount - 1;
  const totalStars = rowCount * rowCount;
  const totalSpaces = (rowCount * (rowCount - 1)) / 2;

  // Generate pattern rows for preview
  const patternRows = [];
  for (let i = 1; i <= rowCount; i++) {
    const starsCount = 2 * i - 1;
    patternRows.push({
      row: i,
      starsCount,
      stars: '*'.repeat(starsCount),
    });
  }

  return (
    <section id="user-input" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>SCENE 03 &bull; DYNAMIC INPUT CONTROLS</div>
          <h2 className={styles.sectionTitle}>Choose the Pyramid Size</h2>
          <p className={styles.sectionDesc}>
            Adjust the number of rows <span className="font-mono font-semibold text-blue-600">n</span> to observe
            how the central symmetry, base width, leading spaces, and total star count scale mathematically.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Controls Surface */}
          <div className={styles.controlSurface}>
            <div className={styles.controlHeader}>
              <span className={styles.controlLabel}>Row Count (n) Configuration</span>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => onRowCountChange(5)}
              >
                Reset to Default (n = 5)
              </button>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputRow}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={handleDecrement}
                  disabled={rowCount <= 1}
                  aria-label="Decrease rows"
                >
                  &minus;
                </button>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={rowCount}
                  onChange={handleInputChange}
                  className={styles.numberInput}
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
                <span className="text-sm text-slate-500 font-medium ml-2">Rows (1 &ndash; 10)</span>
              </div>

              <input
                type="range"
                min={1}
                max={10}
                value={rowCount}
                onChange={handleSliderChange}
                className={styles.rangeSlider}
                aria-label="Row count slider"
              />
            </div>

            {/* Presets */}
            <div className={styles.presetsStrip}>
              <span className={styles.presetLabel}>Presets:</span>
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={`${styles.presetBtn} ${rowCount === val ? styles.presetBtnActive : ''}`}
                  onClick={() => onRowCountChange(val)}
                >
                  n = {val} {val === 5 ? '(standard)' : ''}
                </button>
              ))}
            </div>

            {/* Derived Mathematical Totals */}
            <div className={styles.metaGrid}>
              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Rows</span>
                <span className={styles.metaValue}>{rowCount}</span>
                <span className={styles.metaFormula}>Formula: n</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Base Row Stars</span>
                <span className={styles.metaValue}>{baseStars}</span>
                <span className={styles.metaFormula}>Formula: 2n &minus; 1</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Stars (Volume)</span>
                <span className={styles.metaValue}>{totalStars}</span>
                <span className={styles.metaFormula}>Formula: n&sup2; ({rowCount}&times;{rowCount})</span>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaTitle}>Total Leading Spaces</span>
                <span className={styles.metaValue}>{totalSpaces}</span>
                <span className={styles.metaFormula}>Formula: n(n&minus;1)/2</span>
              </div>
            </div>
          </div>

          {/* Right Live Preview Box */}
          <div className={styles.previewSurface}>
            <div className={styles.previewHeader}>
              <span className={styles.previewTitle}>Live Centered Pyramid</span>
              <span className={styles.previewBadge}>n = {rowCount} rows</span>
            </div>

            <div className={styles.patternContainer}>
              <div className={styles.previewAxisGuide} title="Central Symmetry Axis" />
              {patternRows.map(({ row, stars }) => {
                const spacesCount = rowCount - row;
                return (
                  <motion.div
                    key={row}
                    className={styles.patternRow}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: row * 0.02 }}
                  >
                    <span style={{ color: '#334155', userSelect: 'none' }}>{'·'.repeat(spacesCount)}</span>
                    <span className={styles.starUnitPreview}>{stars}</span>
                    <span style={{ visibility: 'hidden', userSelect: 'none' }}>{'·'.repeat(spacesCount)}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className={styles.previewFooter}>
              <span>Apex: 1 star</span>
              <span className="font-mono text-blue-400">Centered along vertical axis</span>
              <span>Base: {baseStars} stars</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
