import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { TheoryNavbar } from './TheoryNavbar';
import { TheoryHero } from './TheoryHero';
import { CurriculumAccordion } from './CurriculumAccordion';
import { LessonDetailModal } from './LessonDetailModal';
import type { LessonItem } from '../../data/curriculumData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './TheoryPage.module.css';

export function TheoryPage() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);

  // Scroll to top upon entering Theory page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSelectLesson = (lesson: LessonItem) => {
    if (lesson.id === 'intro-c' || lesson.slug.includes('introduction-to-c')) {
      navigate('/theory/introduction-to-c');
    } else if (lesson.id === 'how-c-works' || lesson.slug.includes('how-a-c-program-works')) {
      navigate('/theory/how-a-c-program-works');
    } else if (lesson.id === 'structure-c' || lesson.slug.includes('structure-of-a-c-program')) {
      navigate('/theory/structure-of-a-c-program');
    } else if (lesson.id === 'tokens-keywords' || lesson.slug.includes('tokens-keywords')) {
      navigate('/theory/basics/tokens-keywords-identifiers');
    } else if (lesson.id === 'variables-datatypes' || lesson.slug.includes('variables-and-data-types')) {
      navigate('/theory/basics/variables-and-data-types');
    } else if (lesson.id === 'operators' || lesson.slug.includes('operators-in-c') || lesson.slug.includes('operators')) {
      navigate('/theory/basics/operators-in-c');
    } else if (lesson.id === 'input-output' || lesson.slug.includes('input-and-output') || lesson.slug.includes('input-output')) {
      navigate('/theory/basics/input-and-output');
    } else if (lesson.id === 'conditional-statements' || lesson.slug.includes('conditional-statements') || lesson.slug.includes('conditionals')) {
      navigate('/theory/basics/conditional-statements');
    } else if (lesson.id === 'loops' || lesson.slug.includes('loops-in-c') || lesson.slug.includes('loops')) {
      navigate('/theory/basics/loops-in-c');
    } else if (lesson.id === 'functions' || lesson.slug.includes('functions')) {
      navigate('/theory/basics/functions');
    } else if (lesson.id === 'recursion' || lesson.slug.includes('recursion')) {
      navigate('/theory/basics/recursion');
    } else if (lesson.id === 'practice-problems' || lesson.slug.includes('practice-problems')) {
      navigate('/curriculum/basics/practice-problems');
    } else {
      setSelectedLesson(lesson);
    }
  };

  return (
    <motion.div
      className={styles.pageWrapper}
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <TheoryNavbar onSelectLesson={handleSelectLesson} />

      <main className={styles.mainContent}>
        <TheoryHero />
        <CurriculumAccordion onSelectLesson={handleSelectLesson} />
      </main>

      <div className={styles.footerDivider} role="separator" />

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.brand}>
            <span className={styles.brandDot} aria-hidden="true" />
            <span>DEVORA</span>
          </div>
          <div>Copyright &copy; 2023 DEVORA. All rights reserved.</div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.brand}>
            <Terminal size={14} aria-hidden="true" />
            <span>DEVORA</span>
          </div>
          <div>Inside the Logic.</div>
        </div>
      </footer>

      {/* Interactive Lesson Detail Modal */}
      <LessonDetailModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
    </motion.div>
  );
}

export default TheoryPage;
