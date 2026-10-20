import { useState } from 'react';
import {
  QUIZ_QUESTIONS,
  PROGRAMMING_CHALLENGES,
} from '../../data/recursionLessonData';
import { HelpCircle, Check, X, RotateCcw, Lightbulb, Code2 } from 'lucide-react';
import styles from './RecursionPracticeSection.module.css';

export function RecursionPracticeSection() {
  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Challenges State
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  const toggleHint = (chId: string) => {
    setOpenHints((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  const toggleSolution = (chId: string) => {
    setOpenSolutions((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  return (
    <section className={styles.sectionWrapper} id="practice-and-quiz">
      <div className={styles.container}>
        {/* ==========================================================
            09 / INTERACTIVE QUIZ
            ========================================================== */}
        <div id="section-quiz">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>09</span>
            <h2 className={styles.sectionTitle}>Interactive Knowledge Check</h2>
            <p className={styles.sectionSubtitle}>
              Test your understanding of recursion mechanics, base cases, call stacks, and tail-call
              optimization in C.
            </p>
          </div>

          <div className={styles.quizCard}>
            {QUIZ_QUESTIONS.map((q) => {
              const selectedIdx = selectedAnswers[q.id];
              return (
                <div key={q.id} className={styles.quizQuestionBlock}>
                  <h3 className={styles.questionTitle}>{q.question}</h3>

                  <div className={styles.optionsList}>
                    {q.options.map((opt, idx) => {
                      const isSelected = selectedIdx === idx;
                      const isCorrect = isQuizSubmitted && idx === q.correctIndex;
                      const isWrong = isQuizSubmitted && isSelected && idx !== q.correctIndex;

                      return (
                        <div
                          key={opt}
                          className={`${styles.optionLabel} ${
                            isSelected ? styles.optionSelected : ''
                          } ${isCorrect ? styles.optionCorrect : ''} ${
                            isWrong ? styles.optionIncorrect : ''
                          }`}
                          onClick={() => handleSelectOption(q.id, idx)}
                        >
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              border: '1.5px solid currentColor',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 10,
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {isCorrect ? (
                              <Check size={12} />
                            ) : isWrong ? (
                              <X size={12} />
                            ) : (
                              String.fromCharCode(65 + idx)
                            )}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div className={styles.explanationBox}>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>
                        {selectedIdx === q.correctIndex ? '✓ Correct! ' : '✗ Explanation: '}
                      </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            <div className={styles.quizActionsBar}>
              {!isQuizSubmitted ? (
                <button
                  type="button"
                  style={{
                    padding: '10px 22px',
                    borderRadius: 8,
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsQuizSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                    Score: {calculateScore()} / {QUIZ_QUESTIONS.length}
                  </span>
                  <button
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 16px',
                      borderRadius: 8,
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#334155',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={handleResetQuiz}
                  >
                    <RotateCcw size={14} />
                    <span>Retry Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================================
            10 / PROGRAMMING PRACTICE CHALLENGES
            ========================================================== */}
        <div id="section-challenges">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>10</span>
            <h2 className={styles.sectionTitle}>Structured Programming Challenges</h2>
            <p className={styles.sectionSubtitle}>
              Progress from basic recursive sequences to string manipulation and Euclid’s algorithm.
            </p>
          </div>

          <div className={styles.challengesGrid}>
            {PROGRAMMING_CHALLENGES.map((ch) => (
              <div key={ch.id} className={styles.challengeCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    className={`${styles.tierBadge} ${
                      ch.tier === 'Beginner'
                        ? styles.tierBeginner
                        : ch.tier === 'Intermediate'
                        ? styles.tierIntermediate
                        : styles.tierAdvanced
                    }`}
                  >
                    {ch.tier}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#64748b' }}>
                    Challenge #{ch.id.replace('ch-', '')}
                  </span>
                </div>

                <h3 className={styles.challengeTitle}>{ch.title}</h3>
                <p className={styles.challengeProblem}>{ch.problem}</p>

                <div className={styles.ioBlock}>
                  <div>
                    <span style={{ color: '#64748b' }}>Sample Input: </span>
                    <code>{ch.sampleInput}</code>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Sample Output: </span>
                    <code style={{ color: '#059669', fontWeight: 700 }}>{ch.sampleOutput}</code>
                  </div>
                </div>

                <div className={styles.hintsSolutionsBar}>
                  <button
                    type="button"
                    className={styles.actionToggleBtn}
                    onClick={() => toggleHint(ch.id)}
                  >
                    <Lightbulb size={13} color="#d97706" />
                    <span>{openHints[ch.id] ? 'Hide Hints' : 'View Hints'}</span>
                  </button>

                  <button
                    type="button"
                    className={styles.actionToggleBtn}
                    onClick={() => toggleSolution(ch.id)}
                  >
                    <Code2 size={13} color="#2563eb" />
                    <span>{openSolutions[ch.id] ? 'Hide Solution' : 'View C Solution'}</span>
                  </button>
                </div>

                {openHints[ch.id] && (
                  <div
                    style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: 10,
                      padding: '1rem',
                      marginTop: '0.85rem',
                      fontSize: '0.82rem',
                      color: '#92400e',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: 4 }}>
                      <HelpCircle size={14} style={{ display: 'inline', marginRight: 4 }} />
                      Guiding Hints:
                    </strong>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {ch.hints.map((hint, idx) => (
                        <li key={idx} style={{ marginTop: 4 }}>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {openSolutions[ch.id] && (
                  <div className={styles.solutionPanel}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: '#38bdf8', fontSize: '0.74rem' }}>solution.c</span>
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{ch.solution}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
