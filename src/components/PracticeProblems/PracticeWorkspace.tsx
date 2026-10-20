import { useState, useMemo } from 'react';
import {
  HelpCircle,
  Binary,
  Code2,
  Search,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  PRACTICE_CATEGORIES,
  SELF_TEST_QUESTIONS,
  CODE_TRACING_QUESTIONS,
  CHALLENGE_PROBLEMS,
  type PracticeMode,
  type ChallengeProblem,
} from '../../data/practiceProblemsData';
import { SelfTestQuizView } from './SelfTestQuizView';
import { CodeTracingView } from './CodeTracingView';
import { ChallengesView } from './ChallengesView';
import styles from './PracticeWorkspace.module.css';

export function PracticeWorkspace() {
  const [activeMode, setActiveMode] = useState<PracticeMode>('self-test');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ── Filter Self-Test Questions ──
  const filteredSelfTest = useMemo(() => {
    return SELF_TEST_QUESTIONS.filter((q) => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        q.question.toLowerCase().includes(query) ||
        q.keyConcept.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query) ||
        q.options.some((opt) => opt.toLowerCase().includes(query));
      return matchCat && matchDiff && matchQuery;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  // ── Filter Code-Tracing Questions ──
  const filteredCodeTracing = useMemo(() => {
    return CODE_TRACING_QUESTIONS.filter((q) => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.question.toLowerCase().includes(query) ||
        q.code.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query) ||
        q.terminalOutput.toLowerCase().includes(query);
      return matchCat && matchDiff && matchQuery;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  // ── Filter Challenge Problems ──
  const filteredChallenges = useMemo(() => {
    return CHALLENGE_PROBLEMS.filter((q: ChallengeProblem) => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.concept.toLowerCase().includes(query) ||
        q.problem.toLowerCase().includes(query) ||
        q.solutionCode.toLowerCase().includes(query);
      return matchCat && matchDiff && matchQuery;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery.trim() !== '';

  const activeCount =
    activeMode === 'self-test'
      ? filteredSelfTest.length
      : activeMode === 'code-tracing'
      ? filteredCodeTracing.length
      : filteredChallenges.length;

  const totalModeCount =
    activeMode === 'self-test'
      ? SELF_TEST_QUESTIONS.length
      : activeMode === 'code-tracing'
      ? CODE_TRACING_QUESTIONS.length
      : CHALLENGE_PROBLEMS.length;

  return (
    <section id="practice-workspace" className={styles.workspaceSection} aria-label="Practice Workspace">
      {/* ── Mode Selection Tabs ── */}
      <div className={styles.modeTabsContainer}>
        <div className={styles.modeTabsList} role="tablist" aria-label="Practice Modes">
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'self-test'}
            className={`${styles.modeTabBtn} ${activeMode === 'self-test' ? styles.modeTabActive : ''}`}
            onClick={() => setActiveMode('self-test')}
          >
            <span className={styles.tabIcon}>
              <HelpCircle size={16} />
            </span>
            <span>Mode A: Quick Self-Test</span>
            <span className={styles.tabBadge}>{SELF_TEST_QUESTIONS.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'code-tracing'}
            className={`${styles.modeTabBtn} ${activeMode === 'code-tracing' ? styles.modeTabActive : ''}`}
            onClick={() => setActiveMode('code-tracing')}
          >
            <span className={styles.tabIcon}>
              <Binary size={16} />
            </span>
            <span>Mode B: Understand the Code</span>
            <span className={styles.tabBadge}>{CODE_TRACING_QUESTIONS.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'challenges'}
            className={`${styles.modeTabBtn} ${activeMode === 'challenges' ? styles.modeTabActive : ''}`}
            onClick={() => setActiveMode('challenges')}
          >
            <span className={styles.tabIcon}>
              <Code2 size={16} />
            </span>
            <span>Mode C: Coding Challenges</span>
            <span className={styles.tabBadge}>{CHALLENGE_PROBLEMS.length}</span>
          </button>
        </div>
      </div>

      {/* ── Filter Bar & Search ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterTopRow}>
          {/* Search Field */}
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search concepts, questions, or C keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search practice questions"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                title="Clear search query"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Difficulty and Reset Controls */}
          <div className={styles.filterActions}>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={styles.diffSelect}
              aria-label="Filter by difficulty"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Advanced">Advanced Level</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className={styles.resetBtn}
                title="Reset filters to default"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Row */}
        <div className={styles.categoriesRow} role="group" aria-label="Filter by topic category">
          {PRACTICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className={styles.resultsMetaBar}>
        <span>
          Showing <span className={styles.countHighlight}>{activeCount}</span> of {totalModeCount}{' '}
          exercises in current view
        </span>
        {hasActiveFilters && (
          <span>
            Filters applied ({selectedCategory !== 'all' ? selectedCategory : 'all topics'}
            {selectedDifficulty !== 'all' ? ` · ${selectedDifficulty}` : ''})
          </span>
        )}
      </div>

      {/* ── Active Mode Content ── */}
      {activeCount === 0 ? (
        <div className={styles.emptyState}>
          <Sparkles size={36} className={styles.emptyIcon} />
          <h4 className={styles.emptyTitle}>No Matching Exercises Found</h4>
          <p className={styles.emptyText}>
            No exercises match your current query or category filters. Try adjusting your search term
            or clearing the active filters.
          </p>
          <button type="button" onClick={handleResetFilters} className={styles.emptyResetBtn}>
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : activeMode === 'self-test' ? (
        <SelfTestQuizView questions={filteredSelfTest} />
      ) : activeMode === 'code-tracing' ? (
        <CodeTracingView questions={filteredCodeTracing} />
      ) : (
        <ChallengesView challenges={filteredChallenges} />
      )}
    </section>
  );
}
