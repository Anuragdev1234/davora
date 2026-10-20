import { Info, Settings } from 'lucide-react';
import {
  FORMAT_SPECIFIERS_LEFT,
  FORMAT_SPECIFIERS_RIGHT,
  COMPLETE_FLOW_STAGES,
  type IoFlowStage,
} from '../../data/inputOutputLessonData';
import styles from './FormatSpecifiersAndFlowSection.module.css';

interface FormatSpecifiersAndFlowSectionProps {
  activeStage?: 'prompt' | 'input' | 'processing' | 'output';
  onStageSelect?: (stage: 'prompt' | 'input' | 'processing' | 'output') => void;
}

export function FormatSpecifiersAndFlowSection({
  activeStage = 'input',
  onStageSelect,
}: FormatSpecifiersAndFlowSectionProps) {
  const handleStageClick = (stage: IoFlowStage) => {
    if (onStageSelect) {
      onStageSelect(stage.highlightCategory);
      // Smooth scroll up to hero if desired
      const heroEl = document.getElementById('hero-user-input');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section className={styles.section} id="format-specifiers-and-flow">
      <div className={styles.container}>
        <div className={styles.twoColumnLayout}>
          {/* ========================================================
              LEFT COLUMN: Common Format Specifiers (2-Column Grid Table)
              ======================================================== */}
          <div className={styles.specifiersWrapper}>
            <h2 className={styles.sectionTitle}>Common Format Specifiers</h2>

            <div className={styles.tablesGrid}>
              {/* Left Sub-Table */}
              <div>
                <table className={styles.specTable}>
                  <thead>
                    <tr>
                      <th>Format Specifier</th>
                      <th>Data Type or Purpose</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FORMAT_SPECIFIERS_LEFT.map((row) => (
                      <tr key={row.specifier}>
                        <td>
                          <span className={styles.specifierPill}>{row.specifier}</span>
                        </td>
                        <td>{row.dataType}</td>
                        <td className={styles.codeCell}>
                          <code>{row.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Sub-Table */}
              <div>
                <table className={styles.specTable}>
                  <thead>
                    <tr>
                      <th>Format Specifier</th>
                      <th>Data Type or Purpose</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FORMAT_SPECIFIERS_RIGHT.map((row) => (
                      <tr key={row.specifier}>
                        <td>
                          <span className={styles.specifierPill}>{row.specifier}</span>
                        </td>
                        <td>{row.dataType}</td>
                        <td className={styles.codeCell}>
                          <code>{row.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructional Note Banner matching reference board */}
            <div className={styles.calloutBanner}>
              <Info size={18} className={styles.calloutIcon} />
              <div>
                <strong>Important:</strong> In <code>printf()</code>, <code>%f</code> is used for both <code>float</code> and <code>double</code> arguments because a <code>float</code> argument is promoted to <code>double</code>. In <code>scanf()</code>, use <code>%f</code> for <code>float *</code> and <code>%lf</code> for <code>double *</code>.
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: The Complete Flow Card
              ======================================================== */}
          <div className={styles.flowCard}>
            <div className={styles.flowHeader}>
              <div className={styles.flowIconBadge}>
                <Settings size={16} />
              </div>
              <h3 className={styles.flowTitle}>The Complete Flow</h3>
            </div>

            <div className={styles.flowStepsList}>
              {COMPLETE_FLOW_STAGES.map((stage) => {
                const isActive = activeStage === stage.highlightCategory;

                return (
                  <div
                    key={stage.step}
                    className={`${styles.flowStepItem} ${isActive ? styles.flowStepItemActive : ''}`}
                    onClick={() => handleStageClick(stage)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.stepNumberBadge}>{parseInt(stage.step, 10)}</div>

                    <div className={styles.stepContent}>
                      <div className={styles.stepTitleText}>
                        {stage.step === '01' && (
                          <>
                            <code>printf()</code> asks the user to enter two integers.
                          </>
                        )}
                        {stage.step === '02' && (
                          <>
                            <code>scanf()</code> reads the two values and stores them in <code>a</code> and <code>b</code>.
                          </>
                        )}
                        {stage.step === '03' && (
                          <>
                            The program calculates their sum using <code>a + b</code>.
                          </>
                        )}
                        {stage.step === '04' && (
                          <>
                            <code>printf()</code> displays the result.
                          </>
                        )}
                      </div>
                      <span className={styles.stepCodeHint}>{stage.codeExpression}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
