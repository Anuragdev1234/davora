import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
} from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './KnowledgeCheck.module.css';

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
    question: 'Where was C developed?',
    options: ['Bell Labs', 'Microsoft', 'Apple', 'Google'],
    correctIndex: 0,
    explanation:
      'Dennis Ritchie created C at Bell Labs (AT&T) in 1972 to construct the foundational utilities and kernel of the Unix operating system.',
  },
  {
    id: 'q2',
    num: '02',
    question: 'Which function is the entry point of a typical hosted C program?',
    options: ['printf()', 'main()', 'scanf()', 'start()'],
    correctIndex: 1,
    explanation:
      'Execution of a hosted C program begins at the main() function. The execution environment invokes main() after runtime initialization.',
  },
  {
    id: 'q3',
    num: '03',
    question: 'What is the purpose of #include <stdio.h> in this example?',
    options: [
      'It makes standard input/output declarations available.',
      'It automatically runs the program.',
      'It reserves a matrix.',
      'It terminates the program.',
    ],
    correctIndex: 0,
    explanation:
      'This preprocessor directive splices standard I/O declarations (such as the printf prototype) into the translation unit before compilation.',
  },
  {
    id: 'q4',
    num: '04',
    question: 'What does return 0; indicate when returned from main in this example?',
    options: [
      'Successful termination.',
      'A request to repeat the program.',
      'A syntax error.',
      'An instruction to print zero.',
    ],
    correctIndex: 0,
    explanation:
      'Returning zero from main indicates to the operating system shell that the program terminated cleanly and successfully.',
  },
];

export function KnowledgeCheck() {
  const reduced = useReducedMotion();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    // If already answered, don't allow changing unless retrying
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

  // Calculate live score
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
      aria-labelledby="knowledge-check-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>07 / VERIFICATION</span>
        <h2 id="knowledge-check-heading" className={styles.heading}>
          Before you move forward.
        </h2>
        <p className={styles.subheading}>
          Check whether you understand the fundamentals before continuing to the next lesson.
        </p>
      </div>

      {/* Score Banner */}
      <div className={styles.scoreBanner} role="status" aria-label="Knowledge Check Score">
        <div className={styles.scoreLeft}>
          <Award size={18} color="var(--color-accent-dark)" aria-hidden="true" />
          <span className={styles.scoreLabel}>Understanding Progress:</span>
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
            aria-label="Reset all questions"
          >
            <RotateCcw size={12} aria-hidden="true" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className={styles.quizList} role="list" aria-label="Multiple Choice Questions">
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

              {/* Options Grid */}
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

              {/* Answer Feedback */}
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

export default KnowledgeCheck;
