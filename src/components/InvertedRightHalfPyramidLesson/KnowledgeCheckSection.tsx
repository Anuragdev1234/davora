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
    question:
      'In the reverse loop for (int i = n; i >= 1; i--), what happens if you mistakenly write i++ instead of i--?',
    options: [
      'The loop terminates immediately because i >= 1 is initially false.',
      'An infinite loop occurs because i increments perpetually, keeping i >= 1 true forever.',
      'The pyramid prints with reversed indentation spaces.',
      'The compiler rejects the statement with a syntax error.',
    ],
    correctIndex: 1,
    explanation:
      'Because i starts at n (where n >= 1), incrementing i with i++ keeps i >= 1 permanently true, causing an infinite loop until the process is aborted or integer overflow occurs.',
  },
  {
    id: 2,
    question:
      'When n = 5, what is the exact value of variable i when the outer loop condition i >= 1 finally evaluates to false?',
    options: ['i = 1', 'i = 0', 'i = -1', 'i = 5'],
    correctIndex: 1,
    explanation:
      'The outer loop executes for i = 5, 4, 3, 2, and 1. After row 1 is printed, i-- decrements i from 1 to 0. At i = 0, the test (0 >= 1) evaluates to false and the loop exits cleanly.',
  },
  {
    id: 3,
    question:
      'If you are required to print an inverted pyramid using an INCREASING outer loop for (int i = 1; i <= n; i++), what must the inner loop condition be?',
    options: [
      'j <= i',
      'j <= n',
      'j <= n - i + 1',
      'j <= n + i',
    ],
    correctIndex: 2,
    explanation:
      'When i = 1, we need n stars: n - 1 + 1 = n. When i = 2, we need n - 1 stars: n - 2 + 1 = n - 1. When i = n, we need 1 star: n - n + 1 = 1. Thus, j <= n - i + 1 produces the exact inverted star count!',
  },
  {
    id: 4,
    question:
      'For a pyramid with n = 6 rows, how many total stars are printed across all rows?',
    options: ['15 stars', '21 stars', '36 stars', '30 stars'],
    correctIndex: 1,
    explanation:
      'The sum of stars across 6 rows is 6 + 5 + 4 + 3 + 2 + 1 = n(n+1)/2 = 6(7)/2 = 21 stars. Both the normal and inverted pyramids contain identical total star counts!',
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
          <h2 className={styles.sectionTitle}>Mastering Reverse Loop Logic</h2>
          <p className={styles.sectionDesc}>
            Test your understanding of loop bounds, decrementing conditions, and alternative algorithmic
            formulations before proceeding.
          </p>
        </div>

        <div className={styles.quizWrapper}>
          {QUESTIONS.map((q) => {
            const selectedOpt = selectedAnswers[q.id];

            return (
              <div key={q.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionBadge}>
                    Question {q.id} of {QUESTIONS.length}
                  </span>
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
            <div>
              {isSubmitted ? (
                <div className={styles.scoreBanner}>
                  Score: <strong>{score}</strong> / {QUESTIONS.length} ({Math.round(
                    (score / QUESTIONS.length) * 100
                  )}
                  %)
                </div>
              ) : (
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                  {allAnswered
                    ? 'All questions answered! Click submit to evaluate.'
                    : `Please answer all questions (${Object.keys(selectedAnswers).length}/${QUESTIONS.length})`}
                </div>
              )}
            </div>

            <div>
              {!isSubmitted ? (
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => setIsSubmitted(true)}
                  disabled={!allAnswered}
                >
                  Submit Answers
                </button>
              ) : (
                <button type="button" className={styles.retryBtn} onClick={handleReset}>
                  <RotateCcw size={14} />
                  <span>Try Again</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
