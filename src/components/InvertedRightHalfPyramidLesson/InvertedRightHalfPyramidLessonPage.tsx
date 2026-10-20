import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { Navigation } from '../Navigation/Navigation';
import { InvertedRightHalfPyramidHero } from './InvertedRightHalfPyramidHero';
import { UnderstandProblemSection } from './UnderstandProblemSection';
import { ThinkLikeAHumanSection } from './ThinkLikeAHumanSection';
import { UserInputSection } from './UserInputSection';
import { AlgorithmSection } from './AlgorithmSection';
import { FlowchartSection } from './FlowchartSection';
import { SourceCodeSection } from './SourceCodeSection';
import { ExecutionSimulatorSection } from './ExecutionSimulatorSection';
import { PatternComparisonSection } from './PatternComparisonSection';
import { KnowledgeCheckSection } from './KnowledgeCheckSection';
import { LessonNavigation } from './LessonNavigation';
import styles from './InvertedRightHalfPyramidLessonPage.module.css';

export function InvertedRightHalfPyramidLessonPage() {
  // Shared interactive state
  const [rowCount, setRowCount] = useState<number>(5);
  const [selectedHumanRow, setSelectedHumanRow] = useState<number>(1);
  const [activeAlgorithmStep, setActiveAlgorithmStep] = useState<number>(3);
  const [activeFlowchartNode, setActiveFlowchartNode] = useState<string>('cond-i');
  const [activeCodeLine, setActiveCodeLine] = useState<number>(13);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navigation />

      {/* Quick Lesson Jump Bar */}
      <nav className={styles.jumpBar} aria-label="Lesson Storyboard Navigation">
        <div className={styles.jumpContainer}>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('understand-problem')}>
            01 Problem
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('think-like-human')}>
            02 Human Logic
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('give-input')}>
            03 Input
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('algorithm-section')}>
            04 Algorithm
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('flowchart-section')}>
            05 Flowchart
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('source-code')}>
            06 C Program
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('execution-simulator')}>
            07 Execution Trace
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('algorithm-vs-code')}>
            08 Symmetry &amp; Alignment
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('knowledge-check')}>
            09 Practice Quiz
          </button>
        </div>
      </nav>

      <main className={styles.mainContent}>
        {/* Editorial Storyboard Hero */}
        <InvertedRightHalfPyramidHero />

        {/* 01 · Understand the Problem */}
        <UnderstandProblemSection />

        {/* 02 · Think Like a Human */}
        <ThinkLikeAHumanSection
          selectedRow={selectedHumanRow}
          onSelectRow={setSelectedHumanRow}
        />

        {/* 03 · Give the Computer an Input */}
        <UserInputSection
          rowCount={rowCount}
          onRowCountChange={setRowCount}
        />

        {/* 04 · Build the Algorithm */}
        <AlgorithmSection
          activeStep={activeAlgorithmStep}
          onSelectStep={setActiveAlgorithmStep}
        />

        {/* 05 · Visualize the Reverse Logic (Interactive Flowchart) */}
        <FlowchartSection
          activeNodeId={activeFlowchartNode}
          onSelectNode={setActiveFlowchartNode}
        />

        {/* 06 · Write the C Program */}
        <SourceCodeSection
          activeLine={activeCodeLine}
          onSelectLine={setActiveCodeLine}
        />

        {/* 07 · Watch the Computer Execute (Reverse Simulator) */}
        <ExecutionSimulatorSection rowCount={rowCount} />

        {/* 08 · Compare, Experiment & Symmetry */}
        <PatternComparisonSection />

        {/* 09 · Practice Quiz */}
        <KnowledgeCheckSection />

        {/* Lesson Bottom Navigation */}
        <LessonNavigation />
      </main>

      {/* Editorial Footer */}
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
    </div>
  );
}

export default InvertedRightHalfPyramidLessonPage;
