import type { ProgramCategory } from './types';

export const category04ControlFlow: ProgramCategory = {
  id: 'cat-control-flow',
  index: 4,
  title: 'Control Flow Questions',
  slug: 'control-flow',
  description: 'Practice conditional expressions, branching, and decision-based problems.',
  difficulty: 'Beginner',
  filterTag: 'Control Flow',
  programs: [
    {
      id: 'ctrl-1',
      slug: 'leap-year-check-if-else',
      indexInCategory: 1,
      title: 'Leap Year Check (If-Else)',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Check if a year is a leap year using the Gregorian calendar leap year rules.',
      code: `#include <stdio.h>

int main(void) {
    int year = 2024;

    // A year is a leap year if:
    // (divisible by 4 AND NOT divisible by 100) OR (divisible by 400)
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("%d is a Leap Year (366 days)\\n", year);
    } else {
        printf("%d is NOT a Leap Year (365 days)\\n", year);
    }

    return 0;
}`,
      output: `2024 is a Leap Year (366 days)`,
      explanation: {
        concept: 'Implements Gregorian rules: years divisible by 4 are leap years, except century years, which must also be divisible by 400.',
        algorithm: [
          'Test if year % 400 == 0 -> leap year.',
          'Else if year % 100 == 0 -> common year.',
          'Else if year % 4 == 0 -> leap year.',
          'Otherwise -> common year.',
        ],
        keyConstructs: ['Compound boolean logic', 'Logical AND (&&)', 'Logical OR (||)'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Leap Year', 'Boolean Logic', 'Conditionals'],
    },
    {
      id: 'ctrl-2',
      slug: 'largest-among-three-numbers',
      indexInCategory: 2,
      title: 'Largest Among Three Numbers (Nested If-Else)',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Find the maximum value among three distinct integers using nested conditional tests.',
      code: `#include <stdio.h>

int main(void) {
    int a = 45, b = 82, c = 67;
    int max;

    if (a >= b) {
        if (a >= c) {
            max = a;
        } else {
            max = c;
        }
    } else {
        if (b >= c) {
            max = b;
        } else {
            max = c;
        }
    }

    printf("Among %d, %d, and %d, the largest is %d\\n", a, b, c, max);
    return 0;
}`,
      output: `Among 45, 82, and 67, the largest is 82`,
      explanation: {
        concept: 'Uses hierarchical nested decision trees to compare numbers without testing unnecessary conditions.',
        algorithm: [
          'Compare a with b first.',
          'If a >= b, compare a with c to select either a or c.',
          'If b > a, compare b with c to select either b or c.',
        ],
        keyConstructs: ['Nested if-else statements', 'Relational operators (>=)', 'Decision tree structure'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Comparison', 'Nested If', 'Max'],
    },
    {
      id: 'ctrl-3',
      slug: 'vowel-or-consonant-switch',
      indexInCategory: 3,
      title: 'Vowel or Consonant (Switch Case)',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Determine whether an alphabet character is a vowel or consonant using switch fall-through.',
      code: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char ch = 'E';
    char lower = tolower(ch);

    switch (lower) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            printf("'%c' is a Vowel.\\n", ch);
            break;
        default:
            if ((lower >= 'a' && lower <= 'z')) {
                printf("'%c' is a Consonant.\\n", ch);
            } else {
                printf("'%c' is not an alphabet letter.\\n", ch);
            }
            break;
    }

    return 0;
}`,
      output: `'E' is a Vowel.`,
      explanation: {
        concept: 'Takes advantage of intentional switch case fall-through to group multiple matching values into a single execution block.',
        algorithm: [
          'Normalize character to lowercase.',
          'In switch, list cases for a, e, i, o, u without break statements so they fall through.',
          'Use default case to catch consonants and non-alphabetic inputs.',
        ],
        keyConstructs: ['Switch case fall-through', 'Break statement', 'Default handler'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Switch-Case', 'Vowel', 'Fall-Through'],
    },
    {
      id: 'ctrl-4',
      slug: 'positive-negative-or-zero',
      indexInCategory: 4,
      title: 'Positive, Negative, or Zero',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Classify an integer into positive, negative, or zero using an if-else-if ladder.',
      code: `#include <stdio.h>

int main(void) {
    int num = -27;

    if (num > 0) {
        printf("%d is strictly Positive (> 0)\\n", num);
    } else if (num < 0) {
        printf("%d is strictly Negative (< 0)\\n", num);
    } else {
        printf("%d is Zero\\n", num);
    }

    return 0;
}`,
      output: `-27 is strictly Negative (< 0)`,
      explanation: {
        concept: 'Standard three-way partition of the real number line around the origin zero.',
        algorithm: [
          'Check if num > 0.',
          'Else check if num < 0.',
          'Else the number must be 0.',
        ],
        keyConstructs: ['If-else-if ladder', 'Mutual exclusion', 'Relational comparison'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Classification', 'Ladder', 'Conditionals'],
    },
    {
      id: 'ctrl-5',
      slug: 'check-voting-eligibility',
      indexInCategory: 5,
      title: 'Check Voting Eligibility',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Check whether a citizen is eligible to vote based on age threshold (18+).',
      code: `#include <stdio.h>

int main(void) {
    int age = 19;
    const int VOTING_AGE = 18;

    if (age >= VOTING_AGE) {
        printf("Age: %d -> Eligible to vote!\\n", age);
    } else {
        int yearsLeft = VOTING_AGE - age;
        printf("Age: %d -> Not eligible yet. Please wait %d year(s).\\n", age, yearsLeft);
    }

    return 0;
}`,
      output: `Age: 19 -> Eligible to vote!`,
      explanation: {
        concept: 'Threshold comparison against a symbolic constant with informational feedback for ineligible values.',
        algorithm: [
          'Compare age against VOTING_AGE threshold.',
          'If age >= threshold, grant eligibility.',
          'Otherwise, calculate remaining years.',
        ],
        keyConstructs: ['Constant variable (const)', 'Threshold check', 'Dynamic branch message'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Eligibility', 'Threshold', 'Decision'],
    },
    {
      id: 'ctrl-6',
      slug: 'even-odd-using-ternary-operator',
      indexInCategory: 6,
      title: 'Even/Odd using Ternary Operator',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Evaluate even or odd parity inline using the ternary conditional operator (?:).',
      code: `#include <stdio.h>

int main(void) {
    int num = 47;

    // Ternary operator: condition ? expression_if_true : expression_if_false
    const char *parity = (num % 2 == 0) ? "Even" : "Odd";

    printf("%d is an %s number.\\n", num, parity);
    return 0;
}`,
      output: `47 is an Odd number.`,
      explanation: {
        concept: 'The ternary operator (?:) provides an expression-based alternative to if-else, returning a value directly.',
        algorithm: [
          'Test (num % 2 == 0).',
          'If true, evaluate to "Even".',
          'If false, evaluate to "Odd".',
          'Assign directly to string pointer.',
        ],
        keyConstructs: ['Ternary operator (?:)', 'Inline evaluation', 'Const string reference'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Ternary', 'Even/Odd', 'Expressions'],
    },
    {
      id: 'ctrl-7',
      slug: 'grade-calculation-based-on-marks',
      indexInCategory: 7,
      title: 'Grade Calculation based on Marks',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Assign letter grades (A, B, C, D, F) based on percentage mark intervals.',
      code: `#include <stdio.h>

int main(void) {
    float marks = 88.5f;
    char grade;

    if (marks >= 90.0f) {
        grade = 'A';
    } else if (marks >= 80.0f) {
        grade = 'B';
    } else if (marks >= 70.0f) {
        grade = 'C';
    } else if (marks >= 60.0f) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    printf("Marks: %.1f%% -> Grade: %c\\n", marks, grade);
    return 0;
}`,
      output: `Marks: 88.5% -> Grade: B`,
      explanation: {
        concept: 'Sequential descending boundary tests ensure that higher thresholds are tested first, simplifying boolean clauses.',
        algorithm: [
          'Test marks >= 90 -> Grade A.',
          'Else if marks >= 80 -> Grade B.',
          'Else if marks >= 70 -> Grade C.',
          'Else if marks >= 60 -> Grade D.',
          'Otherwise -> Grade F.',
        ],
        keyConstructs: ['Descending interval ladder', 'Floating point comparisons', 'Character assignment'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Grading', 'Ladder', 'Conditionals'],
    },
    {
      id: 'ctrl-8',
      slug: 'calculator-using-switch-case',
      indexInCategory: 8,
      title: 'Calculator using Switch-Case',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Implement a basic arithmetic four-function calculator (+, -, *, /) via switch-case.',
      code: `#include <stdio.h>

int main(void) {
    char op = '*';
    double a = 12.5, b = 4.0;
    double result = 0.0;
    int valid = 1;

    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
            if (b != 0) {
                result = a / b;
            } else {
                printf("Error: Division by zero!\\n");
                valid = 0;
            }
            break;
        default:
            printf("Error: Unsupported operator '%c'\\n", op);
            valid = 0;
            break;
    }

    if (valid) {
        printf("%.2f %c %.2f = %.2f\\n", a, op, b, result);
    }

    return 0;
}`,
      output: `12.50 * 4.00 = 50.00`,
      explanation: {
        concept: 'Dispatches operation execution based on operator character code with division-by-zero validation.',
        algorithm: [
          'Switch on operator character op.',
          'Execute corresponding arithmetic expression.',
          'Guard against division by zero in case "/".',
          'Print formatted mathematical result.',
        ],
        keyConstructs: ['Character-based switch dispatch', 'Error flagging', 'Division safety guard'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Calculator', 'Switch', 'Arithmetic'],
    },
    {
      id: 'ctrl-9',
      slug: 'check-alphabet-digit-or-special',
      indexInCategory: 9,
      title: 'Check Alphabet, Digit, or Special Character',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Classify an input character into an uppercase letter, lowercase letter, digit, or special symbol.',
      code: `#include <stdio.h>

int main(void) {
    char ch = '#';

    if (ch >= 'A' && ch <= 'Z') {
        printf("'%c' is an Uppercase Alphabet letter.\\n", ch);
    } else if (ch >= 'a' && ch <= 'z') {
        printf("'%c' is a Lowercase Alphabet letter.\\n", ch);
    } else if (ch >= '0' && ch <= '9') {
        printf("'%c' is a Numerical Digit.\\n", ch);
    } else {
        printf("'%c' is a Special Character.\\n", ch);
    }

    return 0;
}`,
      output: `'#' is a Special Character.`,
      explanation: {
        concept: 'Uses ASCII contiguous ranges: A-Z is [65..90], a-z is [97..122], 0-9 is [48..57].',
        algorithm: [
          'Test if character falls between A and Z.',
          'Else test if character falls between a and z.',
          'Else test if character falls between 0 and 9.',
          'Otherwise classify as special symbol.',
        ],
        keyConstructs: ['ASCII range conditions', 'Logical AND (&&)', 'Comprehensive character triage'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['ASCII', 'Characters', 'Classification'],
    },
    {
      id: 'ctrl-10',
      slug: 'month-days-calculator-switch',
      indexInCategory: 10,
      title: 'Month Days Calculator using Switch-Case',
      categorySlug: 'control-flow',
      categoryTitle: 'Control Flow Questions',
      difficulty: 'Beginner',
      description: 'Determine the exact number of days in any calendar month using grouped switch cases.',
      code: `#include <stdio.h>

int main(void) {
    int month = 2; // February
    int year = 2024;
    int days = 0;

    switch (month) {
        // Months with 31 days
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            days = 31;
            break;

        // Months with 30 days
        case 4: case 6: case 9: case 11:
            days = 30;
            break;

        // February: 28 or 29 days
        case 2:
            if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                days = 29; // Leap year
            } else {
                days = 28;
            }
            break;

        default:
            printf("Invalid month: %d\\n", month);
            return 1;
    }

    printf("Month %d in Year %d has %d days.\\n", month, year, days);
    return 0;
}`,
      output: `Month 2 in Year 2024 has 29 days.`,
      explanation: {
        concept: 'Groups 31-day and 30-day months using multiple case labels, and delegates February to leap-year logic.',
        algorithm: [
          'Group 1, 3, 5, 7, 8, 10, 12 into 31 days.',
          'Group 4, 6, 9, 11 into 30 days.',
          'Handle February using leap year test.',
        ],
        keyConstructs: ['Multi-case grouping', 'Nested leap year condition', 'Month calendar mapping'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Calendar', 'Switch', 'Date Logic'],
    },
  ],
};
