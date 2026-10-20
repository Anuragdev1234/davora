import { useState } from 'react';
import { AlertTriangle, Layers } from 'lucide-react';
import { PRECEDENCE_TABLE } from '../../data/operatorsLessonData';
import styles from './OperatorsArticle.module.css';

export function OperatorPrecedenceSection() {
  const [activeTab, setActiveTab] = useState<'mul-add' | 'paren' | 'assoc-div' | 'assoc-assign'>('mul-add');

  return (
    <section id="section-precedence" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-precedence">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>10</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>EVALUATION MECHANICS</span>
          </div>

          <h2 id="heading-precedence" className={styles.mainHeading}>
            Operator Precedence and Associativity
          </h2>

          <p className={styles.bodyText}>
            When an expression contains multiple operators, C uses two fundamental rules to determine how
            operands are grouped: <strong>precedence</strong> and <strong>associativity</strong>.
          </p>
        </div>

        {/* Conceptual definitions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', margin: '2rem 0' }}>
          <div style={{ background: '#fafaf7', border: '1px solid #e0e0d6', borderRadius: '12px', padding: '22px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 700, color: '#0055ff' }}>
              1. Operator Precedence
            </h4>
            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: '#4a4e47' }}>
              Precedence determines which operator binds more tightly to adjacent operands when different
              operators compete. For instance, multiplication has higher precedence than addition, meaning{' '}
              <code>10 + 20 * 30</code> binds as <code>10 + (20 * 30)</code>.
            </p>
          </div>

          <div style={{ background: '#fafaf7', border: '1px solid #e0e0d6', borderRadius: '12px', padding: '22px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 700, color: '#10a37f' }}>
              2. Operator Associativity
            </h4>
            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: '#4a4e47' }}>
              Associativity dictates grouping direction when two operators have <em>identical</em> precedence.
              Most binary operators associate <strong>Left-to-Right</strong> (e.g. <code>100 / 5 * 2</code>),
              while assignment and ternary operators associate <strong>Right-to-Left</strong> (e.g. <code>a = b = c = 5</code>).
            </p>
          </div>
        </div>

        {/* Complete 15-Level Precedence Table */}
        <h3 className={styles.subHeading}>Complete C Operator Precedence &amp; Associativity Table</h3>
        <p className={styles.bodyText}>
          Listed from highest precedence (Level 1) to lowest precedence (Level 15):
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.editorialTable} aria-label="C Operator Precedence Table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '8%' }}>Level</th>
                <th scope="col" style={{ width: '18%' }}>Category</th>
                <th scope="col" style={{ width: '32%' }}>Operators</th>
                <th scope="col" style={{ width: '18%' }}>Associativity</th>
                <th scope="col" style={{ width: '24%' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {PRECEDENCE_TABLE.map((row) => (
                <tr key={row.level}>
                  <td>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontWeight: 700,
                        color: row.level <= 3 ? '#0055ff' : row.level <= 7 ? '#d97706' : '#686c62',
                      }}
                    >
                      {row.level}
                    </span>
                  </td>
                  <td>
                    <strong>{row.category}</strong>
                  </td>
                  <td>
                    <code
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.86rem',
                        background: '#f4f4f0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        color: '#191b19',
                      }}
                    >
                      {row.operators}
                    </code>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: row.associativity === 'Right-to-Left' ? '#fdf2f8' : '#f0fdf4',
                        color: row.associativity === 'Right-to-Left' ? '#db2777' : '#16a34a',
                      }}
                    >
                      {row.associativity}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#555850' }}>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interactive Worked Expression Breakdown Lab */}
        <div className={styles.interactiveWidgetCard}>
          <div className={styles.widgetHeader}>
            <div>
              <span className={styles.widgetBadge}>
                <Layers size={13} />
                <span>INTERACTIVE EXPRESSION PARSER</span>
              </span>
              <h4 className={styles.widgetTitle}>Worked Precedence &amp; Associativity Demonstrations</h4>
              <p className={styles.widgetSubtitle}>
                Select an expression to step through how the C compiler parses operand binding.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveTab('mul-add')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: activeTab === 'mul-add' ? '1px solid #191b19' : '1px solid #dcdcd5',
                  background: activeTab === 'mul-add' ? '#191b19' : '#ffffff',
                  color: activeTab === 'mul-add' ? '#f5f5f1' : '#4a4e47',
                  cursor: 'pointer',
                }}
              >
                10 + 20 * 30
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('paren')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: activeTab === 'paren' ? '1px solid #191b19' : '1px solid #dcdcd5',
                  background: activeTab === 'paren' ? '#191b19' : '#ffffff',
                  color: activeTab === 'paren' ? '#f5f5f1' : '#4a4e47',
                  cursor: 'pointer',
                }}
              >
                (10 + 20) * 30
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('assoc-div')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: activeTab === 'assoc-div' ? '1px solid #191b19' : '1px solid #dcdcd5',
                  background: activeTab === 'assoc-div' ? '#191b19' : '#ffffff',
                  color: activeTab === 'assoc-div' ? '#f5f5f1' : '#4a4e47',
                  cursor: 'pointer',
                }}
              >
                100 / 5 * 2
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('assoc-assign')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: activeTab === 'assoc-assign' ? '1px solid #191b19' : '1px solid #dcdcd5',
                  background: activeTab === 'assoc-assign' ? '#191b19' : '#ffffff',
                  color: activeTab === 'assoc-assign' ? '#f5f5f1' : '#4a4e47',
                  cursor: 'pointer',
                }}
              >
                a = b = c = 5
              </button>
            </div>
          </div>

          <div
            style={{
              background: '#141614',
              borderRadius: '10px',
              padding: '22px',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.92rem',
              color: '#f5f5f1',
              lineHeight: 1.8,
            }}
          >
            {activeTab === 'mul-add' && (
              <>
                <div style={{ color: '#888c85', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Precedence: Multiplication binds before Addition
                </div>
                <div style={{ color: '#ffffff' }}>Expression: <span style={{ color: '#93c5fd' }}>10 + 20 * 30;</span></div>
                <div>Grouping   : 10 + <span style={{ color: '#86efac' }}>(20 * 30)</span></div>
                <div>Evaluation : 10 + <span style={{ color: '#86efac' }}>600</span></div>
                <div style={{ color: '#facc15', fontWeight: 700 }}>Final Result: 610</div>
                <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '10px' }}>
                  Multiplication (*) at Level 3 outranks Addition (+) at Level 4.
                </div>
              </>
            )}

            {activeTab === 'paren' && (
              <>
                <div style={{ color: '#888c85', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Overriding Precedence with Parentheses
                </div>
                <div style={{ color: '#ffffff' }}>Expression: <span style={{ color: '#93c5fd' }}>(10 + 20) * 30;</span></div>
                <div>Grouping   : <span style={{ color: '#86efac' }}>(10 + 20)</span> * 30</div>
                <div>Evaluation : <span style={{ color: '#86efac' }}>30</span> * 30</div>
                <div style={{ color: '#facc15', fontWeight: 700 }}>Final Result: 900</div>
                <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '10px' }}>
                  Parentheses () at Level 1 have the highest precedence, forcing addition first.
                </div>
              </>
            )}

            {activeTab === 'assoc-div' && (
              <>
                <div style={{ color: '#888c85', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Left-to-Right Associativity for Equal Precedence (/ and *)
                </div>
                <div style={{ color: '#ffffff' }}>Expression: <span style={{ color: '#93c5fd' }}>100 / 5 * 2;</span></div>
                <div>Grouping   : <span style={{ color: '#86efac' }}>(100 / 5)</span> * 2</div>
                <div>Evaluation : <span style={{ color: '#86efac' }}>20</span> * 2</div>
                <div style={{ color: '#facc15', fontWeight: 700 }}>Final Result: 40 (NOT 10!)</div>
                <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '10px' }}>
                  Because / and * share Level 3, Left-to-Right associativity forces division before multiplication.
                </div>
              </>
            )}

            {activeTab === 'assoc-assign' && (
              <>
                <div style={{ color: '#888c85', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Right-to-Left Associativity for Assignment Operators
                </div>
                <div style={{ color: '#ffffff' }}>Expression: <span style={{ color: '#93c5fd' }}>a = b = c = 5;</span></div>
                <div>Grouping   : a = (b = (c = 5))</div>
                <div>Evaluation : c = 5 → b = 5 → a = 5</div>
                <div style={{ color: '#facc15', fontWeight: 700 }}>Final Result: a = 5, b = 5, c = 5</div>
                <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '10px' }}>
                  Assignment operators associate from Right-to-Left at Level 14.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Critical Distinction Alert */}
        <div className={styles.calloutCard}>
          <div className={styles.calloutIcon}>
            <AlertTriangle size={20} color="#b45309" />
          </div>
          <div>
            <div className={styles.calloutTitle}>Critical Distinction: Grouping vs. Evaluation Order</div>
            <p className={styles.calloutText}>
              Precedence and associativity govern strictly how operands <strong>bind to operators in the Abstract Syntax Tree</strong>.
              They do <em>not</em> dictate the runtime sequence in which the CPU evaluates sub-expressions or function calls.
              For example, in <code>f() + g() * h()</code>, the multiplication is mathematically grouped, but the C standard leaves the
              order in which <code>f()</code>, <code>g()</code>, and <code>h()</code> are called unspecified. Never rely on unspecified
              sub-expression evaluation order!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
