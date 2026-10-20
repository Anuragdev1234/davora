import { useState } from 'react';
import { Copy, Check, Sliders, Cpu, GitFork } from 'lucide-react';
import styles from './OperatorsArticle.module.css';

export function OperatorsInDepthSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Logical Operator State
  const [logicA, setLogicA] = useState<boolean>(true);
  const [logicB, setLogicB] = useState<boolean>(false);

  // Interactive Bitwise Operator State
  const [activeBitwiseOp, setActiveBitwiseOp] = useState<'AND' | 'OR' | 'XOR' | 'LSHIFT' | 'RSHIFT'>('AND');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      {/* ============================================================
          SECTION A: WHAT IS AN OPERATOR IN C?
          ============================================================ */}
      <section id="section-what-is-operator" className={styles.sectionWrapper} aria-labelledby="heading-what-is-operator">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>01</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>CORE CONCEPTS</span>
            </div>

            <h2 id="heading-what-is-operator" className={styles.mainHeading}>
              What Is an Operator in C?
            </h2>

            <p className={styles.bodyText}>
              In C, an <strong>operator</strong> is a symbol that tells the compiler to perform a specific
              mathematical, relational, logical, or bitwise manipulation. The data items that an operator
              acts upon are called <strong>operands</strong>.
            </p>
          </div>

          <div className={styles.syntaxCard}>
            <div className={styles.syntaxLabel}>Example Expression</div>
            <code className={styles.syntaxCode}>int a = 10, b = 5;<br />int sum = a + b;</code>
          </div>

          <p className={styles.bodyText}>
            In the expression <code>a + b</code>, <code>+</code> is the operator, while <code>a</code> and{' '}
            <code>b</code> are the operands. The evaluated result (<code>15</code>) is then assigned to{' '}
            <code>sum</code> through the assignment operator <code>=</code>.
          </p>

          <h3 className={styles.subHeading}>Classification by Operand Arity</h3>
          <p className={styles.bodyText}>
            Operators are categorized by the number of operands they require:
          </p>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <span className={styles.bulletDot} />
              <span>
                <strong>Unary Operators:</strong> Act upon a single operand. Examples include increment{' '}
                <code>++</code>, decrement <code>--</code>, logical NOT <code>!</code>, bitwise NOT{' '}
                <code>~</code>, address-of <code>&amp;</code>, dereference <code>*</code>, and <code>sizeof</code>.
              </span>
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.bulletDot} />
              <span>
                <strong>Binary Operators:</strong> Act upon two operands. This encompasses the vast majority
                of C operators, including arithmetic (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>),
                relational (<code>&gt;</code>, <code>&lt;</code>, <code>==</code>), logical (<code>&amp;&amp;</code>, <code>||</code>),
                and bitwise (<code>&amp;</code>, <code>|</code>, <code>^</code>).
              </span>
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.bulletDot} />
              <span>
                <strong>Ternary Operator:</strong> Acts upon three operands. C provides exactly one ternary operator:
                the conditional operator <code>?:</code> (e.g. <code>condition ? expr1 : expr2</code>).
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================
          SECTION B: ARITHMETIC OPERATORS
          ============================================================ */}
      <section id="section-arithmetic" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-arithmetic">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>02</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>MATHEMATICAL COMPUTATION</span>
            </div>

            <h2 id="heading-arithmetic" className={styles.mainHeading}>
              Arithmetic Operators
            </h2>

            <p className={styles.bodyText}>
              Arithmetic operators perform standard algebraic operations on numeric operands. C supports
              addition (<code>+</code>), subtraction (<code>-</code>), multiplication (<code>*</code>),
              division (<code>/</code>), remainder / modulo (<code>%</code>), increment (<code>++</code>),
              and decrement (<code>--</code>).
            </p>
          </div>

          <div className={styles.codePanelWrap}>
            <div className={styles.codePanelHeader}>
              <div className={styles.codePanelTitle}>
                <div className={styles.trafficDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotAmber} />
                  <span className={styles.dotGreen} />
                </div>
                <span>arithmetic_operations.c</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() =>
                  copyToClipboard(
                    `#include <stdio.h>\n\nint main(void)\n{\n    int a = 14, b = 4;\n\n    printf("Addition: %d\\n", a + b);\n    printf("Subtraction: %d\\n", a - b);\n    printf("Multiplication: %d\\n", a * b);\n    printf("Integer Division: %d\\n", a / b);\n    printf("Remainder (Modulo): %d\\n", a % b);\n\n    return 0;\n}`,
                    'arithmetic'
                  )
                }
              >
                {copiedKey === 'arithmetic' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
                <span>{copiedKey === 'arithmetic' ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className={styles.codePre}>
              <code>{`#include <stdio.h>

int main(void)
{
    int a = 14, b = 4;

    printf("Addition: %d\\n", a + b);
    printf("Subtraction: %d\\n", a - b);
    printf("Multiplication: %d\\n", a * b);
    printf("Integer Division: %d\\n", a / b);
    printf("Remainder (Modulo): %d\\n", a % b);

    return 0;
}`}</code>
            </pre>

            <div className={styles.outputBox}>
              <div className={styles.outputHeader}>Verified Output:</div>
              <pre className={styles.outputPre}>{`Addition: 18
Subtraction: 10
Multiplication: 56
Integer Division: 3
Remainder (Modulo): 2`}</pre>
            </div>
          </div>

          <div className={styles.calloutCard}>
            <div className={styles.calloutIcon}>
              <Cpu size={20} color="#b45309" />
            </div>
            <div>
              <div className={styles.calloutTitle}>Critical Rule: Integer Division &amp; Modulo Constraints</div>
              <p className={styles.calloutText}>
                When both operands of <code>/</code> are integers, C performs <strong>integer division</strong>,
                truncating any fractional decimal component towards zero (e.g. <code>14 / 4</code> evaluates to{' '}
                <code>3</code>, not <code>3.5</code>). The remainder operator <code>%</code> requires integer
                operands and cannot be used with floating-point types like <code>float</code> or <code>double</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION C: RELATIONAL OPERATORS
          ============================================================ */}
      <section id="section-relational" className={styles.sectionWrapper} aria-labelledby="heading-relational">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>03</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>EQUALITY & COMPARISON</span>
            </div>

            <h2 id="heading-relational" className={styles.mainHeading}>
              Relational Operators
            </h2>

            <p className={styles.bodyText}>
              Relational operators compare two values to establish relative order or equality. In C, comparison
              expressions produce an <code>int</code> value: exactly <code>1</code> when the relationship is true,
              and <code>0</code> when false.
            </p>
          </div>

          <div className={styles.codePanelWrap}>
            <div className={styles.codePanelHeader}>
              <div className={styles.codePanelTitle}>
                <div className={styles.trafficDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotAmber} />
                  <span className={styles.dotGreen} />
                </div>
                <span>relational_comparisons.c</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() =>
                  copyToClipboard(
                    `#include <stdio.h>\n\nint main(void)\n{\n    int x = 20, y = 15;\n\n    printf("x > y: %d\\n", x > y);\n    printf("x < y: %d\\n", x < y);\n    printf("x == y: %d\\n", x == y);\n    printf("x != y: %d\\n", x != y);\n\n    return 0;\n}`,
                    'relational'
                  )
                }
              >
                {copiedKey === 'relational' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
                <span>{copiedKey === 'relational' ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className={styles.codePre}>
              <code>{`#include <stdio.h>

int main(void)
{
    int x = 20, y = 15;

    printf("x > y: %d\\n", x > y);
    printf("x < y: %d\\n", x < y);
    printf("x == y: %d\\n", x == y);
    printf("x != y: %d\\n", x != y);

    return 0;
}`}</code>
            </pre>

            <div className={styles.outputBox}>
              <div className={styles.outputHeader}>Verified Output:</div>
              <pre className={styles.outputPre}>{`x > y: 1
x < y: 0
x == y: 0
x != y: 1`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION D: LOGICAL OPERATORS & SHORT-CIRCUITING
          ============================================================ */}
      <section id="section-logical" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-logical">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>04</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>BOOLEAN CONDITIONS</span>
            </div>

            <h2 id="heading-logical" className={styles.mainHeading}>
              Logical Operators &amp; Short-Circuiting
            </h2>

            <p className={styles.bodyText}>
              Logical operators evaluate condition combinations. C treats integer <code>0</code> as false and
              any non-zero value as true. The operators are Logical AND (<code>&amp;&amp;</code>), Logical OR{' '}
              (<code>||</code>), and Logical NOT (<code>!</code>).
            </p>
          </div>

          {/* Interactive Logical Lab */}
          <div className={styles.interactiveWidgetCard}>
            <div className={styles.widgetHeader}>
              <div>
                <span className={styles.widgetBadge}>
                  <Sliders size={13} />
                  <span>INTERACTIVE LAB</span>
                </span>
                <h4 className={styles.widgetTitle}>Logical Truth Table &amp; Short-Circuit Simulator</h4>
                <p className={styles.widgetSubtitle}>Toggle operand states to inspect evaluation outcomes</p>
              </div>

              {/* Operand Toggles */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setLogicA(!logicA)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #dcdcd5',
                    background: logicA ? '#191b19' : '#ffffff',
                    color: logicA ? '#f5f5f1' : '#191b19',
                    fontFamily: 'ui-monospace, monospace',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Operand A: {logicA ? '1 (TRUE)' : '0 (FALSE)'}
                </button>

                <button
                  type="button"
                  onClick={() => setLogicB(!logicB)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #dcdcd5',
                    background: logicB ? '#191b19' : '#ffffff',
                    color: logicB ? '#f5f5f1' : '#191b19',
                    fontFamily: 'ui-monospace, monospace',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Operand B: {logicB ? '1 (TRUE)' : '0 (FALSE)'}
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '14px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e0e0d6', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0055ff', textTransform: 'uppercase', marginBottom: '6px' }}>
                  A &amp;&amp; B (Logical AND)
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#191b19', fontFamily: 'ui-monospace, monospace' }}>
                  {logicA && logicB ? '1 (TRUE)' : '0 (FALSE)'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#686c62', marginTop: '6px' }}>
                  {!logicA ? '⚡ Short-circuited! Operand B is skipped because A is false.' : 'Both operands evaluated.'}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e0e0d6', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10a37f', textTransform: 'uppercase', marginBottom: '6px' }}>
                  A || B (Logical OR)
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#191b19', fontFamily: 'ui-monospace, monospace' }}>
                  {logicA || logicB ? '1 (TRUE)' : '0 (FALSE)'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#686c62', marginTop: '6px' }}>
                  {logicA ? '⚡ Short-circuited! Operand B is skipped because A is true.' : 'Both operands evaluated.'}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e0e0d6', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', marginBottom: '6px' }}>
                  !A (Logical NOT)
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#191b19', fontFamily: 'ui-monospace, monospace' }}>
                  {!logicA ? '1 (TRUE)' : '0 (FALSE)'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#686c62', marginTop: '6px' }}>
                  Unary operator inverting the boolean state of A.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION E: ASSIGNMENT OPERATORS
          ============================================================ */}
      <section id="section-assignment" className={styles.sectionWrapper} aria-labelledby="heading-assignment">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>05</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>STORAGE &amp; MUTATION</span>
            </div>

            <h2 id="heading-assignment" className={styles.mainHeading}>
              Assignment &amp; Compound Assignment
            </h2>

            <p className={styles.bodyText}>
              Assignment operators store values into variable storage locations (lvalues). Simple assignment{' '}
              <code>=</code> copies the evaluated right-hand expression into the left operand. Compound assignment
              operators combine an arithmetic or bitwise operation with assignment.
            </p>
          </div>

          <div className={styles.syntaxCard}>
            <div className={styles.syntaxLabel}>Compound Assignment Equivalence</div>
            <code className={styles.syntaxCode}>int a = 10;<br />a += 5; // Exactly equivalent to: a = a + 5; (resulting value: 15)</code>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.editorialTable} aria-label="Compound Assignment Operators in C">
              <thead>
                <tr>
                  <th scope="col">Operator</th>
                  <th scope="col">Example</th>
                  <th scope="col">Equivalent Form</th>
                  <th scope="col">Result (Initial a = 10)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>+=</code></td>
                  <td><code>a += 5</code></td>
                  <td><code>a = a + 5</code></td>
                  <td><code>15</code></td>
                </tr>
                <tr>
                  <td><code>-=</code></td>
                  <td><code>a -= 3</code></td>
                  <td><code>a = a - 3</code></td>
                  <td><code>7</code></td>
                </tr>
                <tr>
                  <td><code>*=</code></td>
                  <td><code>a *= 2</code></td>
                  <td><code>a = a * 2</code></td>
                  <td><code>20</code></td>
                </tr>
                <tr>
                  <td><code>/=</code></td>
                  <td><code>a /= 4</code></td>
                  <td><code>a = a / 4</code></td>
                  <td><code>2 (integer division)</code></td>
                </tr>
                <tr>
                  <td><code>%=</code></td>
                  <td><code>a %= 3</code></td>
                  <td><code>a = a % 3</code></td>
                  <td><code>1 (remainder)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION F: BITWISE OPERATORS
          ============================================================ */}
      <section id="section-bitwise" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-bitwise">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>06</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>BINARY MANIPULATION</span>
            </div>

            <h2 id="heading-bitwise" className={styles.mainHeading}>
              Bitwise Operators
            </h2>

            <p className={styles.bodyText}>
              Bitwise operators perform boolean operations directly on the individual binary bits of integer
              operands. They include Bitwise AND (<code>&amp;</code>), Bitwise OR (<code>|</code>), Bitwise XOR{' '}
              (<code>^</code>), One's Complement (<code>~</code>), Left Shift (<code>&lt;&lt;</code>), and Right Shift{' '}
              (<code>&gt;&gt;</code>).
            </p>
          </div>

          {/* 4-Bit Illustration Breakdown */}
          <div className={styles.interactiveWidgetCard}>
            <div className={styles.widgetHeader}>
              <div>
                <span className={styles.widgetBadge} style={{ color: '#9333ea', background: '#faf5ff', borderColor: '#e9d5ff' }}>
                  <Cpu size={13} />
                  <span>4-BIT ILLUSTRATION</span>
                </span>
                <h4 className={styles.widgetTitle}>Binary Bit Manipulation: Operand 5 &amp; 3</h4>
                <p className={styles.widgetSubtitle}>
                  Examining 4-bit representations: <strong>5 (0101₂)</strong> and <strong>3 (0011₂)</strong>
                </p>
              </div>

              {/* Operator Tabs */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(['AND', 'OR', 'XOR', 'LSHIFT', 'RSHIFT'] as const).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setActiveBitwiseOp(op)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontFamily: 'ui-monospace, monospace',
                      fontWeight: 700,
                      border: activeBitwiseOp === op ? '1px solid #9333ea' : '1px solid #e0e0d6',
                      background: activeBitwiseOp === op ? '#9333ea' : '#ffffff',
                      color: activeBitwiseOp === op ? '#ffffff' : '#4a4e47',
                      cursor: 'pointer',
                    }}
                  >
                    {op === 'AND' ? '5 & 3' : op === 'OR' ? '5 | 3' : op === 'XOR' ? '5 ^ 3' : op === 'LSHIFT' ? '5 << 1' : '5 >> 1'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bit Diagram */}
            <div
              style={{
                background: '#141614',
                borderRadius: '10px',
                padding: '20px',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.95rem',
                color: '#f5f5f1',
                lineHeight: 1.8,
              }}
            >
              <div style={{ color: '#888c85', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                Bitwise Register Evaluation (4-Bit Width)
              </div>
              {activeBitwiseOp === 'AND' && (
                <>
                  <div>Operand 1:  0 1 0 1  (decimal 5)</div>
                  <div>Operand 2:  0 0 1 1  (decimal 3)</div>
                  <div style={{ borderBottom: '1px solid #444', width: '220px', margin: '4px 0' }} />
                  <div style={{ color: '#86efac', fontWeight: 700 }}>5 &amp; 3    :  0 0 0 1  (decimal 1)</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '8px' }}>
                    Only bit 0 is active (1) in both operands.
                  </div>
                </>
              )}
              {activeBitwiseOp === 'OR' && (
                <>
                  <div>Operand 1:  0 1 0 1  (decimal 5)</div>
                  <div>Operand 2:  0 0 1 1  (decimal 3)</div>
                  <div style={{ borderBottom: '1px solid #444', width: '220px', margin: '4px 0' }} />
                  <div style={{ color: '#86efac', fontWeight: 700 }}>5 | 3    :  0 1 1 1  (decimal 7)</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '8px' }}>
                    Bits 0, 1, and 2 are set if active in either operand.
                  </div>
                </>
              )}
              {activeBitwiseOp === 'XOR' && (
                <>
                  <div>Operand 1:  0 1 0 1  (decimal 5)</div>
                  <div>Operand 2:  0 0 1 1  (decimal 3)</div>
                  <div style={{ borderBottom: '1px solid #444', width: '220px', margin: '4px 0' }} />
                  <div style={{ color: '#86efac', fontWeight: 700 }}>5 ^ 3    :  0 1 1 0  (decimal 6)</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '8px' }}>
                    Bits 1 and 2 differ between the two operands, yielding 1.
                  </div>
                </>
              )}
              {activeBitwiseOp === 'LSHIFT' && (
                <>
                  <div>Operand:   0 1 0 1  (decimal 5)</div>
                  <div style={{ borderBottom: '1px solid #444', width: '220px', margin: '4px 0' }} />
                  <div style={{ color: '#86efac', fontWeight: 700 }}>5 &lt;&lt; 1  :  1 0 1 0  (decimal 10)</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '8px' }}>
                    Shifting bits left by 1 position effectively multiplies integer value by 2.
                  </div>
                </>
              )}
              {activeBitwiseOp === 'RSHIFT' && (
                <>
                  <div>Operand:   0 1 0 1  (decimal 5)</div>
                  <div style={{ borderBottom: '1px solid #444', width: '220px', margin: '4px 0' }} />
                  <div style={{ color: '#86efac', fontWeight: 700 }}>5 &gt;&gt; 1  :  0 0 1 0  (decimal 2)</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '8px' }}>
                    Shifting bits right by 1 position performs floor division by 2.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION G: INCREMENT AND DECREMENT
          ============================================================ */}
      <section id="section-increment" className={styles.sectionWrapper} aria-labelledby="heading-increment">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>07</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>SIDE-EFFECT SEMANTICS</span>
            </div>

            <h2 id="heading-increment" className={styles.mainHeading}>
              Increment &amp; Decrement: Pre vs. Post
            </h2>

            <p className={styles.bodyText}>
              The unary increment (<code>++</code>) and decrement (<code>--</code>) operators modify an
              integer lvalue by 1. The syntax position determines whether the expression evaluates to the
              newly modified value or the original value before mutation.
            </p>
          </div>

          <div className={styles.codePanelWrap}>
            <div className={styles.codePanelHeader}>
              <div className={styles.codePanelTitle}>
                <div className={styles.trafficDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotAmber} />
                  <span className={styles.dotGreen} />
                </div>
                <span>pre_post_increment.c</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() =>
                  copyToClipboard(
                    `#include <stdio.h>\n\nint main(void)\n{\n    int a = 5;\n    int b = ++a; // pre-increment: a becomes 6, b receives 6\n    int c = a++; // post-increment: c receives 6, a becomes 7\n\n    printf("a = %d, b = %d, c = %d\\n", a, b, c);\n    return 0;\n}`,
                    'incdec'
                  )
                }
              >
                {copiedKey === 'incdec' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
                <span>{copiedKey === 'incdec' ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className={styles.codePre}>
              <code>{`#include <stdio.h>

int main(void)
{
    int a = 5;
    int b = ++a; // pre-increment: a becomes 6, b receives 6
    int c = a++; // post-increment: c receives 6, a becomes 7

    printf("a = %d, b = %d, c = %d\\n", a, b, c);
    return 0;
}`}</code>
            </pre>

            <div className={styles.outputBox}>
              <div className={styles.outputHeader}>Verified Output:</div>
              <pre className={styles.outputPre}>{`a = 7, b = 6, c = 6`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION H: TERNARY CONDITIONAL OPERATOR
          ============================================================ */}
      <section id="section-ternary" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-ternary">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>08</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>CONDITIONAL EXPRESSION</span>
            </div>

            <h2 id="heading-ternary" className={styles.mainHeading}>
              Conditional / Ternary Operator (?:)
            </h2>

            <p className={styles.bodyText}>
              The ternary conditional operator evaluates an inline conditional branch without requiring
              a multi-line <code>if-else</code> statement block.
            </p>
          </div>

          <div className={styles.syntaxCard}>
            <div className={styles.syntaxLabel}>Syntax</div>
            <code className={styles.syntaxCode}>condition ? expression_if_true : expression_if_false;</code>
          </div>

          <div className={styles.codePanelWrap}>
            <div className={styles.codePanelHeader}>
              <div className={styles.codePanelTitle}>
                <div className={styles.trafficDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotAmber} />
                  <span className={styles.dotGreen} />
                </div>
                <span>ternary_maximum.c</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() =>
                  copyToClipboard(
                    `#include <stdio.h>\n\nint main(void)\n{\n    int a = 25, b = 40;\n    int max = (a > b) ? a : b;\n\n    printf("Maximum value: %d\\n", max);\n    return 0;\n}`,
                    'ternary'
                  )
                }
              >
                {copiedKey === 'ternary' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
                <span>{copiedKey === 'ternary' ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className={styles.codePre}>
              <code>{`#include <stdio.h>

int main(void)
{
    int a = 25, b = 40;
    int max = (a > b) ? a : b;

    printf("Maximum value: %d\\n", max);
    return 0;
}`}</code>
            </pre>

            <div className={styles.outputBox}>
              <div className={styles.outputHeader}>Verified Output:</div>
              <pre className={styles.outputPre}>{`Maximum value: 40`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION I: OTHER IMPORTANT OPERATORS IN C
          ============================================================ */}
      <section id="section-other-operators" className={styles.sectionWrapper} aria-labelledby="heading-other-operators">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>09</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>SPECIALIZED OPERATORS</span>
            </div>

            <h2 id="heading-other-operators" className={styles.mainHeading}>
              Other Important Operators in C
            </h2>

            <p className={styles.bodyText}>
              C includes specialized operators for memory querying, pointer manipulation, structure
              membership, and expression sequencing.
            </p>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.editorialTable} aria-label="Other Operators in C">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '16%' }}>Operator</th>
                  <th scope="col" style={{ width: '28%' }}>Name</th>
                  <th scope="col" style={{ width: '56%' }}>Description &amp; Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>sizeof</code></td>
                  <td>Size Query</td>
                  <td>Returns storage size in bytes as type <code>size_t</code> (e.g. <code>sizeof(int)</code>).</td>
                </tr>
                <tr>
                  <td><code>&amp;</code></td>
                  <td>Address-Of</td>
                  <td>Yields the physical memory address of an lvalue object (e.g. <code>&amp;variable</code>).</td>
                </tr>
                <tr>
                  <td><code>*</code></td>
                  <td>Dereference</td>
                  <td>Accesses the value stored at the memory location pointed to by a pointer (e.g. <code>*ptr</code>).</td>
                </tr>
                <tr>
                  <td><code>(type)</code></td>
                  <td>Type Cast</td>
                  <td>Explicitly converts an expression to a target type (e.g. <code>(float)10</code>).</td>
                </tr>
                <tr>
                  <td><code>,</code></td>
                  <td>Comma Operator</td>
                  <td>Evaluates expressions sequentially from left to right; returns the value of the rightmost operand.</td>
                </tr>
                <tr>
                  <td><code>.</code></td>
                  <td>Direct Member</td>
                  <td>Accesses an element of a struct or union object directly (e.g. <code>student.age</code>).</td>
                </tr>
                <tr>
                  <td><code>-&gt;</code></td>
                  <td>Arrow Member</td>
                  <td>Accesses a struct or union member through a pointer (e.g. <code>ptr-&gt;age</code>).</td>
                </tr>
                <tr>
                  <td><code>[]</code></td>
                  <td>Subscript</td>
                  <td>Accesses array element at an offset index (e.g. <code>arr[2]</code>).</td>
                </tr>
                <tr>
                  <td><code>()</code></td>
                  <td>Function Call</td>
                  <td>Invokes a function with argument expressions (e.g. <code>printf("Hi")</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.calloutCard}>
            <div className={styles.calloutIcon}>
              <GitFork size={20} color="#b45309" />
            </div>
            <div>
              <div className={styles.calloutTitle}>Contextual Disambiguation of &amp; and *</div>
              <p className={styles.calloutText}>
                In C, symbol meaning depends strictly on grammatical position. The symbol <code>&amp;</code> functions as
                a binary <strong>bitwise AND</strong> (<code>a &amp; b</code>), but as a unary <strong>address-of</strong> operator
                (<code>&amp;a</code>). Similarly, <code>*</code> acts as binary <strong>multiplication</strong> (<code>a * b</code>),
                as a unary <strong>pointer dereference</strong> (<code>*ptr</code>), and as a <strong>type declarator</strong> (<code>int *p</code>).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
