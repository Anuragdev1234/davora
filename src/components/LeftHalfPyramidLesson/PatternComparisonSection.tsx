import { useState } from 'react';
import styles from './PatternComparisonSection.module.css';

interface LogicMapping {
  id: string;
  stage: string;
  algorithmDesc: string;
  codeSnippet: string;
  note: string;
}

const MAPPINGS: LogicMapping[] = [
  {
    id: 'input-guard',
    stage: '01 · Input Validation Guard',
    algorithmDesc: 'Validate requested rows n is an integer between 1 and 10.',
    codeSnippet: 'if (scanf("%d", &n) != 1 || n < 1 || n > 10) return 1;',
    note: 'Ensures the program never attempts negative or unbounded row counts that would corrupt console geometry.',
  },
  {
    id: 'outer-loop',
    stage: '02 · Outer Row Controller Loop',
    algorithmDesc: 'Initialize row counter i = 1; loop while i <= n; increment i++ after each full line.',
    codeSnippet: 'for (int i = 1; i <= n; i++) {',
    note: 'Controls vertical progression. Each iteration manages one horizontal line of the output.',
  },
  {
    id: 'spaces-loop',
    stage: '03 · Inner Loop 1 (Leading Spaces)',
    algorithmDesc: 'Initialize j = 1; loop while j <= n - i; print two spaces "  ".',
    codeSnippet: 'for (int j = 1; j <= n - i; j++) {\n    printf("  ");\n}',
    note: 'Shifts asterisks rightward. In row 1: 4 space units. In row 5: 0 space units.',
  },
  {
    id: 'stars-loop',
    stage: '04 · Inner Loop 2 (Asterisks)',
    algorithmDesc: 'Initialize k = 1; loop while k <= i; print star unit "* ".',
    codeSnippet: 'for (int k = 1; k <= i; k++) {\n    printf("* ");\n}',
    note: 'Generates i asterisks immediately after leading spaces. Runs sequentially after Loop 1 finishes.',
  },
  {
    id: 'row-delimiter',
    stage: '05 · Line Delimiter',
    algorithmDesc: 'Emit newline escape character ("\\n") to end row i.',
    codeSnippet: 'printf("\\n");',
    note: 'Advances the terminal cursor to column 0 on the next row before i is incremented.',
  },
  {
    id: 'process-exit',
    stage: '06 · Normal Process Exit',
    algorithmDesc: 'Return status 0 to host environment upon completing all n rows.',
    codeSnippet: 'return 0;',
    note: 'Standard POSIX / ANSI C exit convention signaling error-free execution.',
  },
];

export function PatternComparisonSection() {
  const [activeTab, setActiveTab] = useState<'symmetry' | 'syntax'>('symmetry');
  const [activeMappingId, setActiveMappingId] = useState<string>('spaces-loop');

  const rightPattern = ['* ', '* * ', '* * * ', '* * * * ', '* * * * * '];
  const leftPattern = [
    { spaces: 4, stars: 1 },
    { spaces: 3, stars: 2 },
    { spaces: 2, stars: 3 },
    { spaces: 1, stars: 4 },
    { spaces: 0, stars: 5 },
  ];
  const invertedPattern = ['* * * * * ', '* * * * ', '* * * ', '* * ', '* '];

  const currentMapping =
    MAPPINGS.find((m) => m.id === activeMappingId) || MAPPINGS[0];

  return (
    <section className={styles.section} id="pattern-comparison" aria-label="08 Compare Patterns">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>08 / Compare &amp; Understand Patterns</div>
          <h2 className={styles.sectionTitle}>Right vs. Left vs. Inverted Pyramids</h2>
          <p className={styles.sectionDesc}>
            Deepen your algorithmic thinking by contrasting the three fundamental pyramid topologies.
            Notice how alignment requirements change inner loop composition from single loops to dual sequential loops.
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
            Pattern Topologies &amp; Inner Loops
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
          <div className={styles.threeCardGrid}>
            {/* Card 1: Right Half Pyramid */}
            <div className={styles.pyramidCard}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Right Half Pyramid</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Left-Aligned</div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagRight}`}>1 Inner Loop</span>
              </div>

              <div className={styles.visualPatternBox}>
                {rightPattern.map((p, idx) => (
                  <div key={idx}>{p}</div>
                ))}
              </div>

              <div className={styles.metricRows}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Outer Loop</span>
                  <span className={styles.metricCode}>i: 1 &rarr; n</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Inner Loop(s)</span>
                  <span className={styles.metricCode}>j: 1 &rarr; i (stars)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>0 (flush left)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Inner Loops / Row</span>
                  <span className={styles.metricCode}>1 loop</span>
                </div>
              </div>
            </div>

            {/* Card 2: Left Half Pyramid (Active) */}
            <div className={`${styles.pyramidCard} ${styles.pyramidCardActive}`}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Left Half Pyramid</h3>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, marginTop: '0.2rem' }}>
                    Right-Aligned (Current)
                  </div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagLeft}`}>2 Inner Loops</span>
              </div>

              <div className={styles.visualPatternBox}>
                {leftPattern.map((p, idx) => (
                  <div key={idx}>
                    <span className={styles.spaceDot}>{'· '.repeat(p.spaces)}</span>
                    <span className={styles.starGlyph}>{'* '.repeat(p.stars)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.metricRows}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Outer Loop</span>
                  <span className={styles.metricCode}>i: 1 &rarr; n</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Inner Loop(s)</span>
                  <span className={styles.metricCode}>j &le; n-i (sp), k &le; i (st)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>n - i (decreasing)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Inner Loops / Row</span>
                  <span className={styles.metricCode} style={{ color: '#2563eb', fontWeight: 700 }}>2 loops</span>
                </div>
              </div>
            </div>

            {/* Card 3: Inverted Right Half Pyramid */}
            <div className={styles.pyramidCard}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Inverted Right Half</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Top-Heavy Decay</div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagInverted}`}>1 Reverse Loop</span>
              </div>

              <div className={styles.visualPatternBox}>
                {invertedPattern.map((p, idx) => (
                  <div key={idx}>{p}</div>
                ))}
              </div>

              <div className={styles.metricRows}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Outer Loop</span>
                  <span className={styles.metricCode}>i: n &rarr; 1 (reverse)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Inner Loop(s)</span>
                  <span className={styles.metricCode}>j: 1 &rarr; i (stars)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>0 (flush left)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Inner Loops / Row</span>
                  <span className={styles.metricCode}>1 loop</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.mappingGrid}>
            <div className={styles.mappingList}>
              {MAPPINGS.map((m) => {
                const isActive = m.id === activeMappingId;
                return (
                  <div
                    key={m.id}
                    className={`${styles.mappingItem} ${isActive ? styles.mappingItemActive : ''}`}
                    onClick={() => setActiveMappingId(m.id)}
                  >
                    <div className={styles.mappingStage}>{m.stage}</div>
                    <div className={styles.mappingDesc}>{m.algorithmDesc}</div>
                  </div>
                );
              })}
            </div>

            <div className={styles.mappingDetailCard}>
              <div className={styles.mappingDetailHeader}>{currentMapping.stage}</div>
              <pre className={styles.mappingSnippetPre}>
                <code>{currentMapping.codeSnippet}</code>
              </pre>
              <p className={styles.mappingNote}>{currentMapping.note}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
