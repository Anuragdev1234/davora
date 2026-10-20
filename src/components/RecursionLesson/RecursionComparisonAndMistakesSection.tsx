import { useState } from 'react';
import {
  RECURSION_VS_ITERATION,
  COMMON_MISTAKES,
} from '../../data/recursionLessonData';
import { AlertCircle, CheckCircle } from 'lucide-react';
import styles from './RecursionComparisonAndMistakesSection.module.css';

export function RecursionComparisonAndMistakesSection() {
  const [testN, setTestN] = useState<number>(5);

  const calculateSum = (num: number) => {
    return (num * (num + 1)) / 2;
  };

  return (
    <section className={styles.sectionWrapper} id="comparison-and-mistakes">
      <div className={styles.container}>
        {/* ==========================================================
            06 / RECURSION VS ITERATION
            ========================================================== */}
        <div id="section-recursion-vs-iteration">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>06</span>
            <h2 className={styles.sectionTitle}>Recursion vs Iteration</h2>
            <p className={styles.sectionSubtitle}>
              Both recursion and iteration achieve repetitive execution, but their memory,
              overhead, and structure differ fundamentally.
            </p>
          </div>

          {/* Comparison Table */}
          <div className={styles.comparisonTableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Comparison Dimension</th>
                  <th style={{ width: '40%', color: '#2563eb' }}>Recursion (Function Calls)</th>
                  <th style={{ width: '40%', color: '#059669' }}>Iteration (Loops)</th>
                </tr>
              </thead>
              <tbody>
                {RECURSION_VS_ITERATION.map((row) => (
                  <tr key={row.aspect}>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{row.aspect}</td>
                    <td>{row.recursion}</td>
                    <td>{row.iteration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Side by Side Code Comparison with live input */}
          <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
              Interactive Sum Demonstration:
            </span>
            {[3, 4, 5, 10].map((num) => (
              <button
                key={num}
                type="button"
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: testN === num ? '#141614' : '#ffffff',
                  color: testN === num ? '#ffffff' : '#334155',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                onClick={() => setTestN(num)}
              >
                n = {num}
              </button>
            ))}
          </div>

          <div className={styles.sumCompareGrid}>
            {/* Recursive Sum */}
            <div className={styles.sumCard}>
              <div className={styles.sumHeader}>
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  Recursive Approach
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#059669' }}>
                  Result = {calculateSum(testN)}
                </span>
              </div>

              <div
                style={{
                  background: '#141614',
                  borderRadius: 10,
                  padding: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  flex: 1,
                }}
              >
                <span style={{ color: '#38bdf8' }}>int</span> sumRecursive(
                <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>if</span> (n &lt;= 0) {'{'}
                </span>
                <br />
                <span style={{ paddingLeft: '2.5rem', color: '#10b981' }}>return 0; // Base</span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>{'}'}</span>
                <br />
                <span style={{ paddingLeft: '1.25rem', color: '#f59e0b' }}>
                  return n + sumRecursive(n - 1);
                </span>
                <br />
                {'}'}
              </div>

              <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 10 }}>
                Allocates {testN + 1} call-stack frames in memory.
              </span>
            </div>

            {/* Iterative Sum */}
            <div className={styles.sumCard}>
              <div className={styles.sumHeader}>
                <span
                  style={{
                    background: '#ecfdf5',
                    color: '#065f46',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  Iterative Approach
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#059669' }}>
                  Result = {calculateSum(testN)}
                </span>
              </div>

              <div
                style={{
                  background: '#141614',
                  borderRadius: 10,
                  padding: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  flex: 1,
                }}
              >
                <span style={{ color: '#38bdf8' }}>int</span> sumIterative(
                <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>int sum = 0;</span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>for</span> (int i = 1; i &lt;= n; i++) {'{'}
                </span>
                <br />
                <span style={{ paddingLeft: '2.5rem' }}>sum += i;</span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>{'}'}</span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>return sum;</span>
                <br />
                {'}'}
              </div>

              <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 10 }}>
                Uses 1 stack frame, reuses <code>sum</code> and <code>i</code> registers.
              </span>
            </div>
          </div>
        </div>

        {/* ==========================================================
            07 / COMMON RECURSION MISTAKES
            ========================================================== */}
        <div id="section-common-mistakes">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>07</span>
            <h2 className={styles.sectionTitle}>Common Mistakes in Recursion</h2>
            <p className={styles.sectionSubtitle}>
              Three frequent anti-patterns that lead to Stack Overflow or incorrect computational
              results.
            </p>
          </div>

          <div className={styles.mistakesGrid}>
            {COMMON_MISTAKES.map((m) => (
              <div key={m.id} className={styles.mistakeCard}>
                <div className={styles.mistakeHeader}>
                  <h3 className={styles.mistakeTitle}>
                    <AlertCircle size={18} />
                    <span>{m.title}</span>
                  </h3>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#475569', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                  <strong>Cause:</strong> {m.why}
                </p>

                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: '#991b1b',
                    marginBottom: '1rem',
                  }}
                >
                  <strong>Consequence:</strong> {m.consequence}
                </div>

                <div className={styles.codeCompareTwoCols}>
                  {/* Bad */}
                  <div className={`${styles.codeMiniPanel} ${styles.badPanel}`}>
                    <div style={{ fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertCircle size={14} />
                      <span>Buggy Code:</span>
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{m.badCode}</pre>
                  </div>

                  {/* Good */}
                  <div className={`${styles.codeMiniPanel} ${styles.goodPanel}`}>
                    <div style={{ fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={14} />
                      <span>Correct Solution:</span>
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{m.goodCode}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
