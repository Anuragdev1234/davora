// ============================================================
// DEVORA — INPUT AND OUTPUT IN C LESSON DATA
// Educational content, interactive code models, specifiers, and quiz
// ============================================================

export interface CommonIoFunction {
  id: string;
  number: string;
  name: string;
  category: 'output' | 'input' | 'char-input' | 'char-output' | 'line-input';
  categoryLabel: string;
  badgeColor: string;
  accentBg: string;
  description: string;
  codeSnippet: string;
  inputExample?: string;
  outputExample: string;
  explanation: string;
  iconType: 'terminal' | 'keyboard' | 'monitor' | 'file';
  details: {
    header: string;
    syntax: string;
    keyPoints: string[];
  };
}

export interface FormatSpecifierItem {
  specifier: string;
  dataType: string;
  example: string;
  explanation: string;
  category: 'numeric' | 'character' | 'pointer' | 'scientific';
}

export interface IoFlowStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  codeExpression: string;
  highlightCategory: 'prompt' | 'input' | 'processing' | 'output';
  color: string;
}

export interface IoQuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// -------------------------------------------------------------------------
// 1. Five Common I/O Functions (Matching Reference Board Section 01–05)
// -------------------------------------------------------------------------
export const COMMON_IO_FUNCTIONS: CommonIoFunction[] = [
  {
    id: 'printf',
    number: '01',
    name: 'printf()',
    category: 'output',
    categoryLabel: 'Formatted Output',
    badgeColor: '#2563EB', // Blue
    accentBg: 'rgba(37, 99, 235, 0.08)',
    description: 'Displays formatted output on the screen.',
    codeSnippet: 'int age = 20;\nprintf("My age is %d\\n", age);',
    outputExample: 'My age is 20',
    explanation:
      '%d is the format specifier for signed decimal integers, and \\n outputs a newline character to move the terminal cursor to the next line.',
    iconType: 'monitor',
    details: {
      header: 'int printf(const char *format, ...);',
      syntax: 'printf("format string with %specifiers", arg1, arg2);',
      keyPoints: [
        'Returns the total number of characters successfully printed, or a negative value on failure.',
        'Supports format specifiers like %d, %f, %s, %c, and %p.',
        'Accepts optional flags, field width, precision (e.g., %.2f), and length modifiers.',
      ],
    },
  },
  {
    id: 'scanf',
    number: '02',
    name: 'scanf()',
    category: 'input',
    categoryLabel: 'Formatted Input',
    badgeColor: '#059669', // Emerald Green
    accentBg: 'rgba(5, 150, 105, 0.08)',
    description: 'Reads formatted input from the user.',
    codeSnippet: 'int age;\nscanf("%d", &age);',
    inputExample: 'Enter your age: 18',
    outputExample: 'Your age is 18',
    explanation:
      '%d tells scanf to parse an integer, and the address-of operator & passes the memory location of age so scanf can modify it directly.',
    iconType: 'keyboard',
    details: {
      header: 'int scanf(const char *format, ...);',
      syntax: 'scanf("format string", &variable1, &variable2);',
      keyPoints: [
        'Returns the number of input items successfully matched and assigned (e.g. returns 2 for %d %d).',
        'Requires pointer / memory address (&) for scalar types so it can store the parsed bytes in memory.',
        'Automatically skips leading whitespace (spaces, tabs, newlines) before numeric and string conversions.',
      ],
    },
  },
  {
    id: 'getchar',
    number: '03',
    name: 'getchar()',
    category: 'char-input',
    categoryLabel: 'Character Input',
    badgeColor: '#7C3AED', // Purple
    accentBg: 'rgba(124, 58, 237, 0.08)',
    description: 'Reads one character from standard input.',
    codeSnippet: 'char ch;\nch = getchar();',
    inputExample: 'Enter a character: A',
    outputExample: 'You entered: A',
    explanation:
      'Reads the next single character from stdin. Note that getchar() actually returns an int (to represent EOF / -1), which is stored in a character.',
    iconType: 'keyboard',
    details: {
      header: 'int getchar(void);',
      syntax: 'int ch = getchar();',
      keyPoints: [
        'Reads a single unsigned char converted to int from standard input stream.',
        'Returns EOF (typically -1) upon reaching end-of-file or on input read error.',
        'Terminal input is usually line-buffered, meaning characters are only sent to the program after pressing Enter.',
      ],
    },
  },
  {
    id: 'putchar',
    number: '04',
    name: 'putchar()',
    category: 'char-output',
    categoryLabel: 'Character Output',
    badgeColor: '#D97706', // Amber / Orange
    accentBg: 'rgba(217, 119, 6, 0.08)',
    description: 'Writes one character to standard output.',
    codeSnippet: "char ch = 'A';\nputchar(ch);\nputchar('\\n');",
    outputExample: 'A',
    explanation:
      'Writes the single character passed to it to stdout. It is faster and lighter than printf() when outputting individual characters.',
    iconType: 'monitor',
    details: {
      header: 'int putchar(int ch);',
      syntax: 'putchar(ch);',
      keyPoints: [
        'Writes the character ch (cast to unsigned char) to standard output.',
        'Returns the character written, or EOF on write error.',
        'Highly optimized for writing single characters and newline delimiters.',
      ],
    },
  },
  {
    id: 'fgets',
    number: '05',
    name: 'fgets()',
    category: 'line-input',
    categoryLabel: 'Bounded Line Input',
    badgeColor: '#E11D48', // Rose / Red
    accentBg: 'rgba(225, 29, 72, 0.08)',
    description: 'Reads a line of text into a character array.',
    codeSnippet: 'char name[50];\nfgets(name, sizeof name, stdin);',
    inputExample: 'Enter your name: Priya',
    outputExample: 'Hello, Priya',
    explanation:
      'Safely reads up to (sizeof name - 1) characters or until a newline is encountered. Unlike the dangerous gets(), fgets prevents buffer overflow attacks.',
    iconType: 'keyboard',
    details: {
      header: 'char *fgets(char *str, int n, FILE *stream);',
      syntax: 'fgets(buffer, sizeof buffer, stdin);',
      keyPoints: [
        'Guarantees null-termination (\'\\0\') and prevents buffer overflow by strictly respecting max size n.',
        'Includes the trailing newline character (\\n) in the buffer if space allows, which can be stripped.',
        'The historical gets() was deprecated in C99 and completely removed from the ISO C11 standard for security.',
      ],
    },
  },
];

// -------------------------------------------------------------------------
// 2. Format Specifiers Table (Two Column Comparison matching Reference)
// -------------------------------------------------------------------------
export const FORMAT_SPECIFIERS_LEFT: FormatSpecifierItem[] = [
  {
    specifier: '%d',
    dataType: 'int',
    example: 'printf("%d", age);',
    explanation: 'Signed decimal integer (typically 32-bit, range -2,147,483,648 to 2,147,483,647)',
    category: 'numeric',
  },
  {
    specifier: '%f',
    dataType: 'float in printf()',
    example: 'printf("%f", price);',
    explanation: 'Floating-point number. In printf(), float arguments are automatically promoted to double.',
    category: 'numeric',
  },
  {
    specifier: '%lf',
    dataType: 'double in scanf()',
    example: 'scanf("%lf", &value);',
    explanation: 'Long float / double precision (64-bit IEEE 754). Mandatory in scanf to write 8 full bytes.',
    category: 'numeric',
  },
  {
    specifier: '%c',
    dataType: 'Character',
    example: 'printf("%c", grade);',
    explanation: 'Single character encoded as an ASCII / UTF-8 code unit (1 byte).',
    category: 'character',
  },
];

export const FORMAT_SPECIFIERS_RIGHT: FormatSpecifierItem[] = [
  {
    specifier: '%s',
    dataType: 'Character string',
    example: 'printf("%s", name);',
    explanation: 'Sequence of characters terminated by null byte (\'\\0\'). Reads until whitespace in scanf().',
    category: 'character',
  },
  {
    specifier: '%u',
    dataType: 'unsigned int',
    example: 'printf("%u", count);',
    explanation: 'Unsigned decimal integer (0 to 4,294,967,295 on standard 32-bit implementations).',
    category: 'numeric',
  },
  {
    specifier: '%p',
    dataType: 'Pointer address',
    example: 'printf("%p", (void *)&age);',
    explanation: 'Memory address in hexadecimal format (e.g., 0x7ffd5e39b4ac). Cast to (void *) in standard C.',
    category: 'pointer',
  },
  {
    specifier: '%x / %X',
    dataType: 'Hexadecimal int',
    example: 'printf("%x", 255);',
    explanation: 'Unsigned integer printed in base-16 hexadecimal notation (e.g., ff or FF).',
    category: 'numeric',
  },
];

// -------------------------------------------------------------------------
// 3. The Complete Flow (4 Stages matching reference board)
// -------------------------------------------------------------------------
export const COMPLETE_FLOW_STAGES: IoFlowStage[] = [
  {
    step: '01',
    title: 'Prompt',
    subtitle: 'printf() asks the user to enter two integers.',
    description: 'The standard output stream prints the instructional message to the terminal without a trailing newline, leaving the cursor ready for user typing.',
    codeExpression: 'printf("Enter two integers: ");',
    highlightCategory: 'prompt',
    color: '#F59E0B', // Amber
  },
  {
    step: '02',
    title: 'Input',
    subtitle: 'scanf() reads the two values and stores them in a and b.',
    description: 'The standard input stream parses the characters entered by the user, converts them into binary integers according to %d %d, and writes them directly to &a and &b.',
    codeExpression: 'if (scanf("%d %d", &a, &b) != 2)',
    highlightCategory: 'input',
    color: '#2563EB', // Blue
  },
  {
    step: '03',
    title: 'Processing',
    subtitle: 'The program calculates their sum using a + b.',
    description: 'The Arithmetic Logic Unit (ALU) loads the values stored in variables a and b from the stack frame, adds them together, and assigns the sum to variable sum.',
    codeExpression: 'sum = a + b;',
    highlightCategory: 'processing',
    color: '#8B5CF6', // Purple
  },
  {
    step: '04',
    title: 'Output',
    subtitle: 'printf() displays the result.',
    description: 'Formatted output interpolates the integer value of sum into the format string at the %d placeholder, flushes the stream, and outputs Sum = 30\\n.',
    codeExpression: 'printf("Sum = %d\\n", sum);',
    highlightCategory: 'output',
    color: '#10B981', // Emerald / Teal
  },
];

// -------------------------------------------------------------------------
// 4. Hero Code Program Lines
// -------------------------------------------------------------------------
export interface HeroCodeLine {
  lineNum: number;
  text: string;
  isPill?: boolean;
  pillCategory?: 'prompt' | 'input' | 'processing' | 'output';
  highlightBorderColor?: string;
}

export const HERO_CODE_LINES: HeroCodeLine[] = [
  { lineNum: 1, text: '#include <stdio.h>' },
  { lineNum: 2, text: '' },
  { lineNum: 3, text: 'int main(void) {' },
  { lineNum: 4, text: '    int a, b, sum;' },
  { lineNum: 5, text: '' },
  {
    lineNum: 6,
    text: '    printf("Enter two integers: ");',
    isPill: true,
    pillCategory: 'prompt',
    highlightBorderColor: '#F59E0B',
  },
  {
    lineNum: 7,
    text: '    scanf("%d %d", &a, &b);',
    isPill: true,
    pillCategory: 'input',
    highlightBorderColor: '#2563EB',
  },
  { lineNum: 8, text: '' },
  {
    lineNum: 9,
    text: '    sum = a + b;',
    isPill: true,
    pillCategory: 'processing',
    highlightBorderColor: '#8B5CF6',
  },
  {
    lineNum: 10,
    text: '    printf("Sum = %d\\n", sum);',
    isPill: true,
    pillCategory: 'output',
    highlightBorderColor: '#10B981',
  },
  { lineNum: 11, text: '' },
  { lineNum: 12, text: '    return 0;' },
  { lineNum: 13, text: '}' },
];

// -------------------------------------------------------------------------
// 5. Quick Revision Quiz (6 Questions)
// -------------------------------------------------------------------------
export const IO_QUIZ_QUESTIONS: IoQuizQuestion[] = [
  {
    id: 1,
    question: 'Why is the & (address-of) operator required before variable names in scanf("%d", &age)?',
    options: [
      'It tells the compiler that age is a constant value.',
      'scanf() needs the memory address of age to write the parsed input directly into memory.',
      'It automatically formats the number into a printable string.',
      'It prevents buffer overflows in numeric variables.',
    ],
    correctAnswer: 1,
    explanation:
      'Because C passes arguments by value, scanf() must receive a pointer (memory address) to the variable so it can modify the memory location in the caller function.',
  },
  {
    id: 2,
    question: 'What does scanf() return when successfully reading two integers with scanf("%d %d", &a, &b)?',
    options: [
      '0 on success and 1 on error.',
      'The sum of the two entered integers.',
      'The integer 2, representing the number of input items successfully matched and assigned.',
      'A pointer to standard input (stdin).',
    ],
    correctAnswer: 2,
    explanation:
      'scanf() returns the number of input items successfully matched and assigned. If two integers are provided, it returns 2. If the user types letters or EOF, it returns fewer or EOF.',
  },
  {
    id: 3,
    question: 'Which header file must be included to use printf(), scanf(), and fgets() in standard C?',
    options: [
      '#include <stdlib.h>',
      '#include <stdio.h>',
      '#include <string.h>',
      '#include <conio.h>',
    ],
    correctAnswer: 1,
    explanation:
      '<stdio.h> stands for Standard Input / Output Header and contains function prototypes and macro definitions for streams and I/O functions.',
  },
  {
    id: 4,
    question: 'Why should fgets() always be preferred over the deprecated gets() function?',
    options: [
      'fgets() automatically parses integers without needing scanf().',
      'fgets() requires a maximum buffer size parameter, preventing buffer overflow attacks.',
      'gets() can only read one single character at a time.',
      'fgets() executes faster by bypassing operating system streams.',
    ],
    correctAnswer: 1,
    explanation:
      'gets() has no limit on how many characters it reads into memory, which frequently caused catastrophic buffer overflow vulnerabilities. It was removed in ISO C11. fgets() safely enforces a maximum buffer size.',
  },
  {
    id: 5,
    question: 'What is the correct format specifier for reading a double precision floating-point number in scanf()?',
    options: [
      '%f',
      '%d',
      '%lf',
      '%p',
    ],
    correctAnswer: 2,
    explanation:
      'In scanf(), %lf is required for double * (64-bit). In printf(), %f suffices for both float and double because float arguments undergo default argument promotion to double.',
  },
  {
    id: 6,
    question: 'What character indicates the end of a C string in memory?',
    options: [
      'The newline character \'\\n\'',
      'The null terminator character \'\\0\'',
      'The EOF signal (-1)',
      'The space character \' \'',
    ],
    correctAnswer: 1,
    explanation:
      'All C strings are null-terminated arrays of characters ending with byte value 0, written as \'\\0\'.',
  },
];
