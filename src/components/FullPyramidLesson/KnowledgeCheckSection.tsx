import React, { useState } from 'react';
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
      'In row i of a full pyramid of n rows, how many leading spaces must be printed to keep the pyramid centered?',
    options: ['n - i', 'n + i', '2 * i - 1', 'i - 1'],
    correctIndex: 0,
    explanation:
      'Leading spaces decrease row by row: Row 1 requires n - 1 spaces to shift the apex star to the center, while the base row n requires n - n = 0 spaces. Thus row i requires exactly (n - i) spaces.',
  },
  {
    id: 2,
    question:
      'What is the formula for the number of asterisks printed on row i of a full pyramid?',
    options: ['i', '2 * i - 1', '2 * i', '2 * n - 1'],
    correctIndex: 1,
    explanation:
      'Each row expands symmetrically by 2 stars. Row 1 has 1 star, Row 2 has 3, Row 3 has 5. This forms the standard odd-number arithmetic progression: 2 * i - 1.',
  },
  {
    id: 3,
    question:
      'If n = 5, what is the total number of stars printed across the entire full pyramid?',
    options: ['15 stars', '20 stars', '25 stars', '30 stars'],
    correctIndex: 2,
    explanation:
      'The sum of the first n odd integers is 1 + 3 + 5 + ... + (2n - 1) = n^2. For n = 5, the total stars printed across the pyramid is 5^2 = 25 stars.',
  },
  {
    id: 4,
    question:
      'Why does the full pyramid program require two consecutive inner loops inside the outer row loop?',
    options: [
      'Because C does not permit printing spaces and stars inside the same function.',
      'Because terminal output moves strictly left-to-right, so all leading spaces must be emitted first to center the cursor before the stars can be printed.',
      'Because one loop handles odd rows and the second loop handles even rows.',
      'Because the compiler requires one loop per declared variable.',
    ],
    correctIndex: 1,
    explanation:
      'Console printing is strictly sequential from left to right. To center the stars along the vertical axis, the cursor must first be shifted rightward by printing (n - i) spaces. Only after the space loop terminates can the star loop emit (2i - 1) asterisks.',
  },
];

export const KnowledgeCheckSection: React.FC = () => {
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
          <div className={styles.sectionNumber}>SCENE 09 &bull; PRACTICE &amp; VERIFICATION</div>
          <h2 className={styles.sectionTitle}>Mastering Full Pyramid Logic</h2>
          <p className={styles.sectionDesc}>
            Verify your comprehension of leading space formulas, odd-number star series, and dual inner loop coordination.
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
                Submit Answers ({Object.keys(selectedAnswers).length}/{QUESTIONS.length})
              </button>
            ) : (
              <div className={styles.scoreBanner}>
                <span className={styles.scoreText}>
                  Your Score: {score} / {QUESTIONS.length} ({Math.round((score / QUESTIONS.length) * 100)}%)
                </span>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleReset}
                >
                  <RotateCcw size={14} />
                  <span>Retry Quiz</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
