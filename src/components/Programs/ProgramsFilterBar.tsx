import { Search, X, ChevronDown } from 'lucide-react';
import { FILTER_CHIPS } from '../../data/programs';
import styles from './ProgramsFilterBar.module.css';

interface ProgramsFilterBarProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export function ProgramsFilterBar({
  selectedFilter,
  onSelectFilter,
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
}: ProgramsFilterBarProps) {
  return (
    <div className={styles.filterSection} id="programs-filter-bar">
      <div className={styles.container}>
        {/* Category Filter Chips */}
        <div className={styles.chipsContainer} role="tablist" aria-label="Program categories">
          {FILTER_CHIPS.map((chip) => {
            const isActive = selectedFilter === chip;
            return (
              <button
                key={chip}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.chipBtn} ${isActive ? styles.chipBtnActive : ''}`}
                onClick={() => onSelectFilter(chip)}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Search and Difficulty Sort */}
        <div className={styles.controlsRight}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search all 99 C programs"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className={styles.sortGroup}>
            <span className={styles.sortLabel}>Sort by:</span>
            <div className={styles.sortSelectWrapper}>
              <select
                className={styles.sortSelect}
                value={selectedDifficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
                aria-label="Filter or sort by difficulty"
              >
                <option value="All">Difficulty (All)</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <ChevronDown size={13} className={styles.sortChevron} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
