import { RECURSION_TAKEAWAYS } from '../../data/recursionLessonData';
import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '../../router/Router';
import styles from './RecursionRevisionNavSection.module.css';

export function RecursionRevisionNavSection() {
  return (
    <section className={styles.sectionWrapper} id="revision">
      <div className={styles.container}>
        <div id="section-revision">
          <div className={styles.header}>
            <span className={styles.indexBadge}>11</span>
            <h2 className={styles.title}>Quick Revision &amp; Key Takeaways</h2>
            <p className={styles.subtitle}>
              Core principles of inductive decomposition and stack-frame management to master as you
              progress in C systems programming.
            </p>
          </div>

          {/* Takeaways Card */}
          <div className={styles.takeawaysCard}>
            <h3 className={styles.takeawaysHeading}>Key Takeaways</h3>
            <div className={styles.takeawaysGrid}>
              {RECURSION_TAKEAWAYS.map((point, idx) => (
                <div key={idx} className={styles.takeawayItem}>
                  <CheckCircle2 size={18} className={styles.checkCircleIcon} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Thought Quote */}
          <div className={styles.thoughtBox}>
            <blockquote className={styles.thoughtQuote}>
              “To master recursion, do not just memorize recursive code. Trace the calls going down,
              identify the base case, and then trace the return values coming back up. Once this
              process becomes clear, recursive algorithms become much easier to understand.”
            </blockquote>
          </div>

          {/* Next Lesson & Curriculum Navigation Cards */}
          <div className={styles.navCardsGrid}>
            <Link to="/theory/basics/arrays" className={styles.navCard}>
              <div>
                <span className={styles.navCardEyebrow}>NEXT LESSON · 12</span>
                <h4 className={styles.navCardTitle}>Arrays in C</h4>
                <p className={styles.navCardDesc}>
                  Master contiguous memory layout, index indexing, pointer decay, and multidimensional
                  matrices.
                </p>
              </div>
              <div className={styles.navCardAction}>
                <span>Continue to Lesson 12</span>
                <ArrowRight size={14} />
              </div>
            </Link>

            <Link to="/theory" className={styles.navCard}>
              <div>
                <span className={styles.navCardEyebrow}>CURRICULUM OVERVIEW</span>
                <h4 className={styles.navCardTitle}>Theory Curriculum Map</h4>
                <p className={styles.navCardDesc}>
                  Explore the full 16-lesson syllabus spanning low-level system memory, compiler
                  mechanics, and pointer architectures.
                </p>
              </div>
              <div className={styles.navCardAction}>
                <span>View All Lessons</span>
                <BookOpen size={14} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
