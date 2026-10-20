import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from './LessonLayout';
import { LessonHero } from './LessonHero';
import { WhatIsCSection } from './WhatIsCSection';
import { FirstProgramSection } from './FirstProgramSection';
import { ProgramLineExplorer } from './ProgramLineExplorer';
import { ExecutionPipeline } from './ExecutionPipeline';
import { ProgramStructureSection } from './ProgramStructureSection';
import { WhereCIsUsedSection } from './WhereCIsUsedSection';
import { KnowledgeCheck } from './KnowledgeCheck';
import { LessonNavigation } from './LessonNavigation';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './IntroToCLessonPage.module.css';

export function IntroToCLessonPage() {
  const reduced = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <LessonLayout
      currentLessonTitle="Introduction to C"
      categoryTitle="BASICS"
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Lesson Hero Section */}
        <LessonHero />

        {/* Section 1: What is C? */}
        <WhatIsCSection />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 2: Your First C Program */}
        <FirstProgramSection />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 3: Understand the Program */}
        <ProgramLineExplorer />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 4: How a C Program Executes */}
        <ExecutionPipeline />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 5: Structure of a C Program */}
        <ProgramStructureSection />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 6: Where C is Used */}
        <WhereCIsUsedSection />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 7: Test Your Understanding */}
        <KnowledgeCheck />

        {/* Section 8: Lesson Navigation */}
        <LessonNavigation />
      </motion.article>
    </LessonLayout>
  );
}

export default IntroToCLessonPage;
