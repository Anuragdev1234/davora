import { Link } from '../../router/Router';
import { ArrowRight, BookOpen } from 'lucide-react';
import styles from './LoopCompletionNav.module.css';

export function LoopCompletionNav() {
  const takeaways = [
    'A loop repeats a block of statements as long as its condition is true or until an explicit break occurs.',
    'for loops provide an all-in-one header for initialization, condition, and update, making them ideal for known ranges.',
    'while loops check their condition before running the body (entry-controlled), while do-while loops check afterward (exit-controlled).',
    'A do-while loop always executes its body at least once, even if the condition is false initially, and requires a trailing semicolon.',
    'break causes an immediate jump out of the loop; continue skips the remainder of the current iteration and jumps to the update step.',
    'Nested loops execute M × N total inner iterations for an M-row by N-column structure.',
  ];

  return (
    <section className={styles.sectionWrapper} id="loops-completion">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>11</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>Summary & Progress</span>
          </div>
          <h2 className={styles.mainHeading}>Loops in C Takeaways</h2>
          <p className={styles.subHeading}>
            A synthesis of control repetition patterns, termination invariants, and jump semantics
            to retain as you progress through C programming.
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
          <Link to="/theory/basics/functions-in-c" className={styles.nextStepCard}>
            <div>
              <div className={styles.nextStepEyebrow}>NEXT LESSON · 10</div>
              <h3 className={styles.nextStepTitle}>Functions in C</h3>
              <p className={styles.nextStepDesc}>
                Decompose programs into modular, reusable procedures. Master function prototypes,
                parameter passing by value, stack frames, and return semantics.
              </p>
            </div>
            <div className={styles.nextStepAction}>
              <span>Continue to Lesson 10</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          {/* Card 2: Return to Theory Curriculum */}
          <Link to="/theory" className={styles.nextStepCard}>
            <div>
              <div className={styles.nextStepEyebrow}>CURRICULUM OVERVIEW</div>
              <h3 className={styles.nextStepTitle}>Theory Curriculum Map</h3>
              <p className={styles.nextStepDesc}>
                Explore the complete 16-lesson C systems syllabus, from compilation mechanics and
                operators to memory pointers, dynamic allocation, and file systems.
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
