import type { ProgramCategory } from './types';

export const category03Loops: ProgramCategory = {
  id: 'cat-loops',
  index: 3,
  title: 'Loop Programs',
  slug: 'loops',
  description: 'Practice repetition, counting, accumulation, and loop control.',
  difficulty: 'Beginner',
  filterTag: 'Loops',
  programs: [
    {
      id: 'loop-1',
      slug: 'sum-of-first-n-natural-numbers',
      indexInCategory: 1,
      title: 'Sum of First N Natural Numbers',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Compute the summation 1 + 2 + ... + N using a for loop.',
      code: `#include <stdio.h>

int main(void) {
    int n = 10;
    int sum = 0;

    for (int i = 1; i <= n; i++) {
        sum += i;
    }

    printf("Sum of first %d natural numbers = %d\\n", n, sum);
    return 0;
}`,
      output: `Sum of first 10 natural numbers = 55`,
      explanation: {
        concept: 'Iterates from 1 through N, adding each integer to an accumulator variable initialized to 0.',
        algorithm: [
          'Initialize sum = 0.',
          'Execute for loop from i = 1 to n.',
          'Add i to sum on each iteration.',
          'Print total sum.',
        ],
        keyConstructs: ['For loop accumulator', 'Compound addition (+=)', 'Integer output formatting'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['For Loop', 'Summation', 'Arithmetic'],
    },
    {
      id: 'loop-2',
      slug: 'multiplication-table-of-a-number',
      indexInCategory: 2,
      title: 'Multiplication Table of a Number',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Print mathematical multiplication table for a number from 1 to 10.',
      code: `#include <stdio.h>

int main(void) {
    int n = 7;

    printf("Multiplication Table for %d:\\n", n);
    for (int i = 1; i <= 10; i++) {
        printf("%d x %2d = %2d\\n", n, i, n * i);
    }

    return 0;
}`,
      output: `Multiplication Table for 7:
7 x  1 =  7
7 x  2 = 14
7 x  3 = 21
7 x  4 = 28
7 x  5 = 35
7 x  6 = 42
7 x  7 = 49
7 x  8 = 56
7 x  9 = 63
7 x 10 = 70`,
      explanation: {
        concept: 'Demonstrates loop iteration combined with formatted tabular output using %2d field width specifiers.',
        algorithm: [
          'Set number n.',
          'Loop i from 1 to 10.',
          'Print formatted multiplication product n * i.',
        ],
        keyConstructs: ['Width formatting (%2d)', 'Product computation', 'Sequential iteration'],
        complexity: 'Time: O(1) (fixed 10 iterations), Space: O(1)',
      },
      tags: ['Multiplication', 'Formatting', 'Loops'],
    },
    {
      id: 'loop-3',
      slug: 'print-even-numbers-1-to-50',
      indexInCategory: 3,
      title: 'Print Even Numbers between 1 and 50',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Print all even numbers in the range [1..50] using step increments.',
      code: `#include <stdio.h>

int main(void) {
    printf("Even numbers between 1 and 50:\\n");

    for (int i = 2; i <= 50; i += 2) {
        printf("%d ", i);
        if (i % 20 == 0) printf("\\n");
    }
    printf("\\n");

    return 0;
}`,
      output: `Even numbers between 1 and 50:
2 4 6 8 10 12 14 16 18 20 
22 24 26 28 30 32 34 36 38 40 
42 44 46 48 50 `,
      explanation: {
        concept: 'Uses a step size of 2 (i += 2) starting from 2 instead of testing every number with modulo, cutting iterations in half.',
        algorithm: [
          'Initialize i = 2.',
          'While i <= 50, print i.',
          'Increment i by 2.',
        ],
        keyConstructs: ['Step increment (i += 2)', 'Range filtering', 'Performance optimization'],
        complexity: 'Time: O(n/2), Space: O(1)',
      },
      tags: ['Even Numbers', 'Step Loops', 'Iteration'],
    },
    {
      id: 'loop-4',
      slug: 'count-digits-of-a-number',
      indexInCategory: 4,
      title: 'Count Digits of a Number',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Count how many digits are present in an integer.',
      code: `#include <stdio.h>

int main(void) {
    int n = 987654;
    int count = 0;
    int temp = n;

    if (temp == 0) {
        count = 1;
    } else {
        while (temp != 0) {
            count++;
            temp /= 10;
        }
    }

    printf("Number %d has %d digits.\\n", n, count);
    return 0;
}`,
      output: `Number 987654 has 6 digits.`,
      explanation: {
        concept: 'Counts the number of divisions by 10 required to reduce the integer to zero.',
        algorithm: [
          'Check zero edge case (0 has 1 digit).',
          'While number is not 0, increment counter and divide by 10.',
          'Output result.',
        ],
        keyConstructs: ['Integer division by 10', 'Edge case guard for 0', 'While loop counter'],
        complexity: 'Time: O(log10 n), Space: O(1)',
      },
      tags: ['Counting', 'Digits', 'While Loop'],
    },
    {
      id: 'loop-5',
      slug: 'sum-of-digits-of-a-number',
      indexInCategory: 5,
      title: 'Sum of Digits of a Number',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Calculate the sum of all individual digits in a number.',
      code: `#include <stdio.h>

int main(void) {
    int n = 4567;
    int sum = 0;
    int temp = n;

    while (temp > 0) {
        sum += temp % 10;
        temp /= 10;
    }

    printf("Sum of digits of %d is %d\\n", n, sum);
    return 0;
}`,
      output: `Sum of digits of 4567 is 22`,
      explanation: {
        concept: 'Extracts rightmost digit with modulo 10 and adds it to running sum, then truncates with integer division.',
        algorithm: [
          'Extract digit = temp % 10.',
          'Add digit to sum.',
          'Divide temp by 10.',
          'Repeat until temp == 0.',
        ],
        keyConstructs: ['Modulo 10 arithmetic', 'Running total accumulator', 'While loop'],
        complexity: 'Time: O(log10 n), Space: O(1)',
      },
      tags: ['Digits', 'Summation', 'Arithmetic'],
    },
    {
      id: 'loop-6',
      slug: 'find-factors-of-a-number',
      indexInCategory: 6,
      title: 'Find Factors of a Number',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Find and display all positive divisors (factors) of a number.',
      code: `#include <stdio.h>

int main(void) {
    int n = 60;

    printf("Factors of %d are: ", n);
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) {
            printf("%d ", i);
        }
    }
    printf("\\n");

    return 0;
}`,
      output: `Factors of 60 are: 1 2 3 4 5 6 10 12 15 20 30 60 `,
      explanation: {
        concept: 'Tests every integer from 1 to n to check if it divides n without leaving a remainder (n % i == 0).',
        algorithm: [
          'Loop i from 1 to n.',
          'If n % i == 0, print i.',
        ],
        keyConstructs: ['Divisibility check (% == 0)', 'Linear iteration', 'Factor discovery'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Divisors', 'Factors', 'Math'],
    },
    {
      id: 'loop-7',
      slug: 'check-power-of-a-number',
      indexInCategory: 7,
      title: 'Check Power of a Number (x^y)',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Compute base raised to exponent (x^y) using repetitive multiplication.',
      code: `#include <stdio.h>

int main(void) {
    int base = 3;
    int exp = 4;
    long long result = 1;

    for (int i = 1; i <= exp; i++) {
        result *= base;
    }

    printf("%d^%d = %lld\\n", base, exp, result);
    return 0;
}`,
      output: `3^4 = 81`,
      explanation: {
        concept: 'Exponentiation by repeated multiplication: multiplying 1 by the base exactly exp times.',
        algorithm: [
          'Initialize result = 1.',
          'Loop exp times, multiplying result by base.',
          'Print final power value.',
        ],
        keyConstructs: ['Multiplication loop', '64-bit integer accumulator', 'Power algorithm'],
        complexity: 'Time: O(exp), Space: O(1)',
      },
      tags: ['Power', 'Exponent', 'Multiplication'],
    },
    {
      id: 'loop-8',
      slug: 'find-lcm-using-while-loop',
      indexInCategory: 8,
      title: 'Find LCM Using While Loop',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Compute Lowest Common Multiple of two integers using a while loop search.',
      code: `#include <stdio.h>

int main(void) {
    int a = 12, b = 15;
    int max = (a > b) ? a : b;

    while (1) {
        if (max % a == 0 && max % b == 0) {
            printf("LCM of %d and %d is %d\\n", a, b, max);
            break;
        }
        max++;
    }

    return 0;
}`,
      output: `LCM of 12 and 15 is 60`,
      explanation: {
        concept: 'Starts search from max(a, b) and tests sequentially until a number divisible by both is found.',
        algorithm: [
          'Find max of a and b.',
          'Infinite while loop increments max.',
          'When max is divisible by both a and b, it is the LCM. Break and print.',
        ],
        keyConstructs: ['Ternary operator', 'Infinite while loop with break', 'Logical AND (&&)'],
        complexity: 'Time: O(LCM(a, b)), Space: O(1)',
      },
      tags: ['LCM', 'While Loop', 'Break'],
    },
    {
      id: 'loop-9',
      slug: 'print-ascii-values-a-to-z',
      indexInCategory: 9,
      title: 'Print ASCII Values of A to Z',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Iterate over character types and print their underlying numerical ASCII codes.',
      code: `#include <stdio.h>

int main(void) {
    printf("Character to ASCII mapping (A-Z):\\n");

    for (char c = 'A'; c <= 'Z'; c++) {
        printf("'%c' = %d\\t", c, (int)c);
        if ((c - 'A' + 1) % 5 == 0) printf("\\n");
    }
    printf("\\n");

    return 0;
}`,
      output: `Character to ASCII mapping (A-Z):
'A' = 65	'B' = 66	'C' = 67	'D' = 68	'E' = 69	
'F' = 70	'G' = 71	'H' = 72	'I' = 73	'J' = 74	
'K' = 75	'L' = 76	'M' = 77	'N' = 78	'O' = 79	
'P' = 80	'Q' = 81	'R' = 82	'S' = 83	'T' = 84	
'U' = 85	'V' = 86	'W' = 87	'X' = 88	'Y' = 89	
'Z' = 90	`,
      explanation: {
        concept: 'In C, char values are small integers representing ASCII character encoding codes (65 for A through 90 for Z).',
        algorithm: [
          'Loop char c from A to Z.',
          'Print character %c and cast to integer %d.',
        ],
        keyConstructs: ['Character arithmetic', 'Type casting (char to int)', 'ASCII table'],
        complexity: 'Time: O(26), Space: O(1)',
      },
      tags: ['ASCII', 'Characters', 'Types'],
    },
    {
      id: 'loop-10',
      slug: 'check-number-sign-do-while',
      indexInCategory: 10,
      title: 'Check Number Sign using Do-While Loop',
      categorySlug: 'loops',
      categoryTitle: 'Loop Programs',
      difficulty: 'Beginner',
      description: 'Process number classification guaranteeing at least one execution pass.',
      code: `#include <stdio.h>

int main(void) {
    int testValues[] = {-15, 0, 42};
    int i = 0;

    do {
        int val = testValues[i];
        if (val > 0) {
            printf("%d is Positive\\n", val);
        } else if (val < 0) {
            printf("%d is Negative\\n", val);
        } else {
            printf("%d is Zero\\n", val);
        }
        i++;
    } while (i < 3);

    return 0;
}`,
      output: `-15 is Negative
0 is Zero
42 is Positive`,
      explanation: {
        concept: 'A do-while loop always executes its loop body at least once before evaluating its condition.',
        algorithm: [
          'Execute loop body immediately.',
          'Classify number as positive, negative, or zero.',
          'Increment index.',
          'Test while condition at the bottom.',
        ],
        keyConstructs: ['Post-tested loop (do-while)', 'Multi-branch if-else ladder', 'Array iteration'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Do-While', 'Conditionals', 'Loops'],
    },
  ],
};
