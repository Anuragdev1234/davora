import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { LOOP_QUIZ_QUESTIONS, LOOP_CHALLENGES } from '../../data/loopsLessonData';
import styles from './LoopPracticeAndChallengesSection.module.css';

export function LoopPracticeAndChallengesSection() {

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (submittedQuestions[qId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuestion = (qId: string) => {
    if (selectedAnswers[qId] !== undefined) {
      setSubmittedQuestions((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const handleRetryQuestion = (qId: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setSubmittedQuestions((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  // Challenges hint & solution toggle state
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({});
  const [activeSolutions, setActiveSolutions] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setActiveHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setActiveSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className={styles.sectionWrapper} id="practice-and-challenges">
      <div className={styles.container}>
        {/* ==========================================================
            10A: INTERACTIVE PRACTICE QUIZ
            ========================================================== */}
        <div id="section-quiz">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>10</span>
              <span>/</span>
              <span>Knowledge Verification</span>
            </div>
            <h3 className={styles.mainHeading}>Interactive Practice</h3>
            <p className={styles.subHeading}>
              Test your understanding of loop execution mechanics, entry vs. exit checks, and
              jump control flow with these conceptual questions.
            </p>
          </div>

          <div className={styles.quizGrid}>
            {LOOP_QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedIdx = selectedAnswers[q.id];
              const isSubmitted = submittedQuestions[q.id];
              const isCorrect = selectedIdx === q.correctAnswer;

              return (
                <div key={q.id} className={styles.quizCard}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#2563EB' }}>
                        QUESTION 0{qIndex + 1}
                      </span>
                    </div>
                    <h4 className={styles.quizQuestionText}>{q.question}</h4>
                  </div>

                  {q.codeSnippet && (
                    <pre className={styles.quizCodeSnippet}>{q.codeSnippet}</pre>
                  )}

                  <div className={styles.optionsList}>
                    {q.options.map((opt, optIdx) => {
                      let optClass = styles.optionButton;
                      if (selectedIdx === optIdx) {
                        optClass += ` ${styles.optionSelected}`;
                      }
                      if (isSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          optClass += ` ${styles.optionCorrect}`;
                        } else if (selectedIdx === optIdx) {
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
                          <span className={styles.optionBadge}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box */}
                  {isSubmitted && (
                    <div
                      className={`${styles.feedbackBox} ${
                        isCorrect ? styles.feedbackSuccess : styles.feedbackError
                      }`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={15} /> Correct!
                          </>
                        ) : (
                          <>
                            <XCircle size={15} /> Incorrect
                          </>
                        )}
                      </div>
                      <p style={{ margin: 0 }}>{q.explanation}</p>
                    </div>
                  )}

                  <div className={styles.quizActions}>
                    {!isSubmitted ? (
                      <button
                        type="button"
                        className={styles.submitBtn}
                        onClick={() => handleSubmitQuestion(q.id)}
                        disabled={selectedIdx === undefined}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.retryBtn}
                        onClick={() => handleRetryQuestion(q.id)}
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================================
            10B: PROGRAMMING CHALLENGES
            ========================================================== */}
        <div id="section-challenges">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>CHALLENGES</span>
              <span>/</span>
              <span>Hands-On Implementation</span>
            </div>
            <h3 className={styles.mainHeading}>Programming Challenges</h3>
            <p className={styles.subHeading}>
              Put your loop skills into practice with three progressive algorithmic challenges.
              Study the prompt, formulate your logic, and expand the verified solution when ready.
            </p>
          </div>

          <div className={styles.challengesGrid}>
            {LOOP_CHALLENGES.map((ch) => {
              const showHint = !!activeHints[ch.id];
              const showSolution = !!activeSolutions[ch.id];

              let levelClass = styles.levelBeginner;
              if (ch.level === 'Intermediate') levelClass = styles.levelIntermediate;
              if (ch.level === 'Advanced Beginner') levelClass = styles.levelAdvanced;

              return (
                <div key={ch.id} className={styles.challengeCard}>
                  <div className={styles.challengeTop}>
                    <span className={`${styles.challengeLevelBadge} ${levelClass}`}>
                      {ch.level}
                    </span>
                    <h4 className={styles.challengeTitle}>{ch.title}</h4>
                    <p className={styles.challengePrompt}>{ch.prompt}</p>
                  </div>

                  <div className={styles.expectedOutputBox}>
                    <strong>Expected Output:</strong>
                    <br />
                    <code>{ch.expectedOutput}</code>
                  </div>

                  {/* Hint Toggle */}
                  <div>
                    <button
                      type="button"
                      className={styles.toggleHintBtn}
                      onClick={() => toggleHint(ch.id)}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <HelpCircle size={13} />
                        {showHint ? 'Hide Hint' : 'View Hint'}
                      </span>
                    </button>
                    {showHint && (
                      <div className={styles.hintContent} style={{ marginTop: 6 }}>
                        {ch.hint}
                      </div>
                    )}
                  </div>

                  {/* Solution Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleSolution(ch.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Code2 size={13} />
                        {showSolution ? 'Hide Solution' : 'Reveal Solution'}
                      </span>
                      {showSolution ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showSolution && (
                      <div style={{ marginTop: 8 }}>
                        <pre className={styles.solutionBox}>{ch.solutionCode}</pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
