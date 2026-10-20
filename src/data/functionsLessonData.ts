export interface HeroBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FunctionStage {
  id: string;
  stepNumber: string;
  title: string;
  tagline: string;
  codeSnippet: string;
  description: string;
  accentColor: string;
}

export interface SyntaxElement {
  id: string;
  tokenName: string;
  syntaxPart: string;
  explanation: string;
  examples: string[];
}

export interface LibraryFunctionInfo {
  name: string;
  header: string;
  prototype: string;
  purpose: string;
  example: string;
}

export interface UserDefinedCategory {
  id: string;
  title: string;
  tagline: string;
  hasArgs: boolean;
  hasReturn: boolean;
  signature: string;
  code: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  hint: string;
  solutionCode: string;
  explanation: string;
}

export const HERO_BENEFITS: HeroBenefit[] = [
  {
    id: 'reusability',
    icon: 'RefreshCw',
    title: 'Code Reusability',
    description: 'Write once, use many times throughout your program.',
  },
  {
    id: 'modularity',
    icon: 'Layers',
    title: 'Modularity',
    description: 'Divide complex architectures into clean, testable sub-programs.',
  },
  {
    id: 'readability',
    icon: 'FileText',
    title: 'Better Readability',
    description: 'Self-documenting function names express human programmer intent.',
  },
  {
    id: 'debugging',
    icon: 'Bug',
    title: 'Testing & Debugging',
    description: 'Isolate, benchmark, and unit-test procedures independently.',
  },
  {
    id: 'abstraction',
    icon: 'Shield',
    title: 'Abstraction',
    description: 'Hide internal algorithmic complexity behind clean interfaces.',
  },
  {
    id: 'maintainability',
    icon: 'Wrench',
    title: 'Maintainability',
    description: 'Fix bugs or optimize algorithms in a single centralized location.',
  },
];

export const HERO_CODE_FILES = [
  {
    name: 'main.c',
    code: `#include <stdio.h>

// Function declaration
int add(int a, int b);

int main(void) {
    int result = add(10, 20);
    printf("Sum = %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`,
  },
  {
    name: 'add.c',
    code: `// Standalone implementation file
#include "add.h"

int add(int a, int b) {
    return a + b;
}`,
  },
  {
    name: 'math.c',
    code: `// Common mathematical helpers
int multiply(int a, int b) {
    return a * b;
}

int square(int n) {
    return n * n;
}`,
  },
];

export const FUNCTION_STAGES: FunctionStage[] = [
  {
    id: 'declaration',
    stepNumber: '1',
    title: 'Declaration',
    tagline: 'Tell the compiler about the function.',
    codeSnippet: 'int add(int a, int b);',
    description:
      'Specifies the function name, parameter types, and return type before it is invoked. Ends with a semicolon.',
    accentColor: '#2563eb',
  },
  {
    id: 'definition',
    stepNumber: '2',
    title: 'Definition',
    tagline: 'Write the actual implementation.',
    codeSnippet: `int add(int a, int b) {\n    return a + b;\n}`,
    description:
      'Contains the actual code block enclosed in braces that executes whenever the function is called.',
    accentColor: '#059669',
  },
  {
    id: 'call',
    stepNumber: '3',
    title: 'Function Call',
    tagline: 'Execute and get the result.',
    codeSnippet: 'int result = add(10, 20);',
    description:
      'Passes concrete argument values into the function, transfers control, and captures the returned value.',
    accentColor: '#d97706',
  },
];

export const SYNTAX_COMPONENTS: SyntaxElement[] = [
  {
    id: 'return-type',
    tokenName: 'Return Type',
    syntaxPart: 'return_type',
    explanation:
      'Specifies the data type of the value the function returns to the caller (e.g. int, float, double, char, or void if nothing is returned).',
    examples: ['int', 'double', 'void', 'char*'],
  },
  {
    id: 'func-name',
    tokenName: 'Function Name',
    syntaxPart: 'function_name',
    explanation:
      'The identifier used to call the function. Must follow C identifier naming rules and should clearly express the action performed.',
    examples: ['calculateSum', 'printReport', 'findMax', 'isPrime'],
  },
  {
    id: 'param-list',
    tokenName: 'Parameter List',
    syntaxPart: '(parameter_list)',
    explanation:
      'The list of typed variables that receive incoming data from the caller. Can contain zero parameters (void) or multiple comma-separated parameters.',
    examples: ['(void)', '(int a, int b)', '(const char *str, size_t len)'],
  },
  {
    id: 'func-body',
    tokenName: 'Function Body',
    syntaxPart: '{ /* statements */ }',
    explanation:
      'A compound statement enclosed in curly braces containing declarations, operations, and control structures that execute when called.',
    examples: ['{ int sum = a + b; return sum; }'],
  },
  {
    id: 'return-stmt',
    tokenName: 'Return Statement',
    syntaxPart: 'return value;',
    explanation:
      'Terminates execution of the current function and passes control along with an optional computed result back to the calling function.',
    examples: ['return 0;', 'return a + b;', 'return;'],
  },
];

export const LIBRARY_FUNCTIONS: LibraryFunctionInfo[] = [
  {
    name: 'printf()',
    header: '<stdio.h>',
    prototype: 'int printf(const char *format, ...);',
    purpose: 'Prints formatted text and variables to standard output (stdout).',
    example: 'printf("Sum = %d\\n", 30);',
  },
  {
    name: 'scanf()',
    header: '<stdio.h>',
    prototype: 'int scanf(const char *format, ...);',
    purpose: 'Reads formatted input from standard input (stdin) into memory addresses.',
    example: 'scanf("%d", &age);',
  },
  {
    name: 'strlen()',
    header: '<string.h>',
    prototype: 'size_t strlen(const char *str);',
    purpose: 'Calculates the length of a null-terminated byte string excluding \\0.',
    example: 'size_t len = strlen("DEVORA"); // 6',
  },
  {
    name: 'sqrt()',
    header: '<math.h>',
    prototype: 'double sqrt(double x);',
    purpose: 'Computes the non-negative square root of a floating-point number.',
    example: 'double root = sqrt(49.0); // 7.0',
  },
  {
    name: 'fopen()',
    header: '<stdio.h>',
    prototype: 'FILE *fopen(const char *filename, const char *mode);',
    purpose: 'Opens a file specified by filename and associates it with a stream.',
    example: 'FILE *fp = fopen("data.txt", "r");',
  },
  {
    name: 'toupper()',
    header: '<ctype.h>',
    prototype: 'int toupper(int ch);',
    purpose: 'Converts a lowercase letter to its uppercase equivalent.',
    example: 'int cap = toupper(\'c\'); // \'C\'',
  },
];

export const USER_DEFINED_CATEGORIES: UserDefinedCategory[] = [
  {
    id: 'cat-1',
    title: '1. No Arguments & No Return Value',
    tagline: 'Performs a self-contained action without input or output.',
    hasArgs: false,
    hasReturn: false,
    signature: 'void greet(void);',
    code: `void greet(void) {\n    printf("Welcome to DEVORA C Systems!\\n");\n}\n\nint main(void) {\n    greet();\n    return 0;\n}`,
    explanation:
      'Useful for notifications, displaying static menus, banners, or clearing states where caller input is unneeded.',
  },
  {
    id: 'cat-2',
    title: '2. Arguments & No Return Value',
    tagline: 'Consumes data to perform an action without returning a result.',
    hasArgs: true,
    hasReturn: false,
    signature: 'void printSum(int a, int b);',
    code: `void printSum(int a, int b) {\n    printf("Sum = %d\\n", a + b);\n}\n\nint main(void) {\n    printSum(14, 28);\n    return 0;\n}`,
    explanation:
      'Ideal for logging, formatting output with given arguments, or updating external hardware registers directly.',
  },
  {
    id: 'cat-3',
    title: '3. No Arguments & With Return Value',
    tagline: 'Generates or fetches data for the caller without external inputs.',
    hasArgs: false,
    hasReturn: true,
    signature: 'int getStatusCode(void);',
    code: `int getStatusCode(void) {\n    return 200;\n}\n\nint main(void) {\n    int status = getStatusCode();\n    printf("System OK: %d\\n", status);\n    return 0;\n}`,
    explanation:
      'Common for sensor readings, random number generators, clock timestamps, and system status queries.',
  },
  {
    id: 'cat-4',
    title: '4. Arguments & With Return Value',
    tagline: 'Transforms input arguments into a computed output value.',
    hasArgs: true,
    hasReturn: true,
    signature: 'int add(int a, int b);',
    code: `int add(int a, int b) {\n    return a + b;\n}\n\nint main(void) {\n    int sum = add(10, 20);\n    printf("Sum = %d\\n", sum);\n    return 0;\n}`,
    explanation:
      'The purest and most versatile functional construct. Enables expression composition like add(multiply(2, 3), 4).',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary role of a function declaration (prototype) in C?',
    codeSnippet: 'int calculateTotal(int price, float taxRate);',
    options: [
      'It reserves memory on the call stack for the function body.',
      'It informs the compiler about the function name, return type, and parameters before its invocation.',
      'It automatically compiles the function into object code.',
      'It forces the function to execute as inline machine code.',
    ],
    correctIndex: 1,
    explanation:
      'A prototype tells the compiler the function signature so it can validate argument types and return types during call-site compilation.',
  },
  {
    id: 2,
    question: 'What is the output of the following C program?',
    codeSnippet: `#include <stdio.h>
void update(int x) {
    x = x + 10;
}
int main(void) {
    int val = 5;
    update(val);
    printf("%d\\n", val);
    return 0;
}`,
    options: ['15', '5', '10', 'Compilation Error'],
    correctIndex: 1,
    explanation:
      'C uses call-by-value. The parameter `x` receives a copy of `val`. Modifying `x` inside `update` has no effect on the original `val` in `main()`.',
  },
  {
    id: 3,
    question: 'Which keyword is used when a function returns nothing and takes no parameters?',
    codeSnippet: '______ logStartup(______);',
    options: ['null', 'empty', 'void', 'static'],
    correctIndex: 2,
    explanation:
      '`void` indicates the absence of a type. `void func(void)` explicitly declares a function that accepts no parameters and returns no value.',
  },
  {
    id: 4,
    question: 'What happens when a static local variable is defined inside a function?',
    codeSnippet: `void counter(void) {
    static int count = 0;
    count++;
    printf("%d ", count);
}`,
    options: [
      'It is re-initialized to 0 on every call.',
      'It causes a stack overflow after 100 calls.',
      'It retains its modified value across consecutive function calls throughout program execution.',
      'It becomes accessible globally from any file.',
    ],
    correctIndex: 2,
    explanation:
      'A `static` local variable has static storage duration (persists in data memory for program lifetime) but retains local block scope visibility.',
  },
  {
    id: 5,
    question: 'What must every well-formed recursive function include to avoid infinite stack expansion?',
    options: [
      'At least two return statements.',
      'A base condition (termination condition) that stops further self-calls.',
      'A pointer parameter.',
      'A while loop in the caller.',
    ],
    correctIndex: 1,
    explanation:
      'Without a base case, recursive calls continue allocating new stack frames until call stack space is exhausted, causing a stack overflow crash.',
  },
  {
    id: 6,
    question: 'How can a C function modify an integer variable in the caller’s stack frame?',
    codeSnippet: 'void swap(int *a, int *b);',
    options: [
      'By declaring the parameter with the `extern` keyword.',
      'By passing the memory address of the variable as a pointer argument and dereferencing it.',
      'By returning two values simultaneously using commas.',
      'Functions in C can never modify caller data under any circumstances.',
    ],
    correctIndex: 1,
    explanation:
      'While C strictly passes pointer values by value, dereferencing the pointer (`*p = val;`) writes directly into the caller’s memory address.',
  },
];

export const PROGRAMMING_CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: '1. Addition Function',
    difficulty: 'Beginner',
    description:
      'Write a function `int add(int a, int b)` that takes two integers and returns their sum. In `main()`, prompt or test with multiple values.',
    hint: 'Use the `return` keyword with an arithmetic addition expression: `return a + b;`.',
    solutionCode: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int x = 12, y = 18;
    int sum = add(x, y);
    printf("Result: %d + %d = %d\\n", x, y, sum);
    return 0;
}`,
    explanation:
      'A classic Type 4 function (takes arguments, returns value). Parameters `a` and `b` receive copies of `x` and `y`.',
  },
  {
    id: 'ch-2',
    title: '2. Maximum of Two Numbers',
    difficulty: 'Beginner',
    description:
      'Write a function `int findMax(int a, int b)` that returns whichever number is larger. If they are equal, return either.',
    hint: 'Use a conditional ternary operator `(a > b) ? a : b` or an `if-else` block.',
    solutionCode: `#include <stdio.h>

int findMax(int a, int b) {
    return (a > b) ? a : b;
}

int main(void) {
    printf("Max of 45 and 78 is: %d\\n", findMax(45, 78));
    printf("Max of 99 and 12 is: %d\\n", findMax(99, 12));
    return 0;
}`,
    explanation:
      'Functions can encapsulate decision logic so callers do not duplicate comparisons across their codebase.',
  },
  {
    id: 'ch-3',
    title: '3. Prime Number Checker',
    difficulty: 'Intermediate',
    description:
      'Write a function `int isPrime(int n)` that returns 1 if `n` is prime, and 0 otherwise. Test numbers from 1 to 20.',
    hint: 'Numbers <= 1 are not prime. Test divisibility up to `i * i <= n`.',
    solutionCode: `#include <stdio.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0; // Found divisor
    }
    return 1; // Prime
}

int main(void) {
    for (int num = 1; num <= 15; num++) {
        if (isPrime(num)) {
            printf("%d is prime\\n", num);
        }
    }
    return 0;
}`,
    explanation:
      'Early return statements allow the function to exit as soon as a composite divisor is found, saving CPU cycles.',
  },
  {
    id: 'ch-4',
    title: '4. Swap Integers Using Pointers',
    difficulty: 'Intermediate',
    description:
      'Write a function `void swap(int *a, int *b)` that exchanges the values of two integer variables in the caller.',
    hint: 'Store `*a` in a temporary variable, set `*a = *b`, then assign the temporary value to `*b`.',
    solutionCode: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 100, y = 200;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x = %d, y = %d\\n", x, y);
    return 0;
}`,
    explanation:
      'Passing memory addresses (`&x`, `&y`) allows `swap` to dereference pointers and mutate the caller’s local storage.',
  },
  {
    id: 'ch-5',
    title: '5. Factorial: Iteration vs Recursion',
    difficulty: 'Advanced',
    description:
      'Implement both `unsigned long long factorial_iter(int n)` and `unsigned long long factorial_rec(int n)`. Verify both produce matching results.',
    hint: 'Base case for recursion: if `n <= 1`, return 1. Otherwise return `n * factorial_rec(n - 1)`.',
    solutionCode: `#include <stdio.h>

unsigned long long factorial_iter(int n) {
    unsigned long long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}

unsigned long long factorial_rec(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial_rec(n - 1); // Recursive step
}

int main(void) {
    int n = 5;
    printf("Iterative %d! = %llu\\n", n, factorial_iter(n));
    printf("Recursive %d! = %llu\\n", n, factorial_rec(n));
    return 0;
}`,
    explanation:
      'Iterative factorial uses a single loop ($O(1)$ memory). Recursive factorial allocates $O(n)$ stack frames, showcasing the stack overhead trade-off.',
  },
];
