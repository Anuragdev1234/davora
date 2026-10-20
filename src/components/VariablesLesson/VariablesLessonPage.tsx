import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { VariablesHero } from './VariablesHero';
import { VariablesSection1 } from './VariablesSection1';
import { VariablesSection2 } from './VariablesSection2';
import { VariablesSection3 } from './VariablesSection3';
import { VariablesSection4 } from './VariablesSection4';
import { VariablesSection5 } from './VariablesSection5';
import { VariablesKeyTakeaways } from './VariablesKeyTakeaways';
import { VariablesQuizSection } from './VariablesQuizSection';
import { VariablesCompletionNav } from './VariablesCompletionNav';
import { useReducedMotion } from '../../hooks/useMotion';

export function VariablesLessonPage() {
  const reduced = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <LessonLayout
      currentLessonTitle="Variables and Data Types in C"
      categoryTitle="BASICS"
      isWideLayout={true}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section 00: Hero with Prominent Infographic, Lightbox Modal & Connected Navigation */}
        <VariablesHero />

        {/* Section 01: 1. Variables in C (Declaration, Initialization, Rules, Updating, Expressions, Sizeof) */}
        <VariablesSection1 />

        {/* Section 02: 2. Constants in C (const keyword vs #define preprocessor macro) */}
        <VariablesSection2 />

        {/* Section 03: 3. Scope of Variables in C (Local Block Scope vs Global File Scope & static linkage) */}
        <VariablesSection3 />

        {/* Section 04: 4. Data Types in C (Basic types, C23 bool, Modifiers, Derived & User-defined) */}
        <VariablesSection4 />

        {/* Section 05: 5. Type Conversion in C (Implicit Promotion vs Explicit Cast & Truncation) */}
        <VariablesSection5 />

        {/* Section 06: Summary / Key Takeaways (All 7 Manuscript Points Verbatim) */}
        <VariablesKeyTakeaways />

        {/* Section 07: Practice Quiz (6-Question Interactive Knowledge Check) */}
        <VariablesQuizSection />

        {/* Section 08: What's next & Curriculum Navigation */}
        <VariablesCompletionNav />
      </motion.article>
    </LessonLayout>
  );
}

export default VariablesLessonPage;
