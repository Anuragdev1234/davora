import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '../../router/Router';
import styles from './FunctionCompletionNav.module.css';

export function FunctionCompletionNav() {
  const takeaways = [
    'A function is a named, reusable unit of code that performs a specific computational task.',
    'A function declaration (prototype) introduces the interface; the definition supplies the actual body statements.',
    'C strictly uses call by value, passing copies of argument values across the parameter boundary.',
    'Pointers can be passed as arguments to allow a callee function to mutate variables in caller storage.',
    'Functions with return type void do not return a value; typed functions return results matching their declaration.',
    'Every well-formed recursive function requires a valid base case to terminate execution safely.',
    'The call stack allocates stack frames for active functions and unwinds them in LIFO order upon return.',
    'A static local variable retains its modified value across consecutive invocations for the program lifetime.',
  ];

  return (
    <section className={styles.sectionWrapper} id="functions-completion">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.indexBadge}>21</span>
          <h2 className={styles.title}>Functions in C Takeaways</h2>
          <p className={styles.subtitle}>
            A synthesis of procedural decomposition, parameter passing, and memory mechanics to retain as you progress in C systems programming.
          </p>
        </div>

        {/* Takeaways Card */}
        <div className={styles.takeawaysCard}>
          <h3 className={styles.takeawaysHeading}>Core Principles to Remember</h3>
          <div className={styles.takeawaysGrid}>
            {takeaways.map((item, idx) => (
              <div key={idx} className={styles.takeawayItem}>
                <span className={styles.bulletDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Cards */}
        <div className={styles.navCardsGrid}>
          <Link to="/theory/basics/recursion" className={styles.navCard}>
            <div>
              <span className={styles.navCardEyebrow}>NEXT LESSON · 11</span>
              <h4 className={styles.navCardTitle}>Recursion in C</h4>
              <p className={styles.navCardDesc}>
                Explore recursive problem solving, divide-and-conquer strategies, call-stack memory limits, and recursive data structures.
              </p>
            </div>
            <span className={styles.navCardAction}>
              <span>Continue to Lesson 11</span>
              <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/theory" className={styles.navCard}>
            <div>
              <span className={styles.navCardEyebrow}>CURRICULUM OVERVIEW</span>
              <h4 className={styles.navCardTitle}>Theory Curriculum Map</h4>
              <p className={styles.navCardDesc}>
                Explore the complete 16-lesson C systems syllabus, from compilation mechanics and control flow to memory pointers and file systems.
              </p>
            </div>
            <span className={styles.navCardAction}>
              <span>View All Lessons</span>
              <BookOpen size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
