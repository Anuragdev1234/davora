import { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { generateSimulationSteps } from './simulationEngine';
import styles from './ExecutionSimulatorSection.module.css';

interface ExecutionSimulatorSectionProps {
  rowCount: number;
}

const C_PROGRAM_LINES = [
  '#include <stdio.h>',
  '',
  'int main(void) {',
  '    int n;',
  '',
  '    printf("Enter the number of rows (1-10): ");',
  '',
  '    if (scanf("%d", &n) != 1 || n < 1 || n > 10) {',
  '        printf("Invalid input. Enter a number from 1 to 10.\\n");',
  '        return 1;',
  '    }',
  '',
  '    for (int i = 1; i <= n; i++) {',
  '        for (int j = 1; j <= i; j++) {',
  '            printf("* ");',
  '        }',
  '        printf("\\n");',
  '    }',
  '',
  '    return 0;',
  '}',
];

export function ExecutionSimulatorSection({
  rowCount,
}: ExecutionSimulatorSectionProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const playTimerRef = useRef<number | null>(null);

  // Generate trace steps whenever rowCount changes
  const steps = useMemo(() => {
    return generateSimulationSteps(rowCount);
  }, [rowCount]);

  // Reset to step 0 when rowCount changes
  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [rowCount]);

  const currentStep = steps[currentStepIdx] || steps[0];

  // Play / Pause auto stepper
  useEffect(() => {
    if (isPlaying) {
      const delay = speed === 1 ? 900 : 450;
      playTimerRef.current = window.setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            if (playTimerRef.current) clearInterval(playTimerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleReplay = () => {
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const getCondClass = (val: string) => {
    if (val.includes('true')) return styles.condTrue;
    if (val.includes('false')) return styles.condFalse;
    return styles.condNone;
  };

  return (
    <section className={styles.section} id="execution-simulator" aria-label="07 Watch the Computer Execute">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>07 / Watch the Computer Think</div>
          <h2 className={styles.sectionTitle}>Step-by-Step Nested Loop Simulation</h2>
          <p className={styles.sectionDesc}>
            A computer follows the instructions exactly. Let's track the variables and
            watch the pattern appear star by star.
          </p>
        </div>

        {/* Simulator Controls Bar */}
        <div className={styles.simControlsBar}>
          <div className={styles.controlsGroup}>
            <button
              type="button"
              className={styles.simBtn}
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              aria-label="Previous execution step"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            <button
              type="button"
              className={`${styles.simBtn} ${styles.simBtnPrimary}`}
              onClick={handleNext}
              disabled={currentStepIdx >= steps.length - 1}
              aria-label="Next execution step"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              className={styles.simBtn}
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              className={styles.simBtn}
              onClick={handleReset}
              aria-label="Reset simulation"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              className={styles.simBtn}
              onClick={handleReplay}
              aria-label="Replay simulation"
            >
              <RefreshCw size={14} />
              <span>Replay</span>
            </button>

            <div className={styles.speedToggle}>
              <button
                type="button"
                className={`${styles.speedBtn} ${speed === 1 ? styles.speedBtnActive : ''}`}
                onClick={() => setSpeed(1)}
              >
                1x
              </button>
              <button
                type="button"
                className={`${styles.speedBtn} ${speed === 2 ? styles.speedBtnActive : ''}`}
                onClick={() => setSpeed(2)}
              >
                2x
              </button>
            </div>
          </div>

          <div className={styles.stepIndicator}>
            Step <strong>{currentStepIdx + 1}</strong> of {steps.length} · n = {rowCount}
          </div>
        </div>

        {/* Three Column Grid: Source Line, Variables, Terminal */}
        <div className={styles.simulatorGrid}>
          {/* Column 1: Source Code View with Moving Line Highlight */}
          <div className={styles.sourceCol}>
            <div className={styles.colHeader}>
              <span>Executing Source Code</span>
            </div>

            <div className={styles.sourceScroll}>
              {C_PROGRAM_LINES.map((codeStr, idx) => {
                const lineNum = idx + 1;
                const isCurrentExecuting = currentStep.line === lineNum;
                return (
                  <div
                    key={lineNum}
                    className={`${styles.simLine} ${
                      isCurrentExecuting ? styles.simLineActive : ''
                    }`}
                  >
                    <span className={styles.simLineNum}>{lineNum}</span>
                    <span className={styles.simLineCode}>{codeStr}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Live Variable State */}
          <div className={styles.variablesCol}>
            <div className={styles.varsHeader}>
              <span className={styles.varsTitle}>Variable State</span>
              <span className={styles.varsBadge}>
                Row {currentStep.currentRow > 0 ? currentStep.currentRow : '—'}
              </span>
            </div>

            <div className={styles.varsList}>
              <div className={styles.varCard}>
                <span className={styles.varName}>n (target rows)</span>
                <span className={styles.varValue}>{currentStep.vars.n}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>i (outer counter)</span>
                <span className={styles.varValue}>{currentStep.vars.i}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>j (inner counter)</span>
                <span className={styles.varValue}>{currentStep.vars.j}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>i &lt;= n</span>
                <span className={`${styles.varCond} ${getCondClass(currentStep.vars.condOuter)}`}>
                  {currentStep.vars.condOuter}
                </span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>j &lt;= i</span>
                <span className={`${styles.varCond} ${getCondClass(currentStep.vars.condInner)}`}>
                  {currentStep.vars.condInner}
                </span>
              </div>
            </div>

            {/* Current Step Description Card */}
            <div className={styles.stepExplainerBox}>
              <div className={styles.stepExplainerTitle}>Current Action</div>
              <div className={styles.stepExplainerText}>{currentStep.description}</div>
            </div>
          </div>

          {/* Column 3: Terminal Output Stream */}
          <div className={styles.terminalCol}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalTitle}>Standard Output Terminal</span>
              <span style={{ fontSize: '0.6875rem', color: '#c5e97b', fontFamily: 'monospace' }}>
                stdout (active)
              </span>
            </div>

            <div className={styles.terminalStream} aria-live="polite">
              {currentStep.output}
              <span className={styles.cursorBlink} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
