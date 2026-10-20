import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import type { ProgramCategory, ProgramItem } from '../../data/programs';
import styles from './CategoryAccordion.module.css';

interface CategoryAccordionProps {
  category: ProgramCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectProgram: (program: ProgramItem) => void;
  displayPrograms?: ProgramItem[];
}

export function CategoryAccordion({
  category,
  isExpanded,
  onToggle,
  onSelectProgram,
  displayPrograms,
}: CategoryAccordionProps) {
  const reduced = useReducedMotion();
  const programsToRender = displayPrograms ?? category.programs;
  const count = category.programs.length;

  const padZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <div
      className={`${styles.categoryCard} ${isExpanded ? styles.categoryCardExpanded : ''}`}
      id={`category-${category.slug}`}
    >
      {/* Accordion Header */}
      <button
        type="button"
        className={styles.accordionHeader}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`content-${category.slug}`}
      >
        <div className={styles.headerLeft}>
          <div className={styles.indexBadge}>{padZero(category.index)}</div>

          <div className={styles.titleArea}>
            <span className={styles.categoryTitle}>{category.title}</span>
            <span className={styles.categoryDesc}>{category.description}</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <span className={styles.categoryMeta}>
            {count} {count === 1 ? 'program' : 'programs'} · {category.difficulty}
          </span>
          <div
            className={`${styles.chevronWrapper} ${
              isExpanded ? styles.chevronExpanded : ''
            }`}
          >
            <ChevronDown size={18} />
          </div>
        </div>
      </button>

      {/* Accordion Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`content-${category.slug}`}
            className={styles.expandedBody}
            initial={reduced ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className={styles.programRowsList} role="list">
              {programsToRender.map((prog) => {
                const diffClass =
                  prog.difficulty === 'Beginner'
                    ? styles.diffBeginner
                    : prog.difficulty === 'Intermediate'
                    ? styles.diffIntermediate
                    : styles.diffAdvanced;

                return (
                  <li
                    key={prog.id}
                    className={styles.programRow}
                    onClick={() => onSelectProgram(prog)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProgram(prog);
                      }
                    }}
                    aria-label={`View program: ${prog.title}`}
                  >
                    <div className={styles.rowMain}>
                      <span className={styles.rowNumber}>
                        {padZero(prog.indexInCategory)}
                      </span>
                      <span className={styles.rowTitle}>{prog.title}</span>
                      <span className={styles.rowPipe} aria-hidden="true">
                        |
                      </span>
                      <span className={styles.rowDescription}>
                        {prog.description}
                      </span>
                    </div>

                    <div className={styles.rowRight}>
                      <span className={`${styles.diffBadge} ${diffClass}`}>
                        {prog.difficulty}
                      </span>
                      <button
                        type="button"
                        className={styles.viewAction}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProgram(prog);
                        }}
                      >
                        <span>View Program</span>
                        <ArrowRight size={13} className={styles.arrowIcon} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
