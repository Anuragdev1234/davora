import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Trophy, Check } from 'lucide-react';
import { TOKENS_QUIZ_QUESTIONS, type QuizQuestionItem } from '../../data/tokensLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './TokensQuizSection.module.css';

interface TokensQuizSectionProps {
  onQuizCompleted?: () => void;
}

export function TokensQuizSection({ onQuizCompleted }: TokensQuizSectionProps) {
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQuestion: QuizQuestionItem = TOKENS_QUIZ_QUESTIONS[currentIndex];
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
    if (currentIndex < TOKENS_QUIZ_QUESTIONS.length - 1) {
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

  const progressPercent = ((currentIndex + (hasSubmitted ? 1 : 0)) / TOKENS_QUIZ_QUESTIONS.length) * 100;

  return (
    <section id="tokens-quiz" className={styles.sectionWrapper} aria-labelledby="tokens-quiz-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>05</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>PRACTICE QUIZ</span>
          </div>

          <h2 id="tokens-quiz-heading" className={styles.mainHeading}>
            Quick Check.
          </h2>

          <p className={styles.subHeading}>
            Test your understanding &bull; Solidify your mastery of keywords, identifiers,
            constants, string literals, and punctuators.
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
                  Question {currentIndex + 1} of {TOKENS_QUIZ_QUESTIONS.length}
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
                        {hasSubmitted && opt.isCorrect ? (
                          <Check size={12} color="#10a37f" />
                        ) : isSelected ? (
                          <div className={styles.radioDot} />
                        ) : null}
                      </div>
                      <span className={styles.optionText}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Feedback Card */}
              <AnimatePresence>
                {hasSubmitted && selectedOption && (
                  <motion.div
                    className={`${styles.feedbackCard} ${
                      selectedOption.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
                    }`}
                    initial={reduced ? undefined : { opacity: 0, y: 10 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.feedbackTitle}>
                      {selectedOption.isCorrect ? (
                        <>
                          <CheckCircle2 size={18} aria-hidden="true" />
                          <span>Correct!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={18} aria-hidden="true" />
                          <span>Not quite.</span>
                        </>
                      )}
                    </div>
                    <p>{selectedOption.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Actions */}
              <div className={styles.cardFooter}>
                {!hasSubmitted ? (
                  <button
                    type="button"
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={!selectedOptionId}
                  >
                    <span>Check Answer</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                ) : (
                  <button type="button" className={styles.nextBtn} onClick={handleNext}>
                    <span>
                      {currentIndex < TOKENS_QUIZ_QUESTIONS.length - 1
                        ? 'Next Question'
                        : 'View Results'}
                    </span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className={styles.scoreSummaryCard}>
              <div className={styles.scoreIconWrap}>
                <Trophy size={28} aria-hidden="true" />
              </div>

              <h3 className={styles.scoreTitle}>Quiz Completed!</h3>
              <p className={styles.scoreSub}>
                You have demonstrated a comprehensive understanding of C tokens, keywords, and
                identifiers.
              </p>

              <div className={styles.scoreTally}>
                {score} / {TOKENS_QUIZ_QUESTIONS.length}
              </div>

              <button type="button" className={styles.retryBtn} onClick={handleRestart}>
                <RotateCcw size={15} aria-hidden="true" />
                <span>Retake Quiz</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
