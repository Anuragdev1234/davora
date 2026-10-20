import { LessonLayout } from '../Lesson/LessonLayout';
import { ChapterNavRail } from './ChapterNavRail';
import { RecursionHero } from './RecursionHero';
import { RecursionBasicsSection } from './RecursionBasicsSection';
import { VisualizingCallsSection } from './VisualizingCallsSection';
import { RecursionTypesSection } from './RecursionTypesSection';
import { FactorialSimulatorSection } from './FactorialSimulatorSection';
import { RecursionComparisonAndMistakesSection } from './RecursionComparisonAndMistakesSection';
import { RecursionApplicationsSection } from './RecursionApplicationsSection';
import { RecursionPracticeSection } from './RecursionPracticeSection';
import { RecursionRevisionNavSection } from './RecursionRevisionNavSection';

export function RecursionLessonPage() {
  return (
    <LessonLayout
      lessonNumber="11"
      categoryTitle="BASICS"
      currentLessonTitle="Recursion in C"
      isWideLayout={true}
    >
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        {/* Sticky Chapter Navigation Rail */}
        <ChapterNavRail />

        {/* Scene 01: Hero with University Atrium, Staircase & Call Stack */}
        <RecursionHero />

        {/* Scene 02 & 03: What Is Recursion & Two Essential Parts */}
        <RecursionBasicsSection />

        {/* Scene 04: Visualizing Recursive Calls (printNumbers(3)) */}
        <VisualizingCallsSection />

        {/* Scene 05: Types of Recursion (Direct, Indirect, Tree, Tail) */}
        <RecursionTypesSection />

        {/* Scene 06: Factorial Using Recursion (Interactive Centerpiece) */}
        <FactorialSimulatorSection />

        {/* Scene 07 & 08: Recursion vs Iteration & Common Mistakes */}
        <RecursionComparisonAndMistakesSection />

        {/* Scene 09: Where Recursion Is Used (Real-World Applications) */}
        <RecursionApplicationsSection />

        {/* Scene 10: Quiz & Structured Challenges */}
        <RecursionPracticeSection />

        {/* Scene 11: Quick Revision & Curriculum Navigation */}
        <RecursionRevisionNavSection />
      </div>
    </LessonLayout>
  );
}

export default RecursionLessonPage;
