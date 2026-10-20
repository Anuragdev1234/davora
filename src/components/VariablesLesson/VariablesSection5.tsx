import { useState } from 'react';
import { Copy, Check, ArrowRightLeft, Cpu, AlertTriangle, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { CODE_EXAMPLES } from '../../data/variablesLessonData';
import styles from './VariablesArticle.module.css';

interface ConversionDemoStep {
  title: string;
  description: string;
  expression: string;
  highlightedCode: string;
  hardwareState: {
    label: string;
    value: string;
    type: string;
    note: string;
  };
}

const IMPLICIT_STEPS: ConversionDemoStep[] = [
  {
    title: 'Step 1: Declare Distinct Types',
    description: 'Two variables of differing types are defined in memory: int a (4 bytes integer) and float b (4 bytes IEEE-754).',
    expression: 'int a = 5;  float b = 4.5f;',
    highlightedCode: 'int a = 5;\nfloat b = 4.5f;',
    hardwareState: {
      label: 'Operand Register States',
      value: 'a = 5 (signed int), b = 4.500000 (IEEE 754)',
      type: 'Mixed Types',
      note: 'The CPU ALU cannot directly add raw two\'s-complement int to IEEE-754 float without conversion.',
    },
  },
  {
    title: 'Step 2: Compiler Type Promotion',
    description: 'C\'s Usual Arithmetic Conversions determine that float rank exceeds int rank. The integer operand is promoted automatically.',
    expression: 'a (int: 5) ➔ 5.0f (float)',
    highlightedCode: 'float result = ((float)a) + b;',
    hardwareState: {
      label: 'Promoted Operand',
      value: '5.000000f + 4.500000f',
      type: 'float + float',
      note: 'Promoted without loss of precision because small integers fit accurately within single-precision mantissa.',
    },
  },
  {
    title: 'Step 3: Floating-Point Addition',
    description: 'The FPU adds the two 32-bit floating-point numbers, producing 9.500000f.',
    expression: '5.0f + 4.5f = 9.50f',
    highlightedCode: 'float result = 9.50f;',
    hardwareState: {
      label: 'FPU Result Register',
      value: '9.500000f',
      type: 'float',
      note: 'Operation completed in floating-point unit with subnormal and exponent alignment.',
    },
  },
  {
    title: 'Step 4: Storage & Formatted Output',
    description: 'The value 9.50f is stored into result and printed formatted as %.2f to exactly two decimal places.',
    expression: 'printf("%.2f\\n", result) ➔ 9.50',
    highlightedCode: 'printf("%.2f\\n", result); // Output: 9.50',
    hardwareState: {
      label: 'Console Standard Out',
      value: '"9.50"',
      type: 'stdout stream',
      note: 'Formatting specifier %.2f rounds display representation to 2 decimals.',
    },
  },
];

const EXPLICIT_STEPS: ConversionDemoStep[] = [
  {
    title: 'Step 1: Declare Floating-Point Value',
    description: 'A variable value of type float is initialized to 7.9f, storing fractional information in the IEEE-754 mantissa.',
    expression: 'float value = 7.9f;',
    highlightedCode: 'float value = 7.9f;',
    hardwareState: {
      label: 'FPU Memory Register',
      value: '7.900000f (Exponent + Mantissa)',
      type: 'float (4 bytes)',
      note: 'Stores fractional part 0.900000 in binary floating-point representation.',
    },
  },
  {
    title: 'Step 2: Explicit Cast Operator (int)',
    description: 'The cast operator (int) explicitly instructs the compiler to convert the expression to a signed 32-bit integer.',
    expression: '(int)value',
    highlightedCode: 'int number = (int)value;',
    hardwareState: {
      label: 'Cast Instruction',
      value: 'cvttss2si (x86 Float-to-Int with Truncation)',
      type: 'Type Cast Operator',
      note: 'The cast is an explicit programmer directive, overriding default type rules.',
    },
  },
  {
    title: 'Step 3: Truncation Toward Zero',
    description: 'C specifies that converting float to integer truncates toward zero—it strictly drops the fractional digits without rounding.',
    expression: '7.9f ➔ 7 (Fractional .9 is discarded)',
    highlightedCode: '7.9f truncated ➔ 7 (NOT 8!)',
    hardwareState: {
      label: 'Truncated Value',
      value: '7',
      type: 'int (signed 32-bit)',
      note: '7.9f does NOT round to 8. All fractional digits are discarded completely.',
    },
  },
  {
    title: 'Step 4: Integer Storage & Output',
    description: 'The integer 7 is assigned to number and printed via %d as a standard signed decimal integer.',
    expression: 'printf("%d\\n", number) ➔ 7',
    highlightedCode: 'printf("%d\\n", number); // Output: 7',
    hardwareState: {
      label: 'Console Standard Out',
      value: '"7"',
      type: 'stdout stream',
      note: 'Format specifier %d expects signed int, matching the type of number.',
    },
  },
];

export function VariablesSection5() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState<'implicit' | 'explicit'>('implicit');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const steps = activeDemo === 'implicit' ? IMPLICIT_STEPS : EXPLICIT_STEPS;
  const currentStep = steps[currentStepIdx] || steps[0];

  const handleDemoSwitch = (mode: 'implicit' | 'explicit') => {
    setActiveDemo(mode);
    setCurrentStepIdx(0);
  };

  return (
    <section id="section-type-conversion" className={styles.sectionWrapper} aria-labelledby="heading-conversion">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>05</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>MANUSCRIPT CHAPTER FIVE</span>
          </div>

          <h2 id="heading-conversion" className={styles.mainHeading}>
            5. Type Conversion in C
          </h2>

          <p className={styles.bodyText}>
            Type conversion refers to changing a value from one data type to another. C supports two
            kinds of conversion:
          </p>
        </div>

        {/* 5.1 Implicit Type Conversion */}
        <h3 className={styles.subHeading}>Implicit Type Conversion (Type Promotion)</h3>
        <p className={styles.bodyText}>
          Implicit conversion is performed automatically by the compiler when different data types are
          used together in an expression. Operands are converted according to C’s conversion rules to
          avoid data loss where possible.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>implicit_conversion.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.implicitConversion, 'implicit')}
            >
              {copiedKey === 'implicit' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'implicit' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.implicitConversion}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.implicitConversionOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          In the expression <code>a + b</code>, the integer <code>a</code> is automatically converted
          to <code>float</code> before the addition occurs.
        </p>

        {/* 5.2 Explicit Type Conversion */}
        <h3 className={styles.subHeading}>Explicit Type Conversion (Type Casting)</h3>
        <p className={styles.bodyText}>
          Explicit conversion, or type casting, allows the programmer to manually convert a value from
          one type to another using the cast operator.
        </p>

        <div className={styles.syntaxCard}>
          <div className={styles.syntaxLabel}>Syntax</div>
          <code className={styles.syntaxCode}>(target_type) expression</code>
        </div>

        <p className={styles.bodyText}>
          <strong>Example:</strong>
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>explicit_casting.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.explicitConversion, 'explicit')}
            >
              {copiedKey === 'explicit' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'explicit' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.explicitConversion}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.explicitConversionOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          In this example, casting <code>value</code> to <code>int</code> discards the fractional part
          through truncation, leaving <code>7</code>.
        </p>

        {/* 5.3 Truncation and Information Loss */}
        <h3 className={styles.subHeading}>Truncation and Information Loss</h3>
        <p className={styles.bodyText}>
          Converting a value to a type with a smaller range or less precision can cause truncation,
          loss of fractional data, or overflow if the value cannot be represented in the target type.
        </p>

        {/* Callout Warning */}
        <div className={styles.calloutCard}>
          <div className={styles.calloutIcon}>
            <AlertTriangle size={20} color="#b45309" />
          </div>
          <div>
            <div className={styles.calloutTitle}>Critical Engineering Rule: Narrowing Conversions</div>
            <p className={styles.calloutText}>
              Demoting a floating-point number to an integer always discards the fractional part (truncation
              toward zero). It does <em>not</em> perform statistical or standard mathematical rounding. If a
              floating-point value exceeds the maximum representable limit of the target integer type (e.g.,
              casting <code>1e15f</code> to <code>int</code>), the behavior is <strong>undefined</strong>.
            </p>
          </div>
        </div>

        {/* INTERACTIVE COMPONENT: Type Conversion Stepper */}
        <div className={styles.interactiveWidgetCard}>
          <div className={styles.widgetHeader}>
            <div>
              <div className={styles.widgetBadge}>
                <ArrowRightLeft size={13} />
                <span>INTERACTIVE LAB</span>
              </div>
              <h4 className={styles.widgetTitle}>Type Conversion Lifecycle Visualizer</h4>
              <p className={styles.widgetSubtitle}>
                Observe how the compiler and CPU ALU process implicit promotion versus explicit casting.
              </p>
            </div>

            {/* Toggle Modes */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleDemoSwitch('implicit')}
                className={`${styles.modeTab} ${activeDemo === 'implicit' ? styles.modeTabActive : ''}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeDemo === 'implicit' ? '1px solid #191b19' : '1px solid #dcdcd5',
                  background: activeDemo === 'implicit' ? '#191b19' : '#ffffff',
                  color: activeDemo === 'implicit' ? '#f5f5f1' : '#4a4e47',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={13} />
                <span>Implicit Promotion (a + b)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSwitch('explicit')}
                className={`${styles.modeTab} ${activeDemo === 'explicit' ? styles.modeTabActive : ''}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeDemo === 'explicit' ? '1px solid #191b19' : '1px solid #dcdcd5',
                  background: activeDemo === 'explicit' ? '#191b19' : '#ffffff',
                  color: activeDemo === 'explicit' ? '#f5f5f1' : '#4a4e47',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Cpu size={13} />
                <span>Explicit Cast ((int)7.9f)</span>
              </button>
            </div>
          </div>

          {/* Stepper progress tracker */}
          <div style={{ display: 'flex', gap: '6px', margin: '16px 0 20px 0' }}>
            {steps.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setCurrentStepIdx(idx)}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '3px',
                  background: idx <= currentStepIdx ? '#191b19' : '#e5e5dc',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                title={s.title}
                aria-label={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Active Step Content */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e5dc',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#191b19',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {currentStepIdx + 1}
                </span>
                <h5 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#191b19' }}>
                  {currentStep.title}
                </h5>
              </div>

              <span
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '0.8rem',
                  padding: '4px 8px',
                  background: '#f4f4f0',
                  borderRadius: '6px',
                  color: '#2d302a',
                  border: '1px solid #e5e5dc',
                }}
              >
                {currentStep.expression}
              </span>
            </div>

            <p style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#4a4e47', lineHeight: 1.55 }}>
              {currentStep.description}
            </p>

            {/* Split view: Code highlight on left, Register/ALU state on right */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div
                style={{
                  background: '#141614',
                  borderRadius: '10px',
                  padding: '16px',
                  color: '#f5f5f1',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ color: '#888c85', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                  Code Execution Slice
                </div>
                <div style={{ color: '#86efac', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {currentStep.highlightedCode}
                </div>
              </div>

              <div
                style={{
                  background: '#fafaf7',
                  border: '1px solid #e5e5dc',
                  borderRadius: '10px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#686c62', letterSpacing: '0.05em' }}>
                    {currentStep.hardwareState.label}
                  </span>
                  <span style={{ fontSize: '0.75rem', background: '#e8efe2', color: '#2b531e', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {currentStep.hardwareState.type}
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#191b19', fontFamily: 'ui-monospace, monospace' }}>
                  {currentStep.hardwareState.value}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#686c62', lineHeight: 1.45 }}>
                  {currentStep.hardwareState.note}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
              <button
                type="button"
                disabled={currentStepIdx === 0}
                onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid #dcdcd5',
                  background: currentStepIdx === 0 ? '#f0f0ea' : '#ffffff',
                  color: currentStepIdx === 0 ? '#a3a89e' : '#191b19',
                  cursor: currentStepIdx === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <ChevronLeft size={16} />
                <span>Previous Step</span>
              </button>

              <span style={{ fontSize: '0.8rem', color: '#686c62' }}>
                Step {currentStepIdx + 1} of {steps.length}
              </span>

              <button
                type="button"
                disabled={currentStepIdx === steps.length - 1}
                onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  background: currentStepIdx === steps.length - 1 ? '#e5e5dc' : '#191b19',
                  color: currentStepIdx === steps.length - 1 ? '#888c85' : '#f5f5f1',
                  cursor: currentStepIdx === steps.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <span>Next Step</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
