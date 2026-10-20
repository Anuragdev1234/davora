import type { ProgramCategory } from './types';

export const category02NumberLogic: ProgramCategory = {
  id: 'cat-number-logic',
  index: 2,
  title: 'Number Logic Programs',
  slug: 'number-logic',
  description: 'Reverse numbers, test number properties, and solve mathematical problems.',
  difficulty: 'Beginner',
  filterTag: 'Number Logic',
  programs: [
    {
      id: 'num-1',
      slug: 'reverse-a-number',
      indexInCategory: 1,
      title: 'Reverse a Number',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Reverse the digits of a given integer using modulo and division arithmetic.',
      code: `#include <stdio.h>

int main(void) {
    int n = 12345;
    int reversed = 0;
    int temp = n;

    while (temp != 0) {
        int remainder = temp % 10;
        reversed = reversed * 10 + remainder;
        temp /= 10;
    }

    printf("Original: %d\\n", n);
    printf("Reversed: %d\\n", reversed);

    return 0;
}`,
      output: `Original: 12345
Reversed: 54321`,
      explanation: {
        concept: 'Extracts the last digit using modulo 10 (n % 10), shifts existing accumulated digits left by multiplying by 10, and removes the processed digit with integer division (n / 10).',
        algorithm: [
          'Initialize reversed = 0 and copy input n to temp.',
          'While temp != 0: extract digit (remainder = temp % 10).',
          'Multiply reversed by 10 and add remainder.',
          'Divide temp by 10.',
          'Print the reversed number.',
        ],
        keyConstructs: ['Modulo arithmetic (% 10)', 'Integer truncation (/ 10)', 'While loop termination'],
        complexity: 'Time: O(log10 n), Space: O(1)',
      },
      tags: ['Math', 'Reversal', 'Arithmetic'],
    },
    {
      id: 'num-2',
      slug: 'palindrome-number-check',
      indexInCategory: 2,
      title: 'Palindrome Number Check',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Check if an integer reads the same forwards and backwards.',
      code: `#include <stdio.h>

int main(void) {
    int n = 12321;
    int original = n;
    int reversed = 0;

    int temp = n;
    while (temp > 0) {
        reversed = reversed * 10 + (temp % 10);
        temp /= 10;
    }

    if (original == reversed) {
        printf("%d is a Palindrome Number\\n", original);
    } else {
        printf("%d is NOT a Palindrome Number\\n", original);
    }

    return 0;
}`,
      output: `12321 is a Palindrome Number`,
      explanation: {
        concept: 'Reverses the number and compares the reversed result with the preserved original value.',
        algorithm: [
          'Store original = n.',
          'Reverse digits of n using the while loop algorithm.',
          'Compare original == reversed.',
          'Print whether it is a palindrome.',
        ],
        keyConstructs: ['State preservation', 'Equality operator (==)', 'Conditional branching'],
        complexity: 'Time: O(log10 n), Space: O(1)',
      },
      tags: ['Palindrome', 'Conditionals', 'Math'],
    },
    {
      id: 'num-3',
      slug: 'armstrong-number-check',
      indexInCategory: 3,
      title: 'Armstrong Number Check',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Check if sum of cubes of digits equals the original number (for 3-digit number).',
      code: `#include <stdio.h>

int main(void) {
    int n = 153;
    int original = n;
    int sum = 0;

    int temp = n;
    while (temp > 0) {
        int d = temp % 10;
        sum += d * d * d;
        temp /= 10;
    }

    if (sum == original) {
        printf("%d is an Armstrong Number\\n", original);
    } else {
        printf("%d is NOT an Armstrong Number\\n", original);
    }

    return 0;
}`,
      output: `153 is an Armstrong Number`,
      explanation: {
        concept: 'An Armstrong number (e.g. 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153) equals the sum of its own digits each raised to the power of the number of digits.',
        algorithm: [
          'Store original number.',
          'Extract each digit d via temp % 10.',
          'Accumulate d * d * d into sum.',
          'Divide temp by 10.',
          'Compare sum == original.',
        ],
        keyConstructs: ['Digit extraction', 'Sum accumulation', 'Exponentiation logic'],
        complexity: 'Time: O(log10 n), Space: O(1)',
      },
      tags: ['Armstrong', 'Math', 'Accumulation'],
    },
    {
      id: 'num-4',
      slug: 'prime-number-check',
      indexInCategory: 4,
      title: 'Prime Number Check',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Determine whether a positive integer is prime or composite.',
      code: `#include <stdio.h>

int main(void) {
    int n = 29;
    int isPrime = 1;

    if (n <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = 0;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a Prime Number\\n", n);
    } else {
        printf("%d is NOT a Prime Number\\n", n);
    }

    return 0;
}`,
      output: `29 is a Prime Number`,
      explanation: {
        concept: 'A prime has no positive divisors other than 1 and itself. We test divisibility up to sqrt(n) (i * i <= n) for O(sqrt(n)) efficiency.',
        algorithm: [
          'If n <= 1, it is not prime.',
          'Loop i from 2 up to sqrt(n) (i * i <= n).',
          'If n % i == 0, mark not prime and break early.',
          'If no divisor is found, number is prime.',
        ],
        keyConstructs: ['Square root bound optimization', 'Break statement for early exit', 'Boolean flag variable'],
        complexity: 'Time: O(sqrt(n)), Space: O(1)',
      },
      tags: ['Prime', 'Efficiency', 'Math'],
    },
    {
      id: 'num-5',
      slug: 'factorial-calculation',
      indexInCategory: 5,
      title: 'Factorial Calculation',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Compute the factorial of a non-negative integer using an iterative accumulator.',
      code: `#include <stdio.h>

int main(void) {
    int n = 6;
    unsigned long long fact = 1;

    for (int i = 1; i <= n; i++) {
        fact *= i;
    }

    printf("Factorial of %d = %llu\\n", n, fact);

    return 0;
}`,
      output: `Factorial of 6 = 720`,
      explanation: {
        concept: 'Factorial n! is the product 1 * 2 * ... * n. Uses unsigned long long to avoid integer overflow for larger values.',
        algorithm: [
          'Initialize product fact = 1.',
          'Loop i from 1 to n.',
          'Multiply fact by i.',
          'Print result with %llu format specifier.',
        ],
        keyConstructs: ['64-bit integer type (unsigned long long)', 'Multiplicative accumulator', 'Range-based loop'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Factorial', 'Multiplication', 'Data Types'],
    },
    {
      id: 'num-6',
      slug: 'fibonacci-series-generation',
      indexInCategory: 6,
      title: 'Fibonacci Series Generation',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Generate the first N terms of the Fibonacci sequence.',
      code: `#include <stdio.h>

int main(void) {
    int n = 8;
    int a = 0, b = 1;

    printf("First %d Fibonacci numbers: ", n);

    for (int i = 1; i <= n; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b;
        b = next;
    }
    printf("\\n");

    return 0;
}`,
      output: `First 8 Fibonacci numbers: 0 1 1 2 3 5 8 13 `,
      explanation: {
        concept: 'Each Fibonacci term is the sum of the preceding two terms (F(n) = F(n-1) + F(n-2)), starting from 0 and 1.',
        algorithm: [
          'Initialize base terms a = 0 and b = 1.',
          'Loop for n iterations.',
          'Print current term a.',
          'Compute next = a + b, then update a = b and b = next.',
        ],
        keyConstructs: ['Variable shifting', 'Iterative recurrence relation', 'State update'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Fibonacci', 'Series', 'Recurrence'],
    },
    {
      id: 'num-7',
      slug: 'strong-number-check',
      indexInCategory: 7,
      title: 'Strong Number Check',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Check if sum of factorials of digits equals the original number.',
      code: `#include <stdio.h>

int main(void) {
    int n = 145;
    int original = n;
    int sum = 0;

    int temp = n;
    while (temp > 0) {
        int d = temp % 10;
        int fact = 1;
        for (int i = 1; i <= d; i++) {
            fact *= i;
        }
        sum += fact;
        temp /= 10;
    }

    if (sum == original) {
        printf("%d is a Strong Number\\n", original);
    } else {
        printf("%d is NOT a Strong Number\\n", original);
    }

    return 0;
}`,
      output: `145 is a Strong Number`,
      explanation: {
        concept: 'A number is Strong (or Krishnamurthy number) if the sum of the factorials of its digits equals the number itself (e.g. 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145).',
        algorithm: [
          'Extract each digit d from n.',
          'Calculate factorial of d.',
          'Add factorial to running sum.',
          'Compare sum with original.',
        ],
        keyConstructs: ['Nested loop inside digit extraction', 'Factorial helper computation', 'Number analysis'],
        complexity: 'Time: O(d * log10 n), Space: O(1)',
      },
      tags: ['Strong Number', 'Math', 'Factorial'],
    },
    {
      id: 'num-8',
      slug: 'perfect-number-check',
      indexInCategory: 8,
      title: 'Perfect Number Check',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Check if sum of proper positive divisors equals the number.',
      code: `#include <stdio.h>

int main(void) {
    int n = 28;
    int sum = 0;

    for (int i = 1; i < n; i++) {
        if (n % i == 0) {
            sum += i;
        }
    }

    if (sum == n) {
        printf("%d is a Perfect Number\\n", n);
    } else {
        printf("%d is NOT a Perfect Number\\n", n);
    }

    return 0;
}`,
      output: `28 is a Perfect Number`,
      explanation: {
        concept: 'A perfect number is equal to the sum of its proper divisors (excluding itself). For 28: 1 + 2 + 4 + 7 + 14 = 28.',
        algorithm: [
          'Loop i from 1 to n - 1.',
          'If n is divisible by i (n % i == 0), add i to sum.',
          'Compare sum == n.',
        ],
        keyConstructs: ['Proper divisor testing', 'Sum accumulation', 'Exact equality check'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Perfect Number', 'Divisors', 'Math'],
    },
    {
      id: 'num-9',
      slug: 'gcd-and-lcm-of-two-numbers',
      indexInCategory: 9,
      title: 'GCD and LCM of Two Numbers',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Compute Greatest Common Divisor using Euclidean algorithm and find LCM.',
      code: `#include <stdio.h>

int main(void) {
    int a = 36, b = 60;
    int x = a, y = b;

    // Euclidean algorithm for GCD
    while (y != 0) {
        int temp = y;
        y = x % y;
        x = temp;
    }
    int gcd = x;
    long long lcm = ((long long)a * b) / gcd;

    printf("Numbers: %d, %d\\n", a, b);
    printf("GCD: %d\\n", gcd);
    printf("LCM: %lld\\n", lcm);

    return 0;
}`,
      output: `Numbers: 36, 60
GCD: 60... wait:
GCD: 12
LCM: 180`,
      explanation: {
        concept: 'Euclidean reduction replaces (x, y) with (y, x % y) until y becomes 0. Then LCM is computed via (a * b) / GCD.',
        algorithm: [
          'Keep reducing x and y via y = x % y until y == 0.',
          'The remaining non-zero x is the GCD.',
          'Compute LCM = (a * b) / GCD.',
        ],
        keyConstructs: ['Euclidean algorithm', 'Mathematical identity LCM * GCD = a * b', '64-bit cast'],
        complexity: 'Time: O(log(min(a, b))), Space: O(1)',
      },
      tags: ['GCD', 'LCM', 'Euclid'],
    },
    {
      id: 'num-10',
      slug: 'decimal-to-binary-conversion',
      indexInCategory: 10,
      title: 'Decimal to Binary Conversion',
      categorySlug: 'number-logic',
      categoryTitle: 'Number Logic Programs',
      difficulty: 'Beginner',
      description: 'Convert a decimal integer into its base-2 binary representation.',
      code: `#include <stdio.h>

int main(void) {
    int decimal = 43;
    int binary[32];
    int index = 0;
    int temp = decimal;

    if (temp == 0) {
        printf("Binary of 0 is 0\\n");
        return 0;
    }

    while (temp > 0) {
        binary[index++] = temp % 2;
        temp /= 2;
    }

    printf("Decimal %d in Binary: ", decimal);
    for (int i = index - 1; i >= 0; i--) {
        printf("%d", binary[i]);
    }
    printf("\\n");

    return 0;
}`,
      output: `Decimal 43 in Binary: 101011`,
      explanation: {
        concept: 'Repeatedly divides by 2, storing the remainders (bits). The bits are then read in reverse order (MSB to LSB).',
        algorithm: [
          'Divide decimal number by 2 and push remainder into array.',
          'Repeat until quotient is 0.',
          'Print array elements in reverse order.',
        ],
        keyConstructs: ['Base-2 arithmetic', 'Array buffering', 'Reverse traversal'],
        complexity: 'Time: O(log2 n), Space: O(log2 n)',
      },
      tags: ['Binary', 'Base Conversion', 'Arrays'],
    },
  ],
};
