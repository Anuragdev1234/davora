import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, ArrowLeft, RotateCcw, Award, Lightbulb, Sparkles } from 'lucide-react';
import type { SelfTestQuestion } from '../../data/practiceProblemsData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './SelfTestQuizView.module.css';

interface SelfTestQuizViewProps {
  questions: SelfTestQuestion[];
  onResetCategory?: () => void;
}

export function SelfTestQuizView({ questions, onResetCategory }: SelfTestQuizViewProps) {
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreRecord, setScoreRecord] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const totalCorrect = Object.values(scoreRecord).filter(Boolean).length;

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    setScoreRecord((prev) => ({ ...prev, [currentQ.id]: isCorrect }));
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScoreRecord({});
    setIsCompleted(false);
  };

  // Completion View
  if (isCompleted) {
    const accuracy = Math.round((totalCorrect / questions.length) * 100);
    return (
      <motion.div
        className={styles.completionCard}
        initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.completionTrophy}>
          <Award size={32} />
        </div>
        <h2 className={styles.completionHeading}>Quick Self-Test Complete</h2>
        <div className={styles.completionScore}>
          {totalCorrect} / {questions.length} Correct ({accuracy}%)
        </div>
        <p className={styles.completionSummary}>
          {accuracy >= 80
            ? 'Outstanding mastery of low-level C runtime concepts, call stacks, and execution logic!'
            : 'Good effort! Review the in-depth explanations and retry to reinforce base cases, pointer mechanics, and control flow.'}
        </p>

        <div className={styles.completionActions}>
          <button
            type="button"
            onClick={handleResetQuiz}
            className={styles.nextBtn}
            aria-label="Retry Quiz"
          >
            <RotateCcw size={15} />
            <span>Retry Self-Test</span>
          </button>
          {onResetCategory && (
            <button
              type="button"
              onClick={onResetCategory}
              className={styles.retryBtn}
              aria-label="Try Another Topic"
            >
              <span>Explore All Topics</span>
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  const isSelectedCorrect = isSubmitted && selectedOption === currentQ.correctIndex;

  return (
    <div className={styles.quizContainer}>
      {/* Progress Bar Track */}
      <div className={styles.progressCard}>
        <div className={styles.progressMeta}>
          <span>
            Question <strong>{currentIndex + 1}</strong> of {questions.length}
          </span>
          <span>
            {totalCorrect} of {Object.keys(scoreRecord).length} Solved Correctly
          </span>
        </div>
        <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQ.id}
        className={styles.questionCard}
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.cardTop}>
          <div className={styles.badgesGroup}>
            <span className={styles.categoryBadge}>{currentQ.categoryLabel}</span>
            <span
              className={`${styles.difficultyBadge} ${
                currentQ.difficulty === 'Beginner'
                  ? styles.diffBeginner
                  : currentQ.difficulty === 'Intermediate'
                  ? styles.diffIntermediate
                  : styles.diffAdvanced
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>

          <div className={styles.keyConceptTag}>
            <Lightbulb size={12} />
            <span>{currentQ.keyConcept}</span>
          </div>
        </div>

        {/* Question Statement */}
        <h3 className={styles.questionStatement}>{currentQ.question}</h3>

        {/* Options List */}
        <div className={styles.optionsList} role="radiogroup" aria-label={currentQ.question}>
          {currentQ.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;
            const isTargetCorrect = isSubmitted && idx === currentQ.correctIndex;
            const isTargetWrong = isSubmitted && isSelected && idx !== currentQ.correctIndex;

            return (
              <button
                key={`${currentQ.id}-${idx}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`${styles.optionBtn} ${isSelected ? styles.optionSelected : ''} ${
                  isTargetCorrect ? styles.optionCorrect : ''
                } ${isTargetWrong ? styles.optionIncorrect : ''}`}
              >
                <span className={styles.optionLetter}>
                  {isTargetCorrect ? <Check size={14} /> : isTargetWrong ? <X size={14} /> : letter}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className={styles.actionsBar}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className={styles.retryBtn}
                title="Previous Question"
              >
                <ArrowLeft size={14} />
                <span>Prev</span>
              </button>
            )}

            {!isSubmitted ? (
              <button
                type="button"
                id="checkAnswerBtn"
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className={styles.checkBtn}
                aria-label="Check Selected Answer"
              >
                <Sparkles size={14} />
                <span>Check Answer</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRetryQuestion}
                className={styles.retryBtn}
                aria-label="Retry this question"
              >
                <RotateCcw size={13} />
                <span>Retry</span>
              </button>
            )}
          </div>

          {isSubmitted && (
            <button
              type="button"
              id="nextQuestionBtn"
              onClick={handleNext}
              className={styles.nextBtn}
              aria-label={currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            >
              <span>{currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* In-Depth Explanation Feedback */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className={styles.explanationCard}
              initial={reduced ? undefined : { opacity: 0, height: 0 }}
              animate={reduced ? undefined : { opacity: 1, height: 'auto' }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={`${styles.explanationHeader} ${
                  isSelectedCorrect ? styles.headerCorrect : styles.headerIncorrect
                }`}
              >
                {isSelectedCorrect ? (
                  <>
                    <Check size={16} />
                    <span>Correct Reasoning</span>
                  </>
                ) : (
                  <>
                    <X size={16} />
                    <span>Incorrect — Takeaway Below</span>
                  </>
                )}
              </div>
              <p className={styles.explanationText}>{currentQ.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SelfTestQuizView;
