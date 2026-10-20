import { useState } from 'react';
import { RECURSION_TYPES } from '../../data/recursionLessonData';
import styles from './RecursionTypesSection.module.css';

export function RecursionTypesSection() {
  const [activeTypeId, setActiveTypeId] = useState<string>('tree');

  const activeType =
    RECURSION_TYPES.find((t) => t.id === activeTypeId) || RECURSION_TYPES[2];

  return (
    <section className={styles.sectionWrapper} id="types-recursion">
      <div className={styles.container}>
        <div id="section-types-recursion">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>04</span>
            <h2 className={styles.sectionTitle}>Types of Recursion in C</h2>
            <p className={styles.sectionSubtitle}>
              Recursion is classified based on where and how many times the function calls itself.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className={styles.typesGrid}>
            {RECURSION_TYPES.map((type) => {
              const isSelected = type.id === activeTypeId;
              return (
                <div
                  key={type.id}
                  className={styles.typeCard}
                  style={{
                    borderColor: isSelected ? type.color : '#e2e8f0',
                    background: isSelected ? type.bgLight : '#f8fafc',
                    boxShadow: isSelected ? `0 0 0 2px ${type.color}33` : undefined,
                  }}
                  onClick={() => setActiveTypeId(type.id)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardBadge} style={{ background: type.color }}>
                      {type.badge}
                    </div>
                    <h3 className={styles.cardTitle}>{type.title}</h3>
                  </div>

                  <div className={styles.cardSnippet}>
                    <code>{type.code.split('\n').slice(0, 4).join('\n')}...</code>
                  </div>

                  <p className={styles.cardSummary}>{type.summary}</p>
                </div>
              );
            })}
          </div>

          {/* Deep Inspector for Active Type */}
          <div className={styles.inspectorBox}>
            <div className={styles.inspectorGrid}>
              {/* Left: Code & Explanation */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: activeType.color,
                      background: activeType.bgLight,
                      padding: '4px 10px',
                      borderRadius: 6,
                    }}
                  >
                    Category {activeType.badge}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
                    {activeType.title}
                  </h3>
                </div>

                <div
                  style={{
                    background: '#141614',
                    borderRadius: 12,
                    padding: '1.25rem 1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    marginBottom: '1rem',
                  }}
                >
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{activeType.code}</pre>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {activeType.explanation}
                </p>
              </div>

              {/* Right: Structural Call Diagram */}
              <div className={styles.treeVisualContainer}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#64748b',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  Invocation Structure
                </span>

                {activeTypeId === 'tree' ? (
                  /* Branching Fibonacci Tree */
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        background: '#d97706',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                      }}
                    >
                      fib(3)
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                      <svg width="180" height="30" viewBox="0 0 180 30" fill="none">
                        <path d="M 90 0 L 40 28" stroke="#d97706" strokeWidth="2" />
                        <path d="M 90 0 L 140 28" stroke="#d97706" strokeWidth="2" />
                      </svg>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                      <div
                        style={{
                          background: '#fef3c7',
                          border: '1px solid #f59e0b',
                          color: '#92400e',
                          padding: '4px 10px',
                          borderRadius: 6,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                        }}
                      >
                        fib(2)
                      </div>
                      <div
                        style={{
                          background: '#dcfce7',
                          border: '1px solid #22c55e',
                          color: '#166534',
                          padding: '4px 10px',
                          borderRadius: 6,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                        }}
                      >
                        fib(1) = 1
                      </div>
                    </div>

                    <div style={{ display: 'flex', margin: '4px 0 0 35px' }}>
                      <svg width="90" height="25" viewBox="0 0 90 25" fill="none">
                        <path d="M 45 0 L 20 22" stroke="#d97706" strokeWidth="1.5" />
                        <path d="M 45 0 L 70 22" stroke="#d97706" strokeWidth="1.5" />
                      </svg>
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginLeft: 20 }}>
                      <span style={{ fontSize: '0.7rem', color: '#166534', fontFamily: 'var(--font-mono)' }}>
                        fib(1)=1
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#166534', fontFamily: 'var(--font-mono)' }}>
                        fib(0)=0
                      </span>
                    </div>
                  </div>
                ) : activeTypeId === 'indirect' ? (
                  /* Cyclic Mutual Recursion */
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 12,
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        background: '#ecfdf5',
                        border: '1.5px solid #059669',
                        color: '#065f46',
                        padding: '8px 18px',
                        borderRadius: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                      }}
                    >
                      Function A(n)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                        calls B(n - 1) ↓
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                        ↑ calls A(n - 1)
                      </span>
                    </div>
                    <div
                      style={{
                        background: '#ecfdf5',
                        border: '1.5px solid #059669',
                        color: '#065f46',
                        padding: '8px 18px',
                        borderRadius: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                      }}
                    >
                      Function B(n)
                    </div>
                  </div>
                ) : activeTypeId === 'tail' ? (
                  /* Tail Call Optimization Diagram */
                  <div style={{ width: '100%', padding: '0 10px' }}>
                    <div
                      style={{
                        background: '#f5f3ff',
                        border: '1px solid #c4b5fd',
                        borderRadius: 8,
                        padding: '10px 12px',
                        marginBottom: 10,
                      }}
                    >
                      <strong style={{ fontSize: '0.78rem', color: '#6d28d9', display: 'block' }}>
                        Without TCO:
                      </strong>
                      <span style={{ fontSize: '0.74rem', color: '#4b5563' }}>
                        Pushes stack frame for each call. Depth = O(n).
                      </span>
                    </div>

                    <div
                      style={{
                        background: '#ecfdf5',
                        border: '1px solid #6ee7b7',
                        borderRadius: 8,
                        padding: '10px 12px',
                      }}
                    >
                      <strong style={{ fontSize: '0.78rem', color: '#047857', display: 'block' }}>
                        With Tail-Call Optimization (TCO):
                      </strong>
                      <span style={{ fontSize: '0.74rem', color: '#065f46' }}>
                        Reuses the existing stack frame. Stack space = O(1)!
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Direct Linear Chain */
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {['fun(3)', 'fun(2)', 'fun(1)', 'fun(0) [Base]'].map((node, i) => (
                      <div
                        key={node}
                        style={{
                          background: i === 3 ? '#eff6ff' : '#ffffff',
                          border: `1.5px solid ${i === 3 ? '#2563eb' : '#94a3b8'}`,
                          color: i === 3 ? '#1d4ed8' : '#1e293b',
                          padding: '6px 14px',
                          borderRadius: 6,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        {node}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
