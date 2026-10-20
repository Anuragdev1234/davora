import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { useReducedMotion } from '../../hooks/useMotion';
import { PROGRAM_COMPONENTS, PROGRAM_LINES } from '../../data/structureLessonData';
import styles from './StructureHero.module.css';

interface StructureHeroProps {
  onExploreClick: () => void;
}

export function StructureHero({ onExploreClick }: StructureHeroProps) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  // Active preview component index inside the hero card (defaults to index 2: Variable Declarations matching the reference)
  const [previewIndex, setPreviewIndex] = useState<number>(2);

  const activeComp = PROGRAM_COMPONENTS[previewIndex] || PROGRAM_COMPONENTS[2];

  const handleNextPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewIndex((prev) => (prev + 1) % PROGRAM_COMPONENTS.length);
  };

  const handleLineClick = (lineNum: number) => {
    const compIdx = PROGRAM_COMPONENTS.findIndex((c) => c.highlightLines.includes(lineNum));
    if (compIdx !== -1) {
      setPreviewIndex(compIdx);
    }
  };

  return (
    <section className={styles.heroWrapper} aria-label="Lesson Hero: Structure of a C Program">
      {/* Editorial Sculptural Terrain Backdrop Texture */}
      <div className={styles.duneBackdrop} aria-hidden="true">
        <img
          src="/images/structure_editorial_terrain.jpg"
          alt=""
          className={styles.duneImage}
          loading="eager"
        />
        <div className={styles.duneOverlayGradient} />
      </div>

      <div className={styles.heroContainer}>
        {/* Breadcrumb & Section Indicator */}
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            <button
              type="button"
              className={styles.breadcrumbLink}
              onClick={() => navigate('/theory')}
            >
              C Basics
            </button>
            <ChevronRight size={14} className={styles.crumbArrow} aria-hidden="true" />
            <span className={styles.breadcrumbCurrent}>Program Structure</span>
          </div>
          <div className={styles.stepBadge}>01 / 06</div>
        </div>

        {/* Hero Responsive Grid */}
        <div className={styles.heroGrid}>
          {/* Left Column: Intentional Three-Line Editorial Headline & Actions */}
          <div className={styles.editorialCol}>
            <motion.h1
              className={styles.heroTitle}
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.titleLine}>Structure</span>
              <span className={styles.titleLine}>of a</span>
              <span className={styles.titleLine}>C&nbsp;Program</span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              A C program is a collection of well-defined parts, each with a specific role. Click
              each part to understand how they work together.
            </motion.p>

            <motion.div
              className={styles.ctaGroup}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                className={styles.exploreBtn}
                onClick={onExploreClick}
                aria-label="Explore the Program and scroll to interactive building blocks"
              >
                <span>Explore the Program</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <div
                className={styles.scrollHint}
                onClick={onExploreClick}
                role="button"
                tabIndex={0}
                aria-label="Scroll to explore"
              >
                <div className={styles.scrollIndicator}>
                  <div className={styles.scrollDot} />
                </div>
                <span>Scroll to explore</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Code Stage & Contextual Callout Side-by-Side (No Overlap) */}
          <motion.div
            className={styles.visualCol}
            initial={reduced ? undefined : { opacity: 0, scale: 0.98, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.previewStage}>
              {/* Code Editor Window Card */}
              <div className={styles.codeCard}>
                {/* Traffic lights */}
                <div className={styles.windowHeader}>
                  <div className={styles.trafficLights}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotAmber} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span className={styles.fileName}>main.c</span>
                </div>

                {/* Code Lines */}
                <div className={styles.codeArea}>
                  {PROGRAM_LINES.map((line) => {
                    const isHighlighted = activeComp.highlightLines.includes(line.lineNum);
                    return (
                      <div
                        key={line.lineNum}
                        className={`${styles.codeLineRow} ${
                          isHighlighted ? styles.codeLineActive : ''
                        }`}
                        onClick={() => handleLineClick(line.lineNum)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Line ${line.lineNum}: ${line.code || 'blank line'}`}
                      >
                        <span className={styles.lineNum}>{line.lineNum}</span>
                        <code className={styles.codeContent}>
                          {line.code || '\u00A0'}
                        </code>
                        {line.badgeIndex && (
                          <span
                            className={`${styles.lineBadge} ${
                              isHighlighted ? styles.lineBadgeActive : ''
                            }`}
                          >
                            {line.badgeIndex}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Connecting Indicator Line */}
              <div className={styles.connectorWrapper} aria-hidden="true">
                <svg className={styles.connectorSvg} viewBox="0 0 60 40" fill="none">
                  <path
                    d="M 4 20 C 26 20, 34 20, 56 20"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle cx="4" cy="20" r="3" fill="#2563EB" />
                  <circle cx="56" cy="20" r="3" fill="#2563EB" />
                </svg>
              </div>

              {/* Contextual Explanation Card (Cleanly Beside Code Card) */}
              <div className={styles.calloutCol}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeComp.id}
                    className={styles.calloutCard}
                    initial={reduced ? undefined : { opacity: 0, y: 8 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.calloutHeader}>
                      <span className={styles.calloutCounter}>
                        {previewIndex + 1} / {PROGRAM_COMPONENTS.length}
                      </span>
                      <span className={styles.calloutTag}>{activeComp.badge}</span>
                    </div>

                    <h3 className={styles.calloutTitle}>{activeComp.title}</h3>
                    <p className={styles.calloutDesc}>{activeComp.shortRole}</p>

                    <div className={styles.calloutFooter}>
                      <button
                        type="button"
                        className={styles.calloutNextBtn}
                        onClick={handleNextPreview}
                        aria-label="Next preview component"
                      >
                        <span>Next</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>

                      <div className={styles.calloutDots}>
                        {PROGRAM_COMPONENTS.map((_, idx) => (
                          <span
                            key={idx}
                            className={`${styles.dot} ${
                              idx === previewIndex ? styles.dotActive : ''
                            }`}
                            onClick={() => setPreviewIndex(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StructureHero;
