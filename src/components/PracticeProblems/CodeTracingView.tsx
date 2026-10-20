import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, ArrowLeft, RotateCcw, Terminal } from 'lucide-react';
import type { CodeTracingQuestion } from '../../data/practiceProblemsData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './CodeTracingView.module.css';

interface CodeTracingViewProps {
  questions: CodeTracingQuestion[];
}

export function CodeTracingView({ questions }: CodeTracingViewProps) {
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  if (questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex] || questions[0];
  const isCorrect = isRevealed && selectedChoice === currentQ.correctIndex;
  const lines = currentQ.code.split('\n');

  const handleSelectChoice = (idx: number) => {
    if (isRevealed) return;
    setSelectedChoice(idx);
  };

  const handleSubmitPrediction = () => {
    if (selectedChoice === null) return;
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setIsRevealed(false);
    } else {
      setCurrentIndex(0);
      setSelectedChoice(null);
      setIsRevealed(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedChoice(null);
      setIsRevealed(false);
    }
  };

  const handleRetry = () => {
    setSelectedChoice(null);
    setIsRevealed(false);
  };

  return (
    <div className={styles.tracingContainer}>
      {/* Top Meta Bar */}
      <div className={styles.topMetaBar}>
        <span>
          Code-Tracing Exercise <strong className={styles.topBadge}>{currentIndex + 1}</strong> of{' '}
          {questions.length}
        </span>
        <span>Predict Standard Output & Trace Memory Execution</span>
      </div>

      {/* 2-Column Split Layout */}
      <div className={styles.splitLayout}>
        {/* Left Column: Code Editor & Simulated Terminal */}
        <div className={styles.leftCol}>
          <div className={styles.editorCard}>
            <div className={styles.editorHeader}>
              <div className={styles.dots} aria-hidden="true">
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.tabTitle}>
                <span className={styles.tabDot} />
                <span>exercise_{currentIndex + 1}.c</span>
              </div>
              <span className={styles.editorLang}>C ISO-99</span>
            </div>

            <table className={styles.codeTable} role="presentation">
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={idx}>
                    <td className={styles.lineNum}>{idx + 1}</td>
                    <td className={styles.lineContent}>{line || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Terminal Output Reveal */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                className={styles.terminalCard}
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.terminalHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Terminal size={13} />
                    <span>STANDARD OUTPUT (STDOUT)</span>
                  </div>
                  <span>gcc -Wall</span>
                </div>
                <div className={styles.terminalBody}>
                  <div className={styles.cmdLine}>$ ./a.out</div>
                  <div className={styles.stdoutText}>{currentQ.terminalOutput}</div>
                  <div className={styles.exitStatus}>[Process completed with exit code 0]</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Question & Prediction Choice Panel */}
        <motion.div
          key={currentQ.id}
          className={styles.rightCol}
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardHeader}>
            <span className={styles.categoryBadge}>{currentQ.categoryLabel}</span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#78716c' }}>
              Level: {currentQ.difficulty}
            </span>
          </div>

          <h3 className={styles.questionTitle}>{currentQ.title}</h3>
          <p className={styles.questionPrompt}>{currentQ.question}</p>

          {/* Output Prediction Choices */}
          <div className={styles.optionsGrid} role="radiogroup" aria-label="Output predictions">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedChoice === idx;
              const isTargetCorrect = isRevealed && idx === currentQ.correctIndex;
              const isTargetWrong = isRevealed && isSelected && idx !== currentQ.correctIndex;

              return (
                <button
                  key={`${currentQ.id}-${idx}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isRevealed}
                  onClick={() => handleSelectChoice(idx)}
                  className={`${styles.choiceBtn} ${isSelected ? styles.choiceSelected : ''} ${
                    isTargetCorrect ? styles.choiceCorrect : ''
                  } ${isTargetWrong ? styles.choiceWrong : ''}`}
                >
                  <span className={styles.choiceLetter}>
                    {isTargetCorrect ? (
                      <Check size={13} />
                    ) : isTargetWrong ? (
                      <X size={13} />
                    ) : (
                      letter
                    )}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className={styles.retryBtn}
                  title="Previous Exercise"
                >
                  <ArrowLeft size={13} />
                  <span>Prev</span>
                </button>
              )}

              {!isRevealed ? (
                <button
                  type="button"
                  id="submitPredictionBtn"
                  onClick={handleSubmitPrediction}
                  disabled={selectedChoice === null}
                  className={styles.submitBtn}
                >
                  <span>Submit Prediction</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRetry}
                  className={styles.retryBtn}
                  aria-label="Retry Prediction"
                >
                  <RotateCcw size={13} />
                  <span>Retry</span>
                </button>
              )}
            </div>

            {isRevealed && (
              <button
                type="button"
                id="nextTracingBtn"
                onClick={handleNext}
                className={styles.nextBtn}
              >
                <span>{currentIndex === questions.length - 1 ? 'Start Over' : 'Next Exercise'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* Step-by-Step Execution Trace Breakdown */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                className={styles.traceCard}
                initial={reduced ? undefined : { opacity: 0, height: 0 }}
                animate={reduced ? undefined : { opacity: 1, height: 'auto' }}
                exit={reduced ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.traceTitle}>
                  {isCorrect ? '✓ Trace Verified' : 'Execution Trace'}
                </div>
                <ol className={styles.traceList}>
                  {currentQ.stepByStepTrace.map((step, sIdx) => (
                    <li key={sIdx} className={styles.traceItem}>
                      {step}
                    </li>
                  ))}
                </ol>
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#57534e' }}>
                  <strong>Key Takeaway:</strong> {currentQ.explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default CodeTracingView;
