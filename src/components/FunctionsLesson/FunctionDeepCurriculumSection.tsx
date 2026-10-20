import { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import {
  LIBRARY_FUNCTIONS,
  USER_DEFINED_CATEGORIES,
} from '../../data/functionsLessonData';
import styles from './FunctionDeepCurriculumSection.module.css';

export function FunctionDeepCurriculumSection() {
  // Section 07 Terminology state
  const [termNumber, setTermNumber] = useState<number>(5);

  // Section 09 Category tab
  const [activeCatId, setActiveCatId] = useState<string>('cat-4');
  const activeCat =
    USER_DEFINED_CATEGORIES.find((c) => c.id === activeCatId) || USER_DEFINED_CATEGORIES[3];

  // Section 10 Subtract playground
  const [subA, setSubA] = useState<number>(15);
  const [subB, setSubB] = useState<number>(5);

  // Section 11 Call by value vs pointer state
  const valArg = 5;
  const [ptrArg, setPtrArg] = useState<number>(5);
  const [valUpdated, setValUpdated] = useState<boolean>(false);
  const [ptrUpdated, setPtrUpdated] = useState<boolean>(false);

  // Section 12 Cube
  const [cubeNum, setCubeNum] = useState<number>(3);

  return (
    <section className={styles.sectionWrapper} id="deep-function-curriculum">
      <div className={styles.container}>
        {/* ==========================================================
            07 / FUNCTION TERMINOLOGY
            ========================================================== */}
        <div id="section-terminology">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>07</span>
            <h2 className={styles.sectionTitle}>Function Terminology</h2>
            <p className={styles.sectionSubtitle}>
              Five key terms describe the components and lifecycle of every function call.
            </p>
          </div>

          <div className={styles.termCard}>
            <div className={styles.termGrid}>
              {/* Code */}
              <div className={styles.termCodeBox}>
                <span style={{ color: '#64748b' }}>// Function definition</span>
                <br />
                <span style={{ color: '#38bdf8' }}>int</span>{' '}
                <span style={{ color: '#fde047', fontWeight: 700 }}>square</span>(
                <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>return</span> n * n;
                </span>
                <br />
                {'}'}
                <br />
                <br />
                <span style={{ color: '#64748b' }}>// Caller context</span>
                <br />
                <span style={{ color: '#38bdf8' }}>int</span> main(
                <span style={{ color: '#38bdf8' }}>void</span>) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#38bdf8' }}>int</span> result = square(
                  <span style={{ color: '#fb923c', fontWeight: 700 }}>{termNumber}</span>);
                </span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  printf(<span style={{ color: '#86efac' }}>"Result = %d\\n"</span>, result);
                </span>
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>return</span> 0;
                </span>
                <br />
                {'}'}
              </div>

              {/* Terminology Inspector */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                    <Sparkles size={14} color="#2563eb" style={{ display: 'inline', marginRight: 4 }} />
                    Test argument:
                  </span>
                  <input
                    type="number"
                    value={termNumber}
                    onChange={(e) => setTermNumber(parseInt(e.target.value) || 0)}
                    style={{
                      width: 60,
                      padding: '4px 8px',
                      borderRadius: 6,
                      border: '1px solid #cbd5e1',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                    }}
                  />
                </div>

                <div className={styles.termItemsList}>
                  <div className={styles.termItemRow}>
                    <span className={styles.termName}>1. Function Name</span>
                    <span className={styles.termValue}>square</span>
                  </div>
                  <div className={styles.termItemRow}>
                    <span className={styles.termName}>2. Formal Parameter</span>
                    <span className={styles.termValue}>int n</span>
                  </div>
                  <div className={styles.termItemRow}>
                    <span className={styles.termName}>3. Actual Argument</span>
                    <span className={styles.termValue}>{termNumber}</span>
                  </div>
                  <div className={styles.termItemRow}>
                    <span className={styles.termName}>4. Return Value</span>
                    <span className={styles.termValue}>{termNumber * termNumber}</span>
                  </div>
                  <div className={styles.termItemRow}>
                    <span className={styles.termName}>5. Receiving Variable</span>
                    <span className={styles.termValue}>int result</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            08 / TYPES OF FUNCTIONS IN C
            ========================================================== */}
        <div id="section-types-overview">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>08</span>
            <h2 className={styles.sectionTitle}>Types of Functions in C</h2>
            <p className={styles.sectionSubtitle}>
              C programs combine standard library functions with custom user-defined procedures.
            </p>
          </div>

          <div className={styles.tableCard}>
            <h3 style={{ fontSize: '1.05rem', margin: '0 0 1rem 0', color: '#141614' }}>
              Standard C Library Functions Reference
            </h3>
            <table className={styles.libTable}>
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Header</th>
                  <th>Standard Prototype</th>
                  <th>Purpose</th>
                  <th>Sample Invocation</th>
                </tr>
              </thead>
              <tbody>
                {LIBRARY_FUNCTIONS.map((lib) => (
                  <tr key={lib.name}>
                    <td className={styles.libName}>{lib.name}</td>
                    <td>
                      <span className={styles.libHeader}>{lib.header}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.8rem', color: '#0f172a' }}>{lib.prototype}</code>
                    </td>
                    <td>{lib.purpose}</td>
                    <td>
                      <code style={{ fontSize: '0.8rem', color: '#2563eb' }}>{lib.example}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================================
            09 / FOUR TYPES OF USER-DEFINED FUNCTIONS
            ========================================================== */}
        <div id="section-four-categories">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>09</span>
            <h2 className={styles.sectionTitle}>Four Types of User-Defined Functions</h2>
            <p className={styles.sectionSubtitle}>
              Categorized based on whether they accept arguments and whether they return a value.
            </p>
          </div>

          <div>
            <div className={styles.userTypesTabs}>
              {USER_DEFINED_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.userTypeTabBtn} ${
                    activeCatId === cat.id ? styles.userTypeTabBtnActive : ''
                  }`}
                  onClick={() => setActiveCatId(cat.id)}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className={styles.userTypeContentCard}>
              {/* Code */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: '#eff6ff',
                    color: '#2563eb',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {activeCat.signature}
                </span>

                <div
                  style={{
                    background: '#141614',
                    borderRadius: 14,
                    padding: '1.25rem 1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem',
                    lineHeight: 1.65,
                    color: '#e2e8f0',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {activeCat.code}
                </div>
              </div>

              {/* Analysis */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 6px 0', color: '#141614' }}>
                  {activeCat.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                  {activeCat.tagline}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      background: activeCat.hasArgs ? '#ecfdf5' : '#f8fafc',
                      border: `1px solid ${activeCat.hasArgs ? '#10b981' : '#e2e8f0'}`,
                      borderRadius: 10,
                      padding: '10px 14px',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>
                      Arguments Input
                    </span>
                    <strong style={{ color: activeCat.hasArgs ? '#059669' : '#94a3b8' }}>
                      {activeCat.hasArgs ? '✓ Yes (Consumes Data)' : '✗ None (void)'}
                    </strong>
                  </div>

                  <div
                    style={{
                      background: activeCat.hasReturn ? '#ecfdf5' : '#f8fafc',
                      border: `1px solid ${activeCat.hasReturn ? '#10b981' : '#e2e8f0'}`,
                      borderRadius: 10,
                      padding: '10px 14px',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>
                      Return Value
                    </span>
                    <strong style={{ color: activeCat.hasReturn ? '#059669' : '#94a3b8' }}>
                      {activeCat.hasReturn ? '✓ Yes (Sends Result)' : '✗ None (void)'}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontSize: '0.85rem',
                    color: '#334155',
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Practical Use Case:</strong> {activeCat.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            10 / PARAMETERS AND ARGUMENTS
            ========================================================== */}
        <div id="section-parameters-arguments">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>10</span>
            <h2 className={styles.sectionTitle}>Parameters and Arguments</h2>
            <p className={styles.sectionSubtitle}>
              Formal parameters define the placeholders in the definition; actual arguments supply the
              concrete values at the call site.
            </p>
          </div>

          <div className={styles.paramArgGrid}>
            <div className={styles.paramCard}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px 0', color: '#141614' }}>
                Formal Parameters (Inside Definition)
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#64748b', margin: '0 0 1rem 0' }}>
                Variables declared in the function header that receive passed data copies.
              </p>
              <div
                style={{
                  background: '#141614',
                  borderRadius: 10,
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: '#e2e8f0',
                }}
              >
                <span style={{ color: '#38bdf8' }}>int</span> subtract(
                <span style={{ color: '#86efac', fontWeight: 700 }}>int a</span>,{' '}
                <span style={{ color: '#86efac', fontWeight: 700 }}>int b</span>) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e' }}>return</span> a - b;
                </span>
                <br />
                {'}'}
              </div>
            </div>

            <div className={styles.paramCard}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px 0', color: '#141614' }}>
                Actual Arguments (At Call Site)
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#64748b', margin: '0 0 1rem 0' }}>
                Real values, expressions, or variables supplied when the function is invoked.
              </p>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Arg 1:
                  <input
                    type="number"
                    value={subA}
                    onChange={(e) => setSubA(parseInt(e.target.value) || 0)}
                    style={{
                      width: 55,
                      marginLeft: 6,
                      padding: '4px 6px',
                      borderRadius: 6,
                      border: '1px solid #cbd5e1',
                    }}
                  />
                </label>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Arg 2:
                  <input
                    type="number"
                    value={subB}
                    onChange={(e) => setSubB(parseInt(e.target.value) || 0)}
                    style={{
                      width: 55,
                      marginLeft: 6,
                      padding: '4px 6px',
                      borderRadius: 6,
                      border: '1px solid #cbd5e1',
                    }}
                  />
                </label>
              </div>

              <div
                style={{
                  background: '#141614',
                  borderRadius: 10,
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: '#e2e8f0',
                }}
              >
                int diff = subtract(
                <span style={{ color: '#fb923c', fontWeight: 700 }}>{subA}</span>,{' '}
                <span style={{ color: '#fb923c', fontWeight: 700 }}>{subB}</span>);
                <br />
                <span style={{ color: '#34d399' }}>// diff evaluates to {subA - subB}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            11 / CALL BY VALUE IN C
            ========================================================== */}
        <div id="section-call-by-value">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>11</span>
            <h2 className={styles.sectionTitle}>Call by Value in C</h2>
            <p className={styles.sectionSubtitle}>
              C strictly evaluates function arguments by value: a copy of each argument is passed into
              the function parameter. To modify caller variables, pass memory addresses via pointers.
            </p>
          </div>

          <div className={styles.callByValueGrid}>
            {/* Call by value */}
            <div className={styles.callByCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#ef4444' }}>Standard Call by Value</span>
                <button
                  type="button"
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: '#141614',
                    color: '#fff',
                    border: 'none',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setValUpdated(!valUpdated)}
                >
                  {valUpdated ? 'Reset' : 'Simulate call: update(val)'}
                </button>
              </div>

              <div
                style={{
                  background: '#141614',
                  borderRadius: 10,
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#e2e8f0',
                  marginTop: 12,
                }}
              >
                void update(int x) {'{'}
                <br />
                {'    '}x = x + 10; <span style={{ color: '#64748b' }}>// modifies local copy</span>
                <br />
                {'}'}
                <br />
                int main(void) {'{'}
                <br />
                {'    '}int val = {valArg};<br />
                {'    '}update(val);<br />
                {'    '}printf("%d\\n", val); <span style={{ color: '#34d399' }}>// Outputs: {valArg}</span>
                <br />
                {'}'}
              </div>

              <div className={styles.memoryTraceBox}>
                <strong>Caller Storage (val):</strong> {valArg} (Unchanged in main!)
                <br />
                <strong>Callee Storage (x):</strong> {valUpdated ? valArg + 10 : valArg} (Discarded on return)
              </div>
            </div>

            {/* Pointer-based mutation */}
            <div className={styles.callByCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#10b981' }}>Emulating Reference with Pointers</span>
                <button
                  type="button"
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: '#059669',
                    color: '#fff',
                    border: 'none',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setPtrUpdated(!ptrUpdated);
                    setPtrArg(ptrUpdated ? 5 : 15);
                  }}
                >
                  {ptrUpdated ? 'Reset' : 'Simulate call: update(&val)'}
                </button>
              </div>

              <div
                style={{
                  background: '#141614',
                  borderRadius: 10,
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#e2e8f0',
                  marginTop: 12,
                }}
              >
                void update(int *x) {'{'}
                <br />
                {'    '}*x = *x + 10; <span style={{ color: '#64748b' }}>// dereference pointer</span>
                <br />
                {'}'}
                <br />
                int main(void) {'{'}
                <br />
                {'    '}int val = 5;<br />
                {'    '}update(&amp;val);<br />
                {'    '}printf("%d\\n", val); <span style={{ color: '#34d399' }}>// Outputs: {ptrArg}</span>
                <br />
                {'}'}
              </div>

              <div className={styles.memoryTraceBox}>
                <strong>Address Passed (&amp;val):</strong> 0x7ffd98
                <br />
                <strong>Caller Storage (val):</strong>{' '}
                <span style={{ color: ptrUpdated ? '#10b981' : '#0f172a', fontWeight: 700 }}>
                  {ptrArg} (Mutated directly via pointer!)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            12 / THE RETURN STATEMENT
            ========================================================== */}
        <div id="section-return-statement">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>12</span>
            <h2 className={styles.sectionTitle}>The Return Statement</h2>
            <p className={styles.sectionSubtitle}>
              Ends function execution and optionally transfers a computed value back to the caller.
            </p>
          </div>

          <div className={styles.returnCard}>
            <div
              style={{
                background: '#141614',
                borderRadius: 14,
                padding: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.86rem',
                lineHeight: 1.65,
                color: '#e2e8f0',
              }}
            >
              <span style={{ color: '#38bdf8' }}>int</span> cube(
              <span style={{ color: '#38bdf8' }}>int</span> n) {'{'}
              <br />
              <span style={{ paddingLeft: '1.25rem' }}>
                <span style={{ color: '#f43f5e', fontWeight: 700 }}>return</span> n * n * n;
              </span>
              <br />
              {'}'}
              <br />
              <br />
              <span style={{ color: '#38bdf8' }}>int</span> main(
              <span style={{ color: '#38bdf8' }}>void</span>) {'{'}
              <br />
              <span style={{ paddingLeft: '1.25rem' }}>
                printf(<span style={{ color: '#86efac' }}>"Cube = %d\\n"</span>, cube({cubeNum}));
              </span>
              <br />
              <span style={{ paddingLeft: '1.25rem' }}>
                <span style={{ color: '#f43f5e' }}>return</span> 0;
              </span>
              <br />
              {'}'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Test value (n):</span>
                <input
                  type="number"
                  value={cubeNum}
                  onChange={(e) => setCubeNum(parseInt(e.target.value) || 0)}
                  style={{
                    width: 55,
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: '1px solid #cbd5e1',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                />
                <span style={{ fontSize: '0.88rem', color: '#059669', fontWeight: 700 }}>
                  Cube = {cubeNum * cubeNum * cubeNum}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.84rem', color: '#334155' }}>
                    <strong>Immediate Exit:</strong> Once <code>return</code> executes, no further
                    statements in the function are reached.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.84rem', color: '#334155' }}>
                    <strong>Type Matching:</strong> The returned value’s type is converted to the declared
                    return type (e.g. <code>int</code>, <code>double</code>).
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.84rem', color: '#334155' }}>
                    <strong>Void Functions:</strong> Functions returning <code>void</code> can use an empty{' '}
                    <code>return;</code> for early termination or omit it before the closing brace.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
