import { useState } from 'react';
import styles from './PatternComparisonSection.module.css';

interface LogicMapping {
  id: string;
  stage: string;
  algorithmDesc: string;
  codeSnippet: string;
}

const MAPPINGS: LogicMapping[] = [
  {
    id: 'input',
    stage: '01 · User Input Guard',
    algorithmDesc: 'Read requested rows n and validate 1 <= n <= 10.',
    codeSnippet: 'if (scanf("%d", &n) != 1 || n < 1 || n > 10) return 1;',
  },
  {
    id: 'outer-loop',
    stage: '02 · Reverse Outer Loop',
    algorithmDesc: 'Initialize row counter i = n; continue while i >= 1; decrement i-- each round.',
    codeSnippet: 'for (int i = n; i >= 1; i--) {',
  },
  {
    id: 'inner-loop',
    stage: '03 · Inner Column Counter',
    algorithmDesc: 'Column counter j runs from 1 up to current row width i (j <= i).',
    codeSnippet: 'for (int j = 1; j <= i; j++) {',
  },
  {
    id: 'print-star',
    stage: '04 · Star Output Stream',
    algorithmDesc: 'Print an asterisk with a trailing space on the current line.',
    codeSnippet: 'printf("* ");',
  },
  {
    id: 'newline',
    stage: '05 · Line Completion',
    algorithmDesc: 'Print newline after the inner loop finishes to start the next row.',
    codeSnippet: 'printf("\\n");',
  },
  {
    id: 'exit',
    stage: '06 · Normal Process Exit',
    algorithmDesc: 'When all rows from n down to 1 finish, terminate cleanly with code 0.',
    codeSnippet: 'return 0;',
  },
];

export function PatternComparisonSection() {
  const [activeTab, setActiveTab] = useState<'symmetry' | 'syntax'>('symmetry');
  const [activeMappingId, setActiveMappingId] = useState<string>('outer-loop');

  const normalPattern = ['* ', '* * ', '* * * ', '* * * * ', '* * * * * '];
  const invertedPattern = ['* * * * * ', '* * * * ', '* * * ', '* * ', '* '];

  return (
    <section className={styles.section} id="algorithm-vs-code" aria-label="08 Compare, Experiment, and Practice">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>08 / Compare &amp; Understand Symmetry</div>
          <h2 className={styles.sectionTitle}>Normal vs. Inverted Right Half Pyramid</h2>
          <p className={styles.sectionDesc}>
            Deepen your algorithmic intuition by comparing the normal growth pattern with the inverted
            decay pattern. Notice the conservation of elements and how loop directions flip.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabNav} role="tablist">
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'symmetry' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('symmetry')}
            role="tab"
            aria-selected={activeTab === 'symmetry'}
          >
            Symmetry &amp; Loop Dynamics
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'syntax' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('syntax')}
            role="tab"
            aria-selected={activeTab === 'syntax'}
          >
            Algorithm &harr; Code Syntax Match
          </button>
        </div>

        {activeTab === 'symmetry' ? (
          <div>
            <div className={styles.symmetryGrid}>
              {/* Normal Pyramid Card */}
              <div className={styles.pyramidCard}>
                <div className={styles.cardTop}>
                  <h3 className={styles.pyramidTitle}>Normal Right Half Pyramid</h3>
                  <span className={styles.tagNormal}>Growth: 1 &rarr; N</span>
                </div>

                <div className={styles.visualPatternBox}>
                  {normalPattern.map((p, idx) => (
                    <div key={idx}>{p}</div>
                  ))}
                </div>

                <div className={styles.metricRows}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Outer Loop</span>
                    <span className={styles.metricCode}>for (int i = 1; i &lt;= n; i++)</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Inner Loop</span>
                    <span className={styles.metricCode}>for (int j = 1; j &lt;= i; j++)</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Row 1 Stars</span>
                    <span className={styles.metricCode}>1 star</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Row N Stars</span>
                    <span className={styles.metricCode}>n stars</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Total Elements</span>
                    <span className={styles.metricCode}>n(n+1)/2</span>
                  </div>
                </div>
              </div>

              {/* Inverted Pyramid Card */}
              <div className={styles.pyramidCard}>
                <div className={styles.cardTop}>
                  <h3 className={styles.pyramidTitle}>Inverted Right Half Pyramid</h3>
                  <span className={styles.tagInverted}>Decay: N &rarr; 1</span>
                </div>

                <div className={styles.visualPatternBox}>
                  {invertedPattern.map((p, idx) => (
                    <div key={idx}>{p}</div>
                  ))}
                </div>

                <div className={styles.metricRows}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Outer Loop</span>
                    <span className={styles.metricCode}>for (int i = n; i &gt;= 1; i--)</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Inner Loop</span>
                    <span className={styles.metricCode}>for (int j = 1; j &lt;= i; j++)</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Row 1 Stars</span>
                    <span className={styles.metricCode}>n stars</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Row N Stars</span>
                    <span className={styles.metricCode}>1 star</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricLabel}>Total Elements</span>
                    <span className={styles.metricCode}>n(n+1)/2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.symmetryInsight}>
              <strong>Key Architectural Insight:</strong> Notice that the inner loop condition{' '}
              <code>j &lt;= i</code> is <em>identical</em> in both programs! The entire transformation
              from standard pyramid to inverted pyramid is achieved simply by running the outer loop in reverse
              (<code>i = n; i &gt;= 1; i--</code>). Because <code>i</code> starts high and decreases,{' '}
              <code>j &lt;= i</code> naturally starts printing {5} stars, then {4}, {3}, {2}, down to {1}!
            </div>
          </div>
        ) : (
          <div className={styles.comparisonGrid}>
            {/* Left Column: Algorithm */}
            <div className={styles.columnCard}>
              <div className={styles.colHeader}>
                <span className={styles.colTitle}>Algorithm Step</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Plain English</span>
              </div>

              <div className={styles.itemsList}>
                {MAPPINGS.map((m) => {
                  const isActive = activeMappingId === m.id;
                  return (
                    <div
                      key={m.id}
                      className={`${styles.itemRow} ${isActive ? styles.itemRowActive : ''}`}
                      onClick={() => setActiveMappingId(m.id)}
                    >
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTag}>{m.stage}</span>
                        {isActive && (
                          <span style={{ fontSize: '0.6875rem', color: '#2563eb', fontWeight: 700 }}>
                            Active Match &rarr;
                          </span>
                        )}
                      </div>
                      <div className={styles.itemText}>{m.algorithmDesc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: C Code */}
            <div className={styles.columnCard}>
              <div className={styles.colHeader}>
                <span className={styles.colTitle}>C Implementation</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>ISO C Syntax</span>
              </div>

              <div className={styles.itemsList}>
                {MAPPINGS.map((m) => {
                  const isActive = activeMappingId === m.id;
                  return (
                    <div
                      key={m.id}
                      className={`${styles.itemRow} ${isActive ? styles.itemRowActive : ''}`}
                      onClick={() => setActiveMappingId(m.id)}
                    >
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTag}>{m.stage}</span>
                        {isActive && (
                          <span style={{ fontSize: '0.6875rem', color: '#2563eb', fontWeight: 700 }}>
                            &larr; Linked Statement
                          </span>
                        )}
                      </div>
                      <div className={styles.codeSnippet}>{m.codeSnippet}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
