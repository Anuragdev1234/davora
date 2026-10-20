import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { Navigation } from '../Navigation/Navigation';
import { FullPyramidHero } from './FullPyramidHero';
import { UnderstandProblemSection } from './UnderstandProblemSection';
import { DiscoverSymmetrySection } from './DiscoverSymmetrySection';
import { UserInputSection } from './UserInputSection';
import { AlgorithmSection } from './AlgorithmSection';
import { FlowchartSection } from './FlowchartSection';
import { SourceCodeSection } from './SourceCodeSection';
import { ExecutionSimulatorSection } from './ExecutionSimulatorSection';
import { PatternComparisonSection } from './PatternComparisonSection';
import { KnowledgeCheckSection } from './KnowledgeCheckSection';
import { LessonNavigation } from './LessonNavigation';
import styles from './FullPyramidLessonPage.module.css';

export const FullPyramidLessonPage: React.FC = () => {
  // Shared interactive state
  const [rowCount, setRowCount] = useState<number>(5);
  const [selectedRow, setSelectedRow] = useState<number>(1);
  const [activeAlgorithmStep, setActiveAlgorithmStep] = useState<number>(7);
  const [activeFlowchartNode, setActiveFlowchartNode] = useState<string>('cond-k');
  const [activeCodeLine, setActiveCodeLine] = useState<number>(18);

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
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('discover-symmetry')}>
            02 Symmetry
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('user-input')}>
            03 Input
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('algorithm')}>
            04 Algorithm
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('flowchart')}>
            05 Flowchart
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('source-code')}>
            06 C Program
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('execution-simulator')}>
            07 Execution Trace
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('pattern-comparison')}>
            08 Compare Patterns
          </button>
          <button type="button" className={styles.jumpLink} onClick={() => scrollToSection('knowledge-check')}>
            09 Practice Quiz
          </button>
        </div>
      </nav>

      <main className={styles.mainContent}>
        {/* Editorial Storyboard Hero */}
        <FullPyramidHero />

        {/* 01 · Understand the Problem */}
        <UnderstandProblemSection />

        {/* 02 · Discover the Symmetry */}
        <DiscoverSymmetrySection
          rowCount={rowCount}
          selectedRow={selectedRow}
          onSelectRow={setSelectedRow}
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

        {/* 05 · Visualize the Logic (Interactive Flowchart) */}
        <FlowchartSection
          activeNodeId={activeFlowchartNode}
          onSelectNode={setActiveFlowchartNode}
        />

        {/* 06 · Write the C Program */}
        <SourceCodeSection
          activeLine={activeCodeLine}
          onSelectLine={setActiveCodeLine}
        />

        {/* 07 · Watch the Computer Execute (Dual-Loop Simulator) */}
        <ExecutionSimulatorSection rowCount={rowCount} />

        {/* 08 · Compare Patterns & Symmetry */}
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
};
