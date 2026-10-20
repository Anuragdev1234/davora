import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './LeftHalfPyramidHero.module.css';

export function LeftHalfPyramidHero() {
  const reduced = useReducedMotion();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  // 5 rows for Left Half Pyramid (n = 5):
  // Row i has (n - i) spaces, and i stars:
  // Row 1: 4 spaces, 1 star
  // Row 2: 3 spaces, 2 stars
  // Row 3: 2 spaces, 3 stars
  // Row 4: 1 space,  4 stars
  // Row 5: 0 spaces, 5 stars
  const defaultRows = [
    { rowNum: 1, spaces: 4, stars: 1 },
    { rowNum: 2, spaces: 3, stars: 2 },
    { rowNum: 3, spaces: 2, stars: 3 },
    { rowNum: 4, spaces: 1, stars: 4 },
    { rowNum: 5, spaces: 0, stars: 5 },
  ];

  const activeRowData = defaultRows.find((r) => r.rowNum === activeRow);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Left Half Pyramid Lesson Hero">
      <div className={styles.container}>
        {/* Left Column: Editorial & Problem Context */}
        <div className={styles.leftColumn}>
          <motion.div
            className={styles.breadcrumb}
            initial={reduced ? undefined : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.breadcrumbDash} />
            <span>DEVORA / PROGRAMS / PATTERN PROGRAMS</span>
          </motion.div>

          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className={styles.eyebrowDot} />
            <span>PATTERN PROGRAMS · 03</span>
          </motion.div>

          <motion.h1
            className={styles.heroHeading}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Left Half Pyramid
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Discover how a simple combination of spaces and stars creates a structured
            pattern—and how nested loops bring that pattern to life.
          </motion.p>

          <motion.p
            className={styles.heroSecondaryText}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Every new row moves the stars one step to the left while increasing their count by one.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className={styles.ctaGroup}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            <button
              type="button"
              className={styles.primaryCta}
              onClick={() => scrollToSection('think-like-human')}
            >
              <span>Explore the Logic</span>
              <ArrowDown size={15} />
            </button>

            <button
              type="button"
              className={styles.secondaryCta}
              onClick={() => scrollToSection('compare-patterns')}
            >
              <Layers size={15} />
              <span>Compare Patterns</span>
            </button>
          </motion.div>

          <motion.div
            className={styles.badgeStrip}
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.26 }}
          >
            <span className={styles.badge}>LEFT HALF PYRAMID</span>
            <span className={`${styles.badge} ${styles.badgeHighlight}`}>DUAL INNER LOOPS</span>
            <span className={styles.badge}>RIGHT-ALIGNED</span>
            <span className={styles.badge}>TIME: O(N²)</span>
          </motion.div>
        </div>

        {/* Right Column: Interactive Real Star Pattern Visualization */}
        <motion.div
          className={styles.rightStage}
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.stageHeader}>
            <span className={styles.stageLabel}>Visual Pattern · 5 Rows (Right-Aligned)</span>
            <span className={styles.interactiveHint}>Click any row to inspect</span>
          </div>

          <div className={styles.patternCanvas} role="region" aria-label="5-Row Left Half Star Pattern">
            {defaultRows.map((row, idx) => {
              const isSelected = activeRow === row.rowNum;
              return (
                <motion.div
                  key={row.rowNum}
                  className={`${styles.starRow} ${isSelected ? styles.starRowActive : ''}`}
                  onClick={() => setActiveRow(isSelected ? null : row.rowNum)}
                  initial={reduced ? undefined : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
                >
                  <span className={styles.rowIndex}>Row {row.rowNum}</span>

                  <div className={styles.pyramidVisualRow}>
                    {/* Leading space units */}
                    <div className={styles.spacesGroup}>
                      {Array.from({ length: row.spaces }).map((_, sIdx) => (
                        <span key={sIdx} className={styles.spaceUnit} title="Leading space unit">
                          <span className={styles.spaceDot} />
                        </span>
                      ))}
                    </div>

                    {/* Star symbols */}
                    <div className={styles.starsGroup}>
                      {Array.from({ length: row.stars }).map((_, starIdx) => (
                        <span key={starIdx} className={styles.starChar}>
                          *
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.metaPillsGroup}>
                    <span className={styles.spacePill}>
                      {row.spaces} {row.spaces === 1 ? 'sp' : 'sp'}
                    </span>
                    <span className={styles.starPill}>
                      {row.stars} {row.stars === 1 ? 'star' : 'stars'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Measuring Indicators */}
          <div className={styles.indicatorsStrip}>
            <div className={styles.indicatorItem}>
              <span className={styles.indicatorDotSpace} />
              <span>Decreasing Indentation (n − i)</span>
            </div>
            <div className={styles.indicatorItem}>
              <span className={styles.indicatorDotStar} />
              <span>Increasing Stars (i)</span>
            </div>
          </div>

          {/* Connected Callout Annotation */}
          <div className={styles.annotationBox}>
            <svg
              className={styles.annotationConnector}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 4 4 L 4 14 L 18 14"
                stroke="#2563eb"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="14" r="2.5" fill="#2563eb" />
            </svg>

            <div className={styles.annotationText}>
              <span className={styles.annotationTitle}>The Hidden Rule</span>
              <span className={styles.annotationDesc}>
                {activeRowData
                  ? `Row ${activeRowData.rowNum}: n − i = 5 − ${activeRowData.rowNum} = ${activeRowData.spaces} leading space units, followed by ${activeRowData.stars} ${activeRowData.stars === 1 ? 'star' : 'stars'}.`
                  : '“Fewer leading spaces. More stars.” Every new row requires one less space unit (n − i) and prints one additional star (i).'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
