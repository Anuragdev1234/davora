/**
 * DEVORA — Variables and Data Types in C Lesson Data
 * Complete structured curriculum data preserving 100% of the manuscript content.
 */

export interface BasicDataTypeItem {
  name: string;
  purpose: string;
  example: string;
  typicalSize: string;
}

export interface QuizQuestionItem {
  id: string;
  category: string;
  question: string;
  codeSnippet?: string;
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
  iconName: 'terminal' | 'layers' | 'git-branch' | 'box';
}

// -------------------------------------------------------------
// 1. Basic Data Types Table (from Manuscript Section 4)
// -------------------------------------------------------------
export const BASIC_DATA_TYPES: BasicDataTypeItem[] = [
  {
    name: 'char',
    purpose: 'Stores a character-sized integer value, commonly used for characters',
    example: "char grade = 'A';",
    typicalSize: '1 byte',
  },
  {
    name: 'int',
    purpose: 'Represents integer values',
    example: 'int age = 20;',
    typicalSize: '4 bytes (typical)',
  },
  {
    name: 'float',
    purpose: 'Represents floating-point values',
    example: 'float price = 12.5f;',
    typicalSize: '4 bytes',
  },
  {
    name: 'double',
    purpose: 'Represents floating-point values with at least as much precision as float',
    example: 'double pi = 3.14159;',
    typicalSize: '8 bytes',
  },
  {
    name: 'void',
    purpose: 'Represents no value or an unspecified type in particular contexts',
    example: 'void display(void);',
    typicalSize: 'Incomplete / 0 bytes',
  },
  {
    name: '_Bool',
    purpose: 'Represents the values 0 and 1',
    example: '_Bool active = 1;',
    typicalSize: '1 byte',
  },
];

// -------------------------------------------------------------
// 2. Manuscript Code Examples & Exact Output Strings
// -------------------------------------------------------------
export const CODE_EXAMPLES = {
  declaringInitializing: `#include <stdio.h>

int main(void)
{
    int age = 20;
    float height = 5.7f;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);

    return 0;
}`,
  declaringInitializingOutput: `Age: 20
Height: 5.7
Grade: A`,

  accessingUpdating: `#include <stdio.h>

int main(void)
{
    int number = 10;

    printf("Initial value: %d\\n", number);

    number = 25;
    printf("Updated value: %d\\n", number);

    number = number + 5;
    printf("After adding 5: %d\\n", number);

    return 0;
}`,
  accessingUpdatingOutput: `Initial value: 10
Updated value: 25
After adding 5: 30`,

  usingExpressions: `#include <stdio.h>

int main(void)
{
    int a = 20, b = 40;
    int sum = a + b;

    printf("Sum = %d\\n", sum);

    return 0;
}`,
  usingExpressionsOutput: `Sum = 60`,

  sizeofExample: `#include <stdio.h>

int main(void)
{
    int number = 22;

    printf("Size: %zu bytes\\n", sizeof number);

    return 0;
}`,
  sizeofExampleOutput: `Size: 4 bytes`,

  constKeyword: `#include <stdio.h>

int main(void)
{
    const int dailyLimit = 20000;

    printf("Daily limit: %d\\n", dailyLimit);

    return 0;
}`,
  constKeywordOutput: `Daily limit: 20000`,

  defineMacro: `#include <stdio.h>

#define PI 3.14159

int main(void)
{
    printf("Pi = %.5f\\n", PI);
    return 0;
}`,
  defineMacroOutput: `Pi = 3.14159`,

  localScope: `#include <stdio.h>

int main(void)
{
    int number = 10;

    {
        int value = 20;
        printf("%d %d\\n", number, value);
    }

    return 0;
}`,
  localScopeOutput: `10 20`,

  globalScope: `#include <stdio.h>

int score = 50;

int main(void)
{
    printf("Score: %d\\n", score);
    return 0;
}`,
  globalScopeOutput: `Score: 50`,

  derivedTypes: `int numbers[3] = {10, 20, 30};
int *ptr = &numbers[0];`,

  userDefinedTypes: `struct Student {
    char name[20];
    int age;
};`,

  implicitConversion: `#include <stdio.h>

int main(void)
{
    int a = 5;
    float b = 4.5f;
    float result = a + b;

    printf("%.2f\\n", result);
    return 0;
}`,
  implicitConversionOutput: `9.50`,

  explicitConversion: `#include <stdio.h>

int main(void)
{
    float value = 7.9f;
    int number = (int)value;

    printf("%d\\n", number);
    return 0;
}`,
  explicitConversionOutput: `7`,
};

// -------------------------------------------------------------
// 3. Key Takeaways (Verbatim from Manuscript)
// -------------------------------------------------------------
export const MANUSCRIPT_KEY_TAKEAWAYS: string[] = [
  'Variables provide named access to stored values.',
  'Every object has a type that determines how its value is represented and used.',
  'Initialize variables before reading their values.',
  'Use const when an object should not be modified through ordinary expressions.',
  'Scope determines where an identifier can be used.',
  'Data type sizes and ranges are not universally identical across all C implementations.',
  'Implicit and explicit conversions can change values or lose information.',
];

// -------------------------------------------------------------
// 4. Interactive Quiz Questions (Testing All 5 Manuscript Sections)
// -------------------------------------------------------------
export const VARIABLES_QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 'quiz-v1',
    category: 'VARIABLE NAMING',
    question: 'Which of the following is a valid variable name in C?',
    options: [
      {
        id: 'opt-a',
        text: '1number',
        isCorrect: false,
        explanation: 'Invalid: A variable name must not begin with a digit.',
      },
      {
        id: 'opt-b',
        text: 'total marks',
        isCorrect: false,
        explanation: 'Invalid: Spaces are not allowed in variable names.',
      },
      {
        id: 'opt-c',
        text: 'total_marks',
        isCorrect: true,
        explanation: 'Correct! Identifiers may contain letters, digits, and underscores (_), and begin with a letter.',
      },
      {
        id: 'opt-d',
        text: 'float',
        isCorrect: false,
        explanation: 'Invalid: "float" is a reserved C keyword and cannot be used as a variable name.',
      },
    ],
  },
  {
    id: 'quiz-v2',
    category: 'INITIALIZATION & MEMORY',
    question: 'What happens when an uninitialized local automatic variable is read in C?',
    options: [
      {
        id: 'opt-a',
        text: 'It is guaranteed to hold the value 0.',
        isCorrect: false,
        explanation: 'Incorrect. Only static and global variables are automatically zero-initialized.',
      },
      {
        id: 'opt-b',
        text: 'Its value is indeterminate, and reading it can cause undefined behavior.',
        isCorrect: true,
        explanation: 'Correct! An uninitialized local automatic variable contains indeterminate data ("garbage"), and reading it causes undefined behavior.',
      },
      {
        id: 'opt-c',
        text: 'The program refuses to compile.',
        isCorrect: false,
        explanation: 'The compiler might issue a warning, but uninitialized local variable access compiles and triggers runtime undefined behavior.',
      },
      {
        id: 'opt-d',
        text: 'It automatically allocates memory on the heap.',
        isCorrect: false,
        explanation: 'Local automatic variables reside on the call stack, not the heap.',
      },
    ],
  },
  {
    id: 'quiz-v3',
    category: 'CONSTANTS',
    question: 'What is the primary difference between a const variable and a #define macro?',
    options: [
      {
        id: 'opt-a',
        text: 'const defines a typed object adhering to scope rules, whereas #define performs preprocessor token substitution.',
        isCorrect: true,
        explanation: 'Correct! const objects have a distinct type and scope, while #define is a textual preprocessor macro without type checks.',
      },
      {
        id: 'opt-b',
        text: 'const values can be modified later, but #define macros cannot.',
        isCorrect: false,
        explanation: 'Neither can be modified through ordinary expressions once defined.',
      },
      {
        id: 'opt-c',
        text: '#define creates a typed variable in RAM, while const does not.',
        isCorrect: false,
        explanation: 'The reverse is true: const declares a typed object, while #define is expanded before compilation.',
      },
      {
        id: 'opt-d',
        text: 'There is no semantic difference in standard C.',
        isCorrect: false,
        explanation: 'They operate at completely different compilation stages (preprocessor vs compiler).',
      },
    ],
  },
  {
    id: 'quiz-v4',
    category: 'SCOPE',
    question: 'In the nested block example, why can "value" not be accessed outside the inner curly braces?',
    codeSnippet: `int number = 10;
{
    int value = 20;
    printf("%d %d\\n", number, value);
}
// printf("%d\\n", value); -> ERROR!`,
    options: [
      {
        id: 'opt-a',
        text: 'Variables declared inside a block have block scope and cease to exist outside that block.',
        isCorrect: true,
        explanation: 'Correct! Block scope limits the visibility and automatic lifetime of the identifier to the enclosing braces.',
      },
      {
        id: 'opt-b',
        text: 'Because value was not declared with the extern keyword.',
        isCorrect: false,
        explanation: 'extern is for external linkage across translation units, not block visibility.',
      },
      {
        id: 'opt-c',
        text: 'Because number is a constant.',
        isCorrect: false,
        explanation: 'number is a regular integer variable in the outer scope.',
      },
      {
        id: 'opt-d',
        text: 'Inner variables are only visible to the operating system kernel.',
        isCorrect: false,
        explanation: 'Scope is a C compiler language feature, not an OS privilege ring.',
      },
    ],
  },
  {
    id: 'quiz-v5',
    category: 'DATA TYPES & SIZEOF',
    question: 'Why should %zu be used when printing the result of sizeof in printf?',
    options: [
      {
        id: 'opt-a',
        text: 'Because sizeof returns a floating-point number.',
        isCorrect: false,
        explanation: 'sizeof yields an unsigned integer type, never a float.',
      },
      {
        id: 'opt-b',
        text: 'Because sizeof returns a value of type size_t, which is an implementation-defined unsigned integer type.',
        isCorrect: true,
        explanation: 'Correct! %zu is the standard format specifier designated for size_t in C99 and later.',
      },
      {
        id: 'opt-c',
        text: 'Because %d is deprecated in modern C.',
        isCorrect: false,
        explanation: '%d is still standard for signed int; %zu is specifically for size_t.',
      },
      {
        id: 'opt-d',
        text: 'Because %zu converts bytes into bits automatically.',
        isCorrect: false,
        explanation: 'sizeof always measures sizes in bytes (where 1 byte = sizeof(char)).',
      },
    ],
  },
  {
    id: 'quiz-v6',
    category: 'TYPE CONVERSION',
    question: 'What is the exact result of the explicit cast "int number = (int)7.9f;" and why?',
    options: [
      {
        id: 'opt-a',
        text: '8, because floating-point numbers automatically round up when cast.',
        isCorrect: false,
        explanation: 'C does not round to nearest integer during cast; it truncates.',
      },
      {
        id: 'opt-b',
        text: '7, because converting a positive floating-point value to an integer discards the fractional part (truncation).',
        isCorrect: true,
        explanation: 'Correct! Truncation discards everything past the decimal point without rounding.',
      },
      {
        id: 'opt-c',
        text: '7.9, because the original float precision is retained.',
        isCorrect: false,
        explanation: 'number is of type int, which cannot hold fractional components.',
      },
      {
        id: 'opt-d',
        text: 'Undefined behavior due to overflow.',
        isCorrect: false,
        explanation: '7.9 is well within the representation range of int.',
      },
    ],
  },
];

// -------------------------------------------------------------
// 5. Next Topics Navigation
// -------------------------------------------------------------
export const VARIABLES_NEXT_TOPICS: NextTopicItem[] = [
  {
    title: 'Constants and Literals in Depth',
    category: 'BASICS · LESSON 06',
    description: 'Explore const qualifiers, hexadecimal and octal integers, and character escape sequences.',
    path: '/theory',
    iconName: 'box',
  },
  {
    title: 'Operators and Expressions',
    category: 'OPERATORS · LESSON 07',
    description: 'Master arithmetic, relational, bitwise, and assignment operators with precedence rules.',
    path: '/theory',
    iconName: 'terminal',
  },
  {
    title: 'Input and Output (printf & scanf)',
    category: 'I/O · LESSON 08',
    description: 'Formatted output with placeholders and secure interactive input reading from standard input.',
    path: '/theory',
    iconName: 'layers',
  },
  {
    title: 'Control Flow (if, else, switch)',
    category: 'CONTROL · LESSON 09',
    description: 'Direct program execution pathways using conditional branching and jump tables.',
    path: '/theory',
    iconName: 'git-branch',
  },
];
