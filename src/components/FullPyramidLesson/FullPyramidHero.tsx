import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './FullPyramidHero.module.css';

export function FullPyramidHero() {
  const reduced = useReducedMotion();
  const [selectedRow, setSelectedRow] = useState<number>(3);

  // 5 rows representation for Full Pyramid
  // Row i: spaces = 5 - i, stars = 2 * i - 1
  const rows = [
    { rowNum: 1, spaces: 4, stars: 1 },
    { rowNum: 2, spaces: 3, stars: 3 },
    { rowNum: 3, spaces: 2, stars: 5 },
    { rowNum: 4, spaces: 1, stars: 7 },
    { rowNum: 5, spaces: 0, stars: 9 },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={styles.heroSection} aria-label="Lesson Hero: Full Pyramid">
      <div className={styles.heroContainer}>
        {/* Left Editorial Introduction */}
        <motion.div
          className={styles.leftContent}
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.breadcrumb}>DEVORA / PROGRAMS / PATTERN PROGRAMS</div>

          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Pattern Programs &middot; 04</span>
          </div>

          <h1 className={styles.headline}>Full Pyramid</h1>

          <p className={styles.supportingText}>
            Discover how leading spaces and an increasing number of stars work together to create a perfectly centered pyramid.
          </p>

          <div className={styles.secondaryStatement}>
            &ldquo;One fewer leading space. Two more stars. Every new row.&rdquo;
          </div>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => scrollToSection('understand-problem')}
            >
              <span>Explore the Logic</span>
              <ArrowDown size={15} />
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => scrollToSection('pattern-comparison')}
            >
              <Layers size={15} />
              <span>Compare Patterns</span>
            </button>
          </div>

          <div className={styles.metaTagsStrip}>
            <span className={`${styles.metaTag} ${styles.metaTagAccent}`}>Full Pyramid</span>
            <span className={styles.metaTag}>Odd Progression (2i - 1)</span>
            <span className={styles.metaTag}>Center-Aligned</span>
            <span className={styles.metaTag}>Time: O(n&sup2;)</span>
          </div>
        </motion.div>

        {/* Right Dynamic Pyramid Visual Stage */}
        <motion.div
          className={styles.rightStage}
          initial={reduced ? undefined : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className={styles.stageHeader}>
            <span className={styles.stageTitle}>Symmetrical Pattern &middot; 5 Rows (Centered)</span>
            <span className={styles.stageHelp}>Click any row to inspect</span>
          </div>

          <div className={styles.pyramidBoard}>
            {/* Subtle Vertical Center-Axis Guide */}
            <div className={styles.centerAxisLine} aria-hidden="true" title="Vertical symmetry axis" />

            {rows.map((r) => {
              const isSelected = selectedRow === r.rowNum;
              return (
                <div
                  key={r.rowNum}
                  className={`${styles.pyramidRowLine} ${isSelected ? styles.pyramidRowLineActive : ''}`}
                  onClick={() => setSelectedRow(r.rowNum)}
                >
                  <span className={styles.rowLabel}>Row {r.rowNum}</span>
                  <div className={styles.rowGlyphs}>
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
                  <div className={styles.rowTags}>
                    <span className={styles.tagSpace}>{r.spaces} sp</span>
                    <span className={styles.tagStar}>{r.stars} {r.stars === 1 ? 'star' : 'stars'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicators Strip */}
          <div className={styles.indicatorsStrip}>
            <div className={styles.indicatorItem}>
              <span className={styles.dotSpace} />
              <span>Leading Spaces: Decrease by one (n - i)</span>
            </div>
            <div className={styles.indicatorItem}>
              <span className={styles.dotStar} />
              <span>Star Count: Increase by two (2i - 1)</span>
            </div>
          </div>

          {/* Responsive Connected Annotation Box */}
          <div className={styles.annotationBox}>
            <svg
              className={styles.annotationSvg}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 2 3 L 2 12 Q 2 15 5 15 L 16 15"
                stroke="#2563eb"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className={styles.annotationText}>
              <strong>The Symmetry Rule:</strong> By removing 1 space on the left and adding 2 stars (one on the left of the axis, one on the right), the apex stays centered on the vertical axis while the base expands symmetrically!
            </div>
          </div>

          {/* Compact Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Rows</span>
              <span className={styles.statValue}>5</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Stars</span>
              <span className={styles.statValue} style={{ color: '#2563eb' }}>25</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Base Row Width</span>
              <span className={styles.statValue}>9</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
