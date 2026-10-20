import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import {
  curriculumCategories,
  type CurriculumCategory,
  type LessonItem,
} from '../../data/curriculumData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './CurriculumAccordion.module.css';

interface CurriculumAccordionProps {
  onSelectLesson?: (lesson: LessonItem) => void;
}

export function CurriculumAccordion({ onSelectLesson }: CurriculumAccordionProps) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  // Category 01 Basics is expanded by default to match the approved visual direction
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>('basics');

  const handleLessonClick = (lesson: LessonItem) => {
    if (lesson.id === 'intro-c' || lesson.slug.includes('introduction-to-c')) {
      navigate('/theory/introduction-to-c');
    } else if (lesson.id === 'how-c-works' || lesson.slug.includes('how-a-c-program-works')) {
      navigate('/theory/how-a-c-program-works');
    } else if (lesson.id === 'structure-c' || lesson.slug.includes('structure-of-a-c-program')) {
      navigate('/theory/structure-of-a-c-program');
    } else if (lesson.id === 'tokens-keywords' || lesson.slug.includes('tokens-keywords')) {
      navigate('/theory/basics/tokens-keywords-identifiers');
    } else if (lesson.id === 'variables-datatypes' || lesson.slug.includes('variables-and-data-types')) {
      navigate('/theory/basics/variables-and-data-types');
    } else if (lesson.id === 'operators' || lesson.slug.includes('operators-in-c') || lesson.slug.includes('operators')) {
      navigate('/theory/basics/operators-in-c');
    } else if (lesson.id === 'input-output' || lesson.slug.includes('input-and-output') || lesson.slug.includes('input-output')) {
      navigate('/theory/basics/input-and-output');
    } else if (lesson.id === 'conditional-statements' || lesson.slug.includes('conditional-statements') || lesson.slug.includes('conditionals')) {
      navigate('/theory/basics/conditional-statements');
    } else if (lesson.id === 'loops' || lesson.slug.includes('loops-in-c') || lesson.slug.includes('loops')) {
      navigate('/theory/basics/loops-in-c');
    } else if (lesson.id === 'functions' || lesson.slug.includes('functions')) {
      navigate('/theory/basics/functions');
    } else if (lesson.id === 'recursion' || lesson.slug.includes('recursion')) {
      navigate('/theory/basics/recursion');
    } else if (onSelectLesson) {
      onSelectLesson(lesson);
    }
  };

  const toggleCategory = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const getDifficultyClass = (diff: LessonItem['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return styles.difficultyBeginner;
      case 'Intermediate':
        return styles.difficultyIntermediate;
      case 'Advanced':
        return styles.difficultyAdvanced;
      default:
        return '';
    }
  };

  return (
    <div
      className={styles.accordionContainer}
      role="region"
      aria-label="C Programming Interactive Curriculum"
    >
      {curriculumCategories.map((category: CurriculumCategory) => {
        const isExpanded = expandedCategoryId === category.id;
        const panelId = `panel-${category.id}`;
        const headerId = `header-${category.id}`;

        return (
          <div
            key={category.id}
            className={`${styles.categoryBlock} ${isExpanded ? styles.categoryBlockExpanded : ''}`}
          >
            {/* Category Accordion Header */}
            <button
              id={headerId}
              type="button"
              className={styles.categoryHeaderBtn}
              onClick={() => toggleCategory(category.id)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
            >
              {/* Category Number */}
              <span className={styles.catNumber}>{category.number}</span>

              {/* Title */}
              <span className={styles.catTitle}>{category.title}</span>

              {/* Description */}
              <span className={styles.catDescription}>{category.description}</span>

              {/* Lesson Count & Learning Level */}
              <div className={styles.catMeta}>
                <span>{category.lessonCountText}</span>
                <span className={styles.metaDot}>·</span>
                <span>{category.level}</span>
              </div>

              {/* Chevron Indicator */}
              <ChevronDown
                size={18}
                className={`${styles.chevronIcon} ${isExpanded ? styles.chevronExpanded : ''}`}
                aria-hidden="true"
              />
            </button>

            {/* Expanded Lesson Table */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={styles.lessonListContainer}
                  initial={reduced ? undefined : { height: 0, opacity: 0 }}
                  animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ul className={styles.lessonList}>
                    {category.lessons.map((lesson: LessonItem, index: number) => (
                      <motion.li
                        key={lesson.id}
                        className={styles.lessonRow}
                        initial={reduced ? undefined : { opacity: 0, y: 6 }}
                        animate={reduced ? undefined : { opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: reduced ? 0 : index * 0.02,
                        }}
                      >
                        <button
                          type="button"
                          className={styles.lessonRowBtn}
                          onClick={() => handleLessonClick(lesson)}
                          aria-label={`Lesson ${lesson.number}: ${lesson.title}. ${lesson.description}. Difficulty: ${lesson.difficulty}. Duration: ${lesson.duration}.`}
                        >
                          {/* Lesson Number */}
                          <span className={styles.lessonIndex}>{lesson.number}</span>

                          {/* Lesson Title */}
                          <span className={styles.lessonTitle}>{lesson.title}</span>

                          {/* Pipe Separator */}
                          <span className={styles.pipeDivider} aria-hidden="true">
                            |
                          </span>

                          {/* Short Description */}
                          <span className={styles.lessonDesc}>{lesson.description}</span>

                          {/* Difficulty Badge */}
                          <span
                            className={`${styles.difficultyBadge} ${getDifficultyClass(
                              lesson.difficulty
                            )}`}
                          >
                            {lesson.difficulty}
                          </span>

                          {/* Duration with Clock icon */}
                          <span className={styles.durationWrapper}>
                            <Clock size={12} aria-hidden="true" />
                            <span>{lesson.duration}</span>
                          </span>

                          {/* Trailing Navigation Arrow */}
                          <ArrowRight size={15} className={styles.rowArrow} aria-hidden="true" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default CurriculumAccordion;
