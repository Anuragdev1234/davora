import type { ProgramCategory, ProgramItem } from './types';
import { category01Patterns } from './category01Patterns';
import { category02NumberLogic } from './category02NumberLogic';
import { category03Loops } from './category03Loops';
import { category04ControlFlow } from './category04ControlFlow';
import { category05MultiFunction } from './category05MultiFunction';
import { category06Recursion } from './category06Recursion';
import { category07Arrays1D } from './category07Arrays1D';
import { category08Arrays2D } from './category08Arrays2D';
import { category09Pointers } from './category09Pointers';
import { category10FileHandling } from './category10FileHandling';
import { category11Strings } from './category11Strings';
import { category12RealWorld } from './category12RealWorld';
import { category13SwitchCase } from './category13SwitchCase';

export * from './types';

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  category01Patterns,
  category02NumberLogic,
  category03Loops,
  category04ControlFlow,
  category05MultiFunction,
  category06Recursion,
  category07Arrays1D,
  category08Arrays2D,
  category09Pointers,
  category10FileHandling,
  category11Strings,
  category12RealWorld,
  category13SwitchCase,
];

// Flat list of all 99 programs in chronological order
export const ALL_PROGRAMS: ProgramItem[] = PROGRAM_CATEGORIES.flatMap(
  (cat) => cat.programs
);

export const TOTAL_PROGRAMS_COUNT = ALL_PROGRAMS.length; // 99
export const TOTAL_COLLECTIONS_COUNT = PROGRAM_CATEGORIES.length; // 13

export const FILTER_CHIPS: string[] = [
  'All Programs',
  'Patterns',
  'Number Logic',
  'Loops',
  'Functions',
  'Arrays',
  'Pointers',
  'Strings',
  'File Handling',
  'Real-World',
  'Miscellaneous',
];

export function getProgramBySlug(
  categorySlug: string,
  programSlug: string
): ProgramItem | undefined {
  return ALL_PROGRAMS.find(
    (p) => p.categorySlug === categorySlug && p.slug === programSlug
  );
}

export function getProgramById(id: string): ProgramItem | undefined {
  return ALL_PROGRAMS.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): ProgramCategory | undefined {
  return PROGRAM_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getAdjacentPrograms(currentProgramId: string): {
  prev: ProgramItem | null;
  next: ProgramItem | null;
} {
  const index = ALL_PROGRAMS.findIndex((p) => p.id === currentProgramId);
  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? ALL_PROGRAMS[index - 1] : null;
  const next = index < ALL_PROGRAMS.length - 1 ? ALL_PROGRAMS[index + 1] : null;

  return { prev, next };
}
