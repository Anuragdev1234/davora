import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Keyboard, X } from 'lucide-react';
import { COMMON_IO_FUNCTIONS, type CommonIoFunction } from '../../data/inputOutputLessonData';
import styles from './CommonIoFunctionsSection.module.css';

interface CommonIoFunctionsSectionProps {
  onFunctionSelect?: (funcId: string) => void;
}

export function CommonIoFunctionsSection({ onFunctionSelect }: CommonIoFunctionsSectionProps) {
  const [activeFuncId, setActiveFuncId] = useState<string | null>('printf');

  const activeFunction = COMMON_IO_FUNCTIONS.find((f) => f.id === activeFuncId);

  const handleCardClick = (func: CommonIoFunction) => {
    setActiveFuncId((prev) => (prev === func.id ? null : func.id));
    if (onFunctionSelect) {
      onFunctionSelect(func.id);
    }
  };

  const getIcon = (type: CommonIoFunction['iconType'], color: string) => {
    switch (type) {
      case 'keyboard':
        return <Keyboard size={14} color={color} />;
      case 'monitor':
      default:
        return <Monitor size={14} color={color} />;
    }
  };

  return (
    <section className={styles.section} id="common-io-functions">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Common I/O Functions in C</h2>
          <p className={styles.sectionSubtitle}>
            Standard library primitives declared in <code>&lt;stdio.h&gt;</code> for formatted, character-level, and line-buffered I/O.
          </p>
        </div>

        {/* 5-Card Aligned Grid */}
        <div className={styles.cardsGrid}>
          {COMMON_IO_FUNCTIONS.map((func) => {
            const isActive = activeFuncId === func.id;

            return (
              <div
                key={func.id}
                className={`${styles.ioCard} ${isActive ? styles.ioCardActive : ''}`}
                style={{
                  color: func.badgeColor,
                }}
                onClick={() => handleCardClick(func)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
              >
                <div>
                  <div className={styles.cardTopRow}>
                    <div className={styles.numberAndTitle}>
                      <span
                        className={styles.numberBadge}
                        style={{
                          backgroundColor: func.accentBg,
                          color: func.badgeColor,
                        }}
                      >
                        {func.number}
                      </span>
                      <span className={styles.functionName}>{func.name}</span>
                    </div>

                    <div
                      className={styles.cardIcon}
                      style={{ backgroundColor: func.accentBg }}
                    >
                      {getIcon(func.iconType, func.badgeColor)}
                    </div>
                  </div>

                  <p className={styles.cardDescription}>{func.description}</p>

                  {/* Dark Code Block */}
                  <div className={styles.codeSnippetBox}>
                    {func.codeSnippet}
                  </div>
                </div>

                {/* Output / User Input Simulation */}
                <div className={styles.outputSection}>
                  <div className={styles.outputLabel}>
                    {func.inputExample ? 'User Input:' : 'Output:'}
                  </div>
                  <div className={styles.outputBox}>
                    {func.inputExample ? (
                      <>
                        <span style={{ color: '#94a3b8' }}>{func.inputExample}</span>
                        {'\n'}
                        <span className={styles.outputHighlightVal}>{func.outputExample}</span>
                      </>
                    ) : (
                      <span className={styles.outputHighlightVal}>{func.outputExample}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Detail Drawer */}
        <AnimatePresence>
          {activeFunction && (
            <motion.div
              className={styles.detailDrawer}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.drawerTitleGroup}>
                  <span
                    className={styles.drawerCategoryPill}
                    style={{
                      backgroundColor: activeFunction.accentBg,
                      color: activeFunction.badgeColor,
                    }}
                  >
                    {activeFunction.categoryLabel}
                  </span>
                  <h3 className={styles.drawerTitle}>{activeFunction.name} In Detail</h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveFuncId(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b',
                    padding: 4,
                  }}
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={styles.drawerGrid}>
                <div>
                  <div className={styles.prototypeBox}>
                    <code>{activeFunction.details.header}</code>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                    {activeFunction.explanation}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Key Considerations
                  </h4>
                  <ul className={styles.drawerPointsList}>
                    {activeFunction.details.keyPoints.map((pt, i) => (
                      <li key={i} className={styles.drawerPointItem}>
                        <span
                          className={styles.bulletDot}
                          style={{ color: activeFunction.badgeColor }}
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
