/**
 * DEVORA — Operators in C Curriculum & Interaction Data
 * Complete structured data covering:
 * - 6 Hero primary categories with colors, symbols, expressions, and connector targets
 * - Code examples and verified expected outputs
 * - Section A through K lesson content (arithmetic, relational, logical, assignment, bitwise,
 *   increment/decrement, ternary, other operators, precedence & associativity table, and quiz)
 */

export type OperatorCategoryId =
  | 'arithmetic'
  | 'assignment'
  | 'increment'
  | 'relational'
  | 'logical'
  | 'bitwise';

export interface HeroOperatorCategory {
  id: OperatorCategoryId;
  number: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentGlow: string;
  iconSymbol: string;
  chips: string[];
  codeTargetLines: number[];
  codeExpression: string;
  codeHighlightedSnippet: string;
  side: 'left' | 'right';
  explanation: string;
  taxonomyCode: string;
  taxonomyExample: {
    input: string;
    arrowText?: string;
    result: string;
    subNote?: string;
  };
}

export const HERO_OPERATOR_CATEGORIES: HeroOperatorCategory[] = [
  {
    id: 'arithmetic',
    number: '01',
    title: 'Arithmetic Operators',
    description: 'Perform mathematical calculations.',
    color: '#0055ff',
    bgColor: 'rgba(0, 85, 255, 0.05)',
    borderColor: 'rgba(0, 85, 255, 0.25)',
    accentGlow: 'rgba(0, 85, 255, 0.15)',
    iconSymbol: '+',
    chips: ['+', '−', '*', '/', '%'],
    codeTargetLines: [5, 6, 7, 8, 9],
    codeExpression: 'a + b',
    codeHighlightedSnippet: 'int sum = a + b;\nint diff = a - b;\nint prod = a * b;\nint div = a / b;\nint rem = a % b;',
    side: 'left',
    explanation:
      'Arithmetic operators evaluate binary mathematical expressions. Integer division truncates fractional components toward zero, while modulo (%) computes remainder.',
    taxonomyCode: 'int result = a + b;',
    taxonomyExample: {
      input: '10 + 5',
      result: '15',
    },
  },
  {
    id: 'assignment',
    number: '04',
    title: 'Assignment Operators',
    description: 'Assign values to variables. Compound operators combine an operation with assignment.',
    color: '#10a37f',
    bgColor: 'rgba(16, 163, 127, 0.05)',
    borderColor: 'rgba(16, 163, 127, 0.25)',
    accentGlow: 'rgba(16, 163, 127, 0.15)',
    iconSymbol: '=',
    chips: ['=', '+=', '-=', '*=', '/='],
    codeTargetLines: [4, 5],
    codeExpression: '=',
    codeHighlightedSnippet: 'int a = 10, b = 5;\nint sum = a + b;',
    side: 'left',
    explanation:
      'The simple assignment operator (=) stores the right-hand value into the left-hand lvalue. Compound assignment like a += 5 combines addition and storage in one expression.',
    taxonomyCode: 'a += 5;',
    taxonomyExample: {
      input: 'a = 10',
      arrowText: 'a += 5',
      result: '15',
    },
  },
  {
    id: 'increment',
    number: '06',
    title: 'Increment / Decrement',
    description: 'Increase or decrease a value by one.',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.05)',
    borderColor: 'rgba(139, 92, 246, 0.25)',
    accentGlow: 'rgba(139, 92, 246, 0.15)',
    iconSymbol: '++',
    chips: ['++', '--'],
    codeTargetLines: [4, 12],
    codeExpression: '10',
    codeHighlightedSnippet: 'int a = 10, b = 5;\n// ++a yields 11, a-- yields 10 then becomes 9',
    side: 'left',
    explanation:
      'Unary operators that alter the stored operand by ±1. Pre-increment (++a) updates before returning the value; post-increment (a++) yields the original value before mutating.',
    taxonomyCode: '++a;   a--;',
    taxonomyExample: {
      input: 'a = 5',
      result: '++a → 6 | a-- → 4',
      subNote: 'Pre vs post evaluation determines immediate value versus deferred side effect',
    },
  },
  {
    id: 'relational',
    number: '02',
    title: 'Relational Operators',
    description: 'Compare two values and return 1 (true) or 0 (false).',
    color: '#d97706',
    bgColor: 'rgba(217, 119, 6, 0.05)',
    borderColor: 'rgba(217, 119, 6, 0.25)',
    accentGlow: 'rgba(217, 119, 6, 0.15)',
    iconSymbol: '<>',
    chips: ['<', '>', '<=', '>=', '==', '!='],
    codeTargetLines: [11, 12],
    codeExpression: 'a > b',
    codeHighlightedSnippet: 'printf("a > b: %d\\n", a > b);\nprintf("a == b: %d\\n", a == b);',
    side: 'right',
    explanation:
      'Relational operators evaluate relative magnitude or equality. In C, true comparisons evaluate to integer 1, and false comparisons evaluate to integer 0.',
    taxonomyCode: 'int result = a > b;',
    taxonomyExample: {
      input: '10 > 5',
      result: '1',
    },
  },
  {
    id: 'logical',
    number: '03',
    title: 'Logical Operators',
    description: 'Combine conditions or reverse a condition.',
    color: '#ea580c',
    bgColor: 'rgba(234, 88, 12, 0.05)',
    borderColor: 'rgba(234, 88, 12, 0.25)',
    accentGlow: 'rgba(234, 88, 12, 0.15)',
    iconSymbol: '&&',
    chips: ['&&', '||', '!'],
    codeTargetLines: [13],
    codeExpression: 'a > 0 && b > 0',
    codeHighlightedSnippet: 'printf("(a > 0 && b > 0): %d\\n",\n       a > 0 && b > 0);',
    side: 'right',
    explanation:
      'Logical AND (&&) and OR (||) evaluate Boolean expressions with guaranteed short-circuit behavior: if the first operand suffices, the second is never evaluated.',
    taxonomyCode: 'int result = a && b;',
    taxonomyExample: {
      input: '(1 && 0)',
      result: '0',
    },
  },
  {
    id: 'bitwise',
    number: '05',
    title: 'Bitwise Operators',
    description: 'Perform operations on individual bits of integers.',
    color: '#9333ea',
    bgColor: 'rgba(147, 51, 234, 0.05)',
    borderColor: 'rgba(147, 51, 234, 0.25)',
    accentGlow: 'rgba(147, 51, 234, 0.15)',
    iconSymbol: '&',
    chips: ['&', '|', '^', '~', '<<', '>>'],
    codeTargetLines: [13, 14],
    codeExpression: 'Bitwise Operations',
    codeHighlightedSnippet: 'int and_res = a & b; // 10 (1010) & 5 (0101) = 0\nint or_res = a | b;  // 1010 | 0101 = 1111 (15)',
    side: 'right',
    explanation:
      'Bitwise operators operate directly on individual bits of integer operands. Useful in low-level systems programming, device driver registers, and masking.',
    taxonomyCode: 'int result = a & b;',
    taxonomyExample: {
      input: '0101 & 0011',
      arrowText: '(5 & 3)',
      result: '1',
      subNote: '0001 in 4-bit binary representation',
    },
  },
];

// Central Hero Example Program
export const HERO_CODE_EXAMPLE = `#include <stdio.h>

int main(void)
{
    int a = 10, b = 5;

    int sum = a + b;
    int diff = a - b;
    int prod = a * b;
    int div = a / b;
    int rem = a % b;

    printf("a > b: %d\\n", a > b);
    printf("a == b: %d\\n", a == b);
    printf("(a > 0 && b > 0): %d\\n",
           a > 0 && b > 0);

    return 0;
}`;

export const HERO_PROGRAM_OUTPUT = `a > b: 1
a == b: 0
(a > 0 && b > 0): 1`;

// Complete 15-Level Precedence and Associativity Table
export interface PrecedenceLevel {
  level: number;
  category: string;
  operators: string;
  associativity: 'Left-to-Right' | 'Right-to-Left';
  description: string;
}

export const PRECEDENCE_TABLE: PrecedenceLevel[] = [
  {
    level: 1,
    category: 'Postfix',
    operators: '()  []  ->  .  ++  --',
    associativity: 'Left-to-Right',
    description: 'Function call, array subscript, structure/union member access, postfix increment/decrement',
  },
  {
    level: 2,
    category: 'Unary',
    operators: '++  --  +  -  !  ~  (type)  *  &  sizeof',
    associativity: 'Right-to-Left',
    description: 'Prefix inc/dec, unary plus/minus, logical NOT, bitwise NOT, cast, dereference, address-of, size query',
  },
  {
    level: 3,
    category: 'Multiplicative',
    operators: '*  /  %',
    associativity: 'Left-to-Right',
    description: 'Multiplication, division, and modulo / remainder',
  },
  {
    level: 4,
    category: 'Additive',
    operators: '+  -',
    associativity: 'Left-to-Right',
    description: 'Binary addition and subtraction',
  },
  {
    level: 5,
    category: 'Shift',
    operators: '<<  >>',
    associativity: 'Left-to-Right',
    description: 'Bitwise left shift and bitwise right shift',
  },
  {
    level: 6,
    category: 'Relational',
    operators: '<  <=  >  >=',
    associativity: 'Left-to-Right',
    description: 'Less than, less than or equal, greater than, greater than or equal',
  },
  {
    level: 7,
    category: 'Equality',
    operators: '==  !=',
    associativity: 'Left-to-Right',
    description: 'Equal to and not equal to',
  },
  {
    level: 8,
    category: 'Bitwise AND',
    operators: '&',
    associativity: 'Left-to-Right',
    description: 'Bitwise AND operation on corresponding operand bits',
  },
  {
    level: 9,
    category: 'Bitwise XOR',
    operators: '^',
    associativity: 'Left-to-Right',
    description: 'Bitwise exclusive OR (yields 1 if bits differ)',
  },
  {
    level: 10,
    category: 'Bitwise OR',
    operators: '|',
    associativity: 'Left-to-Right',
    description: 'Bitwise inclusive OR (yields 1 if either bit is 1)',
  },
  {
    level: 11,
    category: 'Logical AND',
    operators: '&&',
    associativity: 'Left-to-Right',
    description: 'Logical AND with short-circuit evaluation',
  },
  {
    level: 12,
    category: 'Logical OR',
    operators: '||',
    associativity: 'Left-to-Right',
    description: 'Logical OR with short-circuit evaluation',
  },
  {
    level: 13,
    category: 'Conditional',
    operators: '?:',
    associativity: 'Right-to-Left',
    description: 'Ternary conditional operator: condition ? expr1 : expr2',
  },
  {
    level: 14,
    category: 'Assignment',
    operators: '=  +=  -=  *=  /=  %=  &=  ^=  |=  <<=  >>=',
    associativity: 'Right-to-Left',
    description: 'Simple assignment and compound arithmetic/bitwise assignments',
  },
  {
    level: 15,
    category: 'Comma',
    operators: ',',
    associativity: 'Left-to-Right',
    description: 'Evaluates expressions sequentially from left to right, returning the rightmost value',
  },
];

// Interactive Quiz Questions (Testing manuscript sections A through K)
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

export const OPERATORS_QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 'quiz-op-1',
    category: 'OPERATOR PRECEDENCE',
    question: 'What is the output of the following C program?',
    codeSnippet: `int result = 10 + 6 / 2;
printf("%d", result);`,
    options: [
      {
        id: 'opt-a',
        text: '8',
        isCorrect: false,
        explanation: 'Incorrect. Addition does not precede division without parentheses.',
      },
      {
        id: 'opt-b',
        text: '13',
        isCorrect: true,
        explanation: 'Correct! Division (/) has higher precedence than addition (+), so 6 / 2 evaluates to 3 first. Then 10 + 3 yields 13.',
      },
      {
        id: 'opt-c',
        text: '16',
        isCorrect: false,
        explanation: 'Incorrect. If addition were evaluated first ((10 + 6) / 2), the answer would be 8, not 16.',
      },
      {
        id: 'opt-d',
        text: '20',
        isCorrect: false,
        explanation: 'Incorrect. 10 + 6 / 2 equals 13 under C precedence rules.',
      },
    ],
  },
  {
    id: 'quiz-op-2',
    category: 'RELATIONAL OPERATORS',
    question: 'What value is stored in the integer variable "valid" after evaluating "int valid = (5 > 2);"?',
    options: [
      {
        id: 'opt-a',
        text: 'true (a distinct boolean type keyword in C89)',
        isCorrect: false,
        explanation: 'In C, relational operators yield an integer value of 1 or 0, not a language-level boolean literal in C89.',
      },
      {
        id: 'opt-b',
        text: '1',
        isCorrect: true,
        explanation: 'Correct! In standard C, the result of a true relational comparison is guaranteed to be integer 1.',
      },
      {
        id: 'opt-c',
        text: '5',
        isCorrect: false,
        explanation: 'Relational operators do not return the operand values; they return 1 for true or 0 for false.',
      },
      {
        id: 'opt-d',
        text: 'Undefined behavior',
        isCorrect: false,
        explanation: '5 > 2 is a well-defined comparison between integer constants.',
      },
    ],
  },
  {
    id: 'quiz-op-3',
    category: 'BITWISE VS LOGICAL',
    question: 'What is the exact result of the 4-bit operation (5 & 3) in decimal?',
    options: [
      {
        id: 'opt-a',
        text: '1, because 0101 (5) bitwise AND 0011 (3) equals 0001 (1).',
        isCorrect: true,
        explanation: 'Correct! Bitwise AND compares bit by bit: only bit position 0 is set in both 5 and 3, yielding 1.',
      },
      {
        id: 'opt-b',
        text: '7, because bitwise OR was evaluated instead.',
        isCorrect: false,
        explanation: '5 | 3 produces 7, but the & operator performs bitwise AND.',
      },
      {
        id: 'opt-c',
        text: '15, because all bits are multiplied.',
        isCorrect: false,
        explanation: 'Bitwise AND is not multiplication.',
      },
      {
        id: 'opt-d',
        text: '0, because 5 and 3 are distinct prime numbers.',
        isCorrect: false,
        explanation: 'Primality does not determine bitwise binary overlap.',
      },
    ],
  },
  {
    id: 'quiz-op-4',
    category: 'INCREMENT OPERATORS',
    question: 'In the statements "int a = 5; int b = a++;", what are the resulting values of a and b?',
    codeSnippet: `int a = 5;
int b = a++;
printf("a = %d, b = %d\\n", a, b);`,
    options: [
      {
        id: 'opt-a',
        text: 'a = 6, b = 6',
        isCorrect: false,
        explanation: 'That would be the result of pre-increment (++a). Post-increment yields the old value before updating.',
      },
      {
        id: 'opt-b',
        text: 'a = 6, b = 5',
        isCorrect: true,
        explanation: 'Correct! Post-increment (a++) evaluates to the current value of a (5), which is assigned to b, and then increments a to 6.',
      },
      {
        id: 'opt-c',
        text: 'a = 5, b = 5',
        isCorrect: false,
        explanation: 'a is definitely incremented by 1 during evaluation.',
      },
      {
        id: 'opt-d',
        text: 'a = 5, b = 6',
        isCorrect: false,
        explanation: 'Post-increment never increments the assigned value while leaving the variable unchanged.',
      },
    ],
  },
  {
    id: 'quiz-op-5',
    category: 'LOGICAL SHORT-CIRCUIT',
    question: 'Why is the second condition (x++ > 0) never evaluated in "int x = 0; if (0 && (x++ > 0))"?',
    options: [
      {
        id: 'opt-a',
        text: 'Because logical AND (&&) performs short-circuit evaluation: if the left operand is false (0), the result is false regardless.',
        isCorrect: true,
        explanation: 'Correct! C guarantees left-to-right evaluation for && and ||, skipping the right operand if the outcome is already determined.',
      },
      {
        id: 'opt-b',
        text: 'Because parentheses disable evaluation.',
        isCorrect: false,
        explanation: 'Parentheses alter expression grouping, but short-circuiting is a semantic rule of the && operator.',
      },
      {
        id: 'opt-c',
        text: 'Because x is zero, triggering a compiler error.',
        isCorrect: false,
        explanation: '0 is a valid operand, and checking against zero does not cause a compiler error.',
      },
      {
        id: 'opt-d',
        text: 'Both sides are always evaluated in C regardless of operator.',
        isCorrect: false,
        explanation: '&&, ||, ?:, and , are special sequence points that enforce guaranteed sequential evaluation order.',
      },
    ],
  },
  {
    id: 'quiz-op-6',
    category: 'TERNARY OPERATOR',
    question: 'What does the expression "int max = (a > b) ? a : b;" evaluate to when a = 25 and b = 40?',
    options: [
      {
        id: 'opt-a',
        text: '25',
        isCorrect: false,
        explanation: 'Since 25 > 40 is false (0), the ternary operator selects the expression after the colon (b).',
      },
      {
        id: 'opt-b',
        text: '40',
        isCorrect: true,
        explanation: 'Correct! The condition (25 > 40) is false, so the expression evaluates to the false-branch expression b (40).',
      },
      {
        id: 'opt-c',
        text: '1',
        isCorrect: false,
        explanation: 'The ternary operator returns the evaluated branch expression (b = 40), not the boolean outcome.',
      },
      {
        id: 'opt-d',
        text: '0',
        isCorrect: false,
        explanation: 'It evaluates to the value of b (40).',
      },
    ],
  },
];

// Next Topics Navigation
export interface NextTopicItem {
  title: string;
  category: string;
  description: string;
  path: string;
  iconName: 'terminal' | 'layers' | 'git-branch' | 'box';
}

export const OPERATORS_NEXT_TOPICS: NextTopicItem[] = [
  {
    title: 'Input and Output (printf & scanf)',
    category: 'I/O · LESSON 07',
    description: 'Formatted output placeholders, streams, and secure interactive input reading from standard input.',
    path: '/theory',
    iconName: 'terminal',
  },
  {
    title: 'Control Flow (if, else, switch)',
    category: 'CONTROL · LESSON 08',
    description: 'Direct program execution pathways using conditional branching, decision trees, and jump tables.',
    path: '/theory',
    iconName: 'git-branch',
  },
  {
    title: 'Loops and Iteration (for, while)',
    category: 'LOOPS · LESSON 09',
    description: 'Execute repetitive algorithmic operations with loop invariants, break, and continue statements.',
    path: '/theory',
    iconName: 'layers',
  },
  {
    title: 'Functions & Modular Architecture',
    category: 'FUNCTIONS · LESSON 10',
    description: 'Encapsulate computational logic into reusable routines with parameter passing and call stacks.',
    path: '/theory',
    iconName: 'box',
  },
];
