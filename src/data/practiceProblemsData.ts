// =========================================================================
// DEVORA — Practice Problems Comprehensive Curriculum Data
// =========================================================================

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type PracticeMode = 'self-test' | 'code-tracing' | 'challenges';

export interface PracticeCategory {
  id: string;
  label: string;
  description: string;
  questionCount: number;
}

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  { id: 'all', label: 'All Topics', description: 'Comprehensive mix across all C fundamentals', questionCount: 28 },
  { id: 'basics', label: 'Basics & Syntax', description: 'Tokens, datatypes, operators, and I/O mechanics', questionCount: 4 },
  { id: 'loops', label: 'Loops & Patterns', description: 'Iteration, nested loops, and algorithmic counting', questionCount: 4 },
  { id: 'conditionals', label: 'Conditional Logic', description: 'Branching, switch cases, and truth evaluation', questionCount: 4 },
  { id: 'functions', label: 'Functions & Recursion', description: 'Activation records, call stacks, and recursive bases', questionCount: 6 },
  { id: 'arrays', label: 'Arrays & Strings', description: 'Contiguous memory, pointer decay, and null bytes', questionCount: 4 },
  { id: 'pointers', label: 'Pointers & Memory', description: 'Addresses, dereferencing, and indirection', questionCount: 4 },
  { id: 'real-world', label: 'Real-World Problems', description: 'Defensive programming and boundary conditions', questionCount: 2 },
];


// =========================================================================
// MODE A: Quick Self-Test Questions
// =========================================================================
export interface SelfTestQuestion {
  id: string;
  category: string;
  categoryLabel: string;
  difficulty: DifficultyLevel;
  question: string;
  options: string[];

  correctIndex: number;
  explanation: string;
  keyConcept: string;
}

export const SELF_TEST_QUESTIONS: SelfTestQuestion[] = [
  // ── Functions & Recursion (Explicitly Requested in Section 6) ──
  {
    id: 'st-rec-1',
    category: 'functions',
    categoryLabel: 'Functions & Recursion',
    difficulty: 'Beginner',
    question: 'Which part stops recursion?',
    options: ['Recursive call', 'Base case', 'Function prototype'],
    correctIndex: 1,
    keyConcept: 'Base Case Termination',
    explanation:
      'The base case provides a non-recursive condition that halts further self-invocations. Without it, the function would call itself endlessly until the call stack runs out of memory.',
  },
  {
    id: 'st-rec-2',
    category: 'functions',
    categoryLabel: 'Functions & Recursion',
    difficulty: 'Beginner',
    question: 'What manages active recursive calls?',
    options: ['Heap only', 'Call stack', 'Preprocessor'],
    correctIndex: 1,
    keyConcept: 'Call Stack Architecture',
    explanation:
      'Every active function call allocates an activation frame (stack frame) onto the hardware call stack, storing parameters, local variables, and the return address.',
  },
  {
    id: 'st-rec-3',
    category: 'functions',
    categoryLabel: 'Functions & Recursion',
    difficulty: 'Intermediate',
    question: 'What happens when a recursive function calls itself?',
    options: [
      'A new function-call frame is created',
      'The program always terminates',
      'The compiler restarts',
    ],
    correctIndex: 0,
    keyConcept: 'Stack Frame Allocation',
    explanation:
      'Each self-call allocates a distinct, separate stack frame. Each frame maintains its own independent set of formal parameters and local variables until that call returns.',
  },
  {
    id: 'st-rec-4',
    category: 'functions',
    categoryLabel: 'Functions & Recursion',
    difficulty: 'Intermediate',
    question: 'Which is a possible risk of excessive recursion?',
    options: ['Stack overflow', 'Syntax highlighting', 'Automatic optimization'],
    correctIndex: 0,
    keyConcept: 'Memory Bounds & Stack Overflow',
    explanation:
      'The call stack is finite. If recursive depth exceeds the memory allocated for the stack (e.g. from an omitted base case), a stack overflow occurs, crashing the runtime process.',
  },

  // ── Basics & Syntax ──
  {
    id: 'st-bas-1',
    category: 'basics',
    categoryLabel: 'Basics & Syntax',
    difficulty: 'Beginner',
    question: 'What is the format specifier used to print a double with printf in standard C?',
    options: ['%d', '%f', '%lf', '%c'],
    correctIndex: 1,
    keyConcept: 'Variadic Argument Promotion',
    explanation:
      'In variadic functions like printf, float arguments are automatically promoted to double, so %f is standard for printing doubles. (In scanf, %lf is required).',
  },
  {
    id: 'st-bas-2',
    category: 'basics',
    categoryLabel: 'Basics & Syntax',
    difficulty: 'Beginner',
    question: 'Which operator returns the size in bytes of a datatype or expression at compile time?',
    options: ['size()', 'len()', 'sizeof', 'typeof'],
    correctIndex: 2,
    keyConcept: 'Compile-Time Size Operator',
    explanation:
      'sizeof is a built-in unary operator evaluated at compile time that yields the byte size of an object or parenthesized type identifier.',
  },

  // ── Loops & Patterns ──
  {
    id: 'st-loop-1',
    category: 'loops',
    categoryLabel: 'Loops & Patterns',
    difficulty: 'Beginner',
    question: 'Which loop is guaranteed to execute its loop body at least once?',
    options: ['for loop', 'while loop', 'do-while loop', 'infinite loop'],
    correctIndex: 2,
    keyConcept: 'Post-Condition Evaluation',
    explanation:
      'The do-while loop evaluates its continuation condition at the end of the iteration, guaranteeing that the body executes at least once regardless of initial state.',
  },
  {
    id: 'st-loop-2',
    category: 'loops',
    categoryLabel: 'Loops & Patterns',
    difficulty: 'Intermediate',
    question: 'What is the effect of the "continue" statement inside a for loop?',
    options: [
      'Terminates the entire loop immediately',
      'Skips remaining statements in the current iteration and jumps to the update step',
      'Restarts the program from main',
      'Breaks into the outer loop',
    ],
    correctIndex: 1,
    keyConcept: 'Iteration Control',
    explanation:
      'continue skips the rest of the current loop body and directly transfers control to the increment/update expression in a for loop.',
  },

  // ── Conditional Logic ──
  {
    id: 'st-cond-1',
    category: 'conditionals',
    categoryLabel: 'Conditional Logic',
    difficulty: 'Beginner',
    question: 'In C, how are truth values evaluated in conditional expressions?',
    options: [
      'Only 1 is true, all other numbers are false',
      'Zero (0) is false, while any non-zero value is true',
      'Boolean literals "true" and "false" are built into C89 keywords',
      'Negative numbers are considered invalid syntax',
    ],
    correctIndex: 1,
    keyConcept: 'Boolean Logic in C',
    explanation:
      'In C, conditional statements treat numeric 0 (and NULL) as false, and any non-zero value (including negative integers like -1) as true.',
  },
  {
    id: 'st-cond-2',
    category: 'conditionals',
    categoryLabel: 'Conditional Logic',
    difficulty: 'Intermediate',
    question: 'What happens if a "case" in a switch statement does not include a "break"?',
    options: [
      'Compilation fails with a syntax error',
      'The program crashes at runtime',
      'Execution falls through into the subsequent case statements',
      'The switch statement loops infinitely',
    ],
    correctIndex: 2,
    keyConcept: 'Switch Fallthrough Mechanics',
    explanation:
      'C switch statements have fallthrough behavior: without a break, execution sequentially flows directly into subsequent cases regardless of their case values.',
  },

  // ── Arrays & Strings ──
  {
    id: 'st-arr-1',
    category: 'arrays',
    categoryLabel: 'Arrays & Strings',
    difficulty: 'Beginner',
    question: 'What character marks the end of a valid C-string in memory?',
    options: ['"\\n" (newline)', '"\\0" (null terminator)', '" " (space)', '"EOF" (end of file)'],
    correctIndex: 1,
    keyConcept: 'Null-Terminated Strings',
    explanation:
      'C strings are byte arrays terminated by a null byte \'\\0\' (ASCII value 0). Library functions like strlen and printf rely on this sentinel byte.',
  },
  {
    id: 'st-arr-2',
    category: 'arrays',
    categoryLabel: 'Arrays & Strings',
    difficulty: 'Intermediate',
    question: 'When an array name is passed to a function in C, what is actually transmitted?',
    options: [
      'A complete duplicate copy of all array elements',
      'A pointer to the array\'s first element (pointer decay)',
      'A reference to the array length metadata',
      'A compile-time constant struct',
    ],
    correctIndex: 1,
    keyConcept: 'Array-to-Pointer Decay',
    explanation:
      'In C expressions, an array name generally decays into a pointer pointing to its first element (T*). No array copying occurs on function calls.',
  },

  // ── Pointers & Memory ──
  {
    id: 'st-ptr-1',
    category: 'pointers',
    categoryLabel: 'Pointers & Memory',
    difficulty: 'Intermediate',
    question: 'If "int *p" points to an integer at address 0x1000, what is the address of "p + 1" on a machine where sizeof(int) == 4?',
    options: ['0x1001', '0x1002', '0x1004', '0x1008'],
    correctIndex: 2,
    keyConcept: 'Pointer Arithmetic Scaling',
    explanation:
      'Pointer arithmetic is typed: incrementing a pointer moves it by 1 element, which equals 1 * sizeof(int) = 4 bytes forward, resulting in 0x1004.',
  },
  {
    id: 'st-ptr-2',
    category: 'pointers',
    categoryLabel: 'Pointers & Memory',
    difficulty: 'Advanced',
    question: 'What is the danger of dereferencing an uninitialized pointer (wild pointer)?',
    options: [
      'It automatically initializes to 0',
      'Undefined behavior, memory corruption, or segmentation fault',
      'The compiler rejects the line with a warning only',
      'It creates an anonymous heap block',
    ],
    correctIndex: 1,
    keyConcept: 'Undefined Behavior & Wild Pointers',
    explanation:
      'An uninitialized pointer contains garbage bits representing an arbitrary memory address. Reading or writing through it causes undefined behavior, often corrupting data or crashing via segmentation fault.',
  },

  // ── Real-World Problems ──
  {
    id: 'st-rw-1',
    category: 'real-world',
    categoryLabel: 'Real-World Problems',
    difficulty: 'Intermediate',
    question: 'What occurs when an operation causes a signed integer to exceed its maximum representable value (INT_MAX)?',
    options: [
      'Undefined behavior in standard C',
      'Guaranteed modulo 2^32 wrap-around',
      'Automatic promotion to a 64-bit int',
      'A runtime HardwareTrap exception',
    ],
    correctIndex: 0,
    keyConcept: 'Signed Integer Overflow',
    explanation:
      'Unlike unsigned integers (which are defined by ISO C to wrap modulo 2^N), signed integer overflow is formally undefined behavior in C. Compilers may assume it never occurs during optimization.',
  },
];


// =========================================================================
// MODE B: Understand the Code (Code Tracing Questions)
// =========================================================================
export interface CodeTracingQuestion {
  id: string;
  category: string;
  categoryLabel: string;
  difficulty: DifficultyLevel;
  title: string;
  question: string;
  code: string;
  options: string[];

  correctIndex: number;
  terminalOutput: string;
  stepByStepTrace: string[];

  explanation: string;
}

export const CODE_TRACING_QUESTIONS: CodeTracingQuestion[] = [
  {
    id: 'trace-1',
    category: 'basics',
    categoryLabel: 'Basics & Syntax',
    difficulty: 'Beginner',
    title: 'Post-Increment vs Pre-Increment',
    question: 'What does this program print to standard output?',
    code: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = a++;
    int c = ++a;
    printf("%d %d %d\\n", a, b, c);
    return 0;
}`,
    options: ['7 5 7', '6 5 7', '7 6 7', '5 5 6'],
    correctIndex: 0,
    terminalOutput: '7 5 7',
    stepByStepTrace: [
      'Line 4: int a = 5 initialized.',
      'Line 5: int b = a++; -> b receives old value of a (5), then a becomes 6.',
      'Line 6: int c = ++a; -> a is pre-incremented to 7, then c receives 7.',
      'Line 7: printf prints a=7, b=5, c=7.',
    ],
    explanation:
      'a++ evaluates to the current value of a (5) before incrementing, while ++a increments a first (to 7) and yields the incremented value.',
  },
  {
    id: 'trace-2',
    category: 'functions',
    categoryLabel: 'Functions & Recursion',
    difficulty: 'Intermediate',
    title: 'Recursive Unwinding Output Order',
    question: 'Trace the recursive stack frames. What sequence is printed?',
    code: `#include <stdio.h>

void countdown(int n) {
    if (n <= 0) return;
    countdown(n - 1);
    printf("%d ", n);
}

int main(void) {
    countdown(3);
    printf("\\n");
    return 0;
}`,
    options: ['3 2 1 ', '1 2 3 ', '0 1 2 3 ', '3 2 1 0 '],
    correctIndex: 1,
    terminalOutput: '1 2 3',
    stepByStepTrace: [
      'countdown(3) calls countdown(2) before printing.',
      'countdown(2) calls countdown(1) before printing.',
      'countdown(1) calls countdown(0) before printing.',
      'countdown(0) hits base case (0 <= 0) and returns immediately.',
      'Unwind: countdown(1) resumes and prints "1 ".',
      'Unwind: countdown(2) resumes and prints "2 ".',
      'Unwind: countdown(3) resumes and prints "3 ".',
    ],
    explanation:
      'Because printf comes AFTER the recursive call, no numbers print while calls are descending. Output occurs in reverse order of invocation during the stack unwinding phase.',
  },
  {
    id: 'trace-3',
    category: 'loops',
    categoryLabel: 'Loops & Patterns',
    difficulty: 'Intermediate',
    title: 'Nested Loop Accumulation',
    question: 'How many asterisks will this nested loop output?',
    code: `#include <stdio.h>

int main(void) {
    int count = 0;
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            putchar('*');
            count++;
        }
    }
    printf("\\nTotal: %d\\n", count);
    return 0;
}`,
    options: ['Total: 9', 'Total: 6', 'Total: 3', 'Total: 5'],
    correctIndex: 1,
    terminalOutput: '******\nTotal: 6',
    stepByStepTrace: [
      'Outer i = 1: inner j runs 1 time  -> 1 asterisk ("*")',
      'Outer i = 2: inner j runs 2 times -> 2 asterisks ("**")',
      'Outer i = 3: inner j runs 3 times -> 3 asterisks ("***")',
      'Sum of series: 1 + 2 + 3 = 6 asterisks.',
      'Total printed: 6.',
    ],
    explanation:
      'The inner loop bound depends on the outer loop counter i. The total count equals the triangular number T(3) = 1 + 2 + 3 = 6.',
  },
  {
    id: 'trace-4',
    category: 'conditionals',
    categoryLabel: 'Conditional Logic',
    difficulty: 'Intermediate',
    title: 'Switch Statement Fallthrough',
    question: 'What is the output of this switch construct?',
    code: `#include <stdio.h>

int main(void) {
    int val = 2;
    switch (val) {
        case 1: printf("One ");
        case 2: printf("Two ");
        case 3: printf("Three ");
        default: printf("End\\n");
    }
    return 0;
}`,
    options: ['Two ', 'Two Three ', 'Two Three End', 'One Two Three End'],
    correctIndex: 2,
    terminalOutput: 'Two Three End',
    stepByStepTrace: [
      'val is 2, matching case 2.',
      'case 2 executes: prints "Two ". No break statement is present!',
      'Execution falls through to case 3: prints "Three ".',
      'Execution falls through to default: prints "End\\n".',
    ],
    explanation:
      'In C, switch cases execute sequentially following the initial match until an explicit break or the closing brace is encountered.',
  },
  {
    id: 'trace-5',
    category: 'pointers',
    categoryLabel: 'Pointers & Memory',
    difficulty: 'Advanced',
    title: 'Pointer Dereference and Array Offset',
    question: 'What is the computed value printed by this pointer expression?',
    code: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr + 1;
    printf("%d\\n", *(p + 2) - *p);
    return 0;
}`,
    options: ['20', '30', '10', '40'],
    correctIndex: 0,
    terminalOutput: '20',
    stepByStepTrace: [
      'arr = {10, 20, 30, 40, 50}.',
      'p = arr + 1 points to arr[1], which holds value 20.',
      '*p evaluates to 20.',
      'p + 2 points to arr[1 + 2] = arr[3], which holds value 40.',
      '*(p + 2) evaluates to 40.',
      'Result: 40 - 20 = 20.',
    ],
    explanation:
      'p points to index 1 (value 20). *(p + 2) accesses index 3 (value 40). The subtraction between the dereferenced integers produces 40 - 20 = 20.',
  },
  {
    id: 'trace-6',
    category: 'arrays',
    categoryLabel: 'Arrays & Strings',
    difficulty: 'Intermediate',
    title: 'Embedded Null Byte in String',
    question: 'What does standard printf output for this character array?',
    code: `#include <stdio.h>

int main(void) {
    char greeting[] = "DEVORA\\0LOGIC";
    printf("%s\\n", greeting);
    return 0;
}`,
    options: ['DEVORALOGIC', 'DEVORA', 'DEVORA\\0LOGIC', 'Compile Error'],
    correctIndex: 1,
    terminalOutput: 'DEVORA',
    stepByStepTrace: [
      'greeting array contains: \'D\', \'E\', \'V\', \'O\', \'R\', \'A\', \'\\0\', \'L\', \'O\', \'G\', \'I\', \'C\', \'\\0\'.',
      'printf with %s reads characters one by one starting at greeting[0].',
      'Upon encountering the first \'\\0\' after \'A\', printf immediately terminates string printing.',
      'Output is strictly "DEVORA".',
    ],
    explanation:
      'C string library functions treat the first encountered \'\\0\' as the definitive end of the string. The remaining bytes are in memory but unprinted.',
  },
];


// =========================================================================
// MODE C: Coding Challenges
// =========================================================================
export interface CodingChallenge {
  id: string;
  category: string;
  categoryLabel: string;
  difficulty: DifficultyLevel;
  title: string;
  concept: string;
  problem: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];

  hints: string[];

  solutionCode: string;
  solutionExplanation: string;
  programLibrarySlug?: string;
}

export type ChallengeProblem = CodingChallenge;

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'ch-fib-rec',
    category: 'functions',
    categoryLabel: 'Functions & Recursion',
    difficulty: 'Beginner',
    title: 'Recursive Fibonacci Generator',
    concept: 'Tree Recursion & Base Case Definition',
    problem:
      'Write a function unsigned long long fib(unsigned int n) that computes the nth Fibonacci number, where fib(0) = 0 and fib(1) = 1.',
    inputFormat: 'A non-negative integer n (0 <= n <= 30)',
    outputFormat: 'The nth Fibonacci number as an integer',
    sampleInput: 'n = 7',
    sampleOutput: '13',
    constraints: ['0 <= n <= 30 (to prevent exponential stack depth explosion)'],
    hints: [
      'Identify two distinct base cases: when n == 0 return 0, and when n == 1 return 1.',
      'The recursive step adds the two previous terms: fib(n - 1) + fib(n - 2).',
    ],
    solutionCode: `#include <stdio.h>

unsigned long long fib(unsigned int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    unsigned int n = 7;
    printf("Fibonacci(%u) = %llu\\n", n, fib(n));
    return 0;
}`,
    solutionExplanation:
      'Tree recursion splits each call into two child calls. The base cases n == 0 and n == 1 stop branching and unwind the sums.',
    programLibrarySlug: '/programs',
  },
  {
    id: 'ch-pyramid-pat',
    category: 'loops',
    categoryLabel: 'Loops & Patterns',
    difficulty: 'Intermediate',
    title: 'Symmetrical Full Star Pyramid',
    concept: 'Triangular Coordinates & Leading Space Control',
    problem:
      'Construct a function that prints a symmetrical star pyramid of height N. Row i (1-indexed) must have (N - i) leading spaces and (2*i - 1) stars.',
    inputFormat: 'Integer N representing number of rows (1 <= N <= 10)',
    outputFormat: 'Formatted ASCII pyramid with spaces and stars',
    sampleInput: 'N = 4',
    sampleOutput: `   *
  ***
 *****
*******`,
    constraints: ['1 <= N <= 15'],
    hints: [
      'Each row requires two separate inner loops: first loop for leading spaces, second loop for stars.',
      'For row i (from 1 to N): print (N - i) spaces, then (2*i - 1) stars, followed by a newline.',
    ],
    solutionCode: `#include <stdio.h>

void printPyramid(int n) {
    for (int i = 1; i <= n; i++) {
        // Leading spaces
        for (int s = 1; s <= n - i; s++) {
            putchar(' ');
        }
        // Stars
        for (int k = 1; k <= 2 * i - 1; k++) {
            putchar('*');
        }
        putchar('\\n');
    }
}

int main(void) {
    printPyramid(4);
    return 0;
}`,
    solutionExplanation:
      'Symmetry is achieved by pairing space offsets with odd-number star expansions (2*i - 1).',
    programLibrarySlug: '/programs/patterns/full-pyramid',
  },
  {
    id: 'ch-rev-arr',
    category: 'arrays',
    categoryLabel: 'Arrays & Strings',
    difficulty: 'Beginner',
    title: 'In-Place Array Reversal',
    concept: 'Two-Pointer Technique & Swapping',
    problem:
      'Write a function void reverseArray(int *arr, int size) that reverses the elements of an integer array in-place without allocating a secondary buffer.',
    inputFormat: 'Pointer to integer array and array size integer',
    outputFormat: 'The same array with element order inverted',
    sampleInput: 'arr = {10, 20, 30, 40, 50}, size = 5',
    sampleOutput: 'arr = {50, 40, 30, 20, 10}',
    constraints: ['In-place O(1) auxiliary space requirement'],
    hints: [
      'Initialize left pointer at 0 and right pointer at size - 1.',
      'While left < right, swap arr[left] and arr[right], then increment left and decrement right.',
    ],
    solutionCode: `#include <stdio.h>

void reverseArray(int *arr, int size) {
    int left = 0;
    int right = size - 1;
    while (left < right) {
        int temp = arr[left];

        arr[left] = arr[right];

        arr[right] = temp;
        left++;
        right--;
    }
}

int main(void) {
    int data[] = {10, 20, 30, 40, 50};
    int n = sizeof(data) / sizeof(data[0]);
    reverseArray(data, n);
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    return 0;
}`,
    solutionExplanation:
      'The two-pointer approach performs exactly N/2 swaps in O(N) time with O(1) extra space, satisfying strict embedded memory constraints.',
    programLibrarySlug: '/programs',
  },
  {
    id: 'ch-ptr-swap',
    category: 'pointers',
    categoryLabel: 'Pointers & Memory',
    difficulty: 'Intermediate',
    title: 'Pass-by-Reference Value Swap',
    concept: 'Indirection & Parameter Modification',
    problem:
      'Write a function void swap(int *x, int *y) that exchanges the values of two integer variables in the caller\'s scope.',
    inputFormat: 'Pointers to two integer variables',
    outputFormat: 'Variables exchanged in caller frame',
    sampleInput: 'a = 42, b = 99',
    sampleOutput: 'a = 99, b = 42',
    constraints: ['Must modify variables in caller context (no pass-by-value)'],
    hints: [
      'In C, all arguments are passed by value. To affect the caller, you must pass memory addresses (pointers).',
      'Dereference with * to read and write the target memory cells.',
    ],
    solutionCode: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main(void) {
    int a = 42, b = 99;
    printf("Before: a=%d, b=%d\\n", a, b);
    swap(&a, &b);
    printf("After:  a=%d, b=%d\\n", a, b);
    return 0;
}`,
    solutionExplanation:
      'Passing &a and &b transmits memory addresses. Dereferencing (*x, *y) writes directly into the caller stack frame.',
    programLibrarySlug: '/programs',
  },
  {
    id: 'ch-bit-scan',
    category: 'real-world',
    categoryLabel: 'Real-World Problems',
    difficulty: 'Intermediate',
    title: '32-Bit Binary Bitwise Scanner',
    concept: 'Bitwise Masking & Bit-Shifting',
    problem:
      'Write a function void printBits(unsigned int val) that prints the 32-bit binary representation of an unsigned integer with leading zeros.',
    inputFormat: 'Unsigned 32-bit integer',
    outputFormat: '32 binary characters (0 or 1)',
    sampleInput: 'val = 5',
    sampleOutput: '00000000000000000000000000000101',
    constraints: ['Must output all 32 bits without omitting leading zeros'],
    hints: [
      'Loop from bit index 31 down to 0.',
      'Use the bitmask expression (val & (1u << i)) to test whether bit i is active.',
    ],
    solutionCode: `#include <stdio.h>

void printBits(unsigned int val) {
    for (int i = 31; i >= 0; --i) {
        putchar((val & (1u << i)) ? '1' : '0');
        if (i % 8 == 0 && i > 0) putchar(' '); // Byte separation
    }
    putchar('\\n');
}

int main(void) {
    unsigned int num = 5;
    printf("Bits of %u:\\n", num);
    printBits(num);
    return 0;
}`,
    solutionExplanation:
      'Bitwise AND with (1u << i) masks all bits except the target index, allowing constant-time inspection of hardware registers.',
    programLibrarySlug: '/programs',
  },
  {
    id: 'ch-inverted-half',
    category: 'loops',
    categoryLabel: 'Loops & Patterns',
    difficulty: 'Beginner',
    title: 'Inverted Right Half Pyramid',
    concept: 'Reverse Counting Loop Logic',
    problem:
      'Construct a pattern program that renders an inverted right half pyramid where row 1 has N stars, row 2 has N-1 stars, down to 1 star.',
    inputFormat: 'Integer N (1 <= N <= 10)',
    outputFormat: 'Rows of stars decreasing in count',
    sampleInput: 'N = 5',
    sampleOutput: `*****
****
***
**
*`,
    constraints: ['1 <= N <= 15'],
    hints: [
      'Outer loop can count down: for (int i = N; i >= 1; i--).',
      'Inner loop prints i stars on each row.',
    ],
    solutionCode: `#include <stdio.h>

void invertedPyramid(int n) {
    for (int i = n; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            putchar('*');
        }
        putchar('\\n');
    }
}

int main(void) {
    invertedPyramid(5);
    return 0;
}`,
    solutionExplanation:
      'Decrementing the outer loop control variable directly specifies the number of iterations required for the inner loop.',
    programLibrarySlug: '/programs/patterns/inverted-right-half-pyramid',
  },
];

export const CHALLENGE_PROBLEMS: CodingChallenge[] = CODING_CHALLENGES;


