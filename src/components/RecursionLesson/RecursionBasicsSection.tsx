import { useState } from 'react';
import { Copy, Check, Info, ShieldCheck, Repeat, AlertTriangle } from 'lucide-react';
import styles from './RecursionBasicsSection.module.css';

export function RecursionBasicsSection() {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<number>(5);
  const [selectedPart, setSelectedPart] = useState<'base' | 'rec'>('base');

  const countdownCode = `#include <stdio.h>

void countdown(int n) {
    if (n == 0) {
        return; // Base Case: Stop condition
    }

    printf("%d\\n", n);
    countdown(n - 1); // Recursive Case: Call self with smaller value
}

int main(void) {
    countdown(5);
    return 0;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(countdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCallExplanation = (callVal: number) => {
    if (callVal === 0) {
      return 'countdown(0): Evaluates if (n == 0) -> TRUE! Base case triggers and returns immediately without printing.';
    }
    return `countdown(${callVal}): Evaluates if (${callVal} == 0) -> FALSE. Prints ${callVal}, then invokes countdown(${
      callVal - 1
    }).`;
  };

  return (
    <section className={styles.sectionWrapper} id="recursion-basics">
      <div className={styles.container}>
        {/* ==========================================================
            01 / WHAT IS RECURSION?
            ========================================================== */}
        <div id="section-what-is-recursion">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>01</span>
            <h2 className={styles.sectionTitle}>What Is Recursion?</h2>
            <p className={styles.sectionSubtitle}>
              A function calls itself, directly or indirectly, until a specified condition is
              satisfied.
            </p>
          </div>

          <div className={styles.countdownGrid}>
            {/* Left: Code Box */}
            <div className={styles.codeBox}>
              <div className={styles.codeHeader}>
                <span className={styles.codeTag}>countdown.c</span>
                <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                }}
              >
                <span style={{ color: '#64748b' }}>#include &lt;stdio.h&gt;</span>
                <br />
                <br />
                <span style={{ color: '#38bdf8' }}>void</span> countdown(
                <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
                <br />
                <div
                  style={{
                    paddingLeft: '1.25rem',
                    background:
                      selectedCall === 0 ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
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
                <div style={{ paddingLeft: '1.25rem' }}>
                  printf(<span style={{ color: '#86efac' }}>"%d\\n"</span>, n);
                  <br />
                  <span
                    style={{
                      color: '#f59e0b',
                      fontWeight: 600,
                      background:
                        selectedCall > 0 ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                      padding: '2px 4px',
                      borderRadius: 4,
                    }}
                  >
                    countdown(n - 1); // Recursive Call
                  </span>
                </div>
                {'}'}
                <br />
                <br />
                <span style={{ color: '#38bdf8' }}>int</span> main(
                <span style={{ color: '#38bdf8' }}>void</span>) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem', color: '#60a5fa' }}>countdown(5);</span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>return</span> 0;
                </span>
                <br />
                {'}'}
              </div>
            </div>

            {/* Right: Output Terminal & Call Explorer */}
            <div className={styles.terminalCard}>
              <div className={styles.terminalHeader}>
                <span className={styles.terminalTitle}>Program Output</span>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                  Interactive Call Trace
                </span>
              </div>

              <div className={styles.terminalBody}>
                {selectedCall > 0 ? (
                  Array.from({ length: 6 - selectedCall }, (_, i) => 5 - i).map((val) => (
                    <div key={val}>&gt; {val}</div>
                  ))
                ) : (
                  <>
                    <div>&gt; 5</div>
                    <div>&gt; 4</div>
                    <div>&gt; 3</div>
                    <div>&gt; 2</div>
                    <div>&gt; 1</div>
                    <div style={{ color: '#10b981', fontWeight: 700 }}>[Base Case Reached: Stopped]</div>
                  </>
                )}
              </div>

              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  Inspect Specific Call:
                </span>
                <div className={styles.interactiveStepStrip}>
                  {[5, 4, 3, 2, 1, 0].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`${styles.stepPill} ${
                        selectedCall === num ? styles.stepPillActive : ''
                      }`}
                      onClick={() => setSelectedCall(num)}
                    >
                      {num === 0 ? 'countdown(0) [Base]' : `countdown(${num})`}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '0.75rem',
                    background: '#1e293b',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    color: '#e2e8f0',
                    lineHeight: 1.45,
                  }}
                >
                  {getCallExplanation(selectedCall)}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoNotice}>
            <Info size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              The function calls itself with a smaller value <code>(n - 1)</code> until it reaches
              the base case <code>(n == 0)</code>, at which point the recursion halts and execution returns
              to the caller.
            </span>
          </div>
        </div>

        <div className={styles.dividerSpace} />

        {/* ==========================================================
            02 / THE TWO ESSENTIAL PARTS OF RECURSION
            ========================================================== */}
        <div id="section-two-parts">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>02</span>
            <h2 className={styles.sectionTitle}>How Does Recursion Work?</h2>
            <p className={styles.sectionSubtitle}>
              A recursive function has two essential parts: a <strong>base case</strong> and a{' '}
              <strong>recursive case</strong>.
            </p>
          </div>

          <div className={styles.twoPartsGrid}>
            {/* Part 1: Base Case */}
            <div
              className={`${styles.partCard} ${styles.partCardBase} ${
                selectedPart === 'base' ? styles.partCardBaseActive : ''
              }`}
              onClick={() => setSelectedPart('base')}
            >
              <div className={`${styles.partBadge} ${styles.badgeGreen}`}>
                <ShieldCheck size={14} />
                <span>Base Case</span>
              </div>
              <h3 className={styles.partTitle}>Stops Recursion</h3>
              <p className={styles.partDesc}>
                The stopping condition. When the base case is reached, no further recursive calls are
                made, allowing call-stack frames to begin unwinding.
              </p>
              <div className={styles.snippetBox}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>if (n == 0)</span>
                <br />
                <span style={{ paddingLeft: '1rem', color: '#15803d' }}>return;</span>
              </div>
            </div>

            {/* Center Node in Diagram */}
            <div className={styles.centerNodeCard}>
              <div className={styles.centerNodeTitle}>function(n)</div>
              <div className={styles.centerNodeSub}>
                {selectedPart === 'base' ? (
                  <span style={{ color: '#86efac' }}>
                    ← Base condition satisfied: exits without recursing
                  </span>
                ) : (
                  <span style={{ color: '#fdba74' }}>
                    Recursive branch taken: invokes function(n - 1) →
                  </span>
                )}
              </div>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: selectedPart === 'base' ? '#16a34a' : '#334155',
                    color: '#ffffff',
                    border: 'none',
                  }}
                  onClick={() => setSelectedPart('base')}
                >
                  Test Base Case
                </button>
                <button
                  type="button"
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: selectedPart === 'rec' ? '#ea580c' : '#334155',
                    color: '#ffffff',
                    border: 'none',
                  }}
                  onClick={() => setSelectedPart('rec')}
                >
                  Test Recursive Case
                </button>
              </div>
            </div>

            {/* Part 2: Recursive Case */}
            <div
              className={`${styles.partCard} ${styles.partCardRec} ${
                selectedPart === 'rec' ? styles.partCardRecActive : ''
              }`}
              onClick={() => setSelectedPart('rec')}
            >
              <div className={`${styles.partBadge} ${styles.badgeOrange}`}>
                <Repeat size={14} />
                <span>Recursive Case</span>
              </div>
              <h3 className={styles.partTitle}>Calls Itself</h3>
              <p className={styles.partDesc}>
                The part in which the function invokes itself with a smaller or simplified input,
                systematically making progress toward the base condition.
              </p>
              <div className={styles.snippetBox}>
                <span style={{ color: '#ea580c', fontWeight: 700 }}>countdown(n - 1);</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: '1rem 1.25rem',
              marginTop: '1.5rem',
              fontSize: '0.88rem',
              color: '#991b1b',
              lineHeight: 1.55,
            }}
          >
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2, color: '#dc2626' }} />
            <span>
              <strong>Crucial Concept:</strong> Without a reachable base case, recursion will continue
              indefinitely until the operating system terminates the process with a{' '}
              <code>Stack Overflow</code> error (Segmentation Fault).
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
