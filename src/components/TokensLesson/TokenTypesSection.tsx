import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Sparkles, Terminal } from 'lucide-react';
import { TOKEN_CATEGORIES, type TokenCategory } from '../../data/tokensLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './TokenTypesSection.module.css';

interface TokenTypesSectionProps {
  activeTypeId?: string;
  onSelectType?: (id: string) => void;
}

export function TokenTypesSection({
  activeTypeId: controlledActiveId,
  onSelectType,
}: TokenTypesSectionProps) {
  const reduced = useReducedMotion();
  const [internalActiveId, setInternalActiveId] = useState<string>('keywords');

  const currentActiveId = controlledActiveId || internalActiveId;
  const activeCategory =
    TOKEN_CATEGORIES.find((cat) => cat.id === currentActiveId) || TOKEN_CATEGORIES[0];

  const handleCardClick = (id: string) => {
    setInternalActiveId(id);
    if (onSelectType) {
      onSelectType(id);
    }
  };

  const getThemeClass = (theme: TokenCategory['themeColor'], isSelected: boolean) => {
    const base = styles[`cardTheme_${theme}`];
    const sel = isSelected ? styles[`cardSelected_${theme}`] : '';
    return `${base} ${sel}`;
  };

  return (
    <section id="token-types" className={styles.sectionWrapper} aria-labelledby="token-types-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.headerRow}>
          <div className={styles.headerText}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>01</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>LEXICAL TAXONOMY</span>
            </div>

            <h2 id="token-types-heading" className={styles.mainHeading}>
              Types of Tokens in C
            </h2>

            <p className={styles.subHeading}>
              Every character sequence in a C source file is analyzed and segmented into one of five
              lexical categories before compilation proceeds.
            </p>
          </div>

          <div className={styles.interactiveHint}>
            <MousePointerClick size={15} aria-hidden="true" />
            <span>Click each category to inspect syntax & semantics</span>
          </div>
        </div>

        {/* 5 Category Cards (Directly matching Infographic layout) */}
        <div className={styles.cardsGrid} role="tablist" aria-label="C Token Types">
          {TOKEN_CATEGORIES.map((category) => {
            const isSelected = category.id === currentActiveId;
            return (
              <div
                key={category.id}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                className={`${styles.categoryCard} ${getThemeClass(category.themeColor, isSelected)}`}
                onClick={() => handleCardClick(category.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(category.id);
                  }
                }}
              >
                <div className={styles.cardTop}>
                  <div className={`${styles.iconCircle} ${styles[`iconCircle_${category.themeColor}`]}`}>
                    {category.number}
                  </div>
                  <span className={styles.indexLabel}>{category.title}</span>
                </div>

                <h3 className={styles.cardTitle}>{category.title}</h3>
                <p className={styles.cardShortDesc}>{category.shortDesc}</p>

                <div className={styles.examplesSection}>
                  <span className={styles.examplesLabel}>Examples</span>
                  <div className={styles.pillsWrap}>
                    {category.examples.slice(0, 6).map((ex) => (
                      <span key={ex} className={styles.examplePill}>
                        {ex}
                      </span>
                    ))}
                    {category.examples.length > 6 && (
                      <span className={styles.examplePill}>+{category.examples.length - 6}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Deep Dive Detail Drawer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            className={styles.detailDrawer}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.drawerGrid}>
              {/* Left Column: Conceptual & Deep Dive Explanation */}
              <div className={styles.drawerLeft}>
                <div
                  className={styles.drawerBadge}
                  style={{
                    color:
                      activeCategory.themeColor === 'blue'
                        ? '#0055ff'
                        : activeCategory.themeColor === 'green'
                        ? '#10a37f'
                        : activeCategory.themeColor === 'amber'
                        ? '#d97706'
                        : activeCategory.themeColor === 'coral'
                        ? '#ea580c'
                        : '#7c3aed',
                  }}
                >
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Category {activeCategory.number} &bull; {activeCategory.title}</span>
                </div>

                <h3 className={styles.drawerTitle}>{activeCategory.title} in C</h3>
                <p className={styles.drawerFullDesc}>{activeCategory.detailedDesc}</p>

                <ul className={styles.deepDiveList}>
                  {activeCategory.deepDive.points.map((pt, idx) => (
                    <li key={idx} className={styles.deepDiveItem}>
                      <span className={styles.checkDot} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Code Example & Contextual Semantics */}
              <div className={styles.drawerRight}>
                <div className={styles.codeBox}>
                  <div className={styles.codeBoxHeader}>
                    <span>example.c &bull; {activeCategory.title} syntax</span>
                    <Terminal size={12} aria-hidden="true" />
                  </div>

                  <pre className={styles.codeSnippetPre}>
                    <code>{activeCategory.codeSnippet}</code>
                  </pre>
                </div>

                <div className={styles.codeExplanationCard}>
                  <p>
                    <strong>Compiler Interpretation:</strong> {activeCategory.codeExplanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
