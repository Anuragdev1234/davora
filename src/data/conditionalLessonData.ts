// ============================================================
// DEVORA — CONDITIONAL STATEMENTS IN C LESSON DATA
// Concept definitions, hero code, 6 examples, differences, quiz
// ============================================================

export interface ConditionalConcept {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'if' | 'if-else' | 'else-if' | 'switch' | 'ternary' | 'nested';
  color: string;
  accentBg: string;
  codeSnippet: string;
  fullCodeSnippet?: string;
  description: string;
}

export interface ConditionalExample {
  id: string;
  number: string;
  title: string;
  color: string;
  accentBg: string;
  codeSnippet: string;
  defaultOutput: string;
  explanation: string;
  testControl: {
    type: 'slider' | 'toggle' | 'select' | 'dual-number';
    label: string;
    defaultValue: number | string;
    options?: { label: string; value: number | string }[];
    min?: number;
    max?: number;
    step?: number;
  };
}

export interface DifferenceRow {
  statement: string;
  purpose: string;
  syntaxPattern: string;
  evaluationLogic: string;
  bestUsedFor: string;
}

export interface PracticeQuestion {
  id: number;
  title: string;
  codeSnippet: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// -------------------------------------------------------------------------
// 1. Hero 5 Concept Cards (Matching Reference Board 01–05)
// -------------------------------------------------------------------------
export const HERO_CONCEPTS: ConditionalConcept[] = [
  {
    id: 'if-stmt',
    number: '01',
    title: 'if Statement',
    subtitle: 'Executes a block of code when a condition is true.',
    category: 'if',
    color: '#2563EB', // Blue
    accentBg: 'rgba(37, 99, 235, 0.08)',
    codeSnippet: 'if (condition) {\n    // code\n}',
    description:
      'The single-branch decision statement. The code block executes only when the boolean condition evaluates to a non-zero value.',
  },
  {
    id: 'if-else-stmt',
    number: '02',
    title: 'if-else Statement',
    subtitle: 'Chooses between two blocks of code.',
    category: 'if-else',
    color: '#059669', // Mint / Emerald Green
    accentBg: 'rgba(5, 150, 105, 0.08)',
    codeSnippet: 'if (condition) {\n    // true block\n} else {\n    // false block\n}',
    description:
      'The dual-branch decision statement. Executes the if-block when non-zero, or guarantees fallback execution of the else-block when zero.',
  },
  {
    id: 'else-if-ladder',
    number: '03',
    title: 'else-if Ladder',
    subtitle: 'Checks multiple conditions in sequence.',
    category: 'else-if',
    color: '#E11D48', // Coral / Rose
    accentBg: 'rgba(225, 29, 72, 0.08)',
    codeSnippet: 'if (...) { ... }\nelse if (...) { ... }\nelse { ... }',
    description:
      'Evaluates conditions top-down. The first true condition executes its block, skipping all remaining conditions. The optional else catches fallbacks.',
  },
  {
    id: 'switch-stmt',
    number: '04',
    title: 'switch Statement',
    subtitle: 'Selects a block based on the value of an expression.',
    category: 'switch',
    color: '#7C3AED', // Purple / Violet
    accentBg: 'rgba(124, 58, 237, 0.08)',
    codeSnippet: 'switch (expression) {\n    case value1: ...; break;\n    case value2: ...; break;\n    default: ...;\n}',
    description:
      'Multi-way branch matching an integral expression against constant cases. Compilers often optimize switches into efficient O(1) jump tables.',
  },
  {
    id: 'ternary-op',
    number: '05',
    title: 'Conditional Operator (?:)',
    subtitle: 'A shorthand way to select one of two expressions.',
    category: 'ternary',
    color: '#D97706', // Amber / Orange
    accentBg: 'rgba(217, 119, 6, 0.08)',
    codeSnippet: 'condition ? expression1 : expression2;',
    description:
      'C\'s only ternary operator. Evaluates condition; if true, yields expression1; otherwise yields expression2. Can be embedded inline inside expressions.',
  },
];

// -------------------------------------------------------------------------
// 2. Hero Code Editor Lines (Grade Classification Program)
// -------------------------------------------------------------------------
export interface HeroCodeLine {
  lineNum: number;
  text: string;
  isPill?: boolean;
  pillCategory?: 'if-90' | 'elseif-80' | 'elseif-70' | 'else-fallback';
  borderColor?: string;
}

export const HERO_GRADE_LINES: HeroCodeLine[] = [
  { lineNum: 1, text: '#include <stdio.h>' },
  { lineNum: 2, text: '' },
  { lineNum: 3, text: 'int main(void) {' },
  { lineNum: 4, text: '    int marks = 85;' },
  { lineNum: 5, text: '' },
  {
    lineNum: 6,
    text: '    if (marks >= 90) {',
    isPill: true,
    pillCategory: 'if-90',
    borderColor: '#3B82F6',
  },
  { lineNum: 7, text: '        printf("Grade A+\\n");' },
  { lineNum: 8, text: '    }' },
  {
    lineNum: 9,
    text: '    else if (marks >= 80) {',
    isPill: true,
    pillCategory: 'elseif-80',
    borderColor: '#10B981',
  },
  { lineNum: 10, text: '        printf("Grade A\\n");' },
  { lineNum: 11, text: '    }' },
  {
    lineNum: 12,
    text: '    else if (marks >= 70) {',
    isPill: true,
    pillCategory: 'elseif-70',
    borderColor: '#F43F5E',
  },
  { lineNum: 13, text: '        printf("Grade B\\n");' },
  { lineNum: 14, text: '    }' },
  {
    lineNum: 15,
    text: '    else {',
    isPill: true,
    pillCategory: 'else-fallback',
    borderColor: '#8B5CF6',
  },
  { lineNum: 16, text: '        printf("Grade C or below\\n");' },
  { lineNum: 17, text: '    }' },
  { lineNum: 18, text: '' },
  { lineNum: 19, text: '    return 0;' },
  { lineNum: 20, text: '}' },
];

// Helper to evaluate marks and return the matching branch & output
export function evaluateGradeBranch(marks: number): {
  activePill: 'if-90' | 'elseif-80' | 'elseif-70' | 'else-fallback';
  output: string;
  conditionMet: string;
  flowDecision: boolean;
} {
  if (marks >= 90) {
    return {
      activePill: 'if-90',
      output: 'Grade A+',
      conditionMet: 'marks >= 90 (True: 90..100)',
      flowDecision: true,
    };
  }
  if (marks >= 80) {
    return {
      activePill: 'elseif-80',
      output: 'Grade A',
      conditionMet: 'marks >= 80 (True: 80..89)',
      flowDecision: true,
    };
  }
  if (marks >= 70) {
    return {
      activePill: 'elseif-70',
      output: 'Grade B',
      conditionMet: 'marks >= 70 (True: 70..79)',
      flowDecision: true,
    };
  }
  return {
    activePill: 'else-fallback',
    output: 'Grade C or below',
    conditionMet: 'All preceding conditions false (marks < 70)',
    flowDecision: false,
  };
}

// -------------------------------------------------------------------------
// 3. Six Aligned Live Examples (Lower Section of Reference Board)
// -------------------------------------------------------------------------
export const CONDITIONAL_EXAMPLES: ConditionalExample[] = [
  {
    id: 'ex-if',
    number: '01',
    title: 'if Statement',
    color: '#2563EB', // Blue
    accentBg: 'rgba(37, 99, 235, 0.08)',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int age = 20;

    if (age >= 18) {
        printf("You are eligible to vote.\\n");
    }

    return 0;
}`,
    defaultOutput: 'You are eligible to vote.',
    explanation:
      'Tests if age >= 18. Because 20 >= 18 is true (1), the block executes. If age < 18, no message is printed.',
    testControl: {
      type: 'slider',
      label: 'Age',
      defaultValue: 20,
      min: 10,
      max: 60,
      step: 1,
    },
  },
  {
    id: 'ex-if-else',
    number: '02',
    title: 'if-else Statement',
    color: '#059669', // Green
    accentBg: 'rgba(5, 150, 105, 0.08)',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int number = 7;

    if (number % 2 == 0) {
        printf("Even number\\n");
    } else {
        printf("Odd number\\n");
    }

    return 0;
}`,
    defaultOutput: 'Odd number',
    explanation:
      'Calculates number % 2. If the remainder is 0, prints "Even number". Otherwise, executes the else branch and prints "Odd number".',
    testControl: {
      type: 'toggle',
      label: 'Number Value',
      defaultValue: 7,
      options: [
        { label: '7 (Odd)', value: 7 },
        { label: '8 (Even)', value: 8 },
        { label: '15 (Odd)', value: 15 },
        { label: '42 (Even)', value: 42 },
      ],
    },
  },
  {
    id: 'ex-else-if',
    number: '03',
    title: 'else-if Ladder',
    color: '#E11D48', // Coral
    accentBg: 'rgba(225, 29, 72, 0.08)',
    codeSnippet: `int marks = 85;

if (marks >= 90) {
    printf("Grade A+\\n");
} else if (marks >= 80) {
    printf("Grade A\\n");
} else if (marks >= 70) {
    printf("Grade B\\n");
} else {
    printf("Grade C or below\\n");
}`,
    defaultOutput: 'Grade A',
    explanation:
      'Evaluates conditions top-down. 85 is not >= 90, but 85 >= 80 is true, so "Grade A" prints and all subsequent else branches are skipped.',
    testControl: {
      type: 'slider',
      label: 'Marks (0-100)',
      defaultValue: 85,
      min: 50,
      max: 100,
      step: 1,
    },
  },
  {
    id: 'ex-nested-if',
    number: '04',
    title: 'Nested if Statement',
    color: '#7C3AED', // Violet / Purple
    accentBg: 'rgba(124, 58, 237, 0.08)',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int age = 22;
    int hasID = 1;

    if (age >= 18) {
        if (hasID == 1) {
            printf("Entry allowed\\n");
        } else {
            printf("ID required\\n");
        }
    } else {
        printf("Entry not allowed\\n");
    }

    return 0;
}`,
    defaultOutput: 'Entry allowed',
    explanation:
      'Checks the outer condition (age >= 18). If true, it evaluates the inner condition (hasID == 1). Both must succeed for entry.',
    testControl: {
      type: 'select',
      label: 'Scenario',
      defaultValue: 'adult-with-id',
      options: [
        { label: 'Age 22, ID: Yes (Allowed)', value: 'adult-with-id' },
        { label: 'Age 22, ID: No (ID required)', value: 'adult-no-id' },
        { label: 'Age 16, ID: Yes (Minor - Not allowed)', value: 'minor' },
      ],
    },
  },
  {
    id: 'ex-switch',
    number: '05',
    title: 'switch Statement',
    color: '#D97706', // Amber
    accentBg: 'rgba(217, 119, 6, 0.08)',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int day = 2;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }

    return 0;
}`,
    defaultOutput: 'Tuesday',
    explanation:
      'Matches the integer value of day. Because day == 2, execution jumps directly to case 2, prints "Tuesday", and break terminates the switch.',
    testControl: {
      type: 'select',
      label: 'Day Index',
      defaultValue: 2,
      options: [
        { label: '1 (Monday)', value: 1 },
        { label: '2 (Tuesday)', value: 2 },
        { label: '3 (Wednesday)', value: 3 },
        { label: '9 (Default - Invalid)', value: 9 },
      ],
    },
  },
  {
    id: 'ex-ternary',
    number: '06',
    title: 'Conditional Operator',
    color: '#2563EB', // Blue
    accentBg: 'rgba(37, 99, 235, 0.08)',
    codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int largest = (a > b) ? a : b;

    printf("Largest = %d\\n", largest);

    return 0;
}`,
    defaultOutput: 'Largest = 20',
    explanation:
      'Evaluates (10 > 20). Since false (0), the ternary operator selects expression2 (b = 20) and stores it in largest.',
    testControl: {
      type: 'dual-number',
      label: 'Values a & b',
      defaultValue: '10,20',
      options: [
        { label: 'a = 10, b = 20 (Largest: 20)', value: '10,20' },
        { label: 'a = 50, b = 30 (Largest: 50)', value: '50,30' },
        { label: 'a = 15, b = 15 (Equal: 15)', value: '15,15' },
      ],
    },
  },
];

// -------------------------------------------------------------------------
// 4. Differences Reference Table
// -------------------------------------------------------------------------
export const CONDITIONAL_DIFFERENCES: DifferenceRow[] = [
  {
    statement: 'if Statement',
    purpose: 'Execute code only when condition is true',
    syntaxPattern: 'if (cond) { ... }',
    evaluationLogic: 'Single boolean test; passes or bypasses',
    bestUsedFor: 'Optional actions, boundary checks, preconditions',
  },
  {
    statement: 'if-else Statement',
    purpose: 'Select between exactly two mutually exclusive alternatives',
    syntaxPattern: 'if (cond) { ... } else { ... }',
    evaluationLogic: 'Binary decision; guaranteed one branch runs',
    bestUsedFor: 'Dual outcomes (even/odd, pass/fail, open/closed)',
  },
  {
    statement: 'else-if Ladder',
    purpose: 'Test multiple conditions sequentially',
    syntaxPattern: 'if (...) { ... } else if (...) { ... } else { ... }',
    evaluationLogic: 'Linear short-circuit; first true branch halts chain',
    bestUsedFor: 'Range classification (grades, tax brackets, stages)',
  },
  {
    statement: 'Nested if',
    purpose: 'Hierarchical decisions requiring prerequisite passes',
    syntaxPattern: 'if (outer) { if (inner) { ... } }',
    evaluationLogic: 'Dependent branching; inner runs only if outer passes',
    bestUsedFor: 'Multi-factor authentication, complex prerequisites',
  },
  {
    statement: 'switch Statement',
    purpose: 'Multi-way equality dispatch against constant integers/chars',
    syntaxPattern: 'switch (expr) { case V: break; default: }',
    evaluationLogic: 'Direct jump table dispatch (O(1) average lookup)',
    bestUsedFor: 'Menu options, state machines, command codes, enum values',
  },
  {
    statement: 'Conditional Operator (?:)',
    purpose: 'Inline expression evaluation returning a value',
    syntaxPattern: 'cond ? val_if_true : val_if_false',
    evaluationLogic: 'Ternary expression; yields a value directly',
    bestUsedFor: 'Compact variable assignment, return values, printf args',
  },
];

// -------------------------------------------------------------------------
// 5. Practice Exercise: Predict the Output
// -------------------------------------------------------------------------
export const PRACTICE_EXERCISE: PracticeQuestion = {
  id: 1,
  title: 'Predict the Output',
  codeSnippet: `int x = 10;

if (x > 10) {
    printf("A");
} else if (x == 10) {
    printf("B");
} else {
    printf("C");
}`,
  options: ['A', 'B', 'C', 'No output'],
  correctAnswer: 1, // Option 'B'
  explanation:
    '1. Condition (x > 10) evaluates to (10 > 10), which is false (0).\n2. Program proceeds to (x == 10), which evaluates to (10 == 10), which is true (1).\n3. The block for this condition executes, printing "B".\n4. Once a branch in an else-if ladder succeeds, the remaining else branch is skipped.',
};
