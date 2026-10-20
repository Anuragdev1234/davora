import { useState, useEffect, useMemo } from 'react';
import { Terminal, RotateCcw } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { Navigation } from '../Navigation/Navigation';
import { ProgramsHero } from './ProgramsHero';
import { ProgramsFilterBar } from './ProgramsFilterBar';
import { CategoryAccordion } from './CategoryAccordion';
import {
  PROGRAM_CATEGORIES,
  TOTAL_PROGRAMS_COUNT,
  type ProgramItem,
  type ProgramCategory,
} from '../../data/programs';
import styles from './ProgramsLibraryPage.module.css';

// Filter chip to category slug mapping
const CHIP_CATEGORY_MAP: Record<string, string[]> = {
  'Patterns': ['patterns'],
  'Number Logic': ['number-logic'],
  'Loops': ['loops'],
  'Functions': ['multi-function-programs', 'recursion'],
  'Arrays': ['1d-arrays', '2d-arrays'],
  'Pointers': ['pointers'],
  'Strings': ['strings'],
  'File Handling': ['file-handling'],
  'Real-World': ['real-world-c-projects'],
  'Miscellaneous': ['control-flow', 'switch-case'],
};

export function ProgramsLibraryPage() {
  const navigate = useNavigate();

  // Filter and search state
  const [selectedFilter, setSelectedFilter] = useState('All Programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Accordion expansion state: Category 01 ('cat-patterns') expanded by default
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>(['cat-patterns']);

  // Scroll to top on entry
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Filtered categories and their matching programs
  const { filteredCategories, totalVisiblePrograms } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const allowedSlugs =
      selectedFilter === 'All Programs'
        ? null
        : CHIP_CATEGORY_MAP[selectedFilter] || [];

    let totalCount = 0;

    const categories = PROGRAM_CATEGORIES.map((cat) => {
      // Check if category is allowed by chip filter
      if (allowedSlugs && !allowedSlugs.includes(cat.slug)) {
        return null;
      }

      // Filter programs inside this category
      const matchingPrograms = cat.programs.filter((prog) => {
        // Difficulty filter
        if (selectedDifficulty !== 'All' && prog.difficulty !== selectedDifficulty) {
          return false;
        }

        // Search query filter (matches title, description, code, or index)
        if (query) {
          const matchTitle = prog.title.toLowerCase().includes(query);
          const matchDesc = prog.description.toLowerCase().includes(query);
          const matchCode = prog.code.toLowerCase().includes(query);
          const matchNum = prog.id.toLowerCase().includes(query);
          return matchTitle || matchDesc || matchCode || matchNum;
        }

        return true;
      });

      if (matchingPrograms.length === 0) {
        return null;
      }

      totalCount += matchingPrograms.length;

      return {
        category: cat,
        matchingPrograms,
      };
    }).filter(Boolean) as { category: ProgramCategory; matchingPrograms: ProgramItem[] }[];

    return {
      filteredCategories: categories,
      totalVisiblePrograms: totalCount,
    };
  }, [selectedFilter, searchQuery, selectedDifficulty]);

  // When searching, auto-expand categories that have results
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setExpandedCategoryIds(filteredCategories.map((fc) => fc.category.id));
    }
  }, [searchQuery, filteredCategories]);

  const handleToggleCategory = (catId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleSelectProgram = (program: ProgramItem) => {
    navigate(`/programs/${program.categorySlug}/${program.slug}`);
  };

  const handleResetFilters = () => {
    setSelectedFilter('All Programs');
    setSearchQuery('');
    setSelectedDifficulty('All');
    setExpandedCategoryIds(['cat-patterns']);
  };

  const isFiltered =
    selectedFilter !== 'All Programs' ||
    searchQuery.trim() !== '' ||
    selectedDifficulty !== 'All';

  return (
    <div className={styles.pageWrapper}>
      <Navigation />

      <main className={styles.mainContent}>
        {/* Editorial Hero with 3D Logic Core Sculpture */}
        <ProgramsHero />

        {/* Filter & Search Bar */}
        <ProgramsFilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
        />

        {/* Categories Section */}
        <section className={styles.categoriesSection} aria-label="Curriculum Categories">
          <div className={styles.container}>
            {/* Filter status banner if filtered */}
            {isFiltered && (
              <div className={styles.resultsBar}>
                <span className={styles.resultsCount}>
                  Showing {totalVisiblePrograms} of {TOTAL_PROGRAMS_COUNT} programs across{' '}
                  {filteredCategories.length} collections
                  {selectedFilter !== 'All Programs' && ` · ${selectedFilter}`}
                  {selectedDifficulty !== 'All' && ` · ${selectedDifficulty}`}
                  {searchQuery.trim() && ` · matching "${searchQuery.trim()}"`}
                </span>
                <button
                  type="button"
                  className={styles.clearFiltersBtn}
                  onClick={handleResetFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Accordion List */}
            {filteredCategories.length > 0 ? (
              <div className={styles.accordionList}>
                {filteredCategories.map(({ category, matchingPrograms }) => (
                  <CategoryAccordion
                    key={category.id}
                    category={category}
                    isExpanded={expandedCategoryIds.includes(category.id)}
                    onToggle={() => handleToggleCategory(category.id)}
                    onSelectProgram={handleSelectProgram}
                    displayPrograms={matchingPrograms}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyTitle}>No matching programs found</h3>
                <p className={styles.emptyDesc}>
                  We couldn't find any C programs matching your search criteria. Try adjusting
                  your keywords or reset the filters.
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </section>
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

export default ProgramsLibraryPage;
