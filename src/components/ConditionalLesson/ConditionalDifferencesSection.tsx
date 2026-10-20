import { CONDITIONAL_DIFFERENCES } from '../../data/conditionalLessonData';
import styles from './ConditionalDifferencesSection.module.css';

export function ConditionalDifferencesSection() {
  return (
    <section className={styles.section} id="conditional-differences">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>02</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>Comparative Analysis</span>
          </div>
          <h2 className={styles.sectionTitle}>Difference Between Conditional Statements</h2>
          <p className={styles.sectionSubtitle}>
            A side-by-side architectural reference contrasting syntax, execution branching mechanisms, and optimal use cases.
          </p>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableScroll}>
            <table className={styles.diffTable}>
              <thead>
                <tr>
                  <th>Statement</th>
                  <th>Core Purpose</th>
                  <th>Syntax Pattern</th>
                  <th>Evaluation Logic</th>
                  <th>Best Used For</th>
                </tr>
              </thead>
              <tbody>
                {CONDITIONAL_DIFFERENCES.map((row) => (
                  <tr key={row.statement}>
                    <td>
                      <span className={styles.statementBadge}>{row.statement}</span>
                    </td>
                    <td>{row.purpose}</td>
                    <td>
                      <code className={styles.syntaxCode}>{row.syntaxPattern}</code>
                    </td>
                    <td>{row.evaluationLogic}</td>
                    <td className={styles.bestUsedTag}>{row.bestUsedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
