import { Link } from '../../router/Router';
import { ArrowRight, BookOpen } from 'lucide-react';
import styles from './IoCompletionNav.module.css';

export function IoCompletionNav() {
  const takeaways = [
    'All C I/O operations are modeled as sequential streams of bytes (stdin, stdout, stderr).',
    'scanf() requires the address-of operator (&) for scalar variables because C passes arguments strictly by value.',
    'Always verify scanf() return values to safeguard against malicious or unparseable input streams.',
    'In printf(), %f formats both float and double. In scanf(), use %lf for double * and %f for float *.',
    'Use fgets(buf, sizeof buf, stdin) for robust, buffer-overflow-free string ingestion; gets() is unsafe and removed in C11.',
    'printf() returns the count of characters printed, or negative on failure; scanf() returns the count of items assigned.',
  ];

  return (
    <section className={styles.sectionWrapper} id="io-completion">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>08</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>Summary & Progress</span>
          </div>
          <h2 className={styles.mainHeading}>Input & Output Takeaways</h2>
          <p className={styles.subHeading}>
            A synthesis of standard I/O streams, buffer safeguards, and specifiers to retain as you advance in C.
          </p>
        </div>

        {/* Takeaways Card */}
        <div className={styles.takeawaysCard}>
          <h3 className={styles.takeawaysTitle}>Core Principles to Remember</h3>
          <div className={styles.takeawaysGrid}>
            {takeaways.map((item, index) => (
              <div key={index} className={styles.takeawayItem}>
                <span className={styles.takeawayDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps Navigation Duo */}
        <div className={styles.nextStepsDuo}>
          {/* Card 1: Next Lesson */}
          <Link to="/theory/basics/conditional-statements" className={styles.nextStepCard}>
            <div>
              <div className={styles.nextStepEyebrow}>NEXT LESSON · 08</div>
              <h3 className={styles.nextStepTitle}>Conditional Statements in C</h3>
              <p className={styles.nextStepDesc}>
                Learn how programs make branching decisions using <code>if</code>, <code>else if</code>, <code>else</code>, and multi-way <code>switch</code> dispatching.
              </p>
            </div>
            <div className={styles.nextStepAction}>
              <span>Continue to Lesson 08</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          {/* Card 2: Return to Theory Curriculum */}
          <Link to="/theory" className={styles.nextStepCard}>
            <div>
              <div className={styles.nextStepEyebrow}>CURRICULUM OVERVIEW</div>
              <h3 className={styles.nextStepTitle}>Theory Curriculum Map</h3>
              <p className={styles.nextStepDesc}>
                Explore the complete 16-lesson C systems syllabus, from compilation mechanics to memory pointers and data structures.
              </p>
            </div>
            <div className={styles.nextStepAction}>
              <span>View All Lessons</span>
              <BookOpen size={15} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
