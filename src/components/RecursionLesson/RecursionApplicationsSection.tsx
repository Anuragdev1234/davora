import { useState } from 'react';
import { REAL_WORLD_APPLICATIONS } from '../../data/recursionLessonData';
import { Network, GitBranch, Sigma, Compass } from 'lucide-react';
import styles from './RecursionApplicationsSection.module.css';

export function RecursionApplicationsSection() {
  const [activeAppId, setActiveAppId] = useState<string>('divide-conquer');

  const activeApp =
    REAL_WORLD_APPLICATIONS.find((a) => a.id === activeAppId) || REAL_WORLD_APPLICATIONS[1];

  return (
    <section className={styles.sectionWrapper} id="applications">
      <div className={styles.container}>
        <div id="section-applications">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>08</span>
            <h2 className={styles.sectionTitle}>Where Is Recursion Used?</h2>
            <p className={styles.sectionSubtitle}>
              From operating system file trees to compiler parsers, recursion is fundamental to
              modern computer science.
            </p>
          </div>

          {/* 4 Cards */}
          <div className={styles.appCardsGrid}>
            {REAL_WORLD_APPLICATIONS.map((app) => {
              const isSelected = app.id === activeAppId;
              const Icon =
                app.iconName === 'Network'
                  ? Network
                  : app.iconName === 'GitBranch'
                  ? GitBranch
                  : app.iconName === 'Sigma'
                  ? Sigma
                  : Compass;

              return (
                <div
                  key={app.id}
                  className={`${styles.appCard} ${isSelected ? styles.appCardActive : ''}`}
                  onClick={() => setActiveAppId(app.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={styles.appBadge}>{app.badge}</span>
                    <Icon size={16} color={isSelected ? '#2563eb' : '#64748b'} />
                  </div>
                  <h3 className={styles.appTitle}>{app.title}</h3>
                  <p className={styles.appSub}>{app.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Active Application Showcase */}
          <div className={styles.showcaseCard}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '3px 8px',
                  borderRadius: 6,
                }}
              >
                {activeApp.badge}
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0.5rem 0' }}>
                {activeApp.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                {activeApp.description}
              </p>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.82rem',
                  color: '#334155',
                }}
              >
                <strong>Key Industry Applications:</strong> {activeApp.subtitle}.
              </div>
            </div>

            {/* Visual Diagram Box */}
            <div className={styles.visualDiagramBox}>
              {activeAppId === 'tree-traversal' ? (
                /* Tree diagram */
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      background: '#2563eb',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: 20,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-block',
                    }}
                  >
                    Root Node
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                    <svg width="180" height="30" viewBox="0 0 180 30" fill="none">
                      <path d="M 90 0 L 40 28" stroke="#3b82f6" strokeWidth="2" />
                      <path d="M 90 0 L 140 28" stroke="#3b82f6" strokeWidth="2" />
                    </svg>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', gap: 20 }}>
                    <div
                      style={{
                        background: '#eff6ff',
                        border: '1px solid #3b82f6',
                        color: '#1d4ed8',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      Left Subtree
                    </div>
                    <div
                      style={{
                        background: '#eff6ff',
                        border: '1px solid #3b82f6',
                        color: '#1d4ed8',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      Right Subtree
                    </div>
                  </div>
                </div>
              ) : activeAppId === 'divide-conquer' ? (
                /* Merge sort split & combine */
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div
                    style={{
                      background: '#1e293b',
                      color: '#38bdf8',
                      padding: '6px 16px',
                      borderRadius: 8,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      display: 'inline-block',
                    }}
                  >
                    [ 38, 27, 43, 3, 9, 82, 10 ]
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700, margin: '8px 0 4px 0' }}>
                    ↓ Divide recursively into halves ↓
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
                    <span
                      style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                      }}
                    >
                      [ 38, 27, 43, 3 ]
                    </span>
                    <span
                      style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                      }}
                    >
                      [ 9, 82, 10 ]
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, margin: '8px 0 4px 0' }}>
                    ↑ Merge sorted solutions in O(n log n) ↑
                  </div>

                  <div
                    style={{
                      background: '#ecfdf5',
                      border: '1px solid #10b981',
                      color: '#065f46',
                      padding: '4px 14px',
                      borderRadius: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-block',
                    }}
                  >
                    [ 3, 9, 10, 27, 38, 43, 82 ]
                  </div>
                </div>
              ) : activeAppId === 'math-computations' ? (
                /* Factorial & Recurrence */
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#d97706',
                    }}
                  >
                    T(n) = T(n - 1) + O(1)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 8 }}>
                    Mathematical recurrence relations directly map into recursive function calls.
                  </div>
                </div>
              ) : (
                /* Backtracking search tree */
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      background: '#f5f3ff',
                      border: '1px solid #c4b5fd',
                      color: '#6d28d9',
                      padding: '6px 14px',
                      borderRadius: 8,
                      display: 'inline-block',
                      marginBottom: 8,
                    }}
                  >
                    Explore Choice A → Dead End ✗
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700, margin: '4px 0' }}>
                    ↩ Backtrack to previous state
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      background: '#ecfdf5',
                      border: '1px solid #6ee7b7',
                      color: '#047857',
                      padding: '6px 14px',
                      borderRadius: 8,
                      display: 'inline-block',
                    }}
                  >
                    Explore Choice B → Valid Solution ✓
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
