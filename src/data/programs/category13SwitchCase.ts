import type { ProgramCategory } from './types';

export const category13SwitchCase: ProgramCategory = {
  id: 'cat-switch-case',
  index: 13,
  title: 'Switch-Case Programs',
  slug: 'switch-case',
  description: 'Practice menus, calculators, and branching through switch-case statements.',
  difficulty: 'Beginner',
  filterTag: 'Miscellaneous',
  programs: [
    {
      id: 'sw-1',
      slug: 'simple-calculator-switch',
      indexInCategory: 1,
      title: 'Simple Calculator',
      categorySlug: 'switch-case',
      categoryTitle: 'Switch-Case Programs',
      difficulty: 'Beginner',
      description: 'Execute arithmetic commands selected by operator tokens via switch dispatching.',
      code: `#include <stdio.h>

int main(void) {
    char operator = '+';
    double num1 = 15.5, num2 = 4.5;

    switch (operator) {
        case '+':
            printf("%.2f + %.2f = %.2f\\n", num1, num2, num1 + num2);
            break;
        case '-':
            printf("%.2f - %.2f = %.2f\\n", num1, num2, num1 - num2);
            break;
        case '*':
            printf("%.2f * %.2f = %.2f\\n", num1, num2, num1 * num2);
            break;
        case '/':
            if (num2 != 0.0) {
                printf("%.2f / %.2f = %.2f\\n", num1, num2, num1 / num2);
            } else {
                printf("Error: Division by zero is undefined.\\n");
            }
            break;
        default:
            printf("Error: Unknown operator '%c'\\n", operator);
            break;
    }

    return 0;
}`,
      output: `15.50 + 4.50 = 20.00`,
      explanation: {
        concept: 'Evaluates the operator character and jumps directly to the matching case label using constant-time jump table semantics.',
        algorithm: [
          'Switch on operator character.',
          'Execute matching branch arithmetic.',
          'Break after completion.',
        ],
        keyConstructs: ['Jump table dispatch', 'Break termination', 'Zero division guard'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Switch', 'Calculator', 'Arithmetic'],
    },
    {
      id: 'sw-2',
      slug: 'day-of-the-week-selector',
      indexInCategory: 2,
      title: 'Day of the Week Selector',
      categorySlug: 'switch-case',
      categoryTitle: 'Switch-Case Programs',
      difficulty: 'Beginner',
      description: 'Map integer day codes (1 to 7) to human-readable weekday and weekend names.',
      code: `#include <stdio.h>

int main(void) {
    int dayNumber = 5; // Friday

    switch (dayNumber) {
        case 1: printf("Day 1: Monday (Weekday)\\n"); break;
        case 2: printf("Day 2: Tuesday (Weekday)\\n"); break;
        case 3: printf("Day 3: Wednesday (Weekday)\\n"); break;
        case 4: printf("Day 4: Thursday (Weekday)\\n"); break;
        case 5: printf("Day 5: Friday (Weekday)\\n"); break;
        case 6: printf("Day 6: Saturday (Weekend)\\n"); break;
        case 7: printf("Day 7: Sunday (Weekend)\\n"); break;
        default:
            printf("Invalid day number! Please choose between 1 and 7.\\n");
            break;
    }

    return 0;
}`,
      output: `Day 5: Friday (Weekday)`,
      explanation: {
        concept: 'Discrete integer state mapping: translates numeric representation directly into text description.',
        algorithm: [
          'Switch on dayNumber.',
          'Provide cases 1 through 7 with distinct break statements.',
          'Handle out-of-range inputs in default clause.',
        ],
        keyConstructs: ['Integer case constants', 'Default fallback clause', 'Discrete mapping'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Days', 'Switch', 'Mapping'],
    },
    {
      id: 'sw-3',
      slug: 'vowel-consonant-checker-switch',
      indexInCategory: 3,
      title: 'Vowel / Consonant Checker',
      categorySlug: 'switch-case',
      categoryTitle: 'Switch-Case Programs',
      difficulty: 'Beginner',
      description: 'Check vowel or consonant status supporting both uppercase and lowercase inputs via fall-through.',
      code: `#include <stdio.h>

int main(void) {
    char ch = 'o';

    switch (ch) {
        case 'a': case 'A':
        case 'e': case 'E':
        case 'i': case 'I':
        case 'o': case 'O':
        case 'u': case 'U':
            printf("'%c' is a VOWEL.\\n", ch);
            break;
        default:
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                printf("'%c' is a CONSONANT.\\n", ch);
            } else {
                printf("'%c' is not an alphabetic character.\\n", ch);
            }
            break;
    }

    return 0;
}`,
      output: `'o' is a VOWEL.`,
      explanation: {
        concept: 'Leverages fall-through across 10 case labels to group both uppercase and lowercase vowel variants into a single execution block.',
        algorithm: [
          'List both lowercase and uppercase vowel cases.',
          'Fall through to shared print statement.',
          'In default, check if character is within alphabet ranges.',
        ],
        keyConstructs: ['Dual-case fall-through', 'Case-insensitive grouping', 'Default catch-all handler'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Vowels', 'Fall-Through', 'Switch'],
    },
    {
      id: 'sw-4',
      slug: 'traffic-light-system',
      indexInCategory: 4,
      title: 'Traffic Light System',
      categorySlug: 'switch-case',
      categoryTitle: 'Switch-Case Programs',
      difficulty: 'Beginner',
      description: 'Model a finite state traffic signal controller responding to color codes (R, Y, G).',
      code: `#include <stdio.h>

void processTrafficLight(char signal) {
    switch (signal) {
        case 'R': case 'r':
            printf("[RED LIGHT]    -> STOP immediately. Wait behind crosswalk line.\\n");
            break;
        case 'Y': case 'y':
            printf("[YELLOW LIGHT] -> CAUTION. Prepare to stop; proceed only if safe.\\n");
            break;
        case 'G': case 'g':
            printf("[GREEN LIGHT]  -> GO. Proceed with vigilance.\\n");
            break;
        default:
            printf("[FAULT CODE]   -> MALFUNCTION. Treat intersection as 4-way stop.\\n");
            break;
    }
}

int main(void) {
    char signals[] = {'R', 'Y', 'G', 'X'};
    for (int i = 0; i < 4; i++) {
        processTrafficLight(signals[i]);
    }
    return 0;
}`,
      output: `[RED LIGHT]    -> STOP immediately. Wait behind crosswalk line.
[YELLOW LIGHT] -> CAUTION. Prepare to stop; proceed only if safe.
[GREEN LIGHT]  -> GO. Proceed with vigilance.
[FAULT CODE]   -> MALFUNCTION. Treat intersection as 4-way stop.`,
      explanation: {
        concept: 'State-based dispatch simulating embedded control software managing physical actuators and safety responses.',
        algorithm: [
          'Switch on character signal code.',
          'Execute protocol for RED, YELLOW, or GREEN.',
          'Fail-safe to default emergency 4-way stop for unrecognized inputs.',
        ],
        keyConstructs: ['State machine dispatch', 'Fail-safe default design', 'Embedded system simulation'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['State Machine', 'Embedded', 'Safety', 'Switch'],
    },
    {
      id: 'sw-5',
      slug: 'restaurant-ordering-system',
      indexInCategory: 5,
      title: 'Proper Restaurant Ordering System (switch-case with do-while)',
      categorySlug: 'switch-case',
      categoryTitle: 'Switch-Case Programs',
      difficulty: 'Beginner',
      description: 'A complete interactive menu system driven by a do-while loop and switch-case selection with receipt tabulation.',
      code: `#include <stdio.h>

int main(void) {
    int choices[] = {1, 3, 2, 5}; // Simulated user inputs (Burgers, Fries, Drink, Exit)
    int inputIdx = 0;
    int choice;
    double totalBill = 0.0;

    printf("===================================\\n");
    printf("     DEVORA BISTRO MENU SYSTEM     \\n");
    printf("===================================\\n");
    printf("1. Devora Burger       $8.50\\n");
    printf("2. Organic Craft Soda  $2.75\\n");
    printf("3. Truffle Fries       $4.50\\n");
    printf("4. Espresso Shot       $3.00\\n");
    printf("5. Checkout and Exit\\n");
    printf("-----------------------------------\\n");

    do {
        choice = choices[inputIdx++];

        switch (choice) {
            case 1:
                printf("+ Added: Devora Burger ($8.50)\\n");
                totalBill += 8.50;
                break;
            case 2:
                printf("+ Added: Organic Craft Soda ($2.75)\\n");
                totalBill += 2.75;
                break;
            case 3:
                printf("+ Added: Truffle Fries ($4.50)\\n");
                totalBill += 4.50;
                break;
            case 4:
                printf("+ Added: Espresso Shot ($3.00)\\n");
                totalBill += 3.00;
                break;
            case 5:
                printf("Finalizing order...\\n");
                break;
            default:
                printf("Invalid selection! Please enter 1-5.\\n");
                break;
        }
    } while (choice != 5);

    double tax = totalBill * 0.08;
    double grandTotal = totalBill + tax;

    printf("===================================\\n");
    printf("Subtotal:    $%6.2f\\n", totalBill);
    printf("Tax (8%%):    $%6.2f\\n", tax);
    printf("Grand Total: $%6.2f\\n", grandTotal);
    printf("Thank you for dining with DEVORA!\\n");
    printf("===================================\\n");

    return 0;
}`,
      output: `===================================
     DEVORA BISTRO MENU SYSTEM     
===================================
1. Devora Burger       $8.50
2. Organic Craft Soda  $2.75
3. Truffle Fries       $4.50
4. Espresso Shot       $3.00
5. Checkout and Exit
-----------------------------------
+ Added: Devora Burger ($8.50)
+ Added: Truffle Fries ($4.50)
+ Added: Organic Craft Soda ($2.75)
Finalizing order...
===================================
Subtotal:    $ 15.75
Tax (8%):    $  1.26
Grand Total: $ 17.01
Thank you for dining with DEVORA!
===================================`,
      explanation: {
        concept: 'The classic command-line menu loop: a do-while loop drives continuous user interaction, while switch-case branches to selected actions until the exit sentinel is chosen.',
        algorithm: [
          'Display visual menu options.',
          'In do-while loop: process user choice via switch-case.',
          'Accumulate running item subtotals.',
          'Loop terminates when choice == 5.',
          'Compute sales tax and output receipt summary.',
        ],
        keyConstructs: ['Do-while menu loop', 'Switch-case command dispatch', 'Running bill accumulator', 'Receipt tabulation'],
        complexity: 'Time: O(number of orders), Space: O(1)',
      },
      tags: ['Menu System', 'Do-While', 'Switch', 'Billing'],
    },
  ],
};
