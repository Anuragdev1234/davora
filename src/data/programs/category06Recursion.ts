import type { ProgramCategory } from './types';

export const category06Recursion: ProgramCategory = {
  id: 'cat-recursion',
  index: 6,
  title: 'Recursion Programs',
  slug: 'recursion',
  description: 'Solve problems by reducing them into smaller recursive calls.',
  difficulty: 'Intermediate',
  filterTag: 'Functions',
  programs: [
    {
      id: 'rec-1',
      slug: 'factorial-using-recursion',
      indexInCategory: 1,
      title: 'Factorial Using Recursion',
      categorySlug: 'recursion',
      categoryTitle: 'Recursion Programs',
      difficulty: 'Intermediate',
      description: 'Compute factorial n! using recursive definition n * fact(n - 1) with base case 0! = 1.',
      code: `#include <stdio.h>

unsigned long long factorial(unsigned int n) {
    // Base Case: 0! = 1
    if (n == 0) {
        return 1ULL;
    }
    // Recursive Case: n! = n * (n - 1)!
    return n * factorial(n - 1);
}

int main(void) {
    unsigned int n = 5;
    printf("Factorial of %u = %llu\\n", n, factorial(n));
    return 0;
}`,
      output: `Factorial of 5 = 120`,
      explanation: {
        concept: 'Demonstrates classical single recursion: frames are pushed onto the call stack until n reaches 0, then results unwind via multiplication.',
        algorithm: [
          'Base case: if n == 0, return 1.',
          'Recursive step: return n * factorial(n - 1).',
        ],
        keyConstructs: ['Base case termination', 'Stack frame allocation', 'LIFO return unwinding'],
        complexity: 'Time: O(n), Space: O(n) call stack',
      },
      tags: ['Recursion', 'Factorial', 'Call Stack'],
    },
    {
      id: 'rec-2',
      slug: 'fibonacci-nth-term-recursion',
      indexInCategory: 2,
      title: 'Fibonacci Nth Term Using Recursion',
      categorySlug: 'recursion',
      categoryTitle: 'Recursion Programs',
      difficulty: 'Intermediate',
      description: 'Find the N-th term in the Fibonacci sequence using tree recursion.',
      code: `#include <stdio.h>

int fibonacci(int n) {
    // Base Cases: F(0) = 0, F(1) = 1
    if (n <= 0) return 0;
    if (n == 1) return 1;

    // Recursive Tree Call
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(void) {
    int n = 7;
    printf("Fibonacci term at position %d is %d\\n", n, fibonacci(n));
    return 0;
}`,
      output: `Fibonacci term at position 7 is 13`,
      explanation: {
        concept: 'Tree recursion: each call branches into two recursive sub-calls, forming an exponential binary call tree.',
        algorithm: [
          'Base cases: if n <= 0 return 0; if n == 1 return 1.',
          'Recursive step: return fibonacci(n - 1) + fibonacci(n - 2).',
        ],
        keyConstructs: ['Multiple recursion branches', 'Binary call tree', 'Base case pair'],
        complexity: 'Time: O(2^n), Space: O(n) call stack',
      },
      tags: ['Fibonacci', 'Tree Recursion', 'Call Tree'],
    },
    {
      id: 'rec-3',
      slug: 'sum-of-digits-using-recursion',
      indexInCategory: 3,
      title: 'Sum of Digits Using Recursion',
      categorySlug: 'recursion',
      categoryTitle: 'Recursion Programs',
      difficulty: 'Intermediate',
      description: 'Sum all digits in a number by peeling off the last digit recursively.',
      code: `#include <stdio.h>

int sumOfDigits(int n) {
    // Base Case: single digit or zero
    if (n == 0) {
        return 0;
    }
    // (n % 10) extracts last digit + recursive sum of remaining digits (n / 10)
    return (n % 10) + sumOfDigits(n / 10);
}

int main(void) {
    int num = 3845;
    printf("Sum of digits of %d = %d\\n", num, sumOfDigits(num));
    return 0;
}`,
      output: `Sum of digits of 3845 = 20`,
      explanation: {
        concept: 'Decomposes number into last digit (n % 10) plus the recursive solution to the smaller subproblem (n / 10).',
        algorithm: [
          'Base case: if n == 0, return 0.',
          'Recursive step: return (n % 10) + sumOfDigits(n / 10).',
        ],
        keyConstructs: ['Arithmetic reduction', 'Linear recursion', 'Tail unwinding'],
        complexity: 'Time: O(log10 n), Space: O(log10 n)',
      },
      tags: ['Digits', 'Recursion', 'Math'],
    },
    {
      id: 'rec-4',
      slug: 'power-using-recursion',
      indexInCategory: 4,
      title: 'Power (x^y) Using Recursion',
      categorySlug: 'recursion',
      categoryTitle: 'Recursion Programs',
      difficulty: 'Intermediate',
      description: 'Compute base raised to exponent using recursive reduction x * power(x, y - 1).',
      code: `#include <stdio.h>

long long power(int base, int exp) {
    // Base Case: x^0 = 1
    if (exp == 0) {
        return 1LL;
    }
    // Recursive Case: x^y = x * x^(y-1)
    return (long long)base * power(base, exp - 1);
}

int main(void) {
    int x = 2, y = 10;
    printf("%d^%d = %lld\\n", x, y, power(x, y));
    return 0;
}`,
      output: `2^10 = 1024`,
      explanation: {
        concept: 'Mathematical power defined recursively: base^exp = base * base^(exp - 1), with termination condition base^0 = 1.',
        algorithm: [
          'If exp == 0, return 1.',
          'Otherwise, return base * power(base, exp - 1).',
        ],
        keyConstructs: ['Exponential reduction', 'Base case 0', '64-bit integer product'],
        complexity: 'Time: O(exp), Space: O(exp)',
      },
      tags: ['Power', 'Exponent', 'Recursion'],
    },
    {
      id: 'rec-5',
      slug: 'tower-of-hanoi-recursion',
      indexInCategory: 5,
      title: 'Tower of Hanoi Using Recursion',
      categorySlug: 'recursion',
      categoryTitle: 'Recursion Programs',
      difficulty: 'Intermediate',
      description: 'Solve the classical Tower of Hanoi puzzle moving n disks between three pegs.',
      code: `#include <stdio.h>

void towerOfHanoi(int n, char fromPeg, char toPeg, char auxPeg) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", fromPeg, toPeg);
        return;
    }

    // Move n-1 disks from source to auxiliary using destination as buffer
    towerOfHanoi(n - 1, fromPeg, auxPeg, toPeg);

    // Move the nth disk from source to destination
    printf("Move disk %d from %c to %c\\n", n, fromPeg, toPeg);

    // Move n-1 disks from auxiliary to destination using source as buffer
    towerOfHanoi(n - 1, auxPeg, toPeg, fromPeg);
}

int main(void) {
    int disks = 3;
    printf("Tower of Hanoi solution for %d disks:\\n", disks);
    towerOfHanoi(disks, 'A', 'C', 'B');
    return 0;
}`,
      output: `Tower of Hanoi solution for 3 disks:
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C`,
      explanation: {
        concept: 'Divide-and-conquer paradigm: moving n disks decomposes into moving n-1 disks to auxiliary peg, moving 1 disk directly, and moving n-1 disks to final peg.',
        algorithm: [
          'Base case: if n == 1, move disk directly from source to destination.',
          'Step 1: recursively move n-1 disks from source to auxiliary.',
          'Step 2: move disk n from source to destination.',
          'Step 3: recursively move n-1 disks from auxiliary to destination.',
        ],
        keyConstructs: ['Divide and Conquer', 'Auxiliary parameter swapping', 'Recursive puzzle solving'],
        complexity: 'Time: O(2^n - 1) moves, Space: O(n) call stack',
      },
      tags: ['Tower of Hanoi', 'Classic Algorithm', 'Recursion'],
    },
  ],
};
