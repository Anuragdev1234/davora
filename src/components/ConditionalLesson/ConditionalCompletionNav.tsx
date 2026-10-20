import { Link } from '../../router/Router';
import { ArrowRight, BookOpen } from 'lucide-react';
import styles from './ConditionalCompletionNav.module.css';

export function ConditionalCompletionNav() {
  const takeaways = [
    'In C, zero is false; any non-zero value is evaluated as true.',
    'if-else statements choose between two mutually exclusive execution branches.',
    'An else-if ladder short-circuits: the very first condition that evaluates to non-zero runs, skipping all remaining conditions.',
    'Nested if statements create hierarchical preconditions that execute only when the outer test succeeds.',
    'switch statements dispatch based on integral constant expressions; include break statements to prevent fall-through.',
    'The ternary operator (?:) is an expression that yields a value inline, ideal for assignments and concise checks.',
  ];

  return (
    <section className={styles.sectionWrapper} id="conditional-completion">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>04</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>Summary & Progress</span>
          </div>
          <h2 className={styles.mainHeading}>Conditional Statements Takeaways</h2>
          <p className={styles.subHeading}>
            A synthesis of branching mechanisms, short-circuit rules, and syntax structures to retain as you build programs in C.
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
          <Link to="/theory/basics/loops-in-c" className={styles.nextStepCard}>
            <div>
              <div className={styles.nextStepEyebrow}>NEXT LESSON · 09</div>
              <h3 className={styles.nextStepTitle}>Loops in C</h3>
              <p className={styles.nextStepDesc}>
                Master iterative programming with <code>for</code>, <code>while</code>, and <code>do-while</code> loops, loop control with <code>break</code> and <code>continue</code>, and nested iteration.
              </p>
            </div>
            <div className={styles.nextStepAction}>
              <span>Continue to Lesson 09</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          {/* Card 2: Return to Theory Curriculum */}
          <Link to="/theory" className={styles.nextStepCard}>
            <div>
              <div className={styles.nextStepEyebrow}>CURRICULUM OVERVIEW</div>
              <h3 className={styles.nextStepTitle}>Theory Curriculum Map</h3>
              <p className={styles.nextStepDesc}>
                Explore the complete 16-lesson C systems syllabus, from compilation mechanics to memory pointers, structs, and algorithms.
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
