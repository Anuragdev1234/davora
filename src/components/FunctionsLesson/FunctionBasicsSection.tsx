import { useState } from 'react';
import {
  ArrowRight,
  Info,
  CheckCircle,
  Copy,
  Check,
  Play,
  RotateCw,
  RefreshCw,
  Layers,
  FileText,
  Wrench,
  Bug,
  Shield,
} from 'lucide-react';
import {
  FUNCTION_STAGES,
  SYNTAX_COMPONENTS,
} from '../../data/functionsLessonData';
import styles from './FunctionBasicsSection.module.css';

export function FunctionBasicsSection() {
  const [selectedStageId, setSelectedStageId] = useState<string>('definition');
  const [selectedSyntaxId, setSelectedSyntaxId] = useState<string>('return-type');
  const [copied, setCopied] = useState(false);
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [runSuccess, setRunSuccess] = useState(true);

  const completeExampleCode = `#include <stdio.h>

// Function declaration
int add(int a, int b);

int main(void) {
    printf("Sum = %d\\n", add(5, 3));
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(completeExampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSimulateRun = () => {
    setIsSimulatingRun(true);
    setRunSuccess(false);
    setTimeout(() => {
      setIsSimulatingRun(false);
      setRunSuccess(true);
    }, 400);
  };

  return (
    <section className={styles.sectionWrapper} id="function-basics">
      <div className={styles.container}>
        {/* ==========================================================
            01 / WHAT IS A FUNCTION?
            ========================================================== */}
        <div id="section-what-is">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>01</span>
            <h2 className={styles.sectionTitle}>What Is a Function?</h2>
            <p className={styles.sectionSubtitle}>
              A function in C is a named, reusable block of code that performs a specific task. It can
              take inputs, execute statements, and return a result.
            </p>
          </div>

          <div className={styles.whatIsGrid}>
            <div className={styles.whatIsCard}>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: '#141614' }}>
                  A Compact Function
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Functions encapsulate computations so callers can reuse logic anywhere without
                  rewriting instructions.
                </p>
              </div>

              <div className={styles.codeBoxLight}>
                <div>
                  <span style={{ color: '#2563eb', fontWeight: 600 }}>int</span>{' '}
                  <span style={{ color: '#0f172a', fontWeight: 700 }}>add</span>(
                  <span style={{ color: '#2563eb' }}>int</span> a,{' '}
                  <span style={{ color: '#2563eb' }}>int</span> b) {'{'}
                </div>
                <div style={{ paddingLeft: '1.5rem' }}>
                  <span style={{ color: '#e11d48', fontWeight: 600 }}>return</span> a + b;
                </div>
                <div>{'}'}</div>
              </div>
            </div>

            {/* 6 Key Benefits */}
            <div className={styles.benefitsCard}>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0', color: '#141614' }}>
                Why Functions Matter
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                Six fundamental principles that elevate C code quality:
              </p>

              <div className={styles.benefitsList}>
                <div className={styles.benefitDetailItem}>
                  <RefreshCw size={16} className={styles.benefitDetailIcon} />
                  <div>
                    <h4 className={styles.benefitDetailTitle}>Code reusability</h4>
                    <p className={styles.benefitDetailDesc}>Write once, use many times.</p>
                  </div>
                </div>

                <div className={styles.benefitDetailItem}>
                  <Layers size={16} className={styles.benefitDetailIcon} />
                  <div>
                    <h4 className={styles.benefitDetailTitle}>Modularity</h4>
                    <p className={styles.benefitDetailDesc}>Divide a large program into smaller parts.</p>
                  </div>
                </div>

                <div className={styles.benefitDetailItem}>
                  <FileText size={16} className={styles.benefitDetailIcon} />
                  <div>
                    <h4 className={styles.benefitDetailTitle}>Readability</h4>
                    <p className={styles.benefitDetailDesc}>Use meaningful names that communicate purpose.</p>
                  </div>
                </div>

                <div className={styles.benefitDetailItem}>
                  <Wrench size={16} className={styles.benefitDetailIcon} />
                  <div>
                    <h4 className={styles.benefitDetailTitle}>Maintainability</h4>
                    <p className={styles.benefitDetailDesc}>Update code in one place reliably.</p>
                  </div>
                </div>

                <div className={styles.benefitDetailItem}>
                  <Bug size={16} className={styles.benefitDetailIcon} />
                  <div>
                    <h4 className={styles.benefitDetailTitle}>Testing & debugging</h4>
                    <p className={styles.benefitDetailDesc}>Test individual functions in isolation.</p>
                  </div>
                </div>

                <div className={styles.benefitDetailItem}>
                  <Shield size={16} className={styles.benefitDetailIcon} />
                  <div>
                    <h4 className={styles.benefitDetailTitle}>Abstraction</h4>
                    <p className={styles.benefitDetailDesc}>Hide implementation details from caller.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            02 / HOW DOES A FUNCTION WORK?
            ========================================================== */}
        <div id="section-how-works">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>02</span>
            <h2 className={styles.sectionTitle}>How Does a Function Work?</h2>
            <p className={styles.sectionSubtitle}>
              A program using functions generally follows three fundamental stages.
            </p>
          </div>

          <div className={styles.howCard}>
            <div className={styles.stagesFlow}>
              {FUNCTION_STAGES.map((stage, idx) => {
                const isActive = selectedStageId === stage.id;
                return (
                  <div key={stage.id} style={{ display: 'contents' }}>
                    <div
                      className={`${styles.stageBlock} ${isActive ? styles.stageBlockActive : ''}`}
                      onClick={() => setSelectedStageId(stage.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <span
                        className={styles.stageNumberBadge}
                        style={{ backgroundColor: stage.accentColor }}
                      >
                        {stage.stepNumber}
                      </span>
                      <h3 className={styles.stageTitle}>{stage.title}</h3>
                      <p className={styles.stageTagline}>{stage.tagline}</p>
                      <div className={styles.stageCode}>{stage.codeSnippet}</div>
                    </div>

                    {idx < FUNCTION_STAGES.length - 1 && (
                      <div className={styles.stageArrow}>
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Note Callout */}
            <div className={styles.noteCallout}>
              <Info size={18} className={styles.noteIcon} />
              <p className={styles.noteText}>
                <strong>Technical Notice:</strong> A function declaration is not always required before
                the definition. However, if a function is called before its definition appears in the
                source file, an appropriate declaration (prototype) must be visible first so the
                compiler can verify parameters and return values.
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================================
            03 / FUNCTION SYNTAX
            ========================================================== */}
        <div id="section-syntax">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>03</span>
            <h2 className={styles.sectionTitle}>Function Syntax</h2>
            <p className={styles.sectionSubtitle}>
              The general form of a function definition in C consists of 5 core syntactic components.
            </p>
          </div>

          <div className={styles.syntaxCard}>
            <div className={styles.syntaxLayout}>
              {/* Syntax Code Block */}
              <div className={styles.syntaxCodeDark}>
                <div>
                  <span
                    style={{
                      color: selectedSyntaxId === 'return-type' ? '#38bdf8' : '#60a5fa',
                      fontWeight: 700,
                      background:
                        selectedSyntaxId === 'return-type'
                          ? 'rgba(56, 189, 248, 0.2)'
                          : 'transparent',
                      padding: '2px 4px',
                      borderRadius: 4,
                    }}
                  >
                    return_type
                  </span>{' '}
                  <span
                    style={{
                      color: selectedSyntaxId === 'func-name' ? '#fde047' : '#fef08a',
                      fontWeight: 700,
                      background:
                        selectedSyntaxId === 'func-name'
                          ? 'rgba(253, 224, 71, 0.2)'
                          : 'transparent',
                      padding: '2px 4px',
                      borderRadius: 4,
                    }}
                  >
                    function_name
                  </span>
                  <span
                    style={{
                      color: selectedSyntaxId === 'param-list' ? '#86efac' : '#bbf7d0',
                      background:
                        selectedSyntaxId === 'param-list'
                          ? 'rgba(134, 239, 172, 0.2)'
                          : 'transparent',
                      padding: '2px 4px',
                      borderRadius: 4,
                    }}
                  >
                    (parameter_list)
                  </span>{' '}
                  {'{'}
                </div>
                <div
                  style={{
                    paddingLeft: '1.75rem',
                    color: selectedSyntaxId === 'func-body' ? '#f1f5f9' : '#94a3b8',
                    background:
                      selectedSyntaxId === 'func-body'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'transparent',
                    borderRadius: 4,
                    margin: '4px 0',
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}
                >
                  <span style={{ color: '#64748b' }}>// Statements to execute</span>
                  <br />
                  <span
                    style={{
                      color: selectedSyntaxId === 'return-stmt' ? '#f43f5e' : '#fda4af',
                      fontWeight: 600,
                      background:
                        selectedSyntaxId === 'return-stmt'
                          ? 'rgba(244, 63, 94, 0.25)'
                          : 'transparent',
                      padding: '2px 4px',
                      borderRadius: 4,
                    }}
                  >
                    return value;
                  </span>
                </div>
                <div>{'}'}</div>
              </div>

              {/* Interactive Syntax Breakdown Table */}
              <div className={styles.syntaxTable}>
                {SYNTAX_COMPONENTS.map((item) => {
                  const isActive = selectedSyntaxId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.syntaxRow} ${isActive ? styles.syntaxRowActive : ''}`}
                      onClick={() => setSelectedSyntaxId(item.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.syntaxRowTitle}>{item.tokenName}</div>
                      <div className={styles.syntaxRowDesc}>{item.explanation}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            04 / DECLARATION VS. DEFINITION
            ========================================================== */}
        <div id="section-decl-vs-def">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>04</span>
            <h2 className={styles.sectionTitle}>Declaration vs. Definition</h2>
            <p className={styles.sectionSubtitle}>
              Declaration tells the compiler about the function. Definition provides the implementation.
            </p>
          </div>

          <div className={styles.declDefGrid}>
            {/* Left: Declaration */}
            <div className={styles.declCard}>
              <span className={styles.declHeaderPill}>Function Declaration</span>
              <div className={styles.miniCodeDark}>
                <span style={{ color: '#64748b' }}>// Prototype</span>
                <br />
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>int</span>{' '}
                <span style={{ color: '#fde047', fontWeight: 700 }}>add</span>(
                <span style={{ color: '#38bdf8' }}>int</span> a,{' '}
                <span style={{ color: '#38bdf8' }}>int</span> b);
              </div>

              <div className={styles.checklist}>
                <div className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIconGreen} />
                  <span>Introduces the interface to the compiler</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIconGreen} />
                  <span>Does not contain a function body</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIconGreen} />
                  <span>Ends with a terminating semicolon (;)</span>
                </div>
              </div>
            </div>

            {/* Right: Definition */}
            <div className={styles.declCard}>
              <span className={styles.defHeaderPill}>Function Definition</span>
              <div className={styles.miniCodeDark}>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>int</span>{' '}
                <span style={{ color: '#fde047', fontWeight: 700 }}>add</span>(
                <span style={{ color: '#38bdf8' }}>int</span> a,{' '}
                <span style={{ color: '#38bdf8' }}>int</span> b) {'{'}
                <br />
                <span style={{ paddingLeft: '1.25rem' }}>
                  <span style={{ color: '#f43f5e', fontWeight: 600 }}>return</span> a + b;
                </span>
                <br />
                {'}'}
              </div>

              <div className={styles.checklist}>
                <div className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIconPurple} />
                  <span>Provides the actual implementation</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIconPurple} />
                  <span>Contains the function body with statements</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIconPurple} />
                  <span>Has a compound statement enclosed in curly braces</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            05 / COMPLETE EXAMPLE
            ========================================================== */}
        <div id="section-complete-example">
          <div className={styles.sectionHeader}>
            <span className={styles.indexBadge}>05</span>
            <h2 className={styles.sectionTitle}>Complete Example</h2>
            <p className={styles.sectionSubtitle}>
              A program with a function declaration, a function call, and a function definition.
            </p>
          </div>

          <div className={styles.completeExampleGrid}>
            {/* Editor */}
            <div className={styles.completeEditorBox}>
              <div className={styles.completeEditorHeader}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#94a3b8' }}>
                  example.c
                </span>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.74rem',
                  }}
                  onClick={handleCopy}
                >
                  {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div
                style={{
                  padding: '16px 18px',
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.84rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                  overflowX: 'auto',
                }}
              >
                {completeExampleCode.split('\n').map((line, idx) => (
                  <div key={idx} style={{ display: 'flex' }}>
                    <span
                      style={{
                        width: 24,
                        color: '#555a52',
                        textAlign: 'right',
                        paddingRight: 12,
                        userSelect: 'none',
                        fontSize: '0.72rem',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span>
                      {line.trim().startsWith('//') ? (
                        <span style={{ color: '#64748b', fontStyle: 'italic' }}>{line}</span>
                      ) : line.trim().startsWith('#') ? (
                        <span style={{ color: '#a78bfa', fontWeight: 600 }}>{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Panel & Execution Controls */}
            <div className={styles.completeOutputBox}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#64748b',
                  }}
                >
                  Output
                </span>

                <div className={styles.terminalOutput}>
                  {isSimulatingRun ? (
                    <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <RotateCw size={14} className="spin-animation" /> Compiling & executing...
                    </span>
                  ) : runSuccess ? (
                    <div>Sum = 8</div>
                  ) : null}
                </div>

                <button
                  type="button"
                  className={styles.runBtn}
                  onClick={handleSimulateRun}
                  aria-label="Run simulated function example"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Run</span>
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '10px 14px',
                  marginTop: '1.5rem',
                }}
              >
                <Info size={16} color="#2563eb" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.45 }}>
                  <strong>Execution Role:</strong> <code>main()</code> is the calling function and{' '}
                  <code>add()</code> is the called function.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
