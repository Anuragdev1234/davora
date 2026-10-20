import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Terminal, Clock, Play, BookOpen } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import type { LessonItem } from '../../data/curriculumData';
import styles from './LessonDetailModal.module.css';

interface LessonDetailModalProps {
  lesson: LessonItem | null;
  onClose: () => void;
}

export function LessonDetailModal({ lesson, onClose }: LessonDetailModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (lesson) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lesson, onClose]);

  if (!lesson) return null;

  const handleLaunchPlayground = () => {
    onClose();
    navigate('/#experiment');
  };

  const handleOpenLesson = () => {
    onClose();
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
    }
  };

  return (
    <AnimatePresence>
      <div className={styles.modalBackdrop} onClick={onClose} role="presentation">
        <motion.div
          className={styles.modalCard}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-modal-title"
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <div>
              <div className={styles.lessonMetaRow}>
                <span className={styles.lessonNumberBadge}>Lesson {lesson.number}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>•</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {lesson.difficulty}
                </span>
              </div>
              <h2 id="lesson-modal-title" className={styles.modalTitle}>
                {lesson.title}
              </h2>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className={styles.modalBody}>
            <p className={styles.lessonOverview}>{lesson.description}</p>

            {/* Key Takeaways */}
            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <div>
                <div className={styles.sectionHeading}>Core Architectural Principles</div>
                <ul className={styles.takeawaysList}>
                  {lesson.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className={styles.takeawayItem}>
                      <span className={styles.takeawayDot} aria-hidden="true" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Snippet if available */}
            {lesson.snippet && (
              <div className={styles.codeBox}>
                <div className={styles.codeBoxHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code2 size={13} aria-hidden="true" />
                    <span>C Source Reference</span>
                  </div>
                  <span>ISO C11 / C23</span>
                </div>
                <pre className={styles.codeContent}>
                  <code>{lesson.snippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.modalFooter}>
            <div className={styles.metaTags}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} aria-hidden="true" />
                <span>{lesson.duration} estimated</span>
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Terminal size={13} aria-hidden="true" />
                <span>Standard library</span>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {(lesson.id === 'intro-c' || lesson.id === 'how-c-works' || lesson.slug.includes('introduction-to-c') || lesson.slug.includes('how-a-c-program-works')) && (
                <button
                  type="button"
                  className={styles.tryInPlaygroundBtn}
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#121412',
                    borderColor: 'var(--color-accent)',
                  }}
                  onClick={handleOpenLesson}
                >
                  <BookOpen size={12} aria-hidden="true" />
                  <span>Open Full Lesson</span>
                </button>
              )}

              <button
                type="button"
                className={styles.tryInPlaygroundBtn}
                onClick={handleLaunchPlayground}
              >
                <Play size={12} fill="currentColor" aria-hidden="true" />
                <span>Try in Playground</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default LessonDetailModal;
