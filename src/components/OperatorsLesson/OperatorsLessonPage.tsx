import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { OperatorsHero } from './OperatorsHero';
import { OperatorTaxonomySection } from './OperatorTaxonomySection';
import { OperatorsInDepthSection } from './OperatorsInDepthSection';
import { OperatorPrecedenceSection } from './OperatorPrecedenceSection';
import { OperatorsQuizSection } from './OperatorsQuizSection';
import { OperatorsCompletionNav } from './OperatorsCompletionNav';
import { useReducedMotion } from '../../hooks/useMotion';
import type { OperatorCategoryId } from '../../data/operatorsLessonData';

export function OperatorsLessonPage() {
  const reduced = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<OperatorCategoryId>('arithmetic');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('operator-types');
    if (el) {
      const navOffset = 90;
      const pos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
    }
  };

  return (
    <LessonLayout
      currentLessonTitle="Operators in C"
      categoryTitle="BASICS"
      lessonNumber="06"
      isWideLayout={true}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section 00: Cinematic Reference-Matched Hero with Central Code & 6 Panels */}
        <OperatorsHero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onExploreClick={handleExploreClick}
        />

        {/* Section 01: Types of Operators in C (6-Column Reference-Matched Taxonomy Grid) */}
        <OperatorTaxonomySection />

        {/* Section 02-09: Complete In-Depth Curriculum (A to I: Definitions, Arithmetic, Relational,
            Logical, Assignment, Bitwise, Increment/Decrement, Ternary, Other Operators) */}
        <OperatorsInDepthSection />

        {/* Section 10: Complete 15-Level Precedence & Associativity Table + Worked Breakdowns */}
        <OperatorPrecedenceSection />

        {/* Section 11: Quick Revision Interactive Practice Quiz */}
        <OperatorsQuizSection />

        {/* Section 12: Next Steps Curriculum Progression */}
        <OperatorsCompletionNav />
      </motion.article>
    </LessonLayout>
  );
}

export default OperatorsLessonPage;
