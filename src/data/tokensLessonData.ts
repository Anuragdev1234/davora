/**
 * DEVORA — Tokens, Keywords and Identifiers Lesson Data
 * Complete structured curriculum data for Lesson 04
 */

export interface TokenCategory {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  themeColor: 'blue' | 'green' | 'amber' | 'coral' | 'purple';
  examples: string[];
  codeSnippet: string;
  codeExplanation: string;
  deepDive: {
    title: string;
    points: string[];
  };
}

export interface IdentifierRule {
  id: string;
  number: string;
  ruleTitle: string;
  summary: string;
  explanation: string;
  validExamples: string[];
  invalidExamples: {
    identifier: string;
    reason: string;
  }[];
}

export interface ProgramToken {
  id: string;
  text: string;
  category: 'keyword' | 'identifier' | 'constant' | 'string_literal' | 'operator' | 'punctuator' | 'preprocessor';
  categoryLabel: string;
  line: number;
  description: string;
  color: 'blue' | 'green' | 'amber' | 'coral' | 'orange' | 'purple' | 'slate';
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface NextTopicItem {
  title: string;
  category: string;
  description: string;
  path: string;
  iconName: 'layers' | 'terminal' | 'git-branch' | 'box';
}

// -------------------------------------------------------------
// 1. C Standard Keywords (C89 + C99 + Modern C)
// -------------------------------------------------------------
export const C_KEYWORDS_LIST = [
  'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
  'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
  'inline', 'int', 'long', 'register', 'restrict', 'return', 'short', 'signed',
  'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void',
  'volatile', 'while', '_Bool', '_Complex', '_Imaginary'
];

// -------------------------------------------------------------
// 2. The 5 Core Token Categories
// -------------------------------------------------------------
export const TOKEN_CATEGORIES: TokenCategory[] = [
  {
    id: 'keywords',
    number: '01',
    title: 'Keywords',
    shortDesc: 'Reserved words with predefined meanings.',
    detailedDesc: 'Keywords are words reserved by the C language specification that possess fixed syntactic and semantic meanings. They form the core vocabulary of the language and can never be repurposed as user-defined variable, function, or type identifiers.',
    themeColor: 'blue',
    examples: ['int', 'char', 'if', 'else', 'return', 'while', 'for', 'void'],
    codeSnippet: 'int age = 20;',
    codeExplanation: 'Here, `int` is a keyword that specifies the fundamental integer data type of variable `age`.',
    deepDive: {
      title: 'Architectural Significance of Keywords',
      points: [
        'The C compiler lexer identifies keywords during tokenization and generates distinct AST grammar symbols.',
        'There are 32 standard keywords defined in ANSI C (C89), with extensions added in C99, C11, and C23.',
        'Keywords are always written in lowercase; `int` is a reserved keyword, while `Int` or `INT` is treated as a distinct identifier.',
      ],
    },
  },
  {
    id: 'identifiers',
    number: '02',
    title: 'Identifiers',
    shortDesc: 'Names used to identify program elements.',
    detailedDesc: 'Identifiers are user-defined names assigned to entities such as variables, functions, structures, unions, and labels in source code. They allow both programmers and compilers to address and reference specific memory blocks and subroutines.',
    themeColor: 'green',
    examples: ['age', 'total', 'main', 'calculateSum', 'printf'],
    codeSnippet: 'int total = 100;',
    codeExplanation: 'Here, `total` is an identifier chosen by the developer to identify an integer memory allocation storing the value 100.',
    deepDive: {
      title: 'Symbol Table & Identifier Resolution',
      points: [
        'During compilation, the frontend stores identifiers in a Symbol Table along with their scope, type, and storage class.',
        'Standard library function names like `printf`, `scanf`, and `malloc` are also identifiers, resolved at link time.',
        'Identifiers have lexical scope (block scope, function scope, or file scope).',
      ],
    },
  },
  {
    id: 'constants',
    number: '03',
    title: 'Constants',
    shortDesc: 'Fixed values that do not change during execution.',
    detailedDesc: 'Constants (literals) represent literal values embedded directly into the program text. Once compiled, their values are hardcoded into the instruction stream or read-only data segments.',
    themeColor: 'amber',
    examples: ['10', '3.14', "'A'", '0'],
    codeSnippet: 'const double PI = 3.14159;\nint count = 10;',
    codeExplanation: 'Here, `10` and `3.14159` are literal constants directly representing fixed numeric values.',
    deepDive: {
      title: 'Classification of Constants in C',
      points: [
        'Integer Constants: Decimal (e.g. 10), Hexadecimal (0x1A), Octal (012), Binary in C23 (0b1010).',
        'Floating-Point Constants: Represent real numbers with decimal points or exponents (e.g. 3.14, 2.5e-3).',
        'Character Constants: Single characters enclosed in single quotes (e.g. \'A\', \'\\n\'), stored as their ASCII integer values.',
      ],
    },
  },
  {
    id: 'string_literals',
    number: '04',
    title: 'String Literals',
    shortDesc: 'Sequences of characters enclosed in double quotes.',
    detailedDesc: 'A string literal is a sequence of zero or more characters enclosed within double quotation marks. In C, string literals are stored in read-only memory (`.rodata` section) as contiguous null-terminated character arrays.',
    themeColor: 'coral',
    examples: ['"Hello, World!"', '"Age = %d\\n"'],
    codeSnippet: 'printf("Age = %d\\n", age);',
    codeExplanation: 'Here, `"Age = %d\\n"` is a string literal passed as the format specification string to `printf`.',
    deepDive: {
      title: 'Memory Behavior of String Literals',
      points: [
        'The compiler automatically appends a terminating null byte (`\'\\0\'`) to mark the end of the character sequence.',
        'Writing to a string literal (e.g. `char *s = "text"; s[0] = \'T\';`) causes undefined behavior or a segmentation fault on modern OSes.',
        'Escape sequences like `\\n` (newline), `\\t` (tab), and `\\\\` (backslash) allow encoding unprintable characters.',
      ],
    },
  },
  {
    id: 'operators_punctuators',
    number: '05',
    title: 'Operators and Punctuators',
    shortDesc: 'Symbols used to compute and structure program syntax.',
    detailedDesc: 'Operators specify computational or logical actions to be performed on operands, while punctuators (delimiters) establish grammatical boundaries, grouping, parameter lists, and statement terminations.',
    themeColor: 'purple',
    examples: ['+', '-', '*', '/', '==', '=', ';', ',', '(', ')', '{', '}'],
    codeSnippet: 'int age = 20;\nprintf("Age = %d\\n", age);',
    codeExplanation: '`=` is an assignment operator; `;` is a statement punctuator; `(` and `)` enclose function arguments.',
    deepDive: {
      title: 'Operators vs. Punctuators',
      points: [
        'Operators evaluate to values or produce side effects (e.g. arithmetic `+`, `-`, relational `==`, assignment `=`).',
        'Punctuators organize lexical structure: semicolons `;` terminate statements, braces `{}` delimit code blocks, commas `,` separate arguments.',
        'Some symbols like `*` can act as arithmetic multiplication operators or pointer dereference punctuators depending on syntactic context.',
      ],
    },
  },
];

// -------------------------------------------------------------
// 3. Rules for C Identifiers
// -------------------------------------------------------------
export const IDENTIFIER_RULES: IdentifierRule[] = [
  {
    id: 'rule-chars',
    number: '01',
    ruleTitle: 'Allowed Characters',
    summary: 'Letters (a-z, A-Z), digits (0-9), and underscores (_).',
    explanation: 'An identifier may consist solely of uppercase and lowercase ASCII letters, decimal digits, and the underscore character. No spaces, punctuation marks, hyphens, or special symbols (like $, @, #) are permitted.',
    validExamples: ['age', 'total_count', 'score2', '_temp', 'MAX_BUFFER'],
    invalidExamples: [
      { identifier: 'total-cost', reason: 'Contains a hyphen (-), which the compiler parses as a subtraction operator.' },
      { identifier: 'user name', reason: 'Contains whitespace, breaking the token into two separate lexical units.' },
      { identifier: 'item$price', reason: 'Contains "$", which is not a valid character in standard C identifiers.' },
    ],
  },
  {
    id: 'rule-leading',
    number: '02',
    ruleTitle: 'Leading Character',
    summary: 'Must begin with a letter or an underscore, never a digit.',
    explanation: 'The very first character of an identifier must be either an alphabet character (a-z, A-Z) or an underscore (_). If a token begins with a digit, the compiler lexer attempts to parse it as a numeric constant, resulting in a syntax error.',
    validExamples: ['count', '_index', 'v1', '_', '__init__'],
    invalidExamples: [
      { identifier: '2fast', reason: 'Begins with the digit "2". Identifiers cannot begin with numeric digits.' },
      { identifier: '1st_place', reason: 'Begins with "1", triggering a numerical constant lexing error.' },
      { identifier: '99bottles', reason: 'Starts with digit "9". Must start with a letter or underscore.' },
    ],
  },
  {
    id: 'rule-keywords',
    number: '03',
    ruleTitle: 'Keyword Exclusivity',
    summary: 'Cannot be any reserved C keyword.',
    explanation: 'Because keywords have predetermined grammatical roles in C syntax, none of the reserved words (such as int, return, if, while, void, float) can be declared as user-defined identifier names.',
    validExamples: ['my_int', 'return_val', 'while_loop', 'void_ptr'],
    invalidExamples: [
      { identifier: 'int', reason: 'Directly collides with the reserved keyword "int" (type specifier).' },
      { identifier: 'return', reason: 'Collides with the reserved keyword "return" (flow control statement).' },
      { identifier: 'void', reason: 'Collides with the reserved keyword "void" (empty type specifier).' },
    ],
  },
  {
    id: 'rule-case',
    number: '04',
    ruleTitle: 'Strict Case Sensitivity',
    summary: 'total, Total, and TOTAL are distinct identifiers.',
    explanation: 'C is strictly case-sensitive. The compiler compares ASCII/Unicode character values byte-by-byte. Therefore, changing the capitalization of any letter produces an entirely separate symbol in the symbol table and allocated memory address.',
    validExamples: ['total', 'Total', 'TOTAL', 'calculateSum', 'calculatesum'],
    invalidExamples: [
      { identifier: 'total vs Total', reason: 'They do not conflict, but referring to "Total" when "total" was declared yields an undeclared identifier error.' },
    ],
  },
];

// -------------------------------------------------------------
// 4. Sample Program Token Dissection
// -------------------------------------------------------------
export const SAMPLE_PROGRAM_CODE = `#include <stdio.h>

int main(void)
{
    int age = 20;
    printf("Age = %d\\n", age);
    return 0;
}`;

export const PROGRAM_TOKENS_LIST: ProgramToken[] = [
  {
    id: 'tok-1',
    text: '#include <stdio.h>',
    category: 'preprocessor',
    categoryLabel: 'Preprocessor Directive',
    line: 1,
    description: 'Not a token in the C language grammar, but a preprocessor directive that imports standard I/O library prototypes before tokenization.',
    color: 'purple',
  },
  {
    id: 'tok-2',
    text: 'int',
    category: 'keyword',
    categoryLabel: 'Keyword',
    line: 3,
    description: 'Specifies that main() returns an integer status code to the host operating system upon exit.',
    color: 'blue',
  },
  {
    id: 'tok-3',
    text: 'main',
    category: 'identifier',
    categoryLabel: 'Identifier',
    line: 3,
    description: 'The designated entrypoint function identifier recognized by the C runtime startup code.',
    color: 'green',
  },
  {
    id: 'tok-4',
    text: 'void',
    category: 'keyword',
    categoryLabel: 'Keyword',
    line: 3,
    description: 'Specifies that the main function accepts no parameters in this prototype signature.',
    color: 'blue',
  },
  {
    id: 'tok-5',
    text: '{',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 4,
    description: 'Opening curly brace punctuator that starts the main() function compound block body.',
    color: 'slate',
  },
  {
    id: 'tok-6',
    text: 'int',
    category: 'keyword',
    categoryLabel: 'Keyword',
    line: 5,
    description: 'Type specifier keyword declaring that the identifier "age" will hold signed integer data.',
    color: 'blue',
  },
  {
    id: 'tok-7',
    text: 'age',
    category: 'identifier',
    categoryLabel: 'Identifier',
    line: 5,
    description: 'User-defined variable identifier naming the stack location holding the learner\'s age.',
    color: 'green',
  },
  {
    id: 'tok-8',
    text: '=',
    category: 'operator',
    categoryLabel: 'Operator',
    line: 5,
    description: 'Simple assignment operator storing the evaluated right-hand constant into the left-hand memory location.',
    color: 'orange',
  },
  {
    id: 'tok-9',
    text: '20',
    category: 'constant',
    categoryLabel: 'Constant',
    line: 5,
    description: 'Decimal integer literal constant with a fixed value of twenty.',
    color: 'amber',
  },
  {
    id: 'tok-10',
    text: ';',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 5,
    description: 'Semicolon punctuator marking the syntactic termination of the variable declaration statement.',
    color: 'slate',
  },
  {
    id: 'tok-11',
    text: 'printf',
    category: 'identifier',
    categoryLabel: 'Identifier',
    line: 6,
    description: 'Identifier designating the standard C formatted output library function declared in <stdio.h>.',
    color: 'green',
  },
  {
    id: 'tok-12',
    text: '(',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 6,
    description: 'Left parenthesis punctuator opening the function call argument list.',
    color: 'slate',
  },
  {
    id: 'tok-13',
    text: '"Age = %d\\n"',
    category: 'string_literal',
    categoryLabel: 'String Literal',
    line: 6,
    description: 'String literal constant containing format text and %d conversion specification, stored in read-only data.',
    color: 'coral',
  },
  {
    id: 'tok-14',
    text: ',',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 6,
    description: 'Comma punctuator separating the format string argument from the variable argument.',
    color: 'slate',
  },
  {
    id: 'tok-15',
    text: 'age',
    category: 'identifier',
    categoryLabel: 'Identifier',
    line: 6,
    description: 'Variable identifier passed as an argument whose runtime value (20) replaces %d in output.',
    color: 'green',
  },
  {
    id: 'tok-16',
    text: ')',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 6,
    description: 'Right parenthesis punctuator closing the function call parameter list.',
    color: 'slate',
  },
  {
    id: 'tok-17',
    text: ';',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 6,
    description: 'Semicolon punctuator terminating the printf function call expression statement.',
    color: 'slate',
  },
  {
    id: 'tok-18',
    text: 'return',
    category: 'keyword',
    categoryLabel: 'Keyword',
    line: 7,
    description: 'Flow control keyword terminating main() and delivering the return value to the caller.',
    color: 'blue',
  },
  {
    id: 'tok-19',
    text: '0',
    category: 'constant',
    categoryLabel: 'Constant',
    line: 7,
    description: 'Integer constant zero representing standard successful program termination status.',
    color: 'amber',
  },
  {
    id: 'tok-20',
    text: ';',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 7,
    description: 'Semicolon punctuator marking the end of the return statement.',
    color: 'slate',
  },
  {
    id: 'tok-21',
    text: '}',
    category: 'punctuator',
    categoryLabel: 'Punctuator',
    line: 8,
    description: 'Closing curly brace punctuator concluding the main function compound statement body.',
    color: 'slate',
  },
];

// -------------------------------------------------------------
// 5. Interactive Practice Quiz
// -------------------------------------------------------------
export const TOKENS_QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 'quiz-1',
    question: 'Which of the following is a valid C identifier?',
    category: 'IDENTIFIER RULES',
    options: [
      {
        id: 'q1-a',
        text: '2count',
        isCorrect: false,
        explanation: 'Invalid: C identifiers cannot begin with a numeric digit.',
      },
      {
        id: 'q1-b',
        text: 'total-cost',
        isCorrect: false,
        explanation: 'Invalid: Hyphens (-) are treated as subtraction operators, not permitted in identifiers.',
      },
      {
        id: 'q1-c',
        text: '_variableName',
        isCorrect: true,
        explanation: 'Correct! Identifiers may begin with an underscore (_) followed by letters or digits.',
      },
      {
        id: 'q1-d',
        text: 'return',
        isCorrect: false,
        explanation: 'Invalid: "return" is a reserved C keyword and cannot be used as an identifier.',
      },
    ],
  },
  {
    id: 'q-2',
    question: 'In the statement "int age = 20;", what type of token is "int"?',
    category: 'TOKEN CLASSIFICATION',
    options: [
      {
        id: 'q2-a',
        text: 'Identifier',
        isCorrect: false,
        explanation: '"age" is the identifier. "int" is a language keyword.',
      },
      {
        id: 'q2-b',
        text: 'Keyword',
        isCorrect: true,
        explanation: 'Correct! "int" is a reserved C keyword specifying the data type.',
      },
      {
        id: 'q2-c',
        text: 'Constant',
        isCorrect: false,
        explanation: '"20" is the constant literal. "int" is a keyword.',
      },
      {
        id: 'q2-d',
        text: 'Punctuator',
        isCorrect: false,
        explanation: '";" is a punctuator. "int" is a reserved keyword.',
      },
    ],
  },
  {
    id: 'q-3',
    question: 'Are the identifiers "total" and "Total" treated as the same in C?',
    category: 'CASE SENSITIVITY',
    options: [
      {
        id: 'q3-a',
        text: 'Yes, C ignores letter casing when compiling identifiers.',
        isCorrect: false,
        explanation: 'Incorrect. Unlike some languages, C enforces strict case sensitivity.',
      },
      {
        id: 'q3-b',
        text: 'No, C identifiers are strictly case-sensitive.',
        isCorrect: true,
        explanation: 'Correct! "total", "Total", and "TOTAL" represent distinct names and different memory locations in C.',
      },
      {
        id: 'q3-c',
        text: 'Only if both are declared inside the same function block.',
        isCorrect: false,
        explanation: 'C is always case-sensitive regardless of scope.',
      },
      {
        id: 'q3-d',
        text: 'Only when compiling under C23 standard.',
        isCorrect: false,
        explanation: 'C has been strictly case-sensitive across all standards since C89/K&R.',
      },
    ],
  },
  {
    id: 'q-4',
    question: 'In the expression printf("Age = %d\\n", age);, what token type is "Age = %d\\n"?',
    category: 'LITERAL TOKENS',
    options: [
      {
        id: 'q4-a',
        text: 'Character constant',
        isCorrect: false,
        explanation: 'Character constants are enclosed in single quotes like \'A\', holding a single character.',
      },
      {
        id: 'q4-b',
        text: 'Keyword',
        isCorrect: false,
        explanation: 'Text in double quotes is never a keyword; it is a string literal.',
      },
      {
        id: 'q4-c',
        text: 'String literal',
        isCorrect: true,
        explanation: 'Correct! Text enclosed in double quotation marks is a string literal stored as a null-terminated character array.',
      },
      {
        id: 'q4-d',
        text: 'Punctuator',
        isCorrect: false,
        explanation: 'Parentheses and commas are punctuators. The quoted text is a string literal.',
      },
    ],
  },
  {
    id: 'q-5',
    question: 'Which of the following characters is a punctuator used to terminate statements in C?',
    category: 'PUNCTUATORS',
    options: [
      {
        id: 'q5-a',
        text: '. (Period)',
        isCorrect: false,
        explanation: 'Periods are used as structure member access operators (e.g. person.age).',
      },
      {
        id: 'q5-b',
        text: ': (Colon)',
        isCorrect: false,
        explanation: 'Colons are used in ternary operators, switch case labels, and goto labels.',
      },
      {
        id: 'q5-c',
        text: '; (Semicolon)',
        isCorrect: true,
        explanation: 'Correct! In C, the semicolon (;) is the statement terminator punctuator.',
      },
      {
        id: 'q5-d',
        text: '$ (Dollar sign)',
        isCorrect: false,
        explanation: 'The dollar sign is not a standard C punctuator.',
      },
    ],
  },
];

// -------------------------------------------------------------
// 6. Next Topics Navigation
// -------------------------------------------------------------
export const TOKENS_NEXT_TOPICS: NextTopicItem[] = [
  {
    title: 'Variables and Data Types',
    category: 'BASICS · LESSON 05',
    description: 'Learn how variables allocate memory, from 1-byte char to 8-byte floating point representations.',
    path: '/theory',
    iconName: 'layers',
  },
  {
    title: 'Constants & Literals in Depth',
    category: 'BASICS · LESSON 06',
    description: 'Explore const qualifiers, #define preprocessor macros, octal, hex, and character escape sequences.',
    path: '/theory',
    iconName: 'box',
  },
  {
    title: 'Operators & Expressions',
    category: 'OPERATORS · LESSON 07',
    description: 'Master arithmetic, relational, bitwise, and logical operators with precedence and associativity.',
    path: '/theory',
    iconName: 'terminal',
  },
  {
    title: 'Input / Output (printf & scanf)',
    category: 'I/O · LESSON 08',
    description: 'Standard streams, conversion specifiers (%d, %s, %f, %c), and robust buffer handling.',
    path: '/theory',
    iconName: 'git-branch',
  },
];
