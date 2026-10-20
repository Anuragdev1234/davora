import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { TokensHero } from './TokensHero';
import { TokenTypesSection } from './TokenTypesSection';
import { IdentifierRulesSection } from './IdentifierRulesSection';
import { ProgramTokenExplorer } from './ProgramTokenExplorer';
import { TokensSummarySection } from './TokensSummarySection';
import { TokensQuizSection } from './TokensQuizSection';
import { TokensCompletionNav } from './TokensCompletionNav';
import { useReducedMotion } from '../../hooks/useMotion';

export function TokensLessonPage() {
  const reduced = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Primary Action: "Explore the Tokens" from Hero
  const handleExploreClick = () => {
    const targetEl =
      document.getElementById('token-types') ||
      document.getElementById('program-tokens');

    if (targetEl) {
      const navHeight = 110;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <LessonLayout
      currentLessonTitle="Tokens, Keywords and Identifiers in C"
      categoryTitle="BASICS"
      isWideLayout={true}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section 01: Hero with Prominently Embedded Infographic Asset & Lightbox */}
        <TokensHero onExploreClick={handleExploreClick} />

        {/* Section 02: Types of Tokens in C (5 Interactive Categories) */}
        <TokenTypesSection />

        {/* Section 03: Rules for Identifiers & Interactive Real-Time Lexical Validator */}
        <IdentifierRulesSection />

        {/* Section 04: Example Program & Interactive Token Dissector */}
        <ProgramTokenExplorer />

        {/* Section 05: Core Takeaways ("Remember") & Lexer Architecture */}
        <TokensSummarySection />

        {/* Section 06: Practice Quiz ("Quick Check") */}
        <TokensQuizSection />

        {/* Section 07: Next Steps & Curriculum Navigation */}
        <TokensCompletionNav />
      </motion.article>
    </LessonLayout>
  );
}

export default TokensLessonPage;
