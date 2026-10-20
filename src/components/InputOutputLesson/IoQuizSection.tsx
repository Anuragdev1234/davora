import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { IO_QUIZ_QUESTIONS } from '../../data/inputOutputLessonData';
import styles from './IoQuizSection.module.css';

export function IoQuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = IO_QUIZ_QUESTIONS[currentIdx];
  const total = IO_QUIZ_QUESTIONS.length;
  const progressPercent = ((currentIdx + (isAnswered ? 1 : 0)) / total) * 100;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section className={styles.sectionWrapper} id="io-quiz">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>07</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>Check Your Knowledge</span>
          </div>
          <h2 className={styles.mainHeading}>Quick Revision Quiz</h2>
          <p className={styles.subHeading}>
            Verify your mastery of standard C streams, format specifiers, and input validation principles.
          </p>
        </div>

        <div className={styles.quizCard}>
          {!isCompleted ? (
            <>
              {/* Progress Bar */}
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question Metadata */}
              <div className={styles.questionMeta}>
                <span className={styles.questionBadge}>
                  Question {currentIdx + 1} of {total}
                </span>
                <span className={styles.scorePill}>
                  Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}
                </span>
              </div>

              {/* Question Heading */}
              <div className={styles.questionText}>{question.question}</div>

              {/* Options */}
              <div className={styles.optionsList}>
                {question.options.map((optText, optIdx) => {
                  let optClass = styles.optionButton;
                  if (isAnswered) {
                    if (optIdx === question.correctAnswer) {
                      optClass += ` ${styles.optionCorrect}`;
                    } else if (optIdx === selectedOption) {
                      optClass += ` ${styles.optionIncorrect}`;
                    }
                  }

                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={optClass}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswered}
                    >
                      <span className={styles.optionIndexBadge}>{letter}</span>
                      <span>{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback Explanation */}
              {isAnswered && (
                <div
                  className={`${styles.feedbackBox} ${
                    selectedOption === question.correctAnswer
                      ? styles.feedbackCorrect
                      : styles.feedbackIncorrect
                  }`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, marginBottom: 4 }}>
                    {selectedOption === question.correctAnswer ? (
                      <>
                        <CheckCircle2 size={16} /> Correct!
                      </>
                    ) : (
                      <>
                        <XCircle size={16} /> Incorrect
                      </>
                    )}
                  </div>
                  <div>{question.explanation}</div>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className={styles.actionRow}>
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    <span>{currentIdx + 1 === total ? 'View Results' : 'Next Question'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.completeSummary}>
              <h3 className={styles.completeTitle}>Quiz Completed!</h3>
              <p style={{ color: '#475569', margin: '0 0 1rem 0' }}>
                You scored:
              </p>
              <div className={styles.completeScore}>
                {score} / {total}
              </div>
              <p style={{ color: '#64748b', fontSize: '0.94rem', margin: '0 auto 1.75rem auto', maxWidth: 440 }}>
                {score === total
                  ? 'Outstanding! You have mastered C input, output, format specifiers, and streams.'
                  : 'Good effort! Review format specifiers and stream buffering above to lock in these key concepts.'}
              </p>
              <button type="button" className={styles.retryBtn} onClick={handleRetry}>
                <RotateCcw size={15} />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
