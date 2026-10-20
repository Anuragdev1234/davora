import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './DiscoverSymmetrySection.module.css';

interface DiscoverSymmetrySectionProps {
  rowCount: number;
  selectedRow: number;
  onSelectRow: (row: number) => void;
}

export function DiscoverSymmetrySection({
  rowCount,
  selectedRow,
  onSelectRow,
}: DiscoverSymmetrySectionProps) {
  const reduced = useReducedMotion();

  const safeRow = Math.min(selectedRow, rowCount);

  // Generate dynamic rows based on current rowCount
  const rows = Array.from({ length: rowCount }, (_, idx) => {
    const rowNum = idx + 1;
    const spaces = rowCount - rowNum;
    const stars = 2 * rowNum - 1;
    return { rowNum, spaces, stars };
  });

  const currentRowData = rows.find((r) => r.rowNum === safeRow) || rows[0];

  return (
    <section className={styles.section} id="discover-symmetry" aria-label="02 Discover the Symmetry">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>02 / Discover the Symmetry</div>
          <h2 className={styles.sectionTitle}>The Mechanics of Center-Alignment</h2>
          <div className={styles.sectionQuestion}>
            How can we make every row wider while keeping the pyramid centered?
          </div>
          <p className={styles.sectionDesc}>
            A centered pyramid is governed by two complementary arithmetic rules.
            By decreasing the indentation by 1 space per row and expanding the stars by 2 per row,
            each new row grows symmetrically by 1 star to the left and 1 star to the right of the central axis.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Two Relationships & Dynamic Table */}
          <div className={styles.relationshipsList}>
            {/* Relationship A */}
            <motion.div
              className={styles.relationshipCard}
              initial={reduced ? undefined : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Relationship A &middot; Indentation</span>
                <span className={styles.cardFormula}>Spaces = n - i</span>
              </div>
              <div className={styles.cardTitle}>Leading Spaces Decrease by One</div>
              <p className={styles.cardBody}>
                Row 1 begins with <code>n - 1</code> spaces, pulling the single apex star to the center.
                Every successive row loses 1 leading space, shifting the start of the star group 1 position to the left.
              </p>
            </motion.div>

            {/* Relationship B */}
            <motion.div
              className={styles.relationshipCard}
              initial={reduced ? undefined : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Relationship B &middot; Star Count</span>
                <span className={styles.cardFormula}>Stars = 2i - 1</span>
              </div>
              <div className={styles.cardTitle}>Stars Increase by Two (Odd Numbers)</div>
              <p className={styles.cardBody}>
                Because each row starts 1 space earlier, it needs 1 additional star on the left plus 1 additional star on the right
                (a total of +2 stars per row) to balance around the central vertical axis: 1, 3, 5, 7, 9&hellip;
              </p>
            </motion.div>

            {/* Dynamic Symmetry Table */}
            <div className={styles.tableContainer}>
              <div className={styles.tableTitle}>
                Dynamic Row Breakdown (n = {rowCount})
              </div>
              <table className={styles.symmetryTable}>
                <thead>
                  <tr>
                    <th>Row i</th>
                    <th>Leading Spaces (n - i)</th>
                    <th>Stars (2i - 1)</th>
                    <th>Visual Width</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const isActive = r.rowNum === safeRow;
                    return (
                      <tr
                        key={r.rowNum}
                        className={`${styles.tableRowInteractive} ${isActive ? styles.tableRowActive : ''}`}
                        onClick={() => onSelectRow(r.rowNum)}
                      >
                        <td>Row {r.rowNum}</td>
                        <td>{r.spaces}</td>
                        <td>{r.stars}</td>
                        <td>{r.spaces + r.stars} chars</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
              <span className={styles.visualCardLabel}>Row-by-Row Symmetry Inspector</span>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                Selected: Row {currentRowData.rowNum}
              </span>
            </div>

            <div className={styles.visualRowsList}>
              {/* Vertical Center Axis Guide */}
              <div className={styles.verticalAxisLine} aria-hidden="true" title="Vertical Symmetry Axis" />

              {rows.map((r) => {
                const isSelected = safeRow === r.rowNum;
                return (
                  <div
                    key={r.rowNum}
                    className={`${styles.visualRowItem} ${isSelected ? styles.visualRowItemActive : ''}`}
                    onClick={() => onSelectRow(r.rowNum)}
                  >
                    <span className={styles.visualRowNumber}>Row {r.rowNum}</span>
                    <div className={styles.rowVisualComposition}>
                      <div className={styles.pyramidRowGrid}>
                        {Array.from({ length: r.spaces }).map((_, idx) => (
                          <span key={`sp-${idx}`} className={styles.charSlotSpace} title="Leading Space">
                            &middot;
                          </span>
                        ))}
                        {Array.from({ length: r.stars }).map((_, idx) => (
                          <span key={`st-${idx}`} className={styles.charSlotStar} title="Star">
                            *
                          </span>
                        ))}
                        {Array.from({ length: r.spaces }).map((_, idx) => (
                          <span key={`gh-${idx}`} className={styles.charSlotGhost} aria-hidden="true">
                            &middot;
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={styles.measurementTag}>
                      {r.spaces} sp + {r.stars} st
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Row Detail Breakdown */}
            <div className={styles.rowDetailBreakdown}>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Outer Loop Counter</span>
                <span className={styles.breakdownVal}>i = {currentRowData.rowNum} of {rowCount}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Leading Spaces (Loop 1)</span>
                <span className={styles.breakdownVal}>
                  n - i = {rowCount} - {currentRowData.rowNum} &rarr; {currentRowData.spaces} {currentRowData.spaces === 1 ? 'space' : 'spaces'}
                </span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Asterisks (Loop 2)</span>
                <span className={styles.breakdownVal}>
                  2i - 1 = 2({currentRowData.rowNum}) - 1 &rarr; {currentRowData.stars} {currentRowData.stars === 1 ? 'star' : 'stars'}
                </span>
              </div>
              <div className={styles.breakdownRow} style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem' }}>
                <span className={styles.breakdownLabel}>Row Centering Reason</span>
                <span className={styles.breakdownVal} style={{ color: '#2563eb' }}>
                  Balanced around center axis
                </span>
              </div>
            </div>

            <div className={styles.measurementCallout}>
              <Sparkles size={18} className={styles.measurementIcon} />
              <div className={styles.measurementText}>
                <strong>Symmetry Invariant:</strong> In row {currentRowData.rowNum}, there are exactly {currentRowData.spaces} spaces before the stars.
                The middle star (star #{Math.ceil(currentRowData.stars / 2)}) aligns perfectly on column {rowCount}, exactly below the apex star!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
