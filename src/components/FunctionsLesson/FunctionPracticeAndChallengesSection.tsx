import { useState } from 'react';
import {
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Award,
  Lightbulb,
} from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  PROGRAMMING_CHALLENGES,
} from '../../data/functionsLessonData';
import styles from './FunctionPracticeAndChallengesSection.module.css';

export function FunctionPracticeAndChallengesSection() {
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Challenges collapsible state
  const [openHints, setOpenHints] = useState<{ [chId: string]: boolean }>({});
  const [openSolutions, setOpenSolutions] = useState<{ [chId: string]: boolean }>({});

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setSubmitted(true);
  };

  const handleQuizReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
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

  const toggleHint = (chId: string) => {
    setOpenHints((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  const toggleSolution = (chId: string) => {
    setOpenSolutions((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  return (
    <section className={styles.sectionWrapper} id="practice-and-challenges">
      <div className={styles.container}>
        {/* ==========================================================
            17 / ADVANTAGES AND DISADVANTAGES
            ========================================================== */}
        <div id="section-pros-cons">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>17</span>
            <h2 className={styles.sectionTitle}>Advantages &amp; Trade-offs</h2>
            <p className={styles.sectionSubtitle}>
              Functions are the cornerstone of structured C programming, balancing abstraction against
              runtime overhead.
            </p>
          </div>

          <div className={styles.prosConsGrid}>
            {/* Advantages */}
            <div className={styles.prosCard}>
              <h3 style={{ fontSize: '1.15rem', color: '#059669', margin: '0 0 6px 0' }}>
                ✓ Key Advantages
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Why professional software systems rely heavily on functions:
              </p>

              <div className={styles.prosList}>
                <div className={styles.proItem}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Reusability:</strong> Call identical computation from anywhere in the codebase.
                  </div>
                </div>
                <div className={styles.proItem}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Modularity:</strong> Decomposes complex monorepos into discrete, testable units.
                  </div>
                </div>
                <div className={styles.proItem}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Maintainability:</strong> Bug fixes or algorithmic upgrades happen in one file.
                  </div>
                </div>
                <div className={styles.proItem}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Team Collaboration:</strong> Multiple engineers can develop distinct functions simultaneously.
                  </div>
                </div>
              </div>
            </div>

            {/* Disadvantages / Trade-offs */}
            <div className={styles.consCard}>
              <h3 style={{ fontSize: '1.15rem', color: '#e11d48', margin: '0 0 6px 0' }}>
                ⚠ Architectural Trade-offs
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Performance and hardware constraints to remember:
              </p>

              <div className={styles.prosList}>
                <div className={styles.proItem}>
                  <HelpCircle size={16} color="#f43f5e" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Call Overhead:</strong> Saving registers, pushing arguments, and branching cost CPU cycles (inline functions can mitigate this).
                  </div>
                </div>
                <div className={styles.proItem}>
                  <HelpCircle size={16} color="#f43f5e" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Stack Memory Consumption:</strong> Deeply nested or uncontrolled recursive calls risk stack overflow.
                  </div>
                </div>
                <div className={styles.proItem}>
                  <HelpCircle size={16} color="#f43f5e" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <strong>Trace Complexity:</strong> Fragmented functions can occasionally make non-linear control flow harder to trace without profiling.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            18 / BEST PRACTICES
            ========================================================== */}
        <div id="section-best-practices">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>18</span>
            <h2 className={styles.sectionTitle}>8 Industry Best Practices</h2>
            <p className={styles.sectionSubtitle}>
              Essential engineering guidelines followed in mission-critical C systems.
            </p>
          </div>

          <div className={styles.bestPracticesGrid}>
            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>01</div>
              <h3 className={styles.practiceTitle}>Meaningful Names</h3>
              <p className={styles.practiceDesc}>Use descriptive verbs like calculateTax() rather than cryptic acronyms.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>02</div>
              <h3 className={styles.practiceTitle}>Single Responsibility</h3>
              <p className={styles.practiceDesc}>Each function should accomplish exactly one well-defined computational task.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>03</div>
              <h3 className={styles.practiceTitle}>Explicit Prototypes</h3>
              <p className={styles.practiceDesc}>Always declare header prototypes before call-sites to ensure compiler type-checks.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>04</div>
              <h3 className={styles.practiceTitle}>Const Correctness</h3>
              <p className={styles.practiceDesc}>Mark read-only pointer parameters as const char *str to guarantee immutability.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>05</div>
              <h3 className={styles.practiceTitle}>Minimal Global State</h3>
              <p className={styles.practiceDesc}>Prefer explicit parameter passing over shared global variables to avoid side-effects.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>06</div>
              <h3 className={styles.practiceTitle}>Input Validation</h3>
              <p className={styles.practiceDesc}>Check pointer arguments against NULL and validate range boundaries early.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>07</div>
              <h3 className={styles.practiceTitle}>Guarded Recursion</h3>
              <p className={styles.practiceDesc}>Always test the base case first to avoid exhausting limited stack space.</p>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceNum}>08</div>
              <h3 className={styles.practiceTitle}>Doc Comments</h3>
              <p className={styles.practiceDesc}>Document expected inputs, outputs, error return codes, and memory ownership.</p>
            </div>
          </div>
        </div>

        {/* ==========================================================
            19 / INTERACTIVE QUIZ
            ========================================================== */}
        <div id="section-quiz">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>19</span>
            <h2 className={styles.sectionTitle}>Interactive Quiz: Functions Mastery</h2>
            <p className={styles.sectionSubtitle}>
              Test your understanding of function declarations, call by value, static storage, and call stack mechanics.
            </p>
          </div>

          <div className={styles.quizCard}>
            <div className={styles.quizGrid}>
              {QUIZ_QUESTIONS.map((q) => {
                const isCorrect = selectedAnswers[q.id] === q.correctIndex;

                return (
                  <div key={q.id} className={styles.questionBox}>
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: '#2563eb',
                          textTransform: 'uppercase',
                        }}
                      >
                        Question 0{q.id}
                      </span>
                      <h4 style={{ fontSize: '0.96rem', margin: '6px 0 10px 0', color: '#141614', lineHeight: 1.45 }}>
                        {q.question}
                      </h4>

                      {q.codeSnippet && (
                        <div
                          style={{
                            background: '#141614',
                            borderRadius: 8,
                            padding: '10px 12px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            color: '#e2e8f0',
                            whiteSpace: 'pre-wrap',
                            marginBottom: '1rem',
                          }}
                        >
                          {q.codeSnippet}
                        </div>
                      )}

                      <div className={styles.optionsList}>
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedAnswers[q.id] === optIdx;
                          let btnClass = styles.optionBtn;

                          if (submitted) {
                            if (optIdx === q.correctIndex) {
                              btnClass += ` ${styles.optionBtnCorrect}`;
                            } else if (isOptionSelected) {
                              btnClass += ` ${styles.optionBtnWrong}`;
                            }
                          } else if (isOptionSelected) {
                            btnClass += ` ${styles.optionBtnSelected}`;
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              className={btnClass}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              disabled={submitted}
                            >
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  background: 'rgba(0,0,0,0.06)',
                                  fontSize: 10,
                                  fontWeight: 700,
                                }}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {submitted && (
                      <div
                        style={{
                          background: isCorrect ? '#ecfdf5' : '#fef2f2',
                          border: `1px solid ${isCorrect ? '#10b981' : '#f87171'}`,
                          borderRadius: 10,
                          padding: '10px 12px',
                          fontSize: '0.8rem',
                          color: isCorrect ? '#065f46' : '#991b1b',
                          marginTop: '0.75rem',
                        }}
                      >
                        <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect:'}</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Controls & Score */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e2e8f0',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              {!submitted ? (
                <button
                  type="button"
                  style={{
                    padding: '10px 24px',
                    borderRadius: 24,
                    background: '#141614',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                  }}
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={20} color="#059669" />
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#141614' }}>
                      Score: {calculateScore()} / {QUIZ_QUESTIONS.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      background: '#ffffff',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onClick={handleQuizReset}
                  >
                    <RotateCcw size={13} />
                    <span>Retry Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================================
            20 / PROGRAMMING CHALLENGES
            ========================================================== */}
        <div id="section-challenges">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>20</span>
            <h2 className={styles.sectionTitle}>Programming Practice Challenges</h2>
            <p className={styles.sectionSubtitle}>
              Hands-on C problems with hints and verified reference solutions.
            </p>
          </div>

          <div className={styles.challengesList}>
            {PROGRAMMING_CHALLENGES.map((ch) => (
              <div key={ch.id} className={styles.challengeCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 6,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background:
                          ch.difficulty === 'Beginner'
                            ? '#dbeafe'
                            : ch.difficulty === 'Intermediate'
                            ? '#fef3c7'
                            : '#fee2e2',
                        color:
                          ch.difficulty === 'Beginner'
                            ? '#1e40af'
                            : ch.difficulty === 'Intermediate'
                            ? '#b45309'
                            : '#b91c1c',
                        marginBottom: 6,
                      }}
                    >
                      {ch.difficulty}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', margin: '0 0 6px 0', color: '#141614' }}>
                      {ch.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                      {ch.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: '1.25rem' }}>
                  <button
                    type="button"
                    style={{
                      background: 'transparent',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onClick={() => toggleHint(ch.id)}
                  >
                    <Lightbulb size={13} color="#f59e0b" />
                    <span>{openHints[ch.id] ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>

                  <button
                    type="button"
                    style={{
                      background: '#141614',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onClick={() => toggleSolution(ch.id)}
                  >
                    <span>{openSolutions[ch.id] ? 'Hide Solution' : 'Reveal Solution'}</span>
                    {openSolutions[ch.id] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>

                {openHints[ch.id] && (
                  <div
                    style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: '0.82rem',
                      color: '#92400e',
                      marginTop: '1rem',
                    }}
                  >
                    <strong>Hint:</strong> {ch.hint}
                  </div>
                )}

                {openSolutions[ch.id] && (
                  <div style={{ marginTop: '1rem' }}>
                    <div
                      style={{
                        background: '#141614',
                        borderRadius: 10,
                        padding: '1.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        lineHeight: 1.6,
                        color: '#e2e8f0',
                        overflowX: 'auto',
                      }}
                    >
                      <pre style={{ margin: 0 }}>{ch.solutionCode}</pre>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 8 }}>
                      <strong>Architecture Note:</strong> {ch.explanation}
                    </div>
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
