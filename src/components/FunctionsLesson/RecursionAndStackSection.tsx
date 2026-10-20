import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Play,
  RotateCcw,
} from 'lucide-react';
import styles from './RecursionAndStackSection.module.css';

export function RecursionAndStackSection() {
  // Section 13 Recursion State
  const [recN, setRecN] = useState<number>(4);

  // Section 14 Stack Frame State
  const [stackDepth, setStackDepth] = useState<'main-only' | 'display-active' | 'complete'>('main-only');

  // Section 15 Memory State: counter simulator
  const [staticCount, setStaticCount] = useState<number>(0);
  const [autoCount, setAutoCount] = useState<number>(0);
  const [callHistory, setCallHistory] = useState<number[]>([]);

  // Section 16 Scope State
  const [activeScopeHighlight, setActiveScopeHighlight] = useState<'all' | 'global' | 'local'>('all');

  const handleCallCounter = () => {
    setStaticCount((prev) => prev + 1);
    setAutoCount(1); // auto local variable is re-created every call
    setCallHistory((prev) => [...prev, prev.length + 1]);
  };

  const handleResetCounter = () => {
    setStaticCount(0);
    setAutoCount(0);
    setCallHistory([]);
  };

  // Generate recursive call sequence up to recN
  const recCallChain = Array.from({ length: recN }, (_, i) => {
    const currentVal = recN - i;
    return {
      call: `factorial(${currentVal})`,
      val: currentVal,
      isBase: currentVal === 1,
      subCall: currentVal > 1 ? `${currentVal} * factorial(${currentVal - 1})` : 'return 1 (Base Case)',
    };
  });

  return (
    <section className={styles.sectionWrapper} id="recursion-and-stack">
      <div className={styles.container}>
        {/* ==========================================================
            13 / RECURSION
            ========================================================== */}
        <div id="section-recursion">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>13</span>
            <h2 className={styles.sectionTitle}>Recursion in C</h2>
            <p className={styles.sectionSubtitle}>
              A recursive function calls itself to solve smaller sub-problems until reaching a base
              termination case.
            </p>
          </div>

          <div className={styles.recursionGrid}>
            {/* Code */}
            <div className={styles.recursionCard}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px 0', color: '#141614' }}>
                Recursive Factorial Implementation
              </h3>
              <div
                style={{
                  background: '#141614',
                  borderRadius: 12,
                  padding: '1.25rem 1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                }}
              >
                <span style={{ color: '#38bdf8' }}>int</span> factorial(
                <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem', color: '#64748b' }}>
                  // Base case: terminates recursion
                </span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>if</span> (n &lt;= 1) {'{'}
                </span>
                <br />
                <span style={{ paddingLeft: '2.5rem' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>return 1;</span>
                </span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>{'}'}</span>
                <br />
                <br />
                <span style={{ paddingLeft: '1.25rem', color: '#64748b' }}>
                  // Recursive step: n * factorial(n - 1)
                </span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>return</span> n * factorial(n - 1);
                </span>
                <br />
                {'}'}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>Input n:</span>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: recN === num ? '#141614' : '#ffffff',
                      color: recN === num ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setRecN(num);
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Recursion Tree / Call Chain */}
            <div className={styles.recursionCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#141614' }}>
                  Call Chain &amp; Unwinding Trace
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#059669',
                    background: '#ecfdf5',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}
                >
                  {recN}! = {recN === 5 ? 120 : recN === 4 ? 24 : recN === 3 ? 6 : recN === 2 ? 2 : 1}
                </span>
              </div>

              <div className={styles.recursionTree}>
                {recCallChain.map((node, idx) => (
                  <div
                    key={node.call}
                    className={`${styles.recNode} ${node.isBase ? styles.recNodeBase : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: node.isBase ? '#10b981' : '#2563eb',
                          color: '#fff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
                        {node.call}
                      </strong>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: node.isBase ? '#059669' : '#64748b' }}>
                      {node.subCall}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: '#f1f5f9',
                  borderRadius: 10,
                  padding: '10px 14px',
                  marginTop: '1.25rem',
                  fontSize: '0.82rem',
                  color: '#334155',
                }}
              >
                <strong>Unwinding Phase:</strong> Values return in reverse call order:{' '}
                <code>1 → 2 → 6 → 24 → 120</code>.
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            14 / FUNCTION CALL STACK
            ========================================================== */}
        <div id="section-call-stack">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>14</span>
            <h2 className={styles.sectionTitle}>Function Call Stack</h2>
            <p className={styles.sectionSubtitle}>
              The call stack automatically manages stack frames during function entry and return.
            </p>
          </div>

          <div className={styles.stackGrid}>
            {/* Code */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px 0' }}>Program Call Stack Flow</h3>
              <div
                style={{
                  background: '#141614',
                  borderRadius: 12,
                  padding: '1.25rem 1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                }}
              >
                void display(void) {'{'}
                <br />
                {'    '}printf("Inside display\\n");
                <br />
                {'}'}
                <br />
                <br />
                int main(void) {'{'}
                <br />
                {'    '}int x = 100;<br />
                {'    '}display(); <span style={{ color: '#60a5fa' }}>// pushes new stack frame</span>
                <br />
                {'    '}printf("Back in main: %d\\n", x);<br />
                {'    '}return 0;<br />
                {'}'}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: '1.5rem' }}>
                <button
                  type="button"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: stackDepth === 'display-active' ? '#f59e0b' : '#2563eb',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  onClick={() =>
                    setStackDepth(stackDepth === 'main-only' ? 'display-active' : 'main-only')
                  }
                >
                  {stackDepth === 'main-only' ? (
                    <>
                      <ArrowUp size={14} /> Call display() [Push Frame]
                    </>
                  ) : (
                    <>
                      <ArrowDown size={14} /> Return to main() [Pop Frame]
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Visual Stack Diagram */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Active Stack Frames</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  Top of Stack (LIFO)
                </span>
              </div>

              <div className={styles.stackFrameBox}>
                {/* Frame 1: main() */}
                <div className={styles.stackFrame}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: '#1e40af' }}>
                      Stack Frame: main()
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Base: 0x7ffd10</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: 4 }}>
                    Local variables: <code>int x = 100</code> | Return address to OS runtime
                  </div>
                </div>

                {/* Frame 2: display() if active */}
                {stackDepth === 'display-active' && (
                  <div className={`${styles.stackFrame} ${styles.stackFrameTop}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: '#b45309' }}>
                        Stack Frame: display() [ACTIVE]
                      </strong>
                      <span style={{ fontSize: '0.74rem', color: '#b45309', fontWeight: 700 }}>SP: 0x7ffce0</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#78350f', marginTop: 4 }}>
                      Return address: line 6 in <code>main()</code> | Saved frame pointer
                    </div>
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 12, lineHeight: 1.5 }}>
                Stack frames are allocated on function entry and deallocated immediately upon return,
                enforcing strict LIFO (Last In, First Out) execution safety.
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            15 / MEMORY MANAGEMENT DURING FUNCTION CALLS
            ========================================================== */}
        <div id="section-memory-management">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>15</span>
            <h2 className={styles.sectionTitle}>Memory Management &amp; Static Variables</h2>
            <p className={styles.sectionSubtitle}>
              Ordinary local variables expire when a function exits; <code>static</code> local
              variables persist across successive calls throughout the entire program lifetime.
            </p>
          </div>

          <div className={styles.memorySimGrid}>
            <div className={styles.memoryBox}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px 0' }}>Code Comparison</h3>
              <div
                style={{
                  background: '#141614',
                  borderRadius: 12,
                  padding: '1.25rem 1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                }}
              >
                void counter(void) {'{'}
                <br />
                {'    '}<span style={{ color: '#10b981', fontWeight: 700 }}>static int count = 0;</span> // Data segment
                <br />
                {'    '}<span style={{ color: '#ef4444' }}>int autoVar = 0;</span> // Stack frame
                <br />
                {'    '}count++;<br />
                {'    '}autoVar++;<br />
                {'    '}printf("static: %d, auto: %d\\n", count, autoVar);<br />
                {'}'}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: '1.25rem' }}>
                <button
                  type="button"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: '#141614',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  onClick={handleCallCounter}
                >
                  <Play size={13} fill="currentColor" />
                  <span>Call counter()</span>
                </button>
                <button
                  type="button"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: '#ffffff',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                  onClick={handleResetCounter}
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            <div className={styles.memoryBox}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px 0' }}>State Inspector</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #10b981',
                    borderRadius: 12,
                    padding: '12px 14px',
                  }}
                >
                  <span style={{ fontSize: '0.74rem', color: '#047857', display: 'block' }}>
                    static int count
                  </span>
                  <strong style={{ fontSize: '1.5rem', color: '#065f46', fontFamily: 'var(--font-mono)' }}>
                    {staticCount}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#059669', display: 'block', marginTop: 4 }}>
                    Persists in data segment!
                  </span>
                </div>

                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #f87171',
                    borderRadius: 12,
                    padding: '12px 14px',
                  }}
                >
                  <span style={{ fontSize: '0.74rem', color: '#b91c1c', display: 'block' }}>
                    int autoVar
                  </span>
                  <strong style={{ fontSize: '1.5rem', color: '#991b1b', fontFamily: 'var(--font-mono)' }}>
                    {autoCount}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#dc2626', display: 'block', marginTop: 4 }}>
                    Re-initialized each call!
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                  Invocation Log ({callHistory.length} calls):
                </span>
                <div
                  style={{
                    background: '#141614',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#34d399',
                    marginTop: 6,
                    maxHeight: 70,
                    overflowY: 'auto',
                  }}
                >
                  {callHistory.length === 0
                    ? '> Ready to execute. Click Call counter().'
                    : callHistory.map((callNum) => (
                        <div key={callNum}>
                          &gt; Call #{callNum}: static={callNum}, auto=1
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            16 / SCOPE OF VARIABLES
            ========================================================== */}
        <div id="section-scope">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>16</span>
            <h2 className={styles.sectionTitle}>Scope of Variables</h2>
            <p className={styles.sectionSubtitle}>
              Scope determines the region of a C program where a variable identifier can be legally
              referenced.
            </p>
          </div>

          <div className={styles.scopeGrid}>
            <div
              style={{
                background: '#141614',
                borderRadius: 16,
                padding: '1.5rem 1.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                lineHeight: 1.7,
                color: '#e2e8f0',
              }}
            >
              <div
                style={{
                  background:
                    activeScopeHighlight === 'global' ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
                  borderRadius: 4,
                  padding: '2px 4px',
                }}
              >
                <span style={{ color: '#38bdf8' }}>int</span> globalVal = 50;{' '}
                <span style={{ color: '#64748b' }}>// Global Scope (accessible throughout file)</span>
              </div>
              <br />
              <span style={{ color: '#38bdf8' }}>void</span> printDemo(
              <span style={{ color: '#38bdf8' }}>void</span>) {'{'}
              <br />
              <div
                style={{
                  paddingLeft: '1.5rem',
                  background:
                    activeScopeHighlight === 'local' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                  borderRadius: 4,
                  margin: '4px 0',
                }}
              >
                <span style={{ color: '#38bdf8' }}>int</span> localVal = 20;{' '}
                <span style={{ color: '#64748b' }}>// Local Scope (only within printDemo)</span>
                <br />
                printf(<span style={{ color: '#86efac' }}>"%d, %d\\n"</span>, localVal, globalVal);
              </div>
              {'}'}
              <br />
              <br />
              <span style={{ color: '#38bdf8' }}>int</span> main(
              <span style={{ color: '#38bdf8' }}>void</span>) {'{'}
              <br />
              <span style={{ paddingLeft: '1.5rem' }}>
                printDemo();
                <br />
                <span style={{ color: '#64748b' }}>// localVal is NOT accessible here!</span>
              </span>
              <br />
              {'}'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveScopeHighlight('global')}
              >
                <strong style={{ color: '#2563eb', display: 'block', fontSize: '0.9rem' }}>
                  1. Global Scope (File Scope)
                </strong>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Declared outside all functions. Accessible by any function from its point of
                  declaration forward.
                </p>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveScopeHighlight('local')}
              >
                <strong style={{ color: '#059669', display: 'block', fontSize: '0.9rem' }}>
                  2. Local Scope (Block Scope)
                </strong>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Declared inside a function or compound block <code>{'{ ... }'}</code>. Discarded
                  when control exits the enclosing block.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
