// =========================================================================
// DEVORA — Recursion in C Lesson Data
// =========================================================================

export interface FeatureStripItem {
  id: string;
  iconName: string;
  label: string;
}

export const HERO_FEATURE_STRIP: FeatureStripItem[] = [
  { id: 'prob-solving', iconName: 'Brain', label: 'Problem Solving' },
  { id: 'rec-thinking', iconName: 'Layers', label: 'Recursive Thinking' },
  { id: 'better-algo', iconName: 'LayoutGrid', label: 'Better Algorithms' },
  { id: 'real-world', iconName: 'Globe', label: 'Real-world Applications' },
];

export interface ChapterItem {
  id: string;
  number: string;
  title: string;
  targetId: string;
}

export const CHAPTERS: ChapterItem[] = [
  { id: 'ch-01', number: '01', title: 'What Is Recursion?', targetId: 'section-what-is-recursion' },
  { id: 'ch-02', number: '02', title: 'Base Case & Recursive Case', targetId: 'section-two-parts' },
  { id: 'ch-03', number: '03', title: 'Visualizing Recursive Calls', targetId: 'section-visualizing-calls' },
  { id: 'ch-04', number: '04', title: 'Types of Recursion', targetId: 'section-types-recursion' },
  { id: 'ch-05', number: '05', title: 'Factorial Simulator', targetId: 'section-factorial-simulator' },
  { id: 'ch-06', number: '06', title: 'Recursion vs Iteration', targetId: 'section-recursion-vs-iteration' },
  { id: 'ch-07', number: '07', title: 'Common Mistakes', targetId: 'section-common-mistakes' },
  { id: 'ch-08', number: '08', title: 'Real-World Applications', targetId: 'section-applications' },
  { id: 'ch-09', number: '09', title: 'Interactive Quiz', targetId: 'section-quiz' },
  { id: 'ch-10', number: '10', title: 'Programming Practice', targetId: 'section-challenges' },
  { id: 'ch-11', number: '11', title: 'Quick Revision', targetId: 'section-revision' },
];

export interface StaircaseNode {
  level: number;
  call: string;
  isBase: boolean;
  returnVal: number;
  unwindFormula: string;
}

export const HERO_STAIRCASE_NODES: StaircaseNode[] = [
  { level: 5, call: 'factorial(5)', isBase: false, returnVal: 120, unwindFormula: '5 × 24 = 120' },
  { level: 4, call: 'factorial(4)', isBase: false, returnVal: 24, unwindFormula: '4 × 6 = 24' },
  { level: 3, call: 'factorial(3)', isBase: false, returnVal: 6, unwindFormula: '3 × 2 = 6' },
  { level: 2, call: 'factorial(2)', isBase: false, returnVal: 2, unwindFormula: '2 × 1 = 2' },
  { level: 1, call: 'factorial(1)', isBase: false, returnVal: 1, unwindFormula: '1 × 1 = 1' },
  { level: 0, call: 'factorial(0)', isBase: true, returnVal: 1, unwindFormula: 'returns 1 (Base Case)' },
];

export interface RecursionTypeItem {
  id: string;
  badge: string;
  title: string;
  color: string;
  bgLight: string;
  summary: string;
  code: string;
  explanation: string;
}

export const RECURSION_TYPES: RecursionTypeItem[] = [
  {
    id: 'direct',
    badge: '01',
    title: 'Direct Recursion',
    color: '#2563eb',
    bgLight: '#eff6ff',
    summary: 'A function calls itself directly within its own body.',
    code: `void fun(int n) {
    if (n > 0) {
        printf("%d ", n);
        fun(n - 1); // Direct call to self
    }
}`,
    explanation:
      'Direct recursion is the most standard form in C. The function body explicitly contains an invocation of itself with a modified argument.',
  },
  {
    id: 'indirect',
    badge: '02',
    title: 'Indirect Recursion',
    color: '#059669',
    bgLight: '#ecfdf5',
    summary: 'Function A calls Function B, which in turn calls Function A.',
    code: `void B(int n); // Prototype declaration

void A(int n) {
    if (n > 0) {
        printf("A:%d ", n);
        B(n - 1); // Calls B
    }
}

void B(int n) {
    if (n > 0) {
        printf("B:%d ", n);
        A(n - 1); // Calls A back
    }
}`,
    explanation:
      'Indirect (or mutual) recursion forms a cyclical calling loop across two or more functions. Each function requires forward declaration to satisfy the compiler.',
  },
  {
    id: 'tree',
    badge: '03',
    title: 'Tree / Multiple Recursion',
    color: '#d97706',
    bgLight: '#fffbeb',
    summary: 'A function makes two or more recursive calls during a single invocation.',
    code: `int fib(int n) {
    if (n <= 1) {
        return n; // Base case
    }
    // Two recursive calls spawn a branching tree
    return fib(n - 1) + fib(n - 2);
}`,
    explanation:
      'Multiple recursion creates an exponential branching call tree (like Fibonacci or Divide & Conquer). Subproblems may be evaluated repeatedly unless memoized.',
  },
  {
    id: 'tail',
    badge: '04',
    title: 'Tail Recursion',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    summary: 'The recursive call is the very last operation executed before returning.',
    code: `void count(int n) {
    if (n == 0) {
        return;
    }
    printf("%d ", n);
    count(n - 1); // Pure tail call: no pending operations after return
}`,
    explanation:
      'In tail recursion, nothing remains to compute after the recursive call returns. Optimizing compilers can transform this into a simple loop (tail-call optimization), reusing the stack frame.',
  },
];

export interface ComparisonRow {
  aspect: string;
  recursion: string;
  iteration: string;
}

export const RECURSION_VS_ITERATION: ComparisonRow[] = [
  {
    aspect: 'Mechanism',
    recursion: 'Repeatedly invokes a function with smaller parameters.',
    iteration: 'Repeatedly executes a code block using loops (`for`, `while`, `do-while`).',
  },
  {
    aspect: 'Stopping Condition',
    recursion: 'Terminates when a Base Case condition evaluates to true.',
    iteration: 'Terminates when the loop control condition evaluates to false.',
  },
  {
    aspect: 'Memory Overhead',
    recursion: 'Consumes stack memory: each call pushes a new stack frame onto the call stack.',
    iteration: 'Minimal memory: reuses the same local variables throughout the loop.',
  },
  {
    aspect: 'Execution Speed',
    recursion: 'Slower due to function call overhead (saving registers, pushing/popping frames).',
    iteration: 'Faster CPU execution with direct instruction jumping and register caching.',
  },
  {
    aspect: 'Code Elegance',
    recursion: 'Naturally models hierarchical structures (trees, graphs, mathematical induction).',
    iteration: 'Can be verbose or complex for nested recursive algorithms.',
  },
  {
    aspect: 'Primary Risk',
    recursion: 'Stack Overflow if the base case is unreachable or recursion depth is too large.',
    iteration: 'Infinite Loop consuming CPU cycles indefinitely without memory growth.',
  },
];

export interface MistakeItem {
  id: string;
  title: string;
  badCode: string;
  goodCode: string;
  why: string;
  consequence: string;
}

export const COMMON_MISTAKES: MistakeItem[] = [
  {
    id: 'no-base',
    title: 'Mistake 1: Missing Base Case',
    badCode: `void fun(void) {
    // Missing if (condition) return;
    fun(); // Unconditional recursive call!
}`,
    goodCode: `void fun(int n) {
    if (n <= 0) { // Essential base case!
        return;
    }
    fun(n - 1);
}`,
    why: 'Without a base condition, the function calls itself without limit until system memory runs out.',
    consequence: 'Runtime Crash: Stack Overflow (`Segmentation fault`) as the call stack exhausts available memory.',
  },
  {
    id: 'no-progress',
    title: 'Mistake 2: No Progress Toward Base Case',
    badCode: `void fun(int n) {
    if (n == 0) {
        return;
    }
    fun(n); // BUG: n is passed unmodified!
}`,
    goodCode: `void fun(int n) {
    if (n == 0) {
        return;
    }
    fun(n - 1); // Progresses toward n == 0!
}`,
    why: 'The argument must change with each call in the direction of the base case (e.g. `n - 1`).',
    consequence: 'Infinite recursion with static arguments; the base case `n == 0` is never reached.',
  },
  {
    id: 'discarded-result',
    title: 'Mistake 3: Discarded Recursive Return Value',
    badCode: `int factorial(int n) {
    if (n == 0) return 1;
    factorial(n - 1); // BUG: return value is completely ignored!
    return n;
}`,
    goodCode: `int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1); // Correctly chains returned result!
}`,
    why: 'Non-void recursive functions must incorporate or return the result of child calls.',
    consequence: 'Logical Bug: Always returns `n` instead of computing the mathematical product n!.',
  },
];

export interface ApplicationItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: string;
}

export const REAL_WORLD_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'tree-traversal',
    title: 'Tree & Graph Traversal',
    subtitle: 'DOM, ASTs, File Systems',
    description:
      'Hierarchical data structures (JSON trees, compiler Abstract Syntax Trees, directory trees) are defined recursively: a tree node contains child subtrees.',
    badge: 'Data Structures',
    iconName: 'Network',
  },
  {
    id: 'divide-conquer',
    title: 'Divide & Conquer Algorithms',
    subtitle: 'Merge Sort, Quick Sort, Binary Search',
    description:
      'Solves large problems by dividing them into subproblems of the same type, solving each recursively, and combining the results in O(n log n) time.',
    badge: 'Algorithms',
    iconName: 'GitBranch',
  },
  {
    id: 'math-computations',
    title: 'Mathematical Computations',
    subtitle: 'Factorial, Fibonacci, GCD, Tower of Hanoi',
    description:
      'Mathematical functions defined by inductive recurrence relations are directly and elegantly expressed in C using recursion.',
    badge: 'Mathematics',
    iconName: 'Sigma',
  },
  {
    id: 'backtracking',
    title: 'Backtracking & Search',
    subtitle: 'N-Queens, Sudoku Solver, Pathfinding',
    description:
      'Explores solution candidates systematically; when a branch reaches a dead end, recursion unwinds (backtracks) to try alternate branches.',
    badge: 'Search',
    iconName: 'Compass',
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '1. What is recursion in C?',
    options: [
      'A loop construct like for or while',
      'A function calling itself directly or indirectly',
      'A method to dynamically allocate heap memory',
      'A compiler directive for code optimization',
    ],
    correctIndex: 1,
    explanation:
      'Recursion is a programming technique where a function calls itself until a stopping condition (base case) is satisfied.',
  },
  {
    id: 'q2',
    question: '2. What is the fundamental purpose of a base case in a recursive function?',
    options: [
      'To increase program speed and optimize cache',
      'To terminate the recursive chain and prevent infinite recursion',
      'To allocate a new stack frame for each call',
      'To convert recursion into iteration automatically',
    ],
    correctIndex: 1,
    explanation:
      'The base case is the condition where no further recursive calls are made, allowing the call stack to safely begin unwinding.',
  },
  {
    id: 'q3',
    question: '3. Given f(n) = n + f(n - 1) with base case f(0) = 0, what is the output of f(3)?',
    options: ['3', '5', '6', '9'],
    correctIndex: 2,
    explanation:
      'f(3) = 3 + f(2) = 3 + (2 + f(1)) = 3 + 2 + (1 + f(0)) = 3 + 2 + 1 + 0 = 6.',
  },
  {
    id: 'q4',
    question: '4. Which of the following defines direct recursion?',
    options: [
      'Function A calls Function B, which calls Function A',
      'A function invokes itself directly in its own body',
      'A loop nested inside another loop',
      'A function pointer calling another library function',
    ],
    correctIndex: 1,
    explanation:
      'Direct recursion occurs when a function explicitly invokes itself within its own definition.',
  },
  {
    id: 'q5',
    question: '5. In what order do recursive calls return their computed values?',
    options: [
      'In the same order they were called (FIFO)',
      'In reverse order of invocation (LIFO)',
      'Simultaneously in parallel threads',
      'In order of ascending parameter value only',
    ],
    correctIndex: 1,
    explanation:
      'Because the call stack operates on a Last-In, First-Out (LIFO) model, the most recently called function (the base case) returns first, followed in reverse order back to the original caller.',
  },
  {
    id: 'q6',
    question: '6. Which statement regarding tail-call optimization in C is correct?',
    options: [
      'The C language standard strictly mandates tail-call optimization for all compilers.',
      'Tail calls can be optimized by compilers like GCC/Clang with flags like -O2, but it is not mandated by ISO C.',
      'Tail recursion is forbidden in C and causes compilation errors.',
      'Tail recursion always uses more stack space than regular recursion.',
    ],
    correctIndex: 1,
    explanation:
      'Modern C compilers (GCC, Clang) can optimize tail-recursive functions into iterative jumps under optimization (-O2, -O3), but the ISO C standard does not mandate this feature.',
  },
];

export interface ChallengeItem {
  id: string;
  tier: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  problem: string;
  sampleInput: string;
  sampleOutput: string;
  hints: string[];
  solution: string;
}

export const PROGRAMMING_CHALLENGES: ChallengeItem[] = [
  {
    id: 'ch-1',
    tier: 'Beginner',
    title: 'Challenge 1: Print Numbers 1 to N Recursively',
    problem:
      'Write a recursive function `void print1ToN(int n)` that prints numbers from 1 up to `n` in ascending order without using any loops.',
    sampleInput: 'n = 5',
    sampleOutput: '1 2 3 4 5',
    hints: [
      'Think about the order of operations: when should the recursive call happen relative to printf?',
      'If you make the recursive call `print1ToN(n - 1)` BEFORE `printf("%d ", n)`, the numbers will print on the way back up!',
    ],
    solution: `#include <stdio.h>

void print1ToN(int n) {
    if (n <= 0) {
        return; // Base case
    }
    print1ToN(n - 1); // Recurse first
    printf("%d ", n); // Print during unwinding
}

int main(void) {
    print1ToN(5);
    printf("\\n");
    return 0;
}`,
  },
  {
    id: 'ch-2',
    tier: 'Beginner',
    title: 'Challenge 2: Calculate Factorial of N',
    problem:
      'Implement `unsigned long long factorial(unsigned int n)` that computes n!. Handle the base case where 0! = 1.',
    sampleInput: 'n = 6',
    sampleOutput: 'Factorial of 6 is 720',
    hints: [
      'The base case is when `n == 0`, returning 1.',
      'The recursive step returns `n * factorial(n - 1)`.',
    ],
    solution: `#include <stdio.h>

unsigned long long factorial(unsigned int n) {
    if (n == 0) {
        return 1ULL; // Base case: 0! = 1
    }
    return n * factorial(n - 1);
}

int main(void) {
    unsigned int n = 6;
    printf("Factorial of %u is %llu\\n", n, factorial(n));
    return 0;
}`,
  },
  {
    id: 'ch-3',
    tier: 'Intermediate',
    title: 'Challenge 3: Sum of Digits of an Integer',
    problem:
      'Write a recursive function `int sumOfDigits(int n)` that computes the sum of all digits of a positive integer.',
    sampleInput: 'n = 12345',
    sampleOutput: 'Sum of digits: 15 (1 + 2 + 3 + 4 + 5)',
    hints: [
      'Get the last digit using modulo: `n % 10`.',
      'Strip the last digit using integer division: `n / 10`.',
      'Base case: when `n == 0`, the sum is 0.',
    ],
    solution: `#include <stdio.h>

int sumOfDigits(int n) {
    if (n == 0) {
        return 0; // Base case
    }
    return (n % 10) + sumOfDigits(n / 10);
}

int main(void) {
    int n = 12345;
    printf("Sum of digits of %d is %d\\n", n, sumOfDigits(n));
    return 0;
}`,
  },
  {
    id: 'ch-4',
    tier: 'Intermediate',
    title: 'Challenge 4: Reverse a String Recursively',
    problem:
      'Write a recursive function `void reverseString(char *str, int start, int end)` that reverses a C-string in-place.',
    sampleInput: 'str = "devora"',
    sampleOutput: '"aroved"',
    hints: [
      'Base case: when `start >= end`, the string is fully reversed.',
      'Swap characters at `str[start]` and `str[end]`, then recursively call with `start + 1` and `end - 1`.',
    ],
    solution: `#include <stdio.h>
#include <string.h>

void reverseString(char *str, int start, int end) {
    if (start >= end) {
        return; // Base case
    }
    // Swap characters
    char temp = str[start];
    str[start] = str[end];
    str[end] = temp;

    // Recurse toward center
    reverseString(str, start + 1, end - 1);
}

int main(void) {
    char s[] = "devora";
    reverseString(s, 0, (int)strlen(s) - 1);
    printf("Reversed: %s\\n", s);
    return 0;
}`,
  },
  {
    id: 'ch-5',
    tier: 'Advanced',
    title: 'Challenge 5: Greatest Common Divisor (Euclidean Algorithm)',
    problem:
      'Implement `int gcd(int a, int b)` using Euclid\'s recursive algorithm: gcd(a, b) = gcd(b, a % b).',
    sampleInput: 'a = 48, b = 18',
    sampleOutput: 'GCD is 6',
    hints: [
      'Base case: when `b == 0`, the answer is `a`.',
      'Recursive step: return `gcd(b, a % b)`.',
    ],
    solution: `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return a; // Base case: gcd(a, 0) = a
    }
    return gcd(b, a % b); // Euclidean reduction
}

int main(void) {
    int a = 48, b = 18;
    printf("GCD of %d and %d is %d\\n", a, b, gcd(a, b));
    return 0;
}
`,
  },
];

export const RECURSION_TAKEAWAYS: string[] = [
  'Recursion is a programming technique where a function calls itself to decompose a problem into smaller subproblems.',
  'Every valid recursive function must have at least one reachable base case to terminate execution.',
  'The recursive case must make observable progress toward the base case with each successive call.',
  'Function calls are pushed onto the call stack; upon reaching the base case, they return and unwind in LIFO order.',
  'Calls going down pass reduced arguments; return values moving up synthesize the final solution.',
  'Recursion naturally models hierarchical and self-similar data structures (trees, graphs, fractals).',
  'Iteration is generally faster and uses O(1) stack memory; recursion trades memory for algorithmic clarity.',
  'A missing base case or lack of progress leads directly to stack overflow (Segmentation Fault).',
];
