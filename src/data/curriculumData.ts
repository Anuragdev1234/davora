/**
 * DEVORA — Complete Curriculum Data
 * Structured data for the 7 curriculum categories and lessons.
 */

export interface LessonItem {
  id: string;
  number: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  slug: string;
  snippet?: string;
  keyTakeaways?: string[];
}

export interface CurriculumCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  lessonCountText: string;
  level: string;
  lessons: LessonItem[];
}

export const curriculumCategories: CurriculumCategory[] = [
  {
    id: 'basics',
    number: '01',
    title: 'Basics',
    description: 'Start your journey with the fundamentals of C programming.',
    lessonCountText: '12 lessons',
    level: 'Beginner',
    lessons: [
      {
        id: 'intro-c',
        number: '01',
        title: 'Introduction to C',
        description: 'What is C, where it is used, and why it still matters.',
        difficulty: 'Beginner',
        duration: '10 min',
        slug: '/theory/basics/introduction-to-c',
        snippet: `// Dennis Ritchie created C at Bell Labs in 1972
#include <stdio.h>

int main(void) {
    printf("Understanding the system begins here.\\n");
    return 0;
}`,
        keyTakeaways: [
          'High performance with minimal runtime abstraction',
          'Direct mapping to CPU instructions and memory',
          'Foundational to Linux, macOS, Windows, and modern runtimes',
        ],
      },
      {
        id: 'how-c-works',
        number: '02',
        title: 'How a C Program Works',
        description: 'From writing code to getting output.',
        difficulty: 'Beginner',
        duration: '12 min',
        slug: '/theory/basics/how-a-c-program-works',
        snippet: `// Translation pipeline: Preprocess -> Compile -> Assemble -> Link
// $ gcc -Wall -O2 main.c -o program
// $ ./program`,
        keyTakeaways: [
          'Preprocessing expands headers (#include) and macros (#define)',
          'Compiler translates AST into target assembly instructions',
          'Linker binds object files and C runtime library symbols',
        ],
      },
      {
        id: 'structure-c',
        number: '03',
        title: 'Structure of a C Program',
        description: 'Understand the basic building blocks.',
        difficulty: 'Beginner',
        duration: '12 min',
        slug: '/theory/basics/structure-of-a-c-program',
        snippet: `#include <stdio.h>

// Global declarations & function prototypes
void log_status(int code);

int main(int argc, char *argv[]) {
    log_status(0);
    return 0;
}`,
        keyTakeaways: [
          'main() is the execution entrypoint designated by OS loaders',
          'Header inclusion exposes external API prototypes',
          'Return value 0 signals successful process termination',
        ],
      },
      {
        id: 'tokens-keywords',
        number: '04',
        title: 'Tokens, Keywords and Identifiers',
        description: 'The smallest units of a C program.',
        difficulty: 'Beginner',
        duration: '10 min',
        slug: '/theory/basics/tokens-keywords-identifiers',
        snippet: `// Keywords: int, return, if, else, for, while, struct, etc.
int memory_offset = 0x40; // 'memory_offset' is a valid identifier`,
        keyTakeaways: [
          '32 standard C89 keywords, expanded in C99, C11, and C23',
          'Identifiers must start with letters or underscore',
          'Punctuation tokens form statement syntax and delimiters',
        ],
      },
      {
        id: 'variables-datatypes',
        number: '05',
        title: 'Variables and Data Types',
        description: 'Store and represent data in memory.',
        difficulty: 'Beginner',
        duration: '15 min',
        slug: '/theory/basics/variables-and-data-types',
        snippet: `char letter = 'A';        // 1 byte (ASCII / UTF-8 code unit)
int count = 42;           // typically 4 bytes signed integer
double precision = 3.14;  // 8 bytes IEEE 754 floating point
size_t bytes = sizeof(int);`,
        keyTakeaways: [
          'Exact byte sizes are architecture-defined (sizeof determines runtime size)',
          'Signed vs unsigned representation in two\'s complement',
          'Memory alignment requirements dictate variable layout',
        ],
      },
      {
        id: 'operators',
        number: '06',
        title: 'Operators in C',
        description: 'Arithmetic, relational, logical and more.',
        difficulty: 'Beginner',
        duration: '15 min',
        slug: '/theory/basics/operators-in-c',
        snippet: `int a = 10, b = 3;
int div = a / b;     // 3 (integer truncation)
int mod = a % b;     // 1 (remainder)
int bit = (a << 1);  // 20 (fast bitwise shift)`,
        keyTakeaways: [
          'Precedence and associativity determine evaluation grouping',
          'Logical operators (&&, ||) guarantee short-circuit evaluation',
          'Side effects in expressions require sequence point awareness',
        ],
      },
      {
        id: 'input-output',
        number: '07',
        title: 'Input and Output',
        description: 'Taking input from user and displaying output.',
        difficulty: 'Beginner',
        duration: '15 min',
        slug: '/theory/basics/input-and-output',
        snippet: `int age;
printf("Enter target frequency: ");
if (scanf("%d", &age) == 1) {
    printf("Configured to: %d Hz\\n", age);
}`,
        keyTakeaways: [
          'printf and scanf format specifiers (%d, %s, %p, %zu)',
          'Passing memory addresses (&) to receive input variables',
          'Buffering in stdin and stdout streams',
        ],
      },
      {
        id: 'conditional-statements',
        number: '08',
        title: 'Conditional Statements',
        description: 'Make decisions using if, else and switch.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/basics/conditional-statements',
        snippet: `if (voltage > threshold) {
    activate_cooling();
} else if (voltage == 0) {
    shutdown_bus();
} else {
    standby();
}`,
        keyTakeaways: [
          'In C, zero is false; any non-zero value is true',
          'Compiler emits conditional branch instructions (jz, jnz)',
          'switch statements often compile to O(1) jump tables',
        ],
      },
      {
        id: 'loops',
        number: '09',
        title: 'Loops in C',
        description: 'Repeat tasks using for, while and do-while.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/basics/loops-in-c',
        snippet: `for (size_t i = 0; i < capacity; ++i) {
    buffer[i] = 0;
}`,
        keyTakeaways: [
          'for loop provides initialization, condition, and increment in one line',
          'while evaluates before execution; do-while guarantees at least 1 run',
          'Loop unrolling and vectorization optimizations by compilers',
        ],
      },
      {
        id: 'functions',
        number: '10',
        title: 'Functions',
        description: 'Break code into reusable blocks.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/basics/functions',
        snippet: `int compute_checksum(const uint8_t *data, size_t len) {
    int sum = 0;
    for (size_t i = 0; i < len; ++i) sum ^= data[i];
    return sum;
}`,
        keyTakeaways: [
          'Stack frames hold local variables and return addresses',
          'Arguments are passed by value (copied to caller frame/registers)',
          'ABI conventions (e.g. System V AMD64) dictate register usage',
        ],
      },
      {
        id: 'recursion',
        number: '11',
        title: 'Recursion',
        description: 'Solve problems by calling a function again.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/basics/recursion',
        snippet: `unsigned long long factorial(unsigned int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
        keyTakeaways: [
          'Base condition prevents infinite call stack recursion',
          'Each call pushes a new stack frame (risk of stack overflow)',
          'Tail call elimination transforms linear recursion into loops',
        ],
      },
      {
        id: 'practice-problems',
        number: '12',
        title: 'Practice Problems',
        description: 'Strengthen your understanding with exercises.',
        difficulty: 'Beginner',
        duration: '25 min',
        slug: '/theory/basics/practice-problems',
        snippet: `// Challenge: Find binary representation of integer
void print_bits(unsigned int val) {
    for (int i = 31; i >= 0; --i) {
        putchar((val & (1u << i)) ? '1' : '0');
    }
    putchar('\\n');
}`,
        keyTakeaways: [
          'Hands-on algorithmic problem solving in pure C',
          'Understanding edge cases, signed overflows, and boundary limits',
          'Cultivating defensive programming habits',
        ],
      },
    ],
  },
  {
    id: 'arrays-strings',
    number: '02',
    title: 'Arrays & Strings',
    description: 'Work with collections of data and text.',
    lessonCountText: '10 lessons',
    level: 'Beginner to Intermediate',
    lessons: [
      {
        id: '1d-arrays',
        number: '01',
        title: 'One-Dimensional Arrays',
        description: 'Contiguous sequential memory storage for identical types.',
        difficulty: 'Beginner',
        duration: '14 min',
        slug: '/theory/arrays-strings/one-dimensional-arrays',
      },
      {
        id: 'multi-arrays',
        number: '02',
        title: 'Multidimensional Arrays',
        description: 'Matrix representations and row-major layout in memory.',
        difficulty: 'Intermediate',
        duration: '16 min',
        slug: '/theory/arrays-strings/multidimensional-arrays',
      },
      {
        id: 'string-fundamentals',
        number: '03',
        title: 'String Fundamentals',
        description: 'Null-terminated char arrays and string literal storage.',
        difficulty: 'Beginner',
        duration: '12 min',
        slug: '/theory/arrays-strings/string-fundamentals',
      },
      {
        id: 'string-handling',
        number: '04',
        title: 'Standard String Handling',
        description: 'strlen, strcpy, strncpy, strcmp and safe alternatives.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/arrays-strings/string-handling',
      },
      {
        id: 'array-memory',
        number: '05',
        title: 'Array Memory Layout & Bounds',
        description: 'Zero index rationale and cache line locality advantages.',
        difficulty: 'Intermediate',
        duration: '15 min',
        slug: '/theory/arrays-strings/array-memory-layout',
      },
      {
        id: 'search-algorithms',
        number: '06',
        title: 'Searching: Linear & Binary',
        description: 'Locating items in unsorted vs ordered contiguous buffers.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/arrays-strings/searching-algorithms',
      },
      {
        id: 'sorting-algorithms',
        number: '07',
        title: 'Sorting: Selection, Insertion, QuickSort',
        description: 'In-place element permutation and asymptotic analysis.',
        difficulty: 'Intermediate',
        duration: '22 min',
        slug: '/theory/arrays-strings/sorting-algorithms',
      },
      {
        id: 'buffer-overflows',
        number: '08',
        title: 'Buffer Overflows & Memory Safety',
        description: 'How out-of-bounds writes corrupt stack memory and exploits.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/arrays-strings/buffer-overflows',
      },
      {
        id: 'string-tokenizing',
        number: '09',
        title: 'String Parsing & strtok',
        description: 'Delimited text parsing and internal pointer state.',
        difficulty: 'Intermediate',
        duration: '16 min',
        slug: '/theory/arrays-strings/string-tokenizing',
      },
      {
        id: 'arrays-practice',
        number: '10',
        title: 'Array & String Practice Challenges',
        description: 'Reversing strings in-place and matrix transposition.',
        difficulty: 'Intermediate',
        duration: '25 min',
        slug: '/theory/arrays-strings/practice-challenges',
      },
    ],
  },
  {
    id: 'pointers-structures',
    number: '03',
    title: 'Pointers and Structures',
    description: 'Understand memory, addresses and complex data.',
    lessonCountText: '12 lessons',
    level: 'Intermediate',
    lessons: [
      {
        id: 'memory-addresses',
        number: '01',
        title: 'Memory Addresses & The & Operator',
        description: 'How byte addressing works on physical and virtual memory.',
        difficulty: 'Intermediate',
        duration: '15 min',
        slug: '/theory/pointers-structures/memory-addresses',
      },
      {
        id: 'pointer-declaration',
        number: '02',
        title: 'Pointer Variables & Dereferencing',
        description: 'Declaring pointers and accessing target storage via *p.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/pointers-structures/pointer-variables',
      },
      {
        id: 'pointer-arithmetic',
        number: '03',
        title: 'Pointer Arithmetic',
        description: 'Scaling offsets by sizeof(*p) to traverse memory blocks.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/pointers-structures/pointer-arithmetic',
      },
      {
        id: 'pointers-arrays',
        number: '04',
        title: 'The Relationship: Pointers and Arrays',
        description: 'Array decay to pointers and equivalent bracket notations.',
        difficulty: 'Intermediate',
        duration: '16 min',
        slug: '/theory/pointers-structures/pointers-and-arrays',
      },
      {
        id: 'pointers-functions',
        number: '05',
        title: 'Pass by Reference via Pointers',
        description: 'Allowing callee functions to mutate caller state directly.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/pointers-structures/pointers-functions',
      },
      {
        id: 'void-null-pointers',
        number: '06',
        title: 'Void Pointers & Null Pointer Safety',
        description: 'Generic memory references and defensive NULL checks.',
        difficulty: 'Intermediate',
        duration: '14 min',
        slug: '/theory/pointers-structures/void-null-pointers',
      },
      {
        id: 'struct-declaration',
        number: '07',
        title: 'Structures (struct) Fundamentals',
        description: 'Composing heterogeneous attributes into cohesive types.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/pointers-structures/structures-fundamentals',
      },
      {
        id: 'struct-padding',
        number: '08',
        title: 'Memory Alignment & Struct Padding',
        description: 'Why sizeof(struct) is often larger than the sum of members.',
        difficulty: 'Intermediate',
        duration: '22 min',
        slug: '/theory/pointers-structures/struct-padding-alignment',
      },
      {
        id: 'arrow-operator',
        number: '09',
        title: 'Pointer to Struct & Arrow Operator (->)',
        description: 'Streamlined indirect member selection syntax.',
        difficulty: 'Intermediate',
        duration: '15 min',
        slug: '/theory/pointers-structures/arrow-operator',
      },
      {
        id: 'nested-structures',
        number: '10',
        title: 'Nested Structures & Self-referential Types',
        description: 'The foundation for linked lists, trees, and graphs.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/pointers-structures/nested-structures',
      },
      {
        id: 'unions-type-punning',
        number: '11',
        title: 'Unions & Bitfield Declarations',
        description: 'Shared memory overlays and hardware register bitfields.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/pointers-structures/unions-bitfields',
      },
      {
        id: 'data-modeling-practice',
        number: '12',
        title: 'Complex Data Modeling Practice',
        description: 'Implementing an in-memory database record engine.',
        difficulty: 'Intermediate',
        duration: '30 min',
        slug: '/theory/pointers-structures/data-modeling-practice',
      },
    ],
  },
  {
    id: 'memory-management',
    number: '04',
    title: 'Memory Management',
    description: 'Learn how memory is allocated and used.',
    lessonCountText: '8 lessons',
    level: 'Intermediate',
    lessons: [
      {
        id: 'stack-vs-heap',
        number: '01',
        title: 'Stack vs Heap Architecture',
        description: 'Automatic scope lifetime vs explicit heap allocations.',
        difficulty: 'Intermediate',
        duration: '16 min',
        slug: '/theory/memory-management/stack-vs-heap',
      },
      {
        id: 'dynamic-malloc',
        number: '02',
        title: 'Dynamic Allocation with malloc()',
        description: 'Requesting contiguous byte blocks from the runtime allocator.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/memory-management/dynamic-allocation-malloc',
      },
      {
        id: 'calloc-initialization',
        number: '03',
        title: 'Zeroed Allocation with calloc()',
        description: 'Preventing uninitialized memory vulnerabilities.',
        difficulty: 'Intermediate',
        duration: '14 min',
        slug: '/theory/memory-management/calloc-initialization',
      },
      {
        id: 'realloc-resizing',
        number: '04',
        title: 'Resizing Dynamic Memory with realloc()',
        description: 'Expanding buffers dynamically without losing stored data.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/memory-management/realloc-resizing',
      },
      {
        id: 'free-deallocation',
        number: '05',
        title: 'Safe Deallocation with free()',
        description: 'Returning blocks to the operating system heap pool.',
        difficulty: 'Intermediate',
        duration: '15 min',
        slug: '/theory/memory-management/safe-deallocation-free',
      },
      {
        id: 'memory-leaks',
        number: '06',
        title: 'Memory Leaks & Valgrind Diagnostics',
        description: 'Tracking unreferenced allocations in long-running services.',
        difficulty: 'Intermediate',
        duration: '22 min',
        slug: '/theory/memory-management/memory-leaks-valgrind',
      },
      {
        id: 'dangling-double-free',
        number: '07',
        title: 'Dangling Pointers & Double-Free Traps',
        description: 'Eliminating the most notorious vulnerabilities in C.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/memory-management/dangling-pointers-double-free',
      },
      {
        id: 'custom-allocator',
        number: '08',
        title: 'Building a Simple Arena Allocator',
        description: 'Bump allocation strategies for ultra-low latency execution.',
        difficulty: 'Intermediate',
        duration: '30 min',
        slug: '/theory/memory-management/custom-arena-allocator',
      },
    ],
  },
  {
    id: 'file-error-handling',
    number: '05',
    title: 'File & Error Handling',
    description: 'Read, write and handle real-world data safely.',
    lessonCountText: '8 lessons',
    level: 'Intermediate',
    lessons: [
      {
        id: 'file-streams',
        number: '01',
        title: 'File Streams & FILE* Handles',
        description: 'OS descriptor abstraction in the standard C library.',
        difficulty: 'Intermediate',
        duration: '14 min',
        slug: '/theory/file-error-handling/file-streams',
      },
      {
        id: 'fopen-modes',
        number: '02',
        title: 'Opening & Closing Modes (fopen, fclose)',
        description: 'Read, write, append, and binary permissions ("r", "w", "rb").',
        difficulty: 'Intermediate',
        duration: '15 min',
        slug: '/theory/file-error-handling/opening-closing-modes',
      },
      {
        id: 'formatted-io',
        number: '03',
        title: 'Formatted File I/O: fprintf & fscanf',
        description: 'Reading and persisting structured text configurations.',
        difficulty: 'Intermediate',
        duration: '16 min',
        slug: '/theory/file-error-handling/formatted-file-io',
      },
      {
        id: 'binary-io',
        number: '04',
        title: 'Binary File Operations: fread & fwrite',
        description: 'Direct byte serializations of memory structs to disk.',
        difficulty: 'Intermediate',
        duration: '20 min',
        slug: '/theory/file-error-handling/binary-file-operations',
      },
      {
        id: 'fseek-ftell',
        number: '05',
        title: 'File Positioning with fseek & ftell',
        description: 'Random access within files and file size determination.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/file-error-handling/file-positioning-fseek',
      },
      {
        id: 'errno-strerror',
        number: '06',
        title: 'System Errors: errno, perror & strerror',
        description: 'Diagnosing hardware failure codes and missing files.',
        difficulty: 'Intermediate',
        duration: '16 min',
        slug: '/theory/file-error-handling/errno-strerror',
      },
      {
        id: 'safe-input-validation',
        number: '07',
        title: 'Defensive Input Parsing (fgets vs gets)',
        description: 'Preventing crashes caused by unexpected user input.',
        difficulty: 'Intermediate',
        duration: '18 min',
        slug: '/theory/file-error-handling/defensive-input-parsing',
      },
      {
        id: 'file-pipeline-project',
        number: '08',
        title: 'Project: Persistent Key-Value Log File',
        description: 'Implementing an append-only transaction ledger in C.',
        difficulty: 'Intermediate',
        duration: '35 min',
        slug: '/theory/file-error-handling/persistent-log-project',
      },
    ],
  },
  {
    id: 'advanced-concepts',
    number: '06',
    title: 'Advanced Concepts',
    description: 'Go deeper into how C works.',
    lessonCountText: '10 lessons',
    level: 'Advanced',
    lessons: [
      {
        id: 'preprocessor-macros',
        number: '01',
        title: 'Preprocessor Directives & Macro Hygiene',
        description: 'Code generation before compilation and macro pitfalls.',
        difficulty: 'Advanced',
        duration: '18 min',
        slug: '/theory/advanced-concepts/preprocessor-directives-macros',
      },
      {
        id: 'header-guards',
        number: '02',
        title: 'Header Design, #pragma once & Include Guards',
        description: 'Structuring robust multi-module libraries without circular dependencies.',
        difficulty: 'Advanced',
        duration: '16 min',
        slug: '/theory/advanced-concepts/header-design-include-guards',
      },
      {
        id: 'compilation-linking',
        number: '03',
        title: 'Linking, Object Files & Symbol Resolution',
        description: 'Static archives (.a) vs dynamic shared libraries (.so / .dll).',
        difficulty: 'Advanced',
        duration: '24 min',
        slug: '/theory/advanced-concepts/linking-symbol-resolution',
      },
      {
        id: 'storage-classes',
        number: '04',
        title: 'Storage Classes: static, extern, register',
        description: 'Internal linkage, external symbols, and variable visibility.',
        difficulty: 'Advanced',
        duration: '18 min',
        slug: '/theory/advanced-concepts/storage-classes',
      },
      {
        id: 'function-pointers',
        number: '05',
        title: 'Function Pointers & Dynamic Callbacks',
        description: 'Implementing polymorphism, event loops, and qsort callbacks.',
        difficulty: 'Advanced',
        duration: '22 min',
        slug: '/theory/advanced-concepts/function-pointers-callbacks',
      },
      {
        id: 'bitwise-hardware',
        number: '06',
        title: 'Bitwise Logic & Memory-Mapped Registers',
        description: 'Direct bit masking, hardware control, and embedded registers.',
        difficulty: 'Advanced',
        duration: '20 min',
        slug: '/theory/advanced-concepts/bitwise-hardware-registers',
      },
      {
        id: 'variadic-functions',
        number: '07',
        title: 'Variadic Functions (va_list, va_arg)',
        description: 'Creating custom logging and formatted string functions.',
        difficulty: 'Advanced',
        duration: '20 min',
        slug: '/theory/advanced-concepts/variadic-functions',
      },
      {
        id: 'volatile-const',
        number: '08',
        title: 'Type Qualifiers: volatile, const, restrict',
        description: 'Instructing compiler optimizers on hardware side-effects.',
        difficulty: 'Advanced',
        duration: '18 min',
        slug: '/theory/advanced-concepts/type-qualifiers-volatile-restrict',
      },
      {
        id: 'threads-concurrency',
        number: '09',
        title: 'C11 Threads & Atomic Operations',
        description: 'Multithreaded execution and lock-free memory primitives.',
        difficulty: 'Advanced',
        duration: '26 min',
        slug: '/theory/advanced-concepts/c11-threads-atomics',
      },
      {
        id: 'assembly-interop',
        number: '10',
        title: 'Inline Assembly & Performance Profiling',
        description: 'Inspecting generated x86-64/ARM assembly and cache misses.',
        difficulty: 'Advanced',
        duration: '28 min',
        slug: '/theory/advanced-concepts/inline-assembly-profiling',
      },
    ],
  },
  {
    id: 'courses',
    number: '07',
    title: 'Courses',
    description: 'Structured learning paths for every goal.',
    lessonCountText: '4 courses',
    level: 'Beginner to Advanced',
    lessons: [
      {
        id: 'track-systems',
        number: '01',
        title: 'C Systems Programmer Professional Path',
        description: 'Comprehensive 40-hour track from basics to kernel architectures.',
        difficulty: 'Advanced',
        duration: '40 hrs',
        slug: '/theory/courses/c-systems-programmer',
      },
      {
        id: 'track-embedded',
        number: '02',
        title: 'Bare-Metal Embedded C for Microcontrollers',
        description: 'ARM Cortex-M peripheral drivers, interrupts, and RTOS fundamentals.',
        difficulty: 'Advanced',
        duration: '32 hrs',
        slug: '/theory/courses/bare-metal-embedded-c',
      },
      {
        id: 'track-linux',
        number: '03',
        title: 'Linux Systems & Network Programming',
        description: 'POSIX sockets, epoll concurrency, IPC, and daemon engineering.',
        difficulty: 'Advanced',
        duration: '28 hrs',
        slug: '/theory/courses/linux-systems-networking',
      },
      {
        id: 'track-kr',
        number: '04',
        title: 'The K&R Deep Dive Mastery Series',
        description: 'Complete commentary and modern re-implementation of classical patterns.',
        difficulty: 'Intermediate',
        duration: '24 hrs',
        slug: '/theory/courses/kr-deep-dive-mastery',
      },
    ],
  },
];
