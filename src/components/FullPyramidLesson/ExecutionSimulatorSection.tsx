import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { generateFullPyramidSimulationSteps } from './simulationEngine';
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
  '        for (int j = 1; j <= n - i; j++) {',
  '            printf(" ");',
  '        }',
  '',
  '        for (int k = 1; k <= 2 * i - 1; k++) {',
  '            printf("*");',
  '        }',
  '',
  '        printf("\\n");',
  '    }',
  '',
  '    return 0;',
  '}',
];

export const ExecutionSimulatorSection: React.FC<ExecutionSimulatorSectionProps> = ({
  rowCount,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const playTimerRef = useRef<number | null>(null);

  // Generate trace steps whenever rowCount changes
  const steps = useMemo(() => {
    return generateFullPyramidSimulationSteps(rowCount);
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
          <div className={styles.sectionNumber}>SCENE 07 &bull; DUAL-LOOP EXECUTION SIMULATOR</div>
          <h2 className={styles.sectionTitle}>Watch the Computer Execute</h2>
          <p className={styles.sectionDesc}>
            Observe how the computer alternates between Inner Loop 1 (printing leading spaces) and Inner Loop 2 (printing odd stars)
            for each row <code>i</code>, right up to the final row where leading spaces become 0 and star count reaches <code>2n - 1</code>.
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
            Step <strong>{currentStepIdx + 1}</strong> of {steps.length} &bull; n = {rowCount}
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
              <span className={styles.varsTitle}>Variable Inspector</span>
              <span className={styles.varsBadge}>
                Row {currentStep.currentRow > 0 ? currentStep.currentRow : '—'} of {rowCount}
              </span>
            </div>

            <div className={styles.varsList}>
              <div className={styles.varCard}>
                <span className={styles.varName}>n (target rows)</span>
                <span className={styles.varValue}>{currentStep.vars.n}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>i (row counter)</span>
                <span className={styles.varValue}>{currentStep.vars.i}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>j (space counter)</span>
                <span className={styles.varValue}>{currentStep.vars.j}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>k (star counter)</span>
                <span className={styles.varValue}>{currentStep.vars.k}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>n - i (spaces needed)</span>
                <span className={styles.varValue} style={{ color: '#2563eb' }}>{currentStep.vars.nMinusI}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>2*i - 1 (stars needed)</span>
                <span className={styles.varValue} style={{ color: '#2563eb' }}>{currentStep.vars.twoIMinusOne}</span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>i &le; n (outer)</span>
                <span className={`${styles.varCond} ${getCondClass(currentStep.vars.condOuter)}`}>
                  {currentStep.vars.condOuter}
                </span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>j &le; n - i (spaces)</span>
                <span className={`${styles.varCond} ${getCondClass(currentStep.vars.condSpace)}`}>
                  {currentStep.vars.condSpace}
                </span>
              </div>

              <div className={styles.varCard}>
                <span className={styles.varName}>k &le; 2i - 1 (stars)</span>
                <span className={`${styles.varCond} ${getCondClass(currentStep.vars.condStar)}`}>
                  {currentStep.vars.condStar}
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Terminal Console Output */}
          <div className={styles.terminalCol}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.terminalTitle}>stdout (console)</span>
            </div>

            <pre className={styles.terminalOutput}>
              {currentStep.output}
              <span className={styles.cursorBlink} />
            </pre>
          </div>
        </div>

        {/* Bottom CPU Step Description Box */}
        <div className={styles.stepDescBox}>
          <strong>CPU Operation:</strong> {currentStep.description}
        </div>
      </div>
    </section>
  );
};
