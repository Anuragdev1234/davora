import React, { useState } from 'react';
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
    note: 'Defensive boundary guard ensuring console coordinates remain stable and buffer overflows or invalid loops cannot occur.',
  },
  {
    id: 'outer-loop',
    stage: '02 · Outer Row Controller Loop',
    algorithmDesc: 'Initialize row counter i = 1; loop while i <= n; increment i++ after each full line.',
    codeSnippet: 'for (int i = 1; i <= n; i++) {',
    note: 'Controls vertical progression. Each iteration renders one full horizontal row from apex to base.',
  },
  {
    id: 'spaces-loop',
    stage: '03 · Inner Loop 1 (Leading Spaces)',
    algorithmDesc: 'Initialize j = 1; loop while j <= n - i; print single space " ".',
    codeSnippet: 'for (int j = 1; j <= n - i; j++) {\n    printf(" ");\n}',
    note: 'Offsets the star tier toward the center. On row 1: (n - 1) spaces. On row n: 0 spaces.',
  },
  {
    id: 'stars-loop',
    stage: '04 · Inner Loop 2 (Odd Asterisks)',
    algorithmDesc: 'Initialize k = 1; loop while k <= 2 * i - 1; print single star "*".',
    codeSnippet: 'for (int k = 1; k <= 2 * i - 1; k++) {\n    printf("*");\n}',
    note: 'Generates (2i - 1) consecutive stars (1, 3, 5, 7, 9) maintaining perfect bilateral balance across the center axis.',
  },
  {
    id: 'row-delimiter',
    stage: '05 · Line Delimiter',
    algorithmDesc: 'Emit newline escape character ("\\n") to end row i.',
    codeSnippet: 'printf("\\n");',
    note: 'Advances the terminal cursor to column 0 on the next row before outer counter i increments.',
  },
  {
    id: 'process-exit',
    stage: '06 · Normal Process Exit',
    algorithmDesc: 'Return status 0 to host environment upon completing all n rows.',
    codeSnippet: 'return 0;',
    note: 'Standard ANSI C convention signaling successful, error-free program execution back to the OS.',
  },
];

export const PatternComparisonSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'symmetry' | 'syntax'>('symmetry');
  const [activeMappingId, setActiveMappingId] = useState<string>('stars-loop');

  const rightPattern = ['* ', '* * ', '* * * ', '* * * * ', '* * * * * '];
  const leftPattern = [
    { spaces: 4, stars: 1 },
    { spaces: 3, stars: 2 },
    { spaces: 2, stars: 3 },
    { spaces: 1, stars: 4 },
    { spaces: 0, stars: 5 },
  ];
  const fullPattern = [
    { spaces: 4, stars: 1 },
    { spaces: 3, stars: 3 },
    { spaces: 2, stars: 5 },
    { spaces: 1, stars: 7 },
    { spaces: 0, stars: 9 },
  ];
  const invertedPattern = ['* * * * * ', '* * * * ', '* * * ', '* * ', '* '];

  const currentMapping =
    MAPPINGS.find((m) => m.id === activeMappingId) || MAPPINGS[0];

  return (
    <section className={styles.section} id="pattern-comparison" aria-label="08 Compare Patterns">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>SCENE 08 &bull; TOPOLOGY &amp; LOOP COMPARISON</div>
          <h2 className={styles.sectionTitle}>Compare Pyramid Topologies</h2>
          <p className={styles.sectionDesc}>
            Deepen your algorithmic thinking by contrasting the four fundamental pyramid patterns in C.
            Notice how alignment and symmetry requirements dictate inner loop count and star calculation formulas.
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
            Pattern Topologies &amp; Loop Dynamics
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
          <div className={styles.fourCardGrid}>
            {/* Card 1: Right Half Pyramid */}
            <div className={styles.pyramidCard}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Right Half</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Left-Aligned</div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagRight}`}>1 Inner Loop</span>
              </div>

              <div className={styles.visualPatternBox} style={{ alignItems: 'flex-start' }}>
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
                  <span className={styles.metricCode}>j: 1 &rarr; i</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>0 (flush left)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Stars in Row i</span>
                  <span className={styles.metricCode}>i</span>
                </div>
              </div>
            </div>

            {/* Card 2: Left Half Pyramid */}
            <div className={styles.pyramidCard}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Left Half</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Right-Aligned</div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagLeft}`}>2 Inner Loops</span>
              </div>

              <div className={styles.visualPatternBox} style={{ alignItems: 'flex-end' }}>
                {leftPattern.map((p, idx) => (
                  <div key={idx}>
                    <span className={styles.spaceDot}>{'  '.repeat(p.spaces)}</span>
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
                  <span className={styles.metricCode}>j &le; n-i, k &le; i</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>n &minus; i</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Stars in Row i</span>
                  <span className={styles.metricCode}>i</span>
                </div>
              </div>
            </div>

            {/* Card 3: Full Pyramid (Active) */}
            <div className={`${styles.pyramidCard} ${styles.pyramidCardActive}`}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Full Pyramid</h3>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, marginTop: '0.2rem' }}>
                    Centered Axis (Current)
                  </div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagFull}`}>2 Inner Loops</span>
              </div>

              <div className={styles.visualPatternBox}>
                {fullPattern.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
                    <span className={styles.spaceDot}>{'·'.repeat(p.spaces)}</span>
                    <span className={styles.starGlyph}>{'*'.repeat(p.stars)}</span>
                    <span style={{ visibility: 'hidden' }}>{'·'.repeat(p.spaces)}</span>
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
                  <span className={styles.metricCode} style={{ color: '#2563eb', fontWeight: 700 }}>
                    j &le; n-i, k &le; 2i-1
                  </span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>n &minus; i</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Stars in Row i</span>
                  <span className={styles.metricCode} style={{ color: '#2563eb', fontWeight: 700 }}>
                    2i &minus; 1 (Odd)
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Inverted Right Half */}
            <div className={styles.pyramidCard}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.pyramidTitle}>Inverted Right</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Top-Heavy Decay</div>
                </div>
                <span className={`${styles.badgeTag} ${styles.tagInverted}`}>1 Reverse Loop</span>
              </div>

              <div className={styles.visualPatternBox} style={{ alignItems: 'flex-start' }}>
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
                  <span className={styles.metricCode}>j: 1 &rarr; i</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Leading Spaces</span>
                  <span className={styles.metricCode}>0 (flush left)</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Stars in Row i</span>
                  <span className={styles.metricCode}>i</span>
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
};
