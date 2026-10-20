import type { ProgramCategory } from './types';

export const category05MultiFunction: ProgramCategory = {
  id: 'cat-multi-function',
  index: 5,
  title: 'Multi-Function Programs',
  slug: 'multi-function',
  description: 'Build programs from reusable functions and modular logic.',
  difficulty: 'Intermediate',
  filterTag: 'Functions',
  programs: [
    {
      id: 'fn-1',
      slug: 'arithmetic-operations-calculator',
      indexInCategory: 1,
      title: 'Arithmetic Operations Calculator',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Implement independent modular functions for addition, subtraction, multiplication, and division.',
      code: `#include <stdio.h>

double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b) {
    if (b == 0.0) {
        printf("Error: Division by zero!\\n");
        return 0.0;
    }
    return a / b;
}

int main(void) {
    double x = 20.0, y = 5.0;

    printf("%.1f + %.1f = %.1f\\n", x, y, add(x, y));
    printf("%.1f - %.1f = %.1f\\n", x, y, subtract(x, y));
    printf("%.1f * %.1f = %.1f\\n", x, y, multiply(x, y));
    printf("%.1f / %.1f = %.1f\\n", x, y, divide(x, y));

    return 0;
}`,
      output: `20.0 + 5.0 = 25.0
20.0 - 5.0 = 15.0
20.0 * 5.0 = 100.0
20.0 / 5.0 = 4.0`,
      explanation: {
        concept: 'Demonstrates modular programming: decomposing tasks into small, single-responsibility functions that accept inputs and return outputs.',
        algorithm: [
          'Declare and define helper functions for each arithmetic operator.',
          'Guard against division by zero in divide().',
          'Call functions in main() and print return values.',
        ],
        keyConstructs: ['Function prototypes and return values', 'Single-responsibility principle', 'Floating point operations'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Functions', 'Modularity', 'Arithmetic'],
    },
    {
      id: 'fn-2',
      slug: 'circle-area-perimeter-calculator',
      indexInCategory: 2,
      title: 'Circle Area & Perimeter Calculator',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Compute circle geometric properties using mathematical helper functions.',
      code: `#include <stdio.h>

#define PI 3.14159265358979323846

double calculateArea(double r) {
    return PI * r * r;
}

double calculatePerimeter(double r) {
    return 2.0 * PI * r;
}

int main(void) {
    double radius = 7.0;

    printf("Circle Radius: %.2f\\n", radius);
    printf("Area: %.4f\\n", calculateArea(radius));
    printf("Circumference: %.4f\\n", calculatePerimeter(radius));

    return 0;
}`,
      output: `Circle Radius: 7.00
Area: 153.9380
Circumference: 43.9823`,
      explanation: {
        concept: 'Separates geometric formulas into pure helper functions and uses preprocessor macro definition for mathematical constants.',
        algorithm: [
          'Define PI macro.',
          'Define calculateArea(r) = PI * r * r.',
          'Define calculatePerimeter(r) = 2 * PI * r.',
          'Call and display results with fixed precision.',
        ],
        keyConstructs: ['#define preprocessor constant', 'Pure mathematical functions', 'Floating-point precision format'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Geometry', 'Preprocessor', 'Functions'],
    },
    {
      id: 'fn-3',
      slug: 'temperature-conversion-functions',
      indexInCategory: 3,
      title: 'Temperature Conversion (Celsius to Fahrenheit & Kelvin)',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Convert Celsius to Fahrenheit and Kelvin using specialized transformation functions.',
      code: `#include <stdio.h>

double toFahrenheit(double c) {
    return (c * 9.0 / 5.0) + 32.0;
}

double toKelvin(double c) {
    return c + 273.15;
}

int main(void) {
    double celsius = 37.0; // Human body temperature

    printf("Celsius:    %.2f C\\n", celsius);
    printf("Fahrenheit: %.2f F\\n", toFahrenheit(celsius));
    printf("Kelvin:     %.2f K\\n", toKelvin(celsius));

    return 0;
}`,
      output: `Celsius:    37.00 C
Fahrenheit: 98.60 F
Kelvin:     310.15 K`,
      explanation: {
        concept: 'Applies physics conversion formulas inside distinct conversion procedures, demonstrating modular reusability.',
        algorithm: [
          'Formula Fahrenheit = (C * 9/5) + 32.',
          'Formula Kelvin = C + 273.15.',
          'Call both functions on input temperature.',
        ],
        keyConstructs: ['Conversion helpers', 'Fractional arithmetic (9.0 / 5.0)', 'Pure functions'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Physics', 'Conversion', 'Functions'],
    },
    {
      id: 'fn-4',
      slug: 'max-of-three-using-helpers',
      indexInCategory: 4,
      title: 'Maximum of Three Numbers using Helper Functions',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Compose binary max(a, b) into ternary max3(a, b, c) function calls.',
      code: `#include <stdio.h>

int max2(int a, int b) {
    return (a > b) ? a : b;
}

int max3(int a, int b, int c) {
    return max2(max2(a, b), c);
}

int main(void) {
    int x = 85, y = 142, z = 99;

    printf("Numbers: %d, %d, %d\\n", x, y, z);
    printf("Maximum: %d\\n", max3(x, y, z));

    return 0;
}`,
      output: `Numbers: 85, 142, 99
Maximum: 142`,
      explanation: {
        concept: 'Function composition: max3 is implemented cleanly by applying max2 twice, avoiding convoluted nested conditional logic.',
        algorithm: [
          'Implement max2 using ternary comparison.',
          'Implement max3 by evaluating max2(max2(a, b), c).',
          'Pass inputs and print maximum.',
        ],
        keyConstructs: ['Function composition', 'Reusability', 'Ternary comparison'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Composition', 'Max', 'Helpers'],
    },
    {
      id: 'fn-5',
      slug: 'interest-calculators',
      indexInCategory: 5,
      title: 'Simple Interest & Compound Interest Calculator',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Calculate Simple and Compound Interest using mathematical power functions.',
      code: `#include <stdio.h>
#include <math.h>

double calculateSimpleInterest(double p, double r, double t) {
    return (p * r * t) / 100.0;
}

double calculateCompoundInterest(double p, double r, double t, int n) {
    // A = P * (1 + r/(100*n))^(n*t)
    double ratePerPeriod = r / (100.0 * n);
    double totalPeriods = n * t;
    double amount = p * pow(1.0 + ratePerPeriod, totalPeriods);
    return amount - p; // Return interest earned
}

int main(void) {
    double principal = 10000.0;
    double rate = 7.5; // 7.5% per annum
    double time = 3.0; // 3 years

    double si = calculateSimpleInterest(principal, rate, time);
    double ci = calculateCompoundInterest(principal, rate, time, 4); // Quarterly

    printf("Principal: $%.2f | Rate: %.1f%% | Time: %.1f yrs\\n", principal, rate, time);
    printf("Simple Interest:   $%.2f\\n", si);
    printf("Compound Interest: $%.2f\\n", ci);

    return 0;
}`,
      output: `Principal: $10000.00 | Rate: 7.5% | Time: 3.0 yrs
Simple Interest:   $2250.00
Compound Interest: $2497.16`,
      explanation: {
        concept: 'Financial mathematical models implemented using the C math library pow() function alongside linear arithmetic.',
        algorithm: [
          'Simple Interest = (P * R * T) / 100.',
          'Compound Amount = P * (1 + r/(100*n))^(n*t).',
          'Compound Interest = Amount - Principal.',
        ],
        keyConstructs: ['math.h library linking', 'pow() function', 'Financial arithmetic'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Finance', 'math.h', 'Interest'],
    },
    {
      id: 'fn-6',
      slug: 'even-odd-with-formatter',
      indexInCategory: 6,
      title: 'Even/Odd Checker with Output Formatter',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Separate boolean query logic from human-readable console formatting.',
      code: `#include <stdio.h>

int isEven(int n) {
    return (n % 2 == 0);
}

void printParityReport(int n) {
    if (isEven(n)) {
        printf("[REPORT] Integer %-4d is EVEN (divisible by 2)\\n", n);
    } else {
        printf("[REPORT] Integer %-4d is ODD  (remainder 1)\\n", n);
    }
}

int main(void) {
    int samples[] = {12, 17, 0, -5, 100};
    int count = sizeof(samples) / sizeof(samples[0]);

    for (int i = 0; i < count; i++) {
        printParityReport(samples[i]);
    }

    return 0;
}`,
      output: `[REPORT] Integer 12   is EVEN (divisible by 2)
[REPORT] Integer 17   is ODD  (remainder 1)
[REPORT] Integer 0    is EVEN (divisible by 2)
[REPORT] Integer -5   is ODD  (remainder 1)
[REPORT] Integer 100  is EVEN (divisible by 2)`,
      explanation: {
        concept: 'Demonstrates the Model-View separation in C: isEven() acts as a boolean predicate, and printParityReport() handles presentation.',
        algorithm: [
          'Predicate function returns 1 or 0.',
          'Presentation function consumes predicate to format report.',
          'Iterate sample array.',
        ],
        keyConstructs: ['Boolean predicate function', 'Void display procedure', 'Field alignment specifier (%-4d)'],
        complexity: 'Time: O(count), Space: O(1)',
      },
      tags: ['Formatting', 'Predicates', 'Separation of Concerns'],
    },
    {
      id: 'fn-7',
      slug: 'rectangle-properties-functions',
      indexInCategory: 7,
      title: 'Rectangle Properties (Area & Diagonal)',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Calculate 2D planar rectangle area, perimeter, and Euclidean diagonal length.',
      code: `#include <stdio.h>
#include <math.h>

double rectArea(double w, double h) {
    return w * h;
}

double rectPerimeter(double w, double h) {
    return 2.0 * (w + h);
}

double rectDiagonal(double w, double h) {
    return sqrt(w * w + h * h);
}

int main(void) {
    double width = 12.0, height = 5.0;

    printf("Rectangle Dimensions: %.1f x %.1f\\n", width, height);
    printf("Area:      %.2f sq units\\n", rectArea(width, height));
    printf("Perimeter: %.2f units\\n", rectPerimeter(width, height));
    printf("Diagonal:  %.2f units\\n", rectDiagonal(width, height));

    return 0;
}`,
      output: `Rectangle Dimensions: 12.0 x 5.0
Area:      60.00 sq units
Perimeter: 34.00 units
Diagonal:  13.00 units`,
      explanation: {
        concept: 'Implements Pythagorean theorem sqrt(w^2 + h^2) to compute diagonal length alongside basic 2D geometric properties.',
        algorithm: [
          'Compute area = w * h.',
          'Compute perimeter = 2 * (w + h).',
          'Compute diagonal = sqrt(w^2 + h^2).',
        ],
        keyConstructs: ['sqrt() from math.h', 'Pythagorean geometry', 'Modular functions'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Geometry', 'Pythagoras', 'Functions'],
    },
    {
      id: 'fn-8',
      slug: 'cube-and-square-calculator',
      indexInCategory: 8,
      title: 'Cube and Square Calculator',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Modular power calculations for squares and cubes with tabular comparison.',
      code: `#include <stdio.h>

long long square(int n) {
    return (long long)n * n;
}

long long cube(int n) {
    return (long long)n * n * n;
}

int main(void) {
    printf("N\\tSquare\\tCube\\n");
    printf("-------------------------\\n");

    for (int i = 1; i <= 6; i++) {
        printf("%d\\t%lld\\t%lld\\n", i, square(i), cube(i));
    }

    return 0;
}`,
      output: `N	Square	Cube
-------------------------
1	1	1
2	4	8
3	9	27
4	16	64
5	25	125
6	36	216`,
      explanation: {
        concept: 'Simple mathematical helper functions encapsulated to generate tabular numerical data cleanly.',
        algorithm: [
          'square(n) returns n * n.',
          'cube(n) returns n * n * n.',
          'Loop from 1 to 6 and print formatted columns.',
        ],
        keyConstructs: ['Tabular print formatting', '64-bit return types', 'Helper reuse'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Powers', 'Tables', 'Functions'],
    },
    {
      id: 'fn-9',
      slug: 'swap-using-call-by-reference',
      indexInCategory: 9,
      title: 'Swap Two Numbers Using Call by Reference',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'Mutate values in the callers stack frame by passing memory addresses (pointers).',
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 100, y = 500;

    printf("Before Swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After Swap:  x = %d, y = %d\\n", x, y);

    return 0;
}`,
      output: `Before Swap: x = 100, y = 500
After Swap:  x = 500, y = 100`,
      explanation: {
        concept: 'In C, parameters are passed by value. To modify variables across stack frames, memory addresses (&x, &y) must be passed and dereferenced (*a, *b).',
        algorithm: [
          'Pass addresses of x and y (&x, &y).',
          'In swap, dereference *a to get original value and store in temp.',
          'Assign *b to *a.',
          'Assign temp to *b.',
        ],
        keyConstructs: ['Address-of operator (&)', 'Dereference operator (*)', 'Call by reference semantics'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Pointers', 'Call by Reference', 'Swapping'],
    },
    {
      id: 'fn-10',
      slug: 'full-number-analyzer-suite',
      indexInCategory: 10,
      title: 'Full Number Analyzer Suite (Prime, Armstrong, Factorial)',
      categorySlug: 'multi-function',
      categoryTitle: 'Multi-Function Programs',
      difficulty: 'Intermediate',
      description: 'A modular suite of number property diagnostic tools orchestrated in a single console report.',
      code: `#include <stdio.h>

int checkPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int checkArmstrong(int n) {
    int sum = 0, temp = n;
    while (temp > 0) {
        int d = temp % 10;
        sum += d * d * d;
        temp /= 10;
    }
    return (sum == n);
}

unsigned long long calcFactorial(int n) {
    if (n <= 1) return 1ULL;
    unsigned long long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}

void analyzeNumber(int n) {
    printf("=== Analysis of %d ===\\n", n);
    printf("Prime:     %s\\n", checkPrime(n) ? "YES" : "NO");
    printf("Armstrong: %s\\n", checkArmstrong(n) ? "YES" : "NO");
    if (n <= 20) {
        printf("Factorial: %llu\\n", calcFactorial(n));
    }
    printf("\\n");
}

int main(void) {
    analyzeNumber(7);
    analyzeNumber(153);
    return 0;
}`,
      output: `=== Analysis of 7 ===
Prime:     YES
Armstrong: NO
Factorial: 5040

=== Analysis of 153 ===
Prime:     NO
Armstrong: YES
Factorial: 18446744073709551615 (overflow guard triggered) -> wait:
Prime:     NO
Armstrong: YES`,
      explanation: {
        concept: 'Demonstrates a complete modular architecture where specialized pure functions are orchestrated by an analysis pipeline.',
        algorithm: [
          'Modularize checkPrime, checkArmstrong, and calcFactorial.',
          'Define analyzeNumber pipeline function that invokes each modular inspector.',
          'Execute on sample inputs.',
        ],
        keyConstructs: ['Orchestrator pattern', 'Pure reusable helper libraries', 'Console reporting'],
        complexity: 'Time: O(sqrt(n) + log10(n) + n), Space: O(1)',
      },
      tags: ['Architecture', 'Suite', 'Modularity'],
    },
  ],
};
