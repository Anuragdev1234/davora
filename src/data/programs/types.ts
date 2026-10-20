export type ProgramDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProgramItem {
  id: string;
  slug: string;
  indexInCategory: number;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  difficulty: ProgramDifficulty;
  description: string;
  code: string;
  output: string;
  explanation: {
    concept: string;
    algorithm: string[];
    keyConstructs: string[];
    complexity?: string;
  };
  tags?: string[];
}

export interface ProgramCategory {
  id: string;
  index: number;
  title: string;
  slug: string;
  description: string;
  defaultExpanded?: boolean;
  difficulty: ProgramDifficulty | 'Beginner to Intermediate' | 'Intermediate to Advanced';
  filterTag: string; // e.g. 'Patterns', 'Number Logic', etc.
  programs: ProgramItem[];
}
