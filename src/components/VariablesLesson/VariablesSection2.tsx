import { useState } from 'react';
import { Copy, Check, Lock, Hash } from 'lucide-react';
import { CODE_EXAMPLES } from '../../data/variablesLessonData';
import styles from './VariablesArticle.module.css';

export function VariablesSection2() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="section-constants" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-constants">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>02</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>MANUSCRIPT CHAPTER TWO</span>
          </div>

          <h2 id="heading-constants" className={styles.mainHeading}>
            2. Constants in C
          </h2>

          <p className={styles.bodyText}>
            A constant value is a value that is not intended to change. In C, constants can be represented
            by literals, enumeration constants, or objects declared with the <code>const</code> qualifier,
            among other mechanisms.
          </p>
        </div>

        {/* 2.1 Using the const Keyword */}
        <h3 className={styles.subHeading}>Using the const Keyword</h3>
        <p className={styles.bodyText}>
          The <code>const</code> qualifier prevents modification of an object through an expression that
          does not discard its qualification.
        </p>

        <div className={styles.syntaxCard}>
          <div className={styles.syntaxLabel}>Syntax</div>
          <code className={styles.syntaxCode}>const data_type variable_name = value;</code>
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
              <span>const_keyword.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.constKeyword, 'const')}
            >
              {copiedKey === 'const' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'const' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.constKeyword}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.constKeywordOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          Once initialized, a <code>const</code>-qualified object cannot be modified through an ordinary
          assignment to that object.
        </p>

        {/* 2.2 Using #define */}
        <h3 className={styles.subHeading}>Using #define</h3>
        <p className={styles.bodyText}>
          The preprocessor directive <code>#define</code> can define a macro that substitutes a sequence
          of tokens wherever the macro is used.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>define_macro.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.defineMacro, 'define')}
            >
              {copiedKey === 'define' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'define' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.defineMacro}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.defineMacroOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          Unlike a <code>const</code> object, <code>PI</code> is a macro and does not itself declare a
          typed variable.
        </p>

        {/* 2.3 const vs. #define Comparison */}
        <h3 className={styles.subHeading}>const vs. #define</h3>
        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>const</code> qualifies an object with a type and follows C's scope and object rules.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>#define</code> creates a preprocessor macro that performs token substitution.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span>
              A <code>const</code> object is useful when a typed object is needed; a macro is useful for
              compile-time substitutions and other preprocessing tasks.
            </span>
          </li>
        </ul>

        {/* Side-by-side Architectural Comparison Card */}
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCol} style={{ borderTop: '3px solid #0055ff' }}>
            <h4 className={styles.colHeader}>
              <Lock size={18} color="#0055ff" aria-hidden="true" />
              <span>const Qualified Objects</span>
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong>Type safety &amp; scoping:</strong> Allocates a typed storage object checked by the compiler frontend. It obeys block, function, or file scope, and can be addressed by pointers (e.g. <code>const int *p</code>).
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f8ff', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#0055ff' }}>
              const int dailyLimit = 20000;
            </div>
          </div>

          <div className={styles.comparisonCol} style={{ borderTop: '3px solid #7c3aed' }}>
            <h4 className={styles.colHeader}>
              <Hash size={18} color="#7c3aed" aria-hidden="true" />
              <span>#define Preprocessor Macros</span>
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong>Lexical token replacement:</strong> Evaluated during the preprocessing phase prior to syntax analysis. Replaces all identifier tokens across the translation unit without type checks or storage allocation.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#faf7ff', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#7c3aed' }}>
              #define PI 3.14159
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
