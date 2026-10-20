import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './HowCWorksQuiz.module.css';

interface Question {
  id: string;
  num: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    num: '01',
    question: 'Which file typically contains the C source code written by the programmer?',
    options: ['hello.c', 'hello.o', 'An executable only', 'Standard output'],
    correctIndex: 0,
    explanation:
      'Human-written C source code is traditionally saved in a plain-text file with the .c extension (e.g., hello.c).',
  },
  {
    id: 'q2',
    num: '02',
    question: 'Which stage handles directives such as #include and #define?',
    options: ['Linking', 'Preprocessing', 'Execution', 'Assembly only'],
    correctIndex: 1,
    explanation:
      'The preprocessor resolves directives starting with #, splicing in header declarations and expanding macro definitions before actual compilation starts.',
  },
  {
    id: 'q3',
    num: '03',
    question: 'What does the assembler produce in a conventional native toolchain?',
    options: [
      'A source-code comment',
      'An object file containing machine code and related information',
      'The user\'s final screen output',
      'A C header file',
    ],
    correctIndex: 1,
    explanation:
      'The assembler converts low-level assembly mnemonics into relocatable machine-code object files (e.g., hello.o) containing binary instructions, symbols, and relocations.',
  },
  {
    id: 'q4',
    num: '04',
    question: 'What is the linker\'s main role?',
    options: [
      'Accept keyboard input',
      'Display the output message',
      'Resolve references and combine required program components',
      'Replace every C keyword with a number',
    ],
    correctIndex: 2,
    explanation:
      'The linker binds together object files and shared libraries (like libc), resolves external symbols such as printf, and constructs the finished binary executable.',
  },
  {
    id: 'q5',
    num: '05',
    question: 'Which statement accurately describes the complete process?',
    options: [
      'Every compiler follows exactly the same externally visible stages.',
      'A C source file always runs directly without translation.',
      'A typical native C build may involve preprocessing, compilation, assembly, and linking before execution.',
      'Linking always copies every library into one executable.',
    ],
    correctIndex: 2,
    explanation:
      'A typical native C compilation workflow proceeds through preprocessing, compilation, assembly, and linking prior to process loading and execution by the OS.',
  },
];

export function HowCWorksQuiz() {
  const reduced = useReducedMotion();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleRetry = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleResetAll = () => {
    setSelectedAnswers({});
  };

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="quiz-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>04 / CHECK YOUR UNDERSTANDING</span>
        <h2 id="quiz-heading" className={styles.heading}>
          Can you follow the journey?
        </h2>
        <p className={styles.subheading}>
          Test your understanding of how a C program moves from source code to execution.
        </p>
      </div>

      {/* Score Banner */}
      <div className={styles.scoreBanner} role="status" aria-label="Quiz progress">
        <div className={styles.scoreLeft}>
          <Award size={18} color="var(--color-accent-dark)" aria-hidden="true" />
          <span className={styles.scoreLabel}>Journey Mastery:</span>
          <span className={styles.scoreValue}>
            {correctCount} / {totalQuestions} Correct
            {answeredCount === totalQuestions && (
              <span style={{ color: 'var(--color-accent-dark)', marginLeft: '0.5rem' }}>
                ({Math.round((correctCount / totalQuestions) * 100)}%)
              </span>
            )}
          </span>
        </div>

        {answeredCount > 0 && (
          <button
            type="button"
            className={styles.resetAllBtn}
            onClick={handleResetAll}
            aria-label="Reset all quiz questions"
          >
            <RotateCcw size={12} aria-hidden="true" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Questions list */}
      <div className={styles.quizList} role="list" aria-label="Multiple choice questions">
        {QUESTIONS.map((q) => {
          const selectedOption = selectedAnswers[q.id];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div key={q.id} className={styles.questionCard} role="listitem">
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>Question {q.num}</span>
                <h3 className={styles.questionText}>{q.question}</h3>
              </div>

              <div
                className={styles.optionsGrid}
                role="radiogroup"
                aria-label={`Options for Question ${q.num}`}
              >
                {q.options.map((option, idx) => {
                  const isThisSelected = selectedOption === idx;
                  let optionClass = styles.optionBtn;

                  if (hasAnswered) {
                    if (idx === q.correctIndex) {
                      optionClass += ` ${styles.optionCorrect}`;
                    } else if (isThisSelected) {
                      optionClass += ` ${styles.optionIncorrect}`;
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      className={optionClass}
                      onClick={() => handleSelect(q.id, idx)}
                      disabled={hasAnswered}
                      role="radio"
                      aria-checked={isThisSelected}
                    >
                      <div className={styles.optionRadio} aria-hidden="true">
                        {isThisSelected && <div className={styles.optionRadioInner} />}
                      </div>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div
                  className={`${styles.feedbackBox} ${
                    isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
                  }`}
                  role="alert"
                >
                  {isCorrect ? (
                    <CheckCircle2 size={18} color="#2c590c" flex-shrink={0} aria-hidden="true" />
                  ) : (
                    <XCircle size={18} color="#991B1B" flex-shrink={0} aria-hidden="true" />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    <div>{q.explanation}</div>
                    {!isCorrect && (
                      <button
                        type="button"
                        className={styles.retryBtn}
                        onClick={() => handleRetry(q.id)}
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default HowCWorksQuiz;
