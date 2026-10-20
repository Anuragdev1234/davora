import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { PRACTICE_EXERCISE } from '../../data/conditionalLessonData';
import styles from './ConditionalPracticeSection.module.css';

export function ConditionalPracticeSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isCorrect = selectedIdx === PRACTICE_EXERCISE.correctAnswer;

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleCheck = () => {
    if (selectedIdx !== null) {
      setIsSubmitted(true);
    }
  };

  const handleRetry = () => {
    setSelectedIdx(null);
    setIsSubmitted(false);
  };

  return (
    <section className={styles.section} id="conditional-practice">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>03</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>Interactive Challenge</span>
          </div>
          <h2 className={styles.sectionTitle}>{PRACTICE_EXERCISE.title}</h2>
          <p className={styles.sectionSubtitle}>
            Read the code, follow the conditions, and predict which branch executes before revealing the result.
          </p>
        </div>

        <div className={styles.practiceCardGrid}>
          {/* Left: Code Block */}
          <div className={styles.codePanel}>
            <div className={styles.codePanelHeader}>
              <span>exercise.c</span>
              <span>C Standard Execution</span>
            </div>
            <pre className={styles.codeText}>{PRACTICE_EXERCISE.codeSnippet}</pre>
          </div>

          {/* Right: Interaction */}
          <div className={styles.interactionColumn}>
            <div>
              <h4 className={styles.instructionTitle}>What will be printed to stdout?</h4>

              <div className={styles.optionsGrid}>
                {PRACTICE_EXERCISE.options.map((opt, idx) => {
                  let btnClass = styles.optionBtn;
                  if (selectedIdx === idx) {
                    btnClass += ` ${styles.optionBtnSelected}`;
                  }
                  if (isSubmitted) {
                    if (idx === PRACTICE_EXERCISE.correctAnswer) {
                      btnClass += ` ${styles.optionCorrect}`;
                    } else if (selectedIdx === idx) {
                      btnClass += ` ${styles.optionIncorrect}`;
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={btnClass}
                      onClick={() => handleSelect(idx)}
                      disabled={isSubmitted}
                      aria-label={`Option ${opt}`}
                    >
                      <span className={styles.optionBadge}>{String.fromCharCode(65 + idx)}</span>
                      <span>Output: "{opt}"</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {isSubmitted && (
                <div
                  className={`${styles.feedbackBox} ${
                    isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
                  }`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                    {isCorrect ? (
                      <>
                        <CheckCircle2 size={16} /> Correct! Branch B executes.
                      </>
                    ) : (
                      <>
                        <XCircle size={16} /> Incorrect prediction
                      </>
                    )}
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>{PRACTICE_EXERCISE.explanation}</div>
                </div>
              )}
            </div>

            {/* Action Row */}
            <div className={styles.actionRow}>
              {!isSubmitted ? (
                <button
                  type="button"
                  className={styles.checkBtn}
                  onClick={handleCheck}
                  disabled={selectedIdx === null}
                >
                  <span>Check Answer</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <>
                  {!isCorrect && (
                    <button type="button" className={styles.retryBtn} onClick={handleRetry}>
                      <RotateCcw size={14} />
                      <span>Try Again</span>
                    </button>
                  )}
                  {isCorrect && (
                    <button
                      type="button"
                      className={styles.checkBtn}
                      onClick={() => {
                        const el = document.getElementById('conditional-completion');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span>Continue to Summary</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
