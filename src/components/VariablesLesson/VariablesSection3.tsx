import { useState } from 'react';
import { Copy, Check, Box } from 'lucide-react';
import { CODE_EXAMPLES } from '../../data/variablesLessonData';
import styles from './VariablesArticle.module.css';

export function VariablesSection3() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Scope Highlight Toggle
  const [scopeHighlight, setScopeHighlight] = useState<'all' | 'outer' | 'inner'>('all');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="section-scope" className={styles.sectionWrapper} aria-labelledby="heading-scope">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>03</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>MANUSCRIPT CHAPTER THREE</span>
          </div>

          <h2 id="heading-scope" className={styles.mainHeading}>
            3. Scope of Variables in C
          </h2>

          <p className={styles.bodyText}>
            Scope determines the region of source code in which an identifier can be used to refer
            to a declared entity.
          </p>
        </div>

        {/* 3.1 Local Variables */}
        <h3 className={styles.subHeading}>Local Variables</h3>
        <p className={styles.bodyText}>
          A variable declared inside a function or block generally has block scope. It can be accessed
          within its scope and any nested blocks, subject to name hiding.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>local_scope.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.localScope, 'local')}
            >
              {copiedKey === 'local' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'local' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.localScope}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.localScopeOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          The variable <code>value</code> cannot be accessed outside the inner block where it is
          declared.
        </p>

        {/* Interactive Scope Boundary Explorer */}
        <div className={styles.widgetCard}>
          <div className={styles.widgetHeader}>
            <h4 className={styles.widgetTitle}>
              <Box size={18} color="#0055ff" aria-hidden="true" />
              <span>Interactive Scope Boundary Explorer</span>
            </h4>
            <span className={styles.widgetBadge}>Lexical Visibility</span>
          </div>

          <p className={styles.bodyTextSecondary}>
            Toggle between scope views to see which variables are live and accessible within outer and inner compound statements.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => setScopeHighlight('all')}
              style={{ fontWeight: scopeHighlight === 'all' ? 600 : 400, borderColor: scopeHighlight === 'all' ? '#0055ff' : undefined }}
            >
              View Both Scopes
            </button>
            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => setScopeHighlight('outer')}
              style={{ fontWeight: scopeHighlight === 'outer' ? 600 : 400, borderColor: scopeHighlight === 'outer' ? '#0055ff' : undefined }}
            >
              Outer Block (main)
            </button>
            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => setScopeHighlight('inner')}
              style={{ fontWeight: scopeHighlight === 'inner' ? 600 : 400, borderColor: scopeHighlight === 'inner' ? '#ea580c' : undefined }}
            >
              Inner Compound Block {`{ ... }`}
            </button>
          </div>

          <div
            style={{
              background: '#171917',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.92rem',
              lineHeight: 1.8,
              color: '#a0a09a',
            }}
          >
            <div>int main(void) &#123;</div>
            <div
              style={{
                paddingLeft: '1.5rem',
                background: scopeHighlight === 'outer' || scopeHighlight === 'all' ? 'rgba(0, 85, 255, 0.15)' : 'transparent',
                borderRadius: '4px',
                color: scopeHighlight === 'outer' || scopeHighlight === 'all' ? '#ffffff' : '#666',
              }}
            >
              int number = 10; <span style={{ color: '#0055ff', fontSize: '0.8rem' }}>// Accessible in main() &amp; inner blocks</span>
            </div>
            <div style={{ paddingLeft: '1.5rem' }}>&#123;</div>
            <div
              style={{
                paddingLeft: '3rem',
                background: scopeHighlight === 'inner' || scopeHighlight === 'all' ? 'rgba(234, 88, 12, 0.2)' : 'transparent',
                borderRadius: '4px',
                color: scopeHighlight === 'inner' || scopeHighlight === 'all' ? '#ffffff' : '#666',
              }}
            >
              int value = 20; <span style={{ color: '#ea580c', fontSize: '0.8rem' }}>// ONLY accessible inside this &#123; &#125; pair</span>
            </div>
            <div
              style={{
                paddingLeft: '3rem',
                color: scopeHighlight === 'inner' || scopeHighlight === 'all' ? '#ffffff' : '#666',
              }}
            >
              printf("%d %d\n", number, value); <span style={{ color: '#86efac', fontSize: '0.8rem' }}>// Output: 10 20</span>
            </div>
            <div style={{ paddingLeft: '1.5rem' }}>&#125;</div>
            <div
              style={{
                paddingLeft: '1.5rem',
                color: '#ef4444',
                background: 'rgba(239, 68, 68, 0.08)',
                borderRadius: '4px',
              }}
            >
              // printf("%d", value); &larr; COMPILER ERROR: 'value' undeclared here!
            </div>
            <div style={{ paddingLeft: '1.5rem', color: '#ffffff' }}>return 0;</div>
            <div>&#125;</div>
          </div>
        </div>

        {/* 3.2 Global Variables */}
        <h3 className={styles.subHeading}>Global Variables</h3>
        <p className={styles.bodyText}>
          A file-scope variable is declared outside all functions. Its identifier has file scope, and
          its linkage depends on its declaration and storage-class specifiers.
        </p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>global_scope.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.globalScope, 'global')}
            >
              {copiedKey === 'global' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'global' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.globalScope}</code>
          </pre>

          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Output:</div>
            <pre className={styles.outputPre}>{CODE_EXAMPLES.globalScopeOutput}</pre>
          </div>
        </div>

        <p className={styles.bodyText}>
          File-scope variables without explicit initializers are initialized to zero. The <code>static</code>{' '}
          keyword can give a file-scope variable internal linkage, restricting its direct linkage visibility
          to that translation unit.
        </p>
      </div>
    </section>
  );
}
