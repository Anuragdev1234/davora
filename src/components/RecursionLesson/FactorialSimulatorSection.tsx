import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import styles from './FactorialSimulatorSection.module.css';

export function FactorialSimulatorSection() {
  const [n, setN] = useState<number>(5);
  // Step ranges from 0 to 2*n:
  // 0..n: Descent (pushing calls down to factorial(0))
  // (n + 1)..(2*n): Unwinding (multiplying return values back up)
  const [step, setStep] = useState<number>(2 * 5); // default completed
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prev) => {
          if (prev < 2 * n) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1600);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, n]);

  // Compute factorials up to n
  const factValues: number[] = [1];
  for (let i = 1; i <= n; i++) {
    factValues.push(factValues[i - 1] * i);
  }
  const finalAnswer = factValues[n];

  // Descent items: array of { level: k, call: 'factorial(k)', pending: 'k * factorial(k - 1)' }
  const descentItems = Array.from({ length: n + 1 }, (_, i) => {
    const k = n - i;
    return {
      k,
      call: `factorial(${k})`,
      isBase: k === 0,
      expr: k === 0 ? 'returns 1 (Base Case)' : `${k} * factorial(${k - 1})`,
    };
  });

  // Current descent depth reached in simulation
  const isDescentPhase = step <= n;
  const currentDescentLevel = n - Math.min(step, n);

  // Unwinding items visible up to step - n
  const unwindCount = Math.max(0, step - n);
  const unwindItems = Array.from({ length: unwindCount }, (_, i) => {
    const k = i + 1; // 1..n
    const prevVal = factValues[k - 1];
    const currVal = factValues[k];
    return {
      k,
      call: `factorial(${k})`,
      math: `${k} × ${prevVal} = ${currVal}`,
    };
  });

  const handleNext = () => {
    setIsPlaying(false);
    setStep((prev) => Math.min(2 * n, prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const handleReplay = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const handleChangeN = (newN: number) => {
    setN(newN);
    setStep(2 * newN);
    setIsPlaying(false);
  };

  return (
    <section className={styles.sectionWrapper} id="factorial-simulator">
      <div className={styles.container}>
        <div id="section-factorial-simulator">
          {/* Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>05</span>
            <h2 className={styles.sectionTitle}>Factorial Using Recursion</h2>
            <p className={styles.sectionSubtitle}>
              The factorial of a non-negative integer <code>n</code>, written as <code>n!</code>, is
              the product of all positive integers from 1 through <code>n</code>.
            </p>
          </div>

          <div className={styles.workspaceCard}>
            {/* Input Selection Bar */}
            <div className={styles.inputControlBar}>
              <div className={styles.inputGroup}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  Select Input Value (n):
                </span>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`${styles.nSelectorBtn} ${
                      n === num ? styles.nSelectorBtnActive : ''
                    }`}
                    onClick={() => handleChangeN(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className={styles.ruleContainer}>
                <span className={styles.ruleLabel}>
                  Mathematical Rule:
                </span>
                <span className={styles.ruleBadge}>
                  n! = n × (n - 1)! &nbsp;|&nbsp; 0! = 1
                </span>
              </div>
            </div>

            {/* Three Coordinated Regions */}
            <div className={styles.simulatorGrid}>
              {/* Region 1: Source Code */}
              <div className={styles.regionCard}>
                <div className={styles.regionTitle}>
                  <span>Source Code</span>
                  <span style={{ color: '#38bdf8' }}>factorial.c</span>
                </div>

                <div className={styles.codePanel}>
                  <span style={{ color: '#38bdf8' }}>unsigned long long</span> factorial(
                  <span style={{ color: '#38bdf8' }}>unsigned int</span> n) {'{'}
                  <br />
                  <div
                    style={{
                      paddingLeft: '1.25rem',
                      background:
                        step >= n && step === n ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ color: '#f43f5e' }}>if</span> (n == 0) {'{'}
                    <br />
                    <span style={{ paddingLeft: '1.25rem', color: '#10b981', fontWeight: 700 }}>
                      return 1; // Base case
                    </span>
                    <br />
                    {'}'}
                  </div>
                  <br />
                  <div
                    style={{
                      paddingLeft: '1.25rem',
                      background:
                        step > n
                          ? 'rgba(245, 158, 11, 0.25)'
                          : isDescentPhase
                          ? 'rgba(59, 130, 246, 0.2)'
                          : 'transparent',
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ color: '#f43f5e' }}>return</span> n * factorial(n - 1);
                  </div>
                  {'}'}
                </div>
              </div>

              {/* Region 2: Recursive Descent */}
              <div className={styles.regionCard}>
                <div className={styles.regionTitle}>
                  <span>1. Recursive Descent</span>
                  <span style={{ color: '#3b82f6' }}>n → 0</span>
                </div>

                <div className={styles.descentList}>
                  {descentItems.map((item, idx) => {
                    const isVisible = idx <= step;
                    const isCurrent = isDescentPhase && idx === step;
                    if (!isVisible) return null;

                    return (
                      <div
                        key={item.k}
                        className={`${styles.descentNode} ${
                          isCurrent ? styles.descentNodeActive : ''
                        } ${item.isBase ? styles.descentNodeBase : ''}`}
                      >
                        <span style={{ fontWeight: 700 }}>{item.call}</span>
                        <span style={{ fontSize: '0.72rem', color: item.isBase ? '#059669' : '#64748b' }}>
                          {item.expr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Region 3: Return Unwinding */}
              <div className={styles.regionCard}>
                <div className={styles.regionTitle}>
                  <span>2. Return Unwinding</span>
                  <span style={{ color: '#f59e0b' }}>0 → n</span>
                </div>

                <div className={styles.unwindList}>
                  {step >= n && (
                    <div
                      style={{
                        padding: '8px 10px',
                        borderRadius: 8,
                        background: '#ecfdf5',
                        border: '1px solid #10b981',
                        color: '#065f46',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>factorial(0)</span>
                      <span>returns 1 (Base Case)</span>
                    </div>
                  )}

                  {unwindItems.map((u) => (
                    <div
                      key={u.k}
                      className={`${styles.unwindNode} ${styles.unwindNodeActive}`}
                    >
                      <span>{u.call}</span>
                      <span style={{ fontWeight: 700, color: '#b45309' }}>{u.math}</span>
                    </div>
                  ))}

                  {step < n && (
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: '#94a3b8',
                        textAlign: 'center',
                        padding: '1.5rem',
                      }}
                    >
                      Waiting for base case to trigger return unwinding...
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Terminal Output Bar */}
            <div className={styles.outputTerminalBar}>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  Execution State:
                </span>
                <div style={{ fontSize: '0.84rem', color: '#ffffff', marginTop: 3 }}>
                  {step < n
                    ? `Pushing frame for factorial(${currentDescentLevel})...`
                    : step === n
                    ? 'Base case factorial(0) reached! Returning 1.'
                    : step < 2 * n
                    ? `Multiplying return value for factorial(${step - n})...`
                    : `Completed! Final result computed for ${n}!.`}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  Result Output:
                </span>
                <div className={styles.outputVal}>
                  {step >= 2 * n ? (
                    <>
                      <CheckCircle2
                        size={16}
                        style={{ display: 'inline', marginRight: 6, color: '#34d399' }}
                      />
                      Factorial = {finalAnswer}
                    </>
                  ) : step > n ? (
                    `Current: ${factValues[step - n]}`
                  ) : (
                    'Evaluating...'
                  )}
                </div>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className={styles.playerBar}>
              <div className={styles.btnGroup}>
                <button
                  type="button"
                  className={styles.pBtn}
                  onClick={handlePrev}
                  disabled={step === 0}
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  className={`${styles.pBtn} ${styles.pBtnPrimary}`}
                  onClick={() => {
                    if (step >= 2 * n) {
                      setStep(0);
                      setIsPlaying(true);
                    } else {
                      setIsPlaying(!isPlaying);
                    }
                  }}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                  <span>{isPlaying ? 'Pause' : 'Play Trace'}</span>
                </button>
                <button
                  type="button"
                  className={styles.pBtn}
                  onClick={handleNext}
                  disabled={step === 2 * n}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className={styles.btnGroup}>
                <button type="button" className={styles.pBtn} onClick={handleReset}>
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
                <button type="button" className={styles.pBtn} onClick={handleReplay}>
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
