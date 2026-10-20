import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { PRACTICE_QUIZ } from '../../data/structureLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './StructureQuiz.module.css';

interface StructureQuizProps {
  onQuizCompleted?: () => void;
}

export function StructureQuiz({ onQuizCompleted }: StructureQuizProps) {
  const reduced = useReducedMotion();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const selectedOption = PRACTICE_QUIZ.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelect = (id: string) => {
    if (!hasSubmitted) {
      setSelectedOptionId(id);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionId) {
      setHasSubmitted(true);
      if (selectedOption?.isCorrect && onQuizCompleted) {
        onQuizCompleted();
      }
    }
  };

  const handleRetry = () => {
    setHasSubmitted(false);
    setSelectedOptionId(null);
  };

  return (
    <section id="practice-quiz" className={styles.sectionWrapper} aria-labelledby="quiz-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>06</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>PRACTICE QUIZ</span>
          </div>

          <h2 id="quiz-heading" className={styles.mainHeading}>
            Quick Check.
          </h2>

          <p className={styles.subHeading}>
            Test your understanding &bull; Solidify your knowledge of declarations, statements, and
            syntax roles.
          </p>
        </div>

        {/* Quiz Card */}
        <div className={styles.quizCard}>
          <div className={styles.questionText}>{PRACTICE_QUIZ.question}</div>

          {/* Options List */}
          <div className={styles.optionsList} role="radiogroup" aria-label="Quiz choices">
            {PRACTICE_QUIZ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isThisCorrect = option.isCorrect;

              let optionStyle = styles.optionItem;
              if (isSelected) {
                optionStyle = `${styles.optionItem} ${styles.optionSelected}`;
              }
              if (hasSubmitted) {
                if (isSelected && isThisCorrect) {
                  optionStyle = `${styles.optionItem} ${styles.optionSuccess}`;
                } else if (isSelected && !isThisCorrect) {
                  optionStyle = `${styles.optionItem} ${styles.optionError}`;
                } else if (!isSelected && isThisCorrect) {
                  optionStyle = `${styles.optionItem} ${styles.optionHighlightCorrect}`;
                }
              }

              return (
                <div
                  key={option.id}
                  className={optionStyle}
                  onClick={() => handleSelect(option.id)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(option.id);
                    }
                  }}
                >
                  <div className={styles.radioRing}>
                    {isSelected && <span className={styles.radioDot} />}
                  </div>

                  <code className={styles.optionCode}>{option.text}</code>
                </div>
              );
            })}
          </div>

          {/* Feedback Area */}
          <AnimatePresence>
            {hasSubmitted && selectedOption && (
              <motion.div
                className={`${styles.feedbackBanner} ${
                  isCorrect ? styles.feedbackSuccess : styles.feedbackError
                }`}
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.feedbackIconCol}>
                  {isCorrect ? (
                    <CheckCircle2 size={20} className={styles.feedbackIconSuccess} aria-hidden="true" />
                  ) : (
                    <AlertCircle size={20} className={styles.feedbackIconError} aria-hidden="true" />
                  )}
                </div>

                <div className={styles.feedbackTextCol}>
                  <h4 className={styles.feedbackTitle}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </h4>
                  <p className={styles.feedbackDesc}>{selectedOption.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Controls */}
          <div className={styles.quizFooter}>
            {!hasSubmitted ? (
              <button
                type="button"
                className={styles.checkBtn}
                onClick={handleSubmit}
                disabled={!selectedOptionId}
                aria-label="Check your answer"
              >
                <span>Check Answer</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className={styles.retryBtn}
                onClick={handleRetry}
                aria-label="Try quiz again"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Try Again</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StructureQuiz;
