import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import styles from './NestedAndFlowControlSection.module.css';

export function NestedAndFlowControlSection() {
  // ── 06: Nested Loop State ──
  // Grid: 3 rows x 4 columns = 12 total cells
  const [nestedStep, setNestedStep] = useState<number>(12); // completed by default
  const [isAnimatingNested, setIsAnimatingNested] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isAnimatingNested) {
      timer = setInterval(() => {
        setNestedStep((prev) => {
          if (prev >= 12) {
            setIsAnimatingNested(false);
            return 12;
          }
          return prev + 1;
        });
      }, 350);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAnimatingNested]);

  const handleStartNested = () => {
    setNestedStep(0);
    setIsAnimatingNested(true);
  };

  const handleStepNested = () => {
    setIsAnimatingNested(false);
    if (nestedStep < 12) {
      setNestedStep((prev) => prev + 1);
    }
  };

  const currentRow = Math.min(3, Math.floor(nestedStep / 4) + 1);

  // ── 07: Infinite Loop State ──
  const [infiniteRunning, setInfiniteRunning] = useState<boolean>(false);
  const [infiniteLines, setInfiniteLines] = useState<string[]>([
    'Running... (iteration 1)',
    'Running... (iteration 2)',
    'Running... (iteration 3)',
  ]);
  const [infiniteCount, setInfiniteCount] = useState<number>(3);
  const [missingUpdateTab, setMissingUpdateTab] = useState<'buggy' | 'fixed'>('buggy');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (infiniteRunning) {
      timer = setInterval(() => {
        setInfiniteCount((prev) => {
          if (prev >= 12) {
            setInfiniteRunning(false);
            return prev;
          }
          const next = prev + 1;
          setInfiniteLines((lines) => [...lines.slice(-6), `Running... (iteration ${next})`]);
          return next;
        });
      }, 400);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [infiniteRunning]);

  return (
    <section className={styles.sectionWrapper} id="nested-and-flow-control">
      <div className={styles.container}>
        {/* ==========================================================
            06 / NESTED LOOPS
            ========================================================== */}
        <div id="section-nested-loops">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>06</span>
              <span>/</span>
              <span>Multi-Dimensional Iteration</span>
            </div>
            <h3 className={styles.mainHeading}>Nested Loops</h3>
            <p className={styles.subHeading}>
              A nested loop is a loop placed inside another loop. The inner loop completes all its
              iterations for each individual iteration of the outer loop.
            </p>
          </div>

          <div className={styles.nestedGrid}>
            {/* Code Editor */}
            <div className={styles.editorCard}>
              <div className={styles.editorTitleBar}>
                <div className={styles.macDots}>
                  <span className={`${styles.macDot} ${styles.macDotRed}`} style={{ background: '#ef4444' }} />
                  <span className={`${styles.macDot} ${styles.macDotAmber}`} style={{ background: '#f59e0b' }} />
                  <span className={`${styles.macDot} ${styles.macDotGreen}`} style={{ background: '#10b981' }} />
                </div>
                <span>nested_rect.c</span>
                <span />
              </div>
              <pre className={styles.codeArea}>
{`#include <stdio.h>

int main(void) {
    // Outer loop runs 3 times (rows 1..3)
    for (int row = 1; row <= 3; row++) {
        // Inner loop runs 4 times (cols 1..4)
        for (int col = 1; col <= 4; col++) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}`}
              </pre>
            </div>

            {/* Visual Star Grid (3 x 4) */}
            <div className={styles.starVisualizerCard}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                    Visual Grid Execution (3 × 4)
                  </h4>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={handleStartNested}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <RotateCcw size={12} />
                      <span>Replay</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStepNested}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#2563EB',
                        color: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Step ({nestedStep}/12)
                    </button>
                  </div>
                </div>

                <div className={styles.starGridWrapper}>
                  {[1, 2, 3].map((r) => {
                    const isRowActive = currentRow === r && nestedStep > 0 && nestedStep < 12;
                    return (
                      <div key={r} className={styles.starRow}>
                        <span
                          className={`${styles.rowLabel} ${
                            isRowActive ? styles.rowActiveLabel : ''
                          }`}
                        >
                          Row {r} {isRowActive && '▶'}
                        </span>
                        <div className={styles.starCellsContainer}>
                          {[1, 2, 3, 4].map((c) => {
                            const cellIdx = (r - 1) * 4 + c;
                            const isPrinted = nestedStep >= cellIdx;
                            const isCurrent = nestedStep === cellIdx;
                            return (
                              <div
                                key={c}
                                className={`${styles.starCell} ${
                                  isCurrent
                                    ? styles.starCellActive
                                    : isPrinted
                                    ? styles.starCellCompleted
                                    : ''
                                }`}
                              >
                                {isPrinted ? '★' : '·'}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real Counters */}
              <div className={styles.starStatsRow}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>3</div>
                  <div className={styles.statLabel}>Outer Loop (Rows)</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>4</div>
                  <div className={styles.statLabel}>Inner Loop per Row</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{nestedStep} / 12</div>
                  <div className={styles.statLabel}>Total Executions (3 × 4)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            07 / INFINITE LOOPS
            ========================================================== */}
        <div id="section-infinite-loops">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>07</span>
              <span>/</span>
              <span>Termination Boundaries</span>
            </div>
            <h3 className={styles.mainHeading}>Infinite Loops</h3>
            <p className={styles.subHeading}>
              An infinite loop continues indefinitely because its termination condition never
              becomes false, or because it has no terminating condition.
            </p>
          </div>

          <div className={styles.infiniteGrid}>
            {/* Simulation 1: while(1) */}
            <div className={styles.infiniteCard}>
              <h4 className={styles.infiniteCardTitle}>Safe Simulation: while (1)</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Because 1 is non-zero, the test is permanently true. Observe the output simulation safely below.
              </p>

              <div className={styles.infiniteTerminalBox}>
                {infiniteLines.map((line, idx) => (
                  <div key={idx}>&gt; {line}</div>
                ))}
                {infiniteCount >= 12 && (
                  <div style={{ color: '#fbbf24', marginTop: 4 }}>
                    [Safely paused at demonstration limit. In C without interruption, this runs forever!]
                  </div>
                )}
              </div>

              <div className={styles.infiniteControlsBar}>
                <button
                  type="button"
                  className={`${styles.infiniteToggleBtn} ${
                    infiniteRunning ? styles.infiniteToggleBtnActive : ''
                  }`}
                  onClick={() => setInfiniteRunning((prev) => !prev)}
                >
                  {infiniteRunning ? <Pause size={14} /> : <Play size={14} />}
                  <span>{infiniteRunning ? 'Pause Loop' : 'Run Infinite Loop'}</span>
                </button>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Simulated safety sandbox active
                </span>
              </div>
            </div>

            {/* Simulation 2: Missing Update */}
            <div className={styles.infiniteCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className={styles.infiniteCardTitle}>The Missing-Update Bug</h4>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    type="button"
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: missingUpdateTab === 'buggy' ? '#ef4444' : '#ffffff',
                      color: missingUpdateTab === 'buggy' ? '#ffffff' : '#475569',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => setMissingUpdateTab('buggy')}
                  >
                    Without i++ (Bug)
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: missingUpdateTab === 'fixed' ? '#059669' : '#ffffff',
                      color: missingUpdateTab === 'fixed' ? '#ffffff' : '#475569',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => setMissingUpdateTab('fixed')}
                  >
                    With i++ (Fixed)
                  </button>
                </div>
              </div>

              {missingUpdateTab === 'buggy' ? (
                <>
                  <pre className={styles.missingUpdateBox}>
{`int i = 1;

while (i <= 5) {
    printf("%d\\n", i);
    // Missing i++ update!
}`}
                  </pre>
                  <div style={{ background: '#fef2f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '10px 12px', fontSize: '0.78rem', color: '#991b1b', lineHeight: 1.45 }}>
                    <strong>Consequence:</strong> Variable <code>i</code> stays <code>1</code> forever. The condition <code>1 &lt;= 5</code> remains continuously true.
                  </div>
                </>
              ) : (
                <>
                  <pre className={styles.missingUpdateBox}>
{`int i = 1;

while (i <= 5) {
    printf("%d\\n", i);
    i++; // Advances 1 -> 2 -> 3 -> 4 -> 5 -> 6
}`}
                  </pre>
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px 12px', fontSize: '0.78rem', color: '#065f46', lineHeight: 1.45 }}>
                    <strong>Consequence:</strong> When <code>i</code> reaches <code>6</code>, the condition <code>6 &lt;= 5</code> evaluates to false (0), terminating cleanly!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================================
            08 / CHANGING THE FLOW: BREAK AND CONTINUE
            ========================================================== */}
        <div id="section-flow-control">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>08</span>
              <span>/</span>
              <span>Control Flow Interruptions</span>
            </div>
            <h3 className={styles.mainHeading}>Changing the Flow: break and continue</h3>
            <p className={styles.subHeading}>
              C provides two jump statements that alter the normal sequential loop flow: <code>break</code> terminates the entire loop early, while <code>continue</code> skips only the remainder of the current iteration.
            </p>
          </div>

          <div className={styles.flowControlGrid}>
            {/* Card 1: break */}
            <div className={styles.flowControlCard} style={{ borderTop: '4px solid #ef4444' }}>
              <span className={styles.flowBadge} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                break Statement
              </span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569' }}>
                Exits the loop immediately when <code>i == 5</code>, skipping all iterations from 5 onwards.
              </p>

              <pre style={{ background: '#141614', color: '#d1d5db', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'monospace' }}>
{`for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break; // immediate exit!
    }
    printf("%d ", i);
}`}
              </pre>

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                Execution Timeline (Iteration 1..10):
              </div>
              <div className={styles.flowTimeline}>
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={`${styles.flowPill} ${styles.flowPillNormal}`}>{n}</span>
                ))}
                <span className={`${styles.flowPill} ${styles.flowPillBreak}`}>5 ✕</span>
                {[6, 7, 8, 9, 10].map((n) => (
                  <span key={n} className={styles.flowPill} style={{ opacity: 0.4 }}>{n}</span>
                ))}
              </div>

              <div className={styles.flowOutputSummary}>
                <span style={{ color: '#64748b' }}>Stdout result:</span>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>1 2 3 4</span>
              </div>
            </div>

            {/* Card 2: continue */}
            <div className={styles.flowControlCard} style={{ borderTop: '4px solid #f59e0b' }}>
              <span className={styles.flowBadge} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>
                continue Statement
              </span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569' }}>
                Skips the remaining body for <code>i == 3</code> and jumps straight to the increment step.
              </p>

              <pre style={{ background: '#141614', color: '#d1d5db', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'monospace' }}>
{`for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // skip printf!
    }
    printf("%d ", i);
}`}
              </pre>

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                Execution Timeline (Iteration 1..5):
              </div>
              <div className={styles.flowTimeline}>
                {[1, 2].map((n) => (
                  <span key={n} className={`${styles.flowPill} ${styles.flowPillNormal}`}>{n}</span>
                ))}
                <span className={`${styles.flowPill} ${styles.flowPillSkipped}`}>3 ↷</span>
                {[4, 5].map((n) => (
                  <span key={n} className={`${styles.flowPill} ${styles.flowPillNormal}`}>{n}</span>
                ))}
              </div>

              <div className={styles.flowOutputSummary}>
                <span style={{ color: '#64748b' }}>Stdout result:</span>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>1 2 4 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
