import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import styles from './VisualizingCallsSection.module.css';

interface StepDetail {
  stepIndex: number;
  label: string;
  description: string;
  activeLine: 'call' | 'base' | 'print' | 'none';
  stack: string[];
  output: number[];
}

const STEPS: StepDetail[] = [
  {
    stepIndex: 1,
    label: 'Call printNumbers(3)',
    description: 'main() invokes printNumbers(3). A new stack frame is pushed for n = 3.',
    activeLine: 'call',
    stack: ['printNumbers(3)'],
    output: [],
  },
  {
    stepIndex: 2,
    label: 'Calls printNumbers(2)',
    description: 'printNumbers(3) evaluates if (n == 0) -> false. Calls printNumbers(2). printf statement remains pending!',
    activeLine: 'call',
    stack: ['printNumbers(3)', 'printNumbers(2)'],
    output: [],
  },
  {
    stepIndex: 3,
    label: 'Calls printNumbers(1)',
    description: 'printNumbers(2) evaluates if (n == 0) -> false. Calls printNumbers(1).',
    activeLine: 'call',
    stack: ['printNumbers(3)', 'printNumbers(2)', 'printNumbers(1)'],
    output: [],
  },
  {
    stepIndex: 4,
    label: 'Calls printNumbers(0)',
    description: 'printNumbers(1) calls printNumbers(0). Stack depth reaches maximum (4 frames).',
    activeLine: 'base',
    stack: ['printNumbers(3)', 'printNumbers(2)', 'printNumbers(1)', 'printNumbers(0)'],
    output: [],
  },
  {
    stepIndex: 5,
    label: 'Base case: returns',
    description: 'In printNumbers(0), n == 0 is true! It hits return. Stack frame for printNumbers(0) pops off without printing.',
    activeLine: 'base',
    stack: ['printNumbers(3)', 'printNumbers(2)', 'printNumbers(1)'],
    output: [],
  },
  {
    stepIndex: 6,
    label: 'Calls return, printing 1, 2, 3',
    description: 'Unwinding begins! printNumbers(1) resumes and prints 1; returns to printNumbers(2) which prints 2; returns to printNumbers(3) which prints 3.',
    activeLine: 'print',
    stack: [],
    output: [1, 2, 3],
  },
];

export function VisualizingCallsSection() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1900);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  const currentStep = STEPS[currentStepIdx];

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.min(STEPS.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleReplay = () => {
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  return (
    <section className={styles.sectionWrapper} id="visualizing-calls">
      <div className={styles.container}>
        <div id="section-visualizing-calls">
          {/* Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>03</span>
            <h2 className={styles.sectionTitle}>Visualizing Recursive Calls</h2>
            <p className={styles.sectionSubtitle}>
              Each function call is added to the call stack. When the base case is reached, the
              calls return in reverse order.
            </p>
          </div>

          <div className={styles.visualizerBoard}>
            {/* Top Code Box */}
            <div className={styles.topCodeStrip}>
              <span style={{ color: '#64748b' }}>// The printf executes AFTER the recursive call</span>
              <br />
              <span style={{ color: '#38bdf8' }}>void</span> printNumbers(
              <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
              <br />
              <div
                style={{
                  paddingLeft: '1.25rem',
                  background:
                    currentStep.activeLine === 'base'
                      ? 'rgba(56, 189, 248, 0.25)'
                      : 'transparent',
                  borderRadius: 4,
                }}
              >
                <span style={{ color: '#f43f5e' }}>if</span> (n == 0) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem', color: '#10b981', fontWeight: 700 }}>
                  return; // Base Case
                </span>
                <br />
                {'}'}
              </div>
              <br />
              <div
                style={{
                  paddingLeft: '1.25rem',
                  background:
                    currentStep.activeLine === 'call'
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'transparent',
                  borderRadius: 4,
                }}
              >
                printNumbers(n - 1); <span style={{ color: '#64748b' }}>// 1. Recursive Call goes down first</span>
              </div>
              <div
                style={{
                  paddingLeft: '1.25rem',
                  background:
                    currentStep.activeLine === 'print'
                      ? 'rgba(34, 197, 94, 0.25)'
                      : 'transparent',
                  borderRadius: 4,
                }}
              >
                printf(<span style={{ color: '#86efac' }}>"%d\\n"</span>, n);{' '}
                <span style={{ color: '#64748b' }}>// 2. Prints on the way back up!</span>
              </div>
              {'}'}
            </div>

            {/* 3 Columns */}
            <div className={styles.threeColumnGrid}>
              {/* Col 1: Execution Steps */}
              <div className={styles.columnCard}>
                <div className={styles.columnTitle}>
                  <span>Execution Steps</span>
                  <span style={{ fontSize: '0.7rem', color: '#2563eb' }}>
                    Step {currentStepIdx + 1} of {STEPS.length}
                  </span>
                </div>

                <div className={styles.stepList}>
                  {STEPS.map((s, idx) => {
                    const isActive = idx === currentStepIdx;
                    return (
                      <div
                        key={s.stepIndex}
                        className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ''}`}
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentStepIdx(idx);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <span
                          className={`${styles.stepNumberCircle} ${
                            isActive ? styles.stepNumberActive : ''
                          }`}
                        >
                          {s.stepIndex}
                        </span>
                        <span>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Col 2: Call Stack */}
              <div className={styles.columnCard}>
                <div className={styles.columnTitle}>
                  <span>Call Stack (n = 3)</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>LIFO</span>
                </div>

                <div className={styles.stackFramesContainer}>
                  {currentStep.stack.length === 0 ? (
                    <div
                      style={{
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: '#10b981',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        background: '#ecfdf5',
                        borderRadius: 8,
                        border: '1px dashed #6ee7b7',
                      }}
                    >
                      ✓ All frames popped. Stack empty!
                    </div>
                  ) : (
                    currentStep.stack.map((frame, idx) => {
                      const isTop = idx === currentStep.stack.length - 1;
                      const isBase = frame.includes('0');
                      return (
                        <div
                          key={frame}
                          className={`${styles.stackFrameNode} ${
                            isBase ? styles.stackFrameNodeBase : ''
                          } ${isTop ? styles.stackFrameTop : ''}`}
                        >
                          <span>{frame}</span>
                          <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>
                            {isBase ? 'Base Case' : isTop ? 'Active' : 'Pending'}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Col 3: Output */}
              <div className={styles.columnCard}>
                <div className={styles.columnTitle}>
                  <span>Output (During Return)</span>
                  <span style={{ fontSize: '0.7rem', color: '#10b981' }}>Terminal</span>
                </div>

                <div className={styles.outputConsole}>
                  {currentStep.output.length === 0 ? (
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                      &gt; Awaiting return phase...
                    </span>
                  ) : (
                    currentStep.output.map((val) => (
                      <div key={val} style={{ color: '#4ade80', fontWeight: 700 }}>
                        &gt; {val}
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.outputArrowUp}>
                  <ArrowUp size={14} />
                  <span>Returns (Results flow back up)</span>
                </div>
              </div>
            </div>

            {/* Step commentary notice */}
            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 10,
                padding: '0.85rem 1.25rem',
                fontSize: '0.84rem',
                color: '#1e40af',
                marginBottom: '1.25rem',
              }}
            >
              <strong>Step {currentStepIdx + 1}:</strong> {currentStep.description}
            </div>

            {/* Controls Bar */}
            <div className={styles.controlsBar}>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.ctrlBtn}
                  onClick={handlePrev}
                  disabled={currentStepIdx === 0}
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  className={`${styles.ctrlBtn} ${styles.ctrlBtnPrimary}`}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                  <span>{isPlaying ? 'Pause' : 'Play Sequence'}</span>
                </button>
                <button
                  type="button"
                  className={styles.ctrlBtn}
                  onClick={handleNext}
                  disabled={currentStepIdx === STEPS.length - 1}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className={styles.buttonGroup}>
                <button type="button" className={styles.ctrlBtn} onClick={handleReset}>
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
                <button type="button" className={styles.ctrlBtn} onClick={handleReplay}>
                  <Play size={14} fill="currentColor" />
                  <span>Replay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
