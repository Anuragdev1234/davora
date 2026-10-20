import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import styles from './KnowledgeCheckSection.module.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'If the user enters n = 4, how many stars will appear in the fourth row?',
    options: ['1', '3', '4', '5'],
    correctIndex: 2, // '4'
    explanation:
      'The outer-loop variable i identifies the current row. In row 4 (i = 4), the inner loop runs from j = 1 through j = 4, printing exactly 4 stars.',
  },
  {
    id: 2,
    question: 'How many stars are printed in total across the entire pyramid when n = 5?',
    options: ['5', '10', '15', '25'],
    correctIndex: 2, // '15'
    explanation:
      'The rows contain 1, 2, 3, 4, and 5 stars. Their arithmetic sum is 1 + 2 + 3 + 4 + 5 = n(n+1)/2 = 5(6)/2 = 15 stars in total.',
  },
];

export function KnowledgeCheckSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <section className={styles.section} id="knowledge-check" aria-label="Interactive Knowledge Check">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>Practice &amp; Verification</div>
          <h2 className={styles.sectionTitle}>Can You Predict the Pattern?</h2>
          <p className={styles.sectionDesc}>
            Test your understanding of loop bounds and star counts before moving on to the next
            pattern.
          </p>
        </div>

        <div className={styles.quizWrapper}>
          {QUESTIONS.map((q) => {
            const selectedOpt = selectedAnswers[q.id];

            return (
              <div key={q.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionBadge}>Question {q.id} of 2</span>
                  {isSubmitted && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                      {selectedOpt === q.correctIndex ? (
                        <span style={{ color: '#16a34a' }}>✓ Correct</span>
                      ) : (
                        <span style={{ color: '#dc2626' }}>✗ Incorrect</span>
                      )}
                    </span>
                  )}
                </div>

                <div className={styles.questionText}>{q.question}</div>

                <div className={styles.optionsGrid}>
                  {q.options.map((opt, optIdx) => {
                    let optClass = styles.optionBtn;

                    if (!isSubmitted) {
                      if (selectedOpt === optIdx) {
                        optClass += ` ${styles.optionBtnSelected}`;
                      }
                    } else {
                      if (optIdx === q.correctIndex) {
                        optClass += ` ${styles.optionCorrect}`;
                      } else if (selectedOpt === optIdx && optIdx !== q.correctIndex) {
                        optClass += ` ${styles.optionIncorrect}`;
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={optClass}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isSubmitted}
                      >
                        <span>{opt}</span>
                        {isSubmitted && optIdx === q.correctIndex && (
                          <CheckCircle2 size={16} color="#16a34a" />
                        )}
                        {isSubmitted && selectedOpt === optIdx && optIdx !== q.correctIndex && (
                          <XCircle size={16} color="#dc2626" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className={styles.explanationBox}>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action / Scoring Bar */}
          <div className={styles.actionsBar}>
            {isSubmitted ? (
              <>
                <div className={styles.scoreBanner}>
                  Score: <strong>{score} / {QUESTIONS.length}</strong> Correct —{' '}
                  {score === QUESTIONS.length ? 'Mastered!' : 'Keep practicing!'}
                </div>
                <button type="button" className={styles.retryBtn} onClick={handleReset}>
                  <RotateCcw size={14} />
                  <span>Retry Quiz</span>
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                  {allAnswered
                    ? 'All questions answered. Ready to submit!'
                    : 'Select an answer for each question above.'}
                </span>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => setIsSubmitted(true)}
                  disabled={!allAnswered}
                >
                  Submit Answers
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
