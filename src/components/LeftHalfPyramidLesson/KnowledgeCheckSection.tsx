import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
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
      'Why does the Left Half Pyramid require two sequential inner loops while the Right Half Pyramid only requires one?',
    options: [
      'Because the Left Half Pyramid outputs double the number of asterisks.',
      'Because terminal output moves strictly left-to-right, so leading whitespace must be printed before right-aligned asterisks can appear.',
      'Because C loops can only output a single character per line.',
      'Because the outer loop runs backwards.',
    ],
    correctIndex: 1,
    explanation:
      'Standard console streams print sequentially from left to right. Without printing leading space characters to shift the cursor, asterisks would print flush against the left margin (becoming a Right Half Pyramid).',
  },
  {
    id: 2,
    question:
      'In row i of a Left Half Pyramid with total rows n = 5, what is the exact mathematical formula for the number of leading space units to print?',
    options: ['i - 1', 'n - i', 'n + i', '2 * i'],
    correctIndex: 1,
    explanation:
      'On row 1, we need 5 - 1 = 4 space units; on row 2, 5 - 2 = 3 space units; on row 5, 5 - 5 = 0 space units. The exact formula is n - i.',
  },
  {
    id: 3,
    question:
      'If n = 5, what is the total number of asterisks printed across all rows of the pyramid?',
    options: ['25 asterisks', '10 asterisks', '15 asterisks', '20 asterisks'],
    correctIndex: 2,
    explanation:
      'The sum of asterisks across 5 rows is 1 + 2 + 3 + 4 + 5 = n(n+1)/2 = 5(6)/2 = 15 asterisks. Total leading space units is n(n-1)/2 = 10 units.',
  },
  {
    id: 4,
    question:
      'What visual defect occurs if the space loop outputs a single space " " while the star loop outputs "* " (two characters wide)?',
    options: [
      'The program crashes with a segmentation fault.',
      'The right edge will fail to align vertically because each space unit is 1 column wide while each star unit is 2 columns wide.',
      'The pyramid will print upside down.',
      'scanf() will reject the row input.',
    ],
    correctIndex: 1,
    explanation:
      'In monospace fonts, each character takes equal width. Because "* " occupies 2 visual columns (star + space), each indentation unit must also occupy 2 visual columns ("  ") to ensure vertical column alignment.',
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
          <h2 className={styles.sectionTitle}>Mastering Dual-Loop Spatial Logic</h2>
          <p className={styles.sectionDesc}>
            Verify your comprehension of leading space formulas, monospace cursor geometry, and dual inner loop coordination.
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
                      >
                        <span style={{ fontWeight: 700, color: '#64748b' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{opt}</span>
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

          <div className={styles.quizFooter}>
            {!isSubmitted ? (
              <button
                type="button"
                className={styles.submitBtn}
                disabled={!allAnswered}
                onClick={() => setIsSubmitted(true)}
              >
                Submit Answers
              </button>
            ) : (
              <div className={styles.scoreBanner}>
                <span className={styles.scoreText}>
                  Score: {score} / {QUESTIONS.length}{' '}
                  {score === QUESTIONS.length ? '🌟 Perfect!' : 'Keep practicing!'}
                </span>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleReset}
                >
                  <RotateCcw size={14} />
                  <span>Try Again</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
