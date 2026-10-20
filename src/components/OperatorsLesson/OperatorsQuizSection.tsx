import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Trophy, Check } from 'lucide-react';
import { OPERATORS_QUIZ_QUESTIONS, type QuizQuestionItem } from '../../data/operatorsLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './OperatorsQuizSection.module.css';

interface OperatorsQuizSectionProps {
  onQuizCompleted?: () => void;
}

export function OperatorsQuizSection({ onQuizCompleted }: OperatorsQuizSectionProps) {
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQuestion: QuizQuestionItem = OPERATORS_QUIZ_QUESTIONS[currentIndex];
  const selectedOption = currentQuestion.options.find((opt) => opt.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    if (!hasSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = () => {
    if (!selectedOptionId || hasSubmitted) return;
    setHasSubmitted(true);
    if (selectedOption?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < OPERATORS_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    } else {
      setIsCompleted(true);
      if (onQuizCompleted) {
        onQuizCompleted();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  const progressPercent = ((currentIndex + (hasSubmitted ? 1 : 0)) / OPERATORS_QUIZ_QUESTIONS.length) * 100;

  return (
    <section id="section-quiz" className={styles.sectionWrapper} aria-labelledby="operators-quiz-heading">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>11</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>QUICK REVISION</span>
          </div>

          <h2 id="operators-quiz-heading" className={styles.mainHeading}>
            Quick Revision.
          </h2>

          <p className={styles.subHeading}>
            Solidify your mastery of precedence, associativity, boolean truth semantics, bitwise
            registers, and side effects.
          </p>
        </div>

        {/* Quiz Card */}
        <div className={styles.quizCard}>
          {!isCompleted ? (
            <div>
              {/* Top Meta Bar */}
              <div className={styles.quizTopBar}>
                <span className={styles.questionCategoryBadge}>{currentQuestion.category}</span>
                <span className={styles.questionCounter}>
                  Question {currentIndex + 1} of {OPERATORS_QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className={styles.questionText}>{currentQuestion.question}</h3>

              {/* Optional Code Snippet */}
              {currentQuestion.codeSnippet && (
                <pre className={styles.codeSnippetBlock}>
                  <code>{currentQuestion.codeSnippet}</code>
                </pre>
              )}

              {/* Options List */}
              <div className={styles.optionsStack} role="radiogroup" aria-label="Quiz options">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optionClass = styles.optionBtn;

                  if (hasSubmitted) {
                    if (opt.isCorrect) {
                      optionClass += ` ${styles.optionCorrect}`;
                    } else if (isSelected && !opt.isCorrect) {
                      optionClass += ` ${styles.optionIncorrect}`;
                    }
                  } else if (isSelected) {
                    optionClass += ` ${styles.optionSelected}`;
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={hasSubmitted}
                      className={optionClass}
                      onClick={() => handleSelectOption(opt.id)}
                    >
                      <div className={styles.optionRadioCircle}>
                        {hasSubmitted ? (
                          opt.isCorrect ? (
                            <Check size={12} color="#10a37f" strokeWidth={3} />
                          ) : isSelected ? (
                            <AlertCircle size={12} color="#ea580c" strokeWidth={3} />
                          ) : null
                        ) : isSelected ? (
                          <div className={styles.radioDot} />
                        ) : null}
                      </div>
                      <span className={styles.optionText}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {hasSubmitted && selectedOption && (
                  <motion.div
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`${styles.feedbackCard} ${
                      selectedOption.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
                    }`}
                  >
                    <div className={styles.feedbackTitle}>
                      {selectedOption.isCorrect ? (
                        <>
                          <CheckCircle2 size={18} />
                          <span>Accurate!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={18} />
                          <span>Review the concept:</span>
                        </>
                      )}
                    </div>
                    <p style={{ margin: 0 }}>{selectedOption.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className={styles.cardFooter}>
                {!hasSubmitted ? (
                  <button
                    type="button"
                    disabled={!selectedOptionId}
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                  >
                    <span>Check Answer</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.nextBtn}
                    onClick={handleNext}
                  >
                    <span>
                      {currentIndex < OPERATORS_QUIZ_QUESTIONS.length - 1
                        ? 'Next Question'
                        : 'View Results'}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className={styles.scoreSummaryCard}>
              <div className={styles.scoreIconWrap}>
                <Trophy size={28} />
              </div>
              <h3 className={styles.scoreTitle}>Revision Complete</h3>
              <p className={styles.scoreSub}>
                You have tested your understanding of C operators, precedence hierarchies, and evaluation semantics.
              </p>

              <div className={styles.scoreTally}>
                {score} / {OPERATORS_QUIZ_QUESTIONS.length}
              </div>

              <p style={{ color: '#686c62', fontSize: '0.92rem', marginBottom: '2rem' }}>
                {score === OPERATORS_QUIZ_QUESTIONS.length
                  ? 'Exemplary! You have complete command over operator binding and evaluation semantics.'
                  : score >= 4
                  ? 'Solid foundation. Revisit operator precedence and short-circuit evaluation for absolute precision.'
                  : 'Good review session. Re-read the precedence and associativity tables above to sharpen your skills.'}
              </p>

              <button
                type="button"
                className={styles.retryBtn}
                onClick={handleRestart}
              >
                <RotateCcw size={16} />
                <span>Retake Revision</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
