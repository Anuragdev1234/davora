import { useState } from 'react';
import styles from './AlgorithmVsCodeSection.module.css';

interface LogicMapping {
  id: string;
  stage: string;
  algorithmDesc: string;
  codeSnippet: string;
}

const MAPPINGS: LogicMapping[] = [
  {
    id: 'input',
    stage: '01 · User Input',
    algorithmDesc: 'Read n from the user and ensure 1 <= n <= 10.',
    codeSnippet: 'if (scanf("%d", &n) != 1 || n < 1 || n > 10) return 1;',
  },
  {
    id: 'outer-loop',
    stage: '02 · Outer Loop (Row)',
    algorithmDesc: 'For each row i from 1 up to n, execute the row generator.',
    codeSnippet: 'for (int i = 1; i <= n; i++) {',
  },
  {
    id: 'inner-loop',
    stage: '03 · Inner Loop (Columns)',
    algorithmDesc: 'For each column j from 1 up to i, print a star.',
    codeSnippet: 'for (int j = 1; j <= i; j++) {',
  },
  {
    id: 'print-star',
    stage: '04 · Star Output',
    algorithmDesc: 'Output an asterisk followed by a single space without a newline.',
    codeSnippet: 'printf("* ");',
  },
  {
    id: 'newline',
    stage: '05 · Line Completion',
    algorithmDesc: 'After the inner loop finishes row i, advance the cursor to the next line.',
    codeSnippet: 'printf("\\n");',
  },
  {
    id: 'exit',
    stage: '06 · Program Exit',
    algorithmDesc: 'Once all n rows finish, return status 0 to indicate success.',
    codeSnippet: 'return 0;',
  },
];

export function AlgorithmVsCodeSection() {
  const [activeMappingId, setActiveMappingId] = useState<string>('inner-loop');

  return (
    <section className={styles.section} id="algorithm-vs-code" aria-label="08 Algorithm vs Code">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>08 / The Same Logic, Different Representations</div>
          <h2 className={styles.sectionTitle}>Algorithm &harr; C Syntax Alignment</h2>
          <p className={styles.sectionDesc}>
            See how every logical step in human thought maps directly to its corresponding
            statement in C. Click any pair to highlight the alignment.
          </p>
        </div>

        <div className={styles.comparisonGrid}>
          {/* Left Column: Algorithm Representation */}
          <div className={styles.columnCard}>
            <div className={styles.colHeader}>
              <span className={styles.colTitle}>Algorithm Logic</span>
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

          {/* Right Column: C Code Representation */}
          <div className={styles.columnCard}>
            <div className={styles.colHeader}>
              <span className={styles.colTitle}>C Program Statements</span>
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
      </div>
    </section>
  );
}
