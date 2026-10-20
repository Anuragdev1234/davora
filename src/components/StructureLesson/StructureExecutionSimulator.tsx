import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Check,
  Cpu,
  Layers,
} from 'lucide-react';
import { EXECUTION_STEPS } from '../../data/structureLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './StructureExecutionSimulator.module.css';

interface StructureExecutionSimulatorProps {
  onStepChange?: (stepIndex: number) => void;
}

export function StructureExecutionSimulator({
  onStepChange,
}: StructureExecutionSimulatorProps) {
  const reduced = useReducedMotion();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const activeStep = EXECUTION_STEPS[currentStepIndex];

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStepIndex);
    }
  }, [currentStepIndex, onStepChange]);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= EXECUTION_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, EXECUTION_STEPS.length - 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= EXECUTION_STEPS.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="how-it-works" className={styles.sectionWrapper} aria-labelledby="simulator-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>04</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>EXECUTION TIMELINE</span>
          </div>

          <h2 id="simulator-heading" className={styles.mainHeading}>
            See how it works.
          </h2>

          <p className={styles.subHeading}>
            Step-by-step animation &bull; Trace how execution flows through main() and initializes
            variables in local scope.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className={styles.simGrid}>
          {/* Left: 4-Step Vertical Stepper */}
          <div className={styles.timelineCol}>
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <Cpu size={15} className={styles.cpuIcon} aria-hidden="true" />
                <span>Execution Steps</span>
              </div>

              <div className={styles.stepsList}>
                {EXECUTION_STEPS.map((step, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isDone = idx < currentStepIndex;

                  return (
                    <div
                      key={step.step}
                      className={`${styles.stepRow} ${isActive ? styles.stepRowActive : ''}`}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIndex(idx);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {/* Node circle & vertical connecting line */}
                      <div className={styles.nodeColumn}>
                        <div
                          className={`${styles.nodeCircle} ${
                            isActive ? styles.nodeActive : ''
                          } ${isDone ? styles.nodeDone : ''}`}
                        >
                          {isDone ? (
                            <Check size={11} className={styles.doneCheck} aria-hidden="true" />
                          ) : (
                            <span>{step.step}</span>
                          )}
                        </div>
                        {idx < EXECUTION_STEPS.length - 1 && (
                          <div
                            className={`${styles.connectingLine} ${
                              isDone ? styles.lineDone : ''
                            }`}
                          />
                        )}
                      </div>

                      {/* Step Code Snippet and Label */}
                      <div className={styles.stepInfo}>
                        <code className={styles.stepCode}>{step.codeSnippet}</code>
                        <span className={styles.stepTitleLabel}>{step.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Active Step Inspector & Conceptual Memory Watch */}
          <div className={styles.inspectorCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.step}
                className={styles.inspectorCard}
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.inspectorTop}>
                  <span className={styles.stepCounterBadge}>
                    Step {activeStep.step} of {EXECUTION_STEPS.length}
                  </span>
                  <div className={styles.instructionBadge}>
                    Line {activeStep.highlightLine}
                  </div>
                </div>

                <h3 className={styles.inspectorTitle}>{activeStep.title}</h3>
                <p className={styles.inspectorDesc}>{activeStep.description}</p>

                {/* Conceptual Memory Watch Widget */}
                <div className={styles.variableWatch}>
                  <div className={styles.watchHeader}>
                    <div className={styles.watchHeaderLeft}>
                      <Layers size={14} className={styles.memoryIcon} aria-hidden="true" />
                      <span>Conceptual Memory Model &bull; main() Scope</span>
                    </div>
                    <span
                      className={`${styles.statusPill} ${
                        activeStep.variableState.isAllocated
                          ? styles.statusPillActive
                          : styles.statusPillPending
                      }`}
                    >
                      {activeStep.variableState.isAllocated ? 'Initialized' : 'Not initialized'}
                    </span>
                  </div>

                  <div className={styles.watchGrid}>
                    <div className={styles.watchItem}>
                      <span className={styles.watchLabel}>Variable</span>
                      <span className={styles.watchValIdentifier}>
                        {activeStep.variableState.name}
                      </span>
                    </div>

                    <div className={styles.watchItem}>
                      <span className={styles.watchLabel}>Type</span>
                      <span className={styles.watchVal}>
                        {activeStep.variableState.type}
                      </span>
                    </div>

                    <div className={styles.watchItem}>
                      <span className={styles.watchLabel}>Value</span>
                      <span
                        className={`${styles.watchValBig} ${
                          activeStep.variableState.isAllocated
                            ? styles.valHighlighted
                            : styles.valMuted
                        }`}
                      >
                        {activeStep.variableState.value}
                      </span>
                    </div>

                    <div className={styles.watchItem}>
                      <span className={styles.watchLabel}>Scope Status</span>
                      <span className={styles.watchValStatus}>
                        {activeStep.variableState.isAllocated
                          ? 'Stored in local function frame'
                          : 'Awaiting initialization'}
                      </span>
                    </div>
                  </div>

                  {/* Synchronized Terminal Output Callout */}
                  {activeStep.terminalOutput && (
                    <div className={styles.simTerminalOutput}>
                      <span className={styles.simTerminalLabel}>Emitted Output:</span>
                      <code className={styles.simTerminalCode}>
                        {activeStep.terminalOutput}
                      </code>
                    </div>
                  )}
                </div>

                {/* Controls Bar */}
                <div className={styles.controlBar}>
                  <div className={styles.controlLeft}>
                    <button
                      type="button"
                      className={styles.resetBtn}
                      onClick={handleReset}
                      aria-label="Reset simulation to beginning"
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                      <span>Reset</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}
                      onClick={handleTogglePlay}
                      aria-label={isPlaying ? 'Pause simulation' : 'Auto play simulation'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause size={14} aria-hidden="true" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play size={14} aria-hidden="true" />
                          <span>Auto Play</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className={styles.controlRight}>
                    <button
                      type="button"
                      className={styles.stepBtn}
                      onClick={handlePrev}
                      disabled={currentStepIndex === 0}
                      aria-label="Previous step"
                    >
                      <ArrowLeft size={14} aria-hidden="true" />
                      <span>Prev</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.stepBtn} ${styles.stepBtnPrimary}`}
                      onClick={handleNext}
                      disabled={currentStepIndex === EXECUTION_STEPS.length - 1}
                      aria-label="Next step"
                    >
                      <span>Next</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StructureExecutionSimulator;
