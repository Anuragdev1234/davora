import { useState } from 'react';
import { Copy, Check, AlertTriangle, Info, Play, RotateCcw, ArrowRight } from 'lucide-react';
import { CODE_EXAMPLES } from '../../data/variablesLessonData';
import styles from './VariablesArticle.module.css';

export function VariablesSection1() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Variable Explorer State
  const [selectedVarIndex, setSelectedVarIndex] = useState<number>(0);

  // Interactive Value Update Stepper State
  const [updateStep, setUpdateStep] = useState<number>(0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const variablesList = [
    {
      name: 'age',
      type: 'int',
      initialValue: '20',
      description: 'Stores a signed integer value representing age.',
      typicalSize: '4 bytes (stores an integer)',
      outputLine: 'Age: 20',
      color: '#0055ff',
    },
    {
      name: 'height',
      type: 'float',
      initialValue: '5.7f',
      description: 'Stores a single-precision floating-point number representing height.',
      typicalSize: '4 bytes (stores a floating-point value)',
      outputLine: 'Height: 5.7',
      color: '#0284c7',
    },
    {
      name: 'grade',
      type: 'char',
      initialValue: "'A'",
      description: 'Stores a single character representing an academic grade.',
      typicalSize: '1 byte (stores a character)',
      outputLine: 'Grade: A',
      color: '#ea580c',
    },
  ];

  const updateSteps = [
    {
      statement: 'int number = 10;',
      value: '10',
      phase: 'Initial definition & assignment',
      stdout: 'Initial value: 10',
      explanation: 'Allocates memory on the stack and immediately initializes number to 10.',
    },
    {
      statement: 'number = 25;',
      value: '25',
      phase: 'Direct overwrite assignment',
      stdout: 'Updated value: 25',
      explanation: 'The assignment operator replaces the previous 10 with 25 in the same memory location.',
    },
    {
      statement: 'number = number + 5;',
      value: '30',
      phase: 'Expression evaluation & reassignment',
      stdout: 'After adding 5: 30',
      explanation: 'Reads current value (25), adds 5 to produce 30, and stores 30 back into number.',
    },
  ];

  return (
    <section id="section-variables" className={styles.sectionWrapper} aria-labelledby="heading-variables">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>01</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>MANUSCRIPT CHAPTER ONE</span>
          </div>

          <h2 id="heading-variables" className={styles.mainHeading}>
            1. Variables in C
          </h2>

          <p className={styles.bodyText}>
            A variable in C is a named object used to store a value that a program can access and,
            when permitted, modify during execution. Each variable has a data type that determines
            the kind of value it can represent and the operations that can be performed on it.
          </p>

          <p className={styles.bodyText}>
            Variables allow programmers to work with meaningful names instead of directly managing
            memory addresses.
          </p>
        </div>

        {/* 1.1 Declaring and Initializing Variables */}
        <h3 className={styles.subHeading}>Declaring and Initializing Variables</h3>
        <p className={styles.bodyText}>
          To declare a variable, specify its data type followed by its name. You can also initialize
          it by providing an initial value.
        </p>

        <div className={styles.syntaxCard}>
          <div className={styles.syntaxLabel}>Syntax</div>
          <code className={styles.syntaxCode}>data_type variable_name = value;</code>
        </div>

        <p className={styles.bodyText}>
          <strong>Example:</strong>
        </p>

        {/* Code Panel: declaringInitializing */}
        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>example_variables.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.declaringInitializing, 'decl')}
            >
              {copiedKey === 'decl' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'decl' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.declaringInitializing}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.declaringInitializingOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          In this example, <code>age</code> stores an integer, <code>height</code> stores a
          floating-point value, and <code>grade</code> stores a character.
        </p>

        {/* Interactive Conceptual Variable Explorer Widget */}
        <div className={styles.widgetCard}>
          <div className={styles.widgetHeader}>
            <h4 className={styles.widgetTitle}>
              <Info size={18} color="#0055ff" aria-hidden="true" />
              <span>Interactive Conceptual Variable Explorer</span>
            </h4>
            <span className={styles.widgetBadge}>Conceptual Memory Model</span>
          </div>

          <p className={styles.bodyTextSecondary}>
            Click a variable declaration from the example program to inspect the conceptual relationship
            between data type, variable identifier, initial value, and memory size.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {variablesList.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedVarIndex(idx)}
                className={styles.stepBtn}
                style={{
                  borderColor: selectedVarIndex === idx ? item.color : undefined,
                  background: selectedVarIndex === idx ? '#ffffff' : undefined,
                  fontWeight: selectedVarIndex === idx ? 600 : 400,
                }}
              >
                <span>{item.type} {item.name} = {item.initialValue};</span>
              </button>
            ))}
          </div>

          {/* Active Variable Conceptual Inspector Card */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className={styles.syntaxLabel}>Data Type</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#0055ff' }}>
                  {variablesList[selectedVarIndex].type}
                </div>
              </div>
              <div>
                <span className={styles.syntaxLabel}>Variable Identifier</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#10a37f' }}>
                  {variablesList[selectedVarIndex].name}
                </div>
              </div>
              <div>
                <span className={styles.syntaxLabel}>Initial Value</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#d97706' }}>
                  {variablesList[selectedVarIndex].initialValue}
                </div>
              </div>
              <div>
                <span className={styles.syntaxLabel}>Typical Size</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {variablesList[selectedVarIndex].typicalSize}
                </div>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {variablesList[selectedVarIndex].description} Emits <code>{variablesList[selectedVarIndex].outputLine}</code> when passed to printf.
            </p>
          </div>
        </div>

        {/* 1.2 Rules for Naming Variables */}
        <h3 className={styles.subHeading}>Rules for Naming Variables</h3>
        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>A variable name may contain letters, digits, and underscores (<code>_</code>).</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>It must not begin with a digit.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>Spaces are not allowed in variable names.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>C keywords, such as <code>int</code> and <code>return</code>, cannot be used as variable names.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>Variable names are case-sensitive. For example, <code>age</code> and <code>Age</code> are different identifiers.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>A name must be unique within its scope, subject to C's identifier and declaration rules.</span>
          </li>
        </ul>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <div style={{ flex: 1, minWidth: '260px', background: '#f4faf6', border: '1px solid #d6ede0', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#0d8264', display: 'block', marginBottom: '0.5rem' }}>
              Valid names:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <code className={styles.typeCodeTag} style={{ background: '#ffffff', color: '#0d8264', borderColor: '#d6ede0' }}>age</code>
              <code className={styles.typeCodeTag} style={{ background: '#ffffff', color: '#0d8264', borderColor: '#d6ede0' }}>total_marks</code>
              <code className={styles.typeCodeTag} style={{ background: '#ffffff', color: '#0d8264', borderColor: '#d6ede0' }}>number1</code>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '260px', background: '#fff8f6', border: '1px solid #ffdcd4', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#c2410c', display: 'block', marginBottom: '0.5rem' }}>
              Invalid names:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <code className={styles.typeCodeTag} style={{ background: '#ffffff', color: '#c2410c', borderColor: '#ffdcd4' }}>1number</code>
              <code className={styles.typeCodeTag} style={{ background: '#ffffff', color: '#c2410c', borderColor: '#ffdcd4' }}>total marks</code>
              <code className={styles.typeCodeTag} style={{ background: '#ffffff', color: '#c2410c', borderColor: '#ffdcd4' }}>float</code>
            </div>
          </div>
        </div>

        {/* 1.3 Initializing Variables */}
        <h3 className={styles.subHeading}>Initializing Variables</h3>
        <p className={styles.bodyText}>
          Initialization means providing an initial value when an object is defined. A variable can also
          receive a value later through assignment.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>init_vs_assign.c</span>
            </div>
          </div>
          <pre className={styles.codePre}>
            <code>{`int age = 20;  // Initialization at definition

char grade;    // Definition without initialization
grade = 'A';   // Assignment afterward`}</code>
          </pre>
        </div>

        {/* Critical Warning Callout */}
        <div className={styles.calloutWarning}>
          <div className={styles.calloutWarningTitle}>
            <AlertTriangle size={18} aria-hidden="true" />
            <span>Important: Indeterminate Automatic Variables</span>
          </div>
          <p className={styles.calloutWarningText}>
            An uninitialized local automatic variable does not automatically contain zero. Its value is
            indeterminate, and reading it before assigning a valid value can cause undefined behavior.
            Objects with static storage duration, including global variables, are initialized to zero
            by default when no explicit initializer is provided.
          </p>
        </div>

        {/* 1.4 Accessing and Updating Variables */}
        <h3 className={styles.subHeading}>Accessing and Updating Variables</h3>
        <p className={styles.bodyText}>
          A variable's name can be used in expressions to access its stored value. The assignment
          operator (<code>=</code>) can update that value.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>update_variable.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.accessingUpdating, 'update')}
            >
              {copiedKey === 'update' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'update' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.accessingUpdating}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.accessingUpdatingOutput}</pre>
          </div>
        </div>

        {/* Interactive Value Update Demonstration */}
        <div className={styles.widgetCard}>
          <div className={styles.widgetHeader}>
            <h4 className={styles.widgetTitle}>
              <Play size={18} color="#0055ff" aria-hidden="true" />
              <span>Interactive Value Update Demonstration (10 &rarr; 25 &rarr; 30)</span>
            </h4>
            <span className={styles.widgetBadge}>Runtime Value Transitions</span>
          </div>

          <p className={styles.bodyTextSecondary}>
            Advance through the three update statements to observe how the value stored in variable{' '}
            <code>number</code> mutates sequentially in memory.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left: Statement & Step Breakdown */}
            <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#0055ff', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Step {updateStep + 1} of 3 &bull; {updateSteps[updateStep].phase}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                <code>{updateSteps[updateStep].statement}</code>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {updateSteps[updateStep].explanation}
              </p>
            </div>

            {/* Right: Conceptual Memory Watch */}
            <div style={{ background: '#171917', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: '#ffffff', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a0a09a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Variable number &bull; Stored Value
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 700, color: '#86efac', lineHeight: 1.2 }}>
                {updateSteps[updateStep].value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#777b74', marginTop: '0.5rem' }}>
                stdout: "{updateSteps[updateStep].stdout}"
              </div>
            </div>
          </div>

          <div className={styles.stepControlsRow}>
            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => setUpdateStep((prev) => Math.max(0, prev - 1))}
              disabled={updateStep === 0}
            >
              Previous Statement
            </button>

            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => setUpdateStep((prev) => Math.min(updateSteps.length - 1, prev + 1))}
              disabled={updateStep === updateSteps.length - 1}
            >
              <span>Next Statement</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => setUpdateStep(0)}
              style={{ marginLeft: 'auto' }}
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 1.5 Using Variables in Expressions */}
        <h3 className={styles.subHeading}>Using Variables in Expressions</h3>
        <p className={styles.bodyText}>
          Variables can be used in calculations, comparisons, and other expressions.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>expressions.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.usingExpressions, 'expr')}
            >
              {copiedKey === 'expr' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'expr' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.usingExpressions}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.usingExpressionsOutput}</pre>
          </div>
        </div>

        {/* 1.6 Memory and Variable Size */}
        <h3 className={styles.subHeading}>Memory and Variable Size</h3>
        <p className={styles.bodyText}>
          The size of an object depends on its data type and the C implementation. The <code>sizeof</code>{' '}
          operator determines the size of a type or object in bytes.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>sizeof_operator.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.sizeofExample, 'sizeof')}
            >
              {copiedKey === 'sizeof' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'sizeof' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.sizeofExample}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.sizeofExampleOutput}</pre>
          </div>
        </div>

        <div className={styles.calloutNote}>
          <div className={styles.calloutNoteTitle}>
            <Info size={18} aria-hidden="true" />
            <span>Note on Implementation-Dependent Sizing &amp; %zu Specifier</span>
          </div>
          <p className={styles.calloutNoteText}>
            The exact size of an <code>int</code> can vary between implementations. Use <code>%zu</code> to
            print a value of type <code>size_t</code>, which is the type returned by <code>sizeof</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
