// =========================================================================
// DEVORA — Loops in C Educational Dataset & Simulation Models
// =========================================================================

export interface LoopFeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'RotateCcw' | 'Zap' | 'Cog' | 'BarChart2';
}

export const HERO_FEATURE_STRIP: LoopFeatureItem[] = [
  {
    id: 'reusability',
    title: 'Reusability',
    description: 'Write once, run many times.',
    iconName: 'RotateCcw',
  },
  {
    id: 'efficiency',
    title: 'Efficiency',
    description: 'Shorter and cleaner code.',
    iconName: 'Zap',
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Handle repetitive tasks.',
    iconName: 'Cog',
  },
  {
    id: 'real-world',
    title: 'Real-world Use',
    description: 'Games, banking, menus, simulations.',
    iconName: 'BarChart2',
  },
];

// -------------------------------------------------------------------------
// 1. Flowchart Steps (Section 01: How Does a Loop Work?)
// -------------------------------------------------------------------------
export interface FlowchartNode {
  id: string;
  label: string;
  phase: 'init' | 'condition' | 'body' | 'update' | 'exit';
  shape: 'pill' | 'diamond' | 'box';
  explanation: string;
  codeMapping: string;
}

export const LOOP_FLOW_NODES: FlowchartNode[] = [
  {
    id: 'node-init',
    label: 'Initialize the variable',
    phase: 'init',
    shape: 'pill',
    explanation: 'Sets up the loop counter variable before entering the loop sequence (e.g. int i = 1;).',
    codeMapping: 'int i = 1;',
  },
  {
    id: 'node-cond',
    label: 'Check the condition',
    phase: 'condition',
    shape: 'diamond',
    explanation: 'Evaluates the test expression. If true (non-zero), execution branches to the loop body. If false (zero), the loop terminates.',
    codeMapping: 'i <= 5',
  },
  {
    id: 'node-body',
    label: 'Execute the loop body',
    phase: 'body',
    shape: 'pill',
    explanation: 'Runs the block of instructions enclosed inside the loop braces (e.g. printing values, calculating totals).',
    codeMapping: 'printf("%d\\n", i);',
  },
  {
    id: 'node-update',
    label: 'Update the variable',
    phase: 'update',
    shape: 'pill',
    explanation: 'Modifies the counter variable (e.g. incrementing with i++ or decrementing with i--) so the loop approaches its termination state.',
    codeMapping: 'i++',
  },
  {
    id: 'node-exit',
    label: 'Exit the loop',
    phase: 'exit',
    shape: 'box',
    explanation: 'Control transfers to the very next statement immediately following the loop block.',
    codeMapping: 'return 0;',
  },
];

// -------------------------------------------------------------------------
// 2. Types of Loops in C (Section 02)
// -------------------------------------------------------------------------
export interface LoopTypeOverview {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  color: string;
  accentBg: string;
  codeSnippet: string;
  targetSectionId: string;
}

export const LOOP_TYPES_OVERVIEW: LoopTypeOverview[] = [
  {
    id: 'type-for',
    number: '01',
    name: 'for loop',
    subtitle: 'Used when the number of iterations is known or can be conveniently controlled.',
    color: '#2563EB', // Cobalt Blue
    accentBg: 'rgba(37, 99, 235, 0.08)',
    codeSnippet: `for (initialization; condition; update) {\n    // code\n}`,
    targetSectionId: 'section-for-loop',
  },
  {
    id: 'type-while',
    number: '02',
    name: 'while loop',
    subtitle: 'Checks the condition before executing the loop body.',
    color: '#059669', // Emerald Green
    accentBg: 'rgba(5, 150, 105, 0.08)',
    codeSnippet: `while (condition) {\n    // code\n}`,
    targetSectionId: 'section-while-loop',
  },
  {
    id: 'type-do-while',
    number: '03',
    name: 'do-while loop',
    subtitle: 'Executes the body first and then checks the condition (so it runs at least once).',
    color: '#D97706', // Amber
    accentBg: 'rgba(217, 119, 6, 0.08)',
    codeSnippet: `do {\n    // code\n} while (condition);`,
    targetSectionId: 'section-do-while-loop',
  },
];

// -------------------------------------------------------------------------
// 3. Signature Feature: The Loop Time Machine (Step Engine Model)
// -------------------------------------------------------------------------
export interface TimeMachineStep {
  stepIndex: number;
  stageName: 'Init' | 'Condition' | 'Body' | 'Update' | 'Exit';
  activeLine: number;
  highlightToken?: string;
  variableValue: number;
  conditionMet: boolean;
  conditionExpr: string;
  outputList: string[];
  explanation: string;
}

export interface TimeMachinePreset {
  id: string;
  title: string;
  code: string;
  steps: TimeMachineStep[];
}

export const TIME_MACHINE_PRESETS: TimeMachinePreset[] = [
  {
    id: 'for-basic',
    title: 'for Loop (1 to 5)',
    code: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
    steps: [
      {
        stepIndex: 0,
        stageName: 'Init',
        activeLine: 4,
        highlightToken: 'int i = 1',
        variableValue: 1,
        conditionMet: true,
        conditionExpr: 'i initialized to 1',
        outputList: [],
        explanation: 'Variable i is allocated on the stack and initialized to 1.',
      },
      {
        stepIndex: 1,
        stageName: 'Condition',
        activeLine: 4,
        highlightToken: 'i <= 5',
        variableValue: 1,
        conditionMet: true,
        conditionExpr: '1 <= 5 (true)',
        outputList: [],
        explanation: 'Check condition: 1 <= 5 evaluates to true (1). Enter loop body.',
      },
      {
        stepIndex: 2,
        stageName: 'Body',
        activeLine: 5,
        highlightToken: 'printf("%d\\n", i);',
        variableValue: 1,
        conditionMet: true,
        conditionExpr: '1 <= 5 (true)',
        outputList: ['1'],
        explanation: 'Execute body: printf outputs 1 to standard output stream.',
      },
      {
        stepIndex: 3,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 2,
        conditionMet: true,
        conditionExpr: 'i incremented: 1 -> 2',
        outputList: ['1'],
        explanation: 'Update step: i is incremented from 1 to 2.',
      },
      {
        stepIndex: 4,
        stageName: 'Condition',
        activeLine: 4,
        highlightToken: 'i <= 5',
        variableValue: 2,
        conditionMet: true,
        conditionExpr: '2 <= 5 (true)',
        outputList: ['1'],
        explanation: 'Check condition: 2 <= 5 evaluates to true (1). Enter loop body.',
      },
      {
        stepIndex: 5,
        stageName: 'Body',
        activeLine: 5,
        highlightToken: 'printf("%d\\n", i);',
        variableValue: 2,
        conditionMet: true,
        conditionExpr: '2 <= 5 (true)',
        outputList: ['1', '2'],
        explanation: 'Execute body: printf outputs 2 to standard output stream.',
      },
      {
        stepIndex: 6,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 3,
        conditionMet: true,
        conditionExpr: 'i incremented: 2 -> 3',
        outputList: ['1', '2'],
        explanation: 'Update step: i is incremented from 2 to 3.',
      },
      {
        stepIndex: 7,
        stageName: 'Condition',
        activeLine: 4,
        highlightToken: 'i <= 5',
        variableValue: 3,
        conditionMet: true,
        conditionExpr: '3 <= 5 (true)',
        outputList: ['1', '2'],
        explanation: 'Check condition: 3 <= 5 evaluates to true (1). Enter loop body.',
      },
      {
        stepIndex: 8,
        stageName: 'Body',
        activeLine: 5,
        highlightToken: 'printf("%d\\n", i);',
        variableValue: 3,
        conditionMet: true,
        conditionExpr: '3 <= 5 (true)',
        outputList: ['1', '2', '3'],
        explanation: 'Execute body: printf outputs 3 to standard output stream.',
      },
      {
        stepIndex: 9,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 4,
        conditionMet: true,
        conditionExpr: 'i incremented: 3 -> 4',
        outputList: ['1', '2', '3'],
        explanation: 'Update step: i is incremented from 3 to 4.',
      },
      {
        stepIndex: 10,
        stageName: 'Condition',
        activeLine: 4,
        highlightToken: 'i <= 5',
        variableValue: 4,
        conditionMet: true,
        conditionExpr: '4 <= 5 (true)',
        outputList: ['1', '2', '3'],
        explanation: 'Check condition: 4 <= 5 evaluates to true (1). Enter loop body.',
      },
      {
        stepIndex: 11,
        stageName: 'Body',
        activeLine: 5,
        highlightToken: 'printf("%d\\n", i);',
        variableValue: 4,
        conditionMet: true,
        conditionExpr: '4 <= 5 (true)',
        outputList: ['1', '2', '3', '4'],
        explanation: 'Execute body: printf outputs 4 to standard output stream.',
      },
      {
        stepIndex: 12,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 5,
        conditionMet: true,
        conditionExpr: 'i incremented: 4 -> 5',
        outputList: ['1', '2', '3', '4'],
        explanation: 'Update step: i is incremented from 4 to 5.',
      },
      {
        stepIndex: 13,
        stageName: 'Condition',
        activeLine: 4,
        highlightToken: 'i <= 5',
        variableValue: 5,
        conditionMet: true,
        conditionExpr: '5 <= 5 (true)',
        outputList: ['1', '2', '3', '4'],
        explanation: 'Check condition: 5 <= 5 evaluates to true (1). Enter loop body.',
      },
      {
        stepIndex: 14,
        stageName: 'Body',
        activeLine: 5,
        highlightToken: 'printf("%d\\n", i);',
        variableValue: 5,
        conditionMet: true,
        conditionExpr: '5 <= 5 (true)',
        outputList: ['1', '2', '3', '4', '5'],
        explanation: 'Execute body: printf outputs 5 to standard output stream.',
      },
      {
        stepIndex: 15,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 6,
        conditionMet: true,
        conditionExpr: 'i incremented: 5 -> 6',
        outputList: ['1', '2', '3', '4', '5'],
        explanation: 'Update step: i is incremented from 5 to 6.',
      },
      {
        stepIndex: 16,
        stageName: 'Condition',
        activeLine: 4,
        highlightToken: 'i <= 5',
        variableValue: 6,
        conditionMet: false,
        conditionExpr: '6 <= 5 (false)',
        outputList: ['1', '2', '3', '4', '5'],
        explanation: 'Check condition: 6 <= 5 evaluates to false (0). Termination reached.',
      },
      {
        stepIndex: 17,
        stageName: 'Exit',
        activeLine: 7,
        highlightToken: 'return 0;',
        variableValue: 6,
        conditionMet: false,
        conditionExpr: 'Loop exited cleanly',
        outputList: ['1', '2', '3', '4', '5'],
        explanation: 'Loop has completed 5 full iterations. Program exits successfully with code 0.',
      },
    ],
  },
  {
    id: 'do-while-check',
    title: 'do-while Executes Body First',
    code: `#include <stdio.h>

int main(void) {
    int i = 10;
    do {
        printf("%d\\n", i);
    } while (i < 5);
    return 0;
}`,
    steps: [
      {
        stepIndex: 0,
        stageName: 'Init',
        activeLine: 4,
        highlightToken: 'int i = 10;',
        variableValue: 10,
        conditionMet: true,
        conditionExpr: 'i = 10',
        outputList: [],
        explanation: 'Variable i is initialized to 10.',
      },
      {
        stepIndex: 1,
        stageName: 'Body',
        activeLine: 6,
        highlightToken: 'printf("%d\\n", i);',
        variableValue: 10,
        conditionMet: true,
        conditionExpr: 'Guaranteed first execution',
        outputList: ['10'],
        explanation: 'do-while executes the body first BEFORE checking any condition! Prints 10.',
      },
      {
        stepIndex: 2,
        stageName: 'Condition',
        activeLine: 7,
        highlightToken: 'while (i < 5);',
        variableValue: 10,
        conditionMet: false,
        conditionExpr: '10 < 5 (false)',
        outputList: ['10'],
        explanation: 'Condition evaluated: 10 < 5 is false (0). The loop stops immediately.',
      },
      {
        stepIndex: 3,
        stageName: 'Exit',
        activeLine: 8,
        highlightToken: 'return 0;',
        variableValue: 10,
        conditionMet: false,
        conditionExpr: 'Terminated after 1 execution',
        outputList: ['10'],
        explanation: 'Loop terminated. Body executed exactly 1 time despite false condition.',
      },
    ],
  },
  {
    id: 'break-example',
    title: 'break Statement Flow',
    code: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            break;
        }
        printf("%d ", i);
    }
    return 0;
}`,
    steps: [
      {
        stepIndex: 0,
        stageName: 'Init',
        activeLine: 4,
        highlightToken: 'int i = 1',
        variableValue: 1,
        conditionMet: true,
        conditionExpr: 'i = 1',
        outputList: [],
        explanation: 'Loop initialized with i = 1.',
      },
      {
        stepIndex: 1,
        stageName: 'Body',
        activeLine: 8,
        highlightToken: 'printf("%d ", i);',
        variableValue: 1,
        conditionMet: true,
        conditionExpr: 'i != 3, prints 1',
        outputList: ['1'],
        explanation: 'i == 3 is false. printf prints 1.',
      },
      {
        stepIndex: 2,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 2,
        conditionMet: true,
        conditionExpr: 'i = 2',
        outputList: ['1'],
        explanation: 'i incremented to 2.',
      },
      {
        stepIndex: 3,
        stageName: 'Body',
        activeLine: 8,
        highlightToken: 'printf("%d ", i);',
        variableValue: 2,
        conditionMet: true,
        conditionExpr: 'i != 3, prints 2',
        outputList: ['1', '2'],
        explanation: 'i == 3 is false. printf prints 2.',
      },
      {
        stepIndex: 4,
        stageName: 'Update',
        activeLine: 4,
        highlightToken: 'i++',
        variableValue: 3,
        conditionMet: true,
        conditionExpr: 'i = 3',
        outputList: ['1', '2'],
        explanation: 'i incremented to 3.',
      },
      {
        stepIndex: 5,
        stageName: 'Condition',
        activeLine: 5,
        highlightToken: 'if (i == 3) break;',
        variableValue: 3,
        conditionMet: true,
        conditionExpr: '3 == 3 (true) -> break',
        outputList: ['1', '2'],
        explanation: 'i == 3 is true! break statement triggers an immediate jump to loop exit.',
      },
      {
        stepIndex: 6,
        stageName: 'Exit',
        activeLine: 10,
        highlightToken: 'return 0;',
        variableValue: 3,
        conditionMet: false,
        conditionExpr: 'Exited early via break',
        outputList: ['1', '2'],
        explanation: 'break skipped iterations 3, 4, 5. Final output: "1 2".',
      },
    ],
  },
];

// -------------------------------------------------------------------------
// 4. Comparison Table (Section 09: Differences Between Loops)
// -------------------------------------------------------------------------
export interface LoopComparisonRow {
  aspect: string;
  forLoop: string;
  whileLoop: string;
  doWhileLoop: string;
}

export const LOOP_COMPARISON_TABLE: LoopComparisonRow[] = [
  {
    aspect: 'Condition Check',
    forLoop: 'Before body execution (Entry-controlled)',
    whileLoop: 'Before body execution (Entry-controlled)',
    doWhileLoop: 'After body execution (Exit-controlled)',
  },
  {
    aspect: 'Minimum Executions',
    forLoop: '0 times (if initial condition is false)',
    whileLoop: '0 times (if initial condition is false)',
    doWhileLoop: '1 time (body always runs before condition check)',
  },
  {
    aspect: 'Initialization',
    forLoop: 'Inside the loop header: for (init; ...)',
    whileLoop: 'Before entering the loop structure',
    doWhileLoop: 'Before entering the loop structure',
  },
  {
    aspect: 'Update Expression',
    forLoop: 'Inside the loop header: for (...; update)',
    whileLoop: 'Inside the loop body manually',
    doWhileLoop: 'Inside the loop body manually',
  },
  {
    aspect: 'Trailing Semicolon',
    forLoop: 'No (enclosed with braces)',
    whileLoop: 'No (semicolon creates an empty loop bug)',
    doWhileLoop: 'Yes — required: } while (condition);',
  },
  {
    aspect: 'Best Used For',
    forLoop: 'Fixed iterations, arrays, ranges, counting',
    whileLoop: 'Event-driven, stream reading, input validation',
    doWhileLoop: 'Menu-driven programs, prompt repeating',
  },
];

// -------------------------------------------------------------------------
// 5. Common Mistakes in Loops (Section 09)
// -------------------------------------------------------------------------
export interface LoopMistakeItem {
  id: string;
  title: string;
  problem: string;
  buggyCode: string;
  fixedCode: string;
  solution: string;
}

export const LOOP_MISTAKES: LoopMistakeItem[] = [
  {
    id: 'missing-update',
    title: '1. Forgetting to Update the Control Variable',
    problem: 'Without updating the counter variable, the condition remains permanently true, causing an infinite loop.',
    buggyCode: `int i = 1;
while (i <= 5) {
    printf("%d\\n", i);
    // Missing i++;
}`,
    fixedCode: `int i = 1;
while (i <= 5) {
    printf("%d\\n", i);
    i++; // Properly approaches stopping condition
}`,
    solution: 'Always verify that every execution path inside the loop body modifies the variable tested in the condition.',
  },
  {
    id: 'off-by-one',
    title: '2. Off-by-One Error (< vs <=)',
    problem: 'Using < instead of <= (or vice-versa) causes the loop to run one time too few or one time too many.',
    buggyCode: `// Intending to print 1 to 5, but stops at 4!
for (int i = 1; i < 5; i++) {
    printf("%d\\n", i);
}`,
    fixedCode: `// Correctly includes 5
for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}`,
    solution: 'Carefully check boundary conditions: 0 to N-1 (N iterations) vs 1 to N (N iterations).',
  },
  {
    id: 'accidental-semicolon',
    title: '3. Accidental Semicolon After while',
    problem: 'Placing a semicolon immediately after while (condition); creates an empty loop that freezes program execution.',
    buggyCode: `int i = 1;
while (i <= 5); // Empty loop! i never increments!
{
    printf("%d\\n", i);
    i++;
}`,
    fixedCode: `int i = 1;
while (i <= 5) { // Braces directly enclose the body
    printf("%d\\n", i);
    i++;
}`,
    solution: 'Never put a semicolon after the while(...) statement in an ordinary while loop.',
  },
  {
    id: 'missing-dowhile-semicolon',
    title: '4. Forgetting the Semicolon After do-while',
    problem: 'Unlike while and for loops, a do-while loop requires a terminating semicolon after its while condition.',
    buggyCode: `do {
    printf("Devora\\n");
} while (condition) // Syntax error! Missing ';'
`,
    fixedCode: `do {
    printf("Devora\\n");
} while (condition); // Correct semicolon delimiter
`,
    solution: 'Always terminate a do-while construct with a semicolon: } while (...);',
  },
  {
    id: 'assignment-in-condition',
    title: '5. Using = (Assignment) Instead of == (Comparison)',
    problem: 'Using a single equals sign assigns a value rather than comparing it. In C, if (i = 5) evaluates to 5 (true).',
    buggyCode: `while (i = 5) { // Assigns 5 to i! Permanently true!
    printf("%d\\n", i);
}`,
    fixedCode: `while (i == 5) { // Compares i to 5
    printf("%d\\n", i);
}`,
    solution: 'Use == for relational equality checks, or enable compiler warnings (-Wall) to catch assignment warnings.',
  },
  {
    id: 'wrong-direction-update',
    title: '6. Decrementing Instead of Incrementing',
    problem: 'Incrementing the wrong direction moves further away from the termination boundary, triggering runaway execution.',
    buggyCode: `for (int i = 1; i <= 10; i--) { // i decreases: 0, -1, -2...
    printf("%d\\n", i);
}`,
    fixedCode: `for (int i = 1; i <= 10; i++) { // i increases towards 10
    printf("%d\\n", i);
}`,
    solution: 'Ensure the update operator moves towards the stopping bound: ++ for <= bound, -- for >= bound.',
  },
];

// -------------------------------------------------------------------------
// 6. Interactive Practice Quiz (Section 10)
// -------------------------------------------------------------------------
export interface LoopQuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LOOP_QUIZ_QUESTIONS: LoopQuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the output of the following for loop?',
    codeSnippet: `for (int i = 1; i <= 3; i++) {
    printf("%d ", i);
}`,
    options: ['1 2 3', '1 2', '0 1 2', '1 2 3 4'],
    correctAnswer: 0,
    explanation: 'The loop initializes i = 1, runs while i <= 3, and increments after each iteration. It prints 1, then 2, then 3.',
  },
  {
    id: 'q2',
    question: 'Which C loop statement is guaranteed to execute its body at least once even if the condition is false initially?',
    options: ['for loop', 'while loop', 'do-while loop', 'infinite loop'],
    correctAnswer: 2,
    explanation: 'A do-while loop is exit-controlled: its body executes before the conditional test is evaluated for the first time.',
  },
  {
    id: 'q3',
    question: 'What does the break statement do when encountered inside a loop body?',
    options: [
      'Skips to the next iteration of the loop',
      'Terminates the loop immediately and jumps outside',
      'Restarts the loop from the beginning',
      'Halts the entire operating system process',
    ],
    correctAnswer: 1,
    explanation: 'break causes an immediate termination of the innermost enclosing loop or switch construct.',
  },
  {
    id: 'q4',
    question: 'How many total times will the inner printf execute in this nested loop?',
    codeSnippet: `for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) {
        printf("*");
    }
}`,
    options: ['5 times', '6 times', '3 times', '2 times'],
    correctAnswer: 1,
    explanation: 'The outer loop runs 2 times. For each outer iteration, the inner loop runs 3 times. Total executions = 2 * 3 = 6.',
  },
];

// -------------------------------------------------------------------------
// 7. Programming Challenges (Section 10)
// -------------------------------------------------------------------------
export interface LoopChallenge {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced Beginner';
  title: string;
  prompt: string;
  hint: string;
  expectedOutput: string;
  solutionCode: string;
}

export const LOOP_CHALLENGES: LoopChallenge[] = [
  {
    id: 'ch-sum',
    level: 'Beginner',
    title: 'Sum of Natural Numbers (1 to 10)',
    prompt: 'Write a C program to calculate and display the sum of numbers from 1 to 10 using a loop.',
    hint: 'Initialize sum = 0 before the loop. Use for (int i = 1; i <= 10; i++) and accumulate sum += i.',
    expectedOutput: 'Sum = 55',
    solutionCode: `#include <stdio.h>

int main(void) {
    int sum = 0;

    for (int i = 1; i <= 10; i++) {
        sum += i;
    }

    printf("Sum = %d\\n", sum);
    return 0;
}`,
  },
  {
    id: 'ch-mult-table',
    level: 'Intermediate',
    title: 'Multiplication Table',
    prompt: 'Write a program that takes an integer N (e.g. 7) and prints its multiplication table from 1 to 10.',
    hint: 'Use a loop from i = 1 to 10 and print n * i in the format "%d x %d = %d".',
    expectedOutput: '7 x 1 = 7\\n7 x 2 = 14\\n...\\n7 x 10 = 70',
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 7;

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", num, i, num * i);
    }

    return 0;
}`,
  },
  {
    id: 'ch-count-digits',
    level: 'Advanced Beginner',
    title: 'Count Digits in an Integer',
    prompt: 'Write a program to count the number of digits in a positive integer using a while loop.',
    hint: 'Divide the number by 10 in each iteration (num /= 10) until it reaches 0, incrementing a count variable.',
    expectedOutput: 'Number of digits: 5 (for input 34892)',
    solutionCode: `#include <stdio.h>

int main(void) {
    long long num = 34892;
    int count = 0;

    if (num == 0) {
        count = 1;
    } else {
        while (num != 0) {
            num /= 10;
            count++;
        }
    }

    printf("Number of digits: %d\\n", count);
    return 0;
}`,
  },
];
