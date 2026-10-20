import type { ProgramCategory } from './types';

export const category01Patterns: ProgramCategory = {
  id: 'cat-patterns',
  index: 1,
  title: 'Pattern Programs',
  slug: 'patterns',
  description: 'Classic pattern-printing programs using loops and logic.',
  defaultExpanded: true,
  difficulty: 'Beginner',
  filterTag: 'Patterns',
  programs: [
    {
      id: 'pat-1',
      slug: 'right-half-pyramid',
      indexInCategory: 1,
      title: 'Right Half Pyramid (Star)',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print a right-aligned half pyramid using stars.',
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `* 
* * 
* * * 
* * * * 
* * * * * `,
      explanation: {
        concept: 'Nested loops control row generation (outer loop) and column printing (inner loop). In row i, exactly i stars are printed.',
        algorithm: [
          'Initialize the number of rows (e.g. 5).',
          'Outer loop runs from i = 1 to rows.',
          'Inner loop runs from j = 1 to i, printing a star on each iteration.',
          'Print a newline after each row completes.',
        ],
        keyConstructs: ['Nested for loops', 'printf formatting', 'Row-column coordination'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Loops', 'Stars', 'Patterns', 'Beginner'],
    },
    {
      id: 'pat-2',
      slug: 'inverted-right-half-pyramid',
      indexInCategory: 2,
      title: 'Inverted Right Half Pyramid (Star)',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print an inverted right half pyramid using stars.',
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = rows; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `* * * * * 
* * * * 
* * * 
* * 
* `,
      explanation: {
        concept: 'Decreasing nested loops print stars from rows down to 1. The outer loop decrements with each row.',
        algorithm: [
          'Initialize rows to 5.',
          'Run outer loop from i = rows down to 1 (decrementing i).',
          'Inner loop prints i stars.',
          'Print a newline after each row.',
        ],
        keyConstructs: ['Decrementing loop counter', 'Row-based termination', 'Standard I/O'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Loops', 'Inverted', 'Patterns'],
    },
    {
      id: 'pat-3',
      slug: 'left-half-pyramid',
      indexInCategory: 3,
      title: 'Left Half Pyramid (Star)',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print a left-aligned half pyramid using stars with leading spaces.',
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = 1; i <= rows; i++) {
        // Print leading spaces
        for (int space = 1; space <= rows - i; space++) {
            printf("  ");
        }
        // Print stars
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `        * 
      * * 
    * * * 
  * * * * 
* * * * * `,
      explanation: {
        concept: 'Combines two sequential inner loops per row: one for printing leading whitespace and one for printing stars.',
        algorithm: [
          'Outer loop runs from i = 1 to rows.',
          'First inner loop prints (rows - i) double spaces.',
          'Second inner loop prints i stars followed by spaces.',
          'Print newline to conclude each row.',
        ],
        keyConstructs: ['Dual inner loops', 'Leading space padding', 'Right-alignment technique'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Spacing', 'Alignment', 'Patterns'],
    },
    {
      id: 'pat-4',
      slug: 'full-pyramid',
      indexInCategory: 4,
      title: 'Full Pyramid (Star)',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print a centered full pyramid using stars.',
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = 1; i <= rows; i++) {
        // Leading spaces for centering
        for (int space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        // Stars in row: (2 * i - 1)
        for (int j = 1; j <= (2 * i - 1); j++) {
            printf("*");
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `    *
   ***
  *****
 *******
*********`,
      explanation: {
        concept: 'Centered equilateral triangle pattern. The number of stars in each row i follows the odd arithmetic progression (2 * i - 1).',
        algorithm: [
          'Run outer loop for each row i from 1 to rows.',
          'Print (rows - i) spaces to center the current row.',
          'Print (2 * i - 1) consecutive stars.',
          'Output newline.',
        ],
        keyConstructs: ['Arithmetic formula 2*i-1', 'Symmetrical space padding', 'Odd star accumulation'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Symmetry', 'Pyramid', 'Patterns'],
    },
    {
      id: 'pat-5',
      slug: 'inverted-full-pyramid',
      indexInCategory: 5,
      title: 'Inverted Full Pyramid (Star)',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print an inverted full pyramid using stars.',
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = rows; i >= 1; i--) {
        // Leading spaces increase as i decreases
        for (int space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        // Stars decrease: (2 * i - 1)
        for (int j = 1; j <= (2 * i - 1); j++) {
            printf("*");
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `*********
 *******
  *****
   ***
    *`,
      explanation: {
        concept: 'Inverts the centered pyramid by starting the outer loop from rows down to 1.',
        algorithm: [
          'Run outer loop from i = rows down to 1.',
          'Print (rows - i) leading spaces.',
          'Print (2 * i - 1) stars.',
          'Print newline at row end.',
        ],
        keyConstructs: ['Reverse outer loop', 'Formula 2*i-1', 'Centered indentation'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Inverted', 'Pyramid', 'Geometry'],
    },
    {
      id: 'pat-6',
      slug: 'diamond-pattern',
      indexInCategory: 6,
      title: 'Diamond Pattern (Star)',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print a diamond pattern using stars.',
      code: `#include <stdio.h>

int main(void) {
    int n = 5;

    // Upper half (including center row)
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int j = 1; j <= (2 * i - 1); j++) printf("*");
        printf("\\n");
    }

    // Lower half
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int j = 1; j <= (2 * i - 1); j++) printf("*");
        printf("\\n");
    }

    return 0;
}`,
      output: `    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *`,
      explanation: {
        concept: 'Composes an upper pyramid with a lower inverted pyramid to form a balanced diamond.',
        algorithm: [
          'Print upper pyramid of n rows.',
          'Print lower pyramid of n - 1 rows with decrementing stars.',
        ],
        keyConstructs: ['Sequential phase execution', 'Bidirectional loops', 'Geometric symmetry'],
        complexity: 'Time: O(n^2), Space: O(1)',
      },
      tags: ['Diamond', 'Symmetry', 'Advanced Loops'],
    },
    {
      id: 'pat-7',
      slug: 'half-pyramid-using-numbers',
      indexInCategory: 7,
      title: 'Half Pyramid Using Numbers',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print a half pyramid using numbers.',
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", j);
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `1 
1 2 
1 2 3 
1 2 3 4 
1 2 3 4 5 `,
      explanation: {
        concept: 'Prints the value of inner counter variable j instead of static characters.',
        algorithm: [
          'Outer loop iterates from i = 1 to rows.',
          'Inner loop iterates from j = 1 to i and prints j.',
          'Prints newline at end of each row.',
        ],
        keyConstructs: ['Loop variable evaluation', 'Indexed numeric printing', 'Sequential values'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Numbers', 'Patterns', 'Loops'],
    },
    {
      id: 'pat-8',
      slug: 'floyds-triangle',
      indexInCategory: 8,
      title: "Floyd's Triangle",
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: "Print Floyd's triangle with consecutive numbers.",
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;
    int num = 1;

    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", num);
            num++;
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `1 
2 3 
4 5 6 
7 8 9 10 
11 12 13 14 15 `,
      explanation: {
        concept: "A right triangle of consecutive natural numbers where each row i contains i numbers that continue counting monotonically.",
        algorithm: [
          'Maintain an external counter num initialized to 1.',
          'For each row i from 1 to rows, print num and increment num on each column output.',
          'Move to next line.',
        ],
        keyConstructs: ['Accumulator variable across loop iterations', 'Post-increment operator', 'Floyds triangle formula'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Floyd', 'Numbers', 'Accumulation'],
    },
    {
      id: 'pat-9',
      slug: 'pascals-triangle',
      indexInCategory: 9,
      title: "Pascal's Triangle",
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Intermediate',
      description: "Print Pascal's triangle using binomial coefficients.",
      code: `#include <stdio.h>

int main(void) {
    int rows = 5;

    for (int i = 0; i < rows; i++) {
        // Leading space padding
        for (int s = 0; s < rows - i - 1; s++) {
            printf(" ");
        }

        int val = 1;
        for (int j = 0; j <= i; j++) {
            printf("%d ", val);
            val = val * (i - j) / (j + 1);
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `    1 
   1 1 
  1 2 1 
 1 3 3 1 
1 4 6 4 1 `,
      explanation: {
        concept: "Each entry is computed using the binomial coefficient formula: C(i, j) = C(i, j-1) * (i - j + 1) / j.",
        algorithm: [
          'Outer loop runs i from 0 to rows - 1.',
          'Print spaces for centered equilateral alignment.',
          'Initialize val = 1.',
          'In inner loop j from 0 to i, print val and update val = val * (i - j) / (j + 1).',
        ],
        keyConstructs: ['Binomial coefficient arithmetic', 'In-place recurrence', 'Zero-indexed loops'],
        complexity: 'Time: O(rows^2), Space: O(1)',
      },
      tags: ['Math', 'Pascal', 'Combinatorics'],
    },
    {
      id: 'pat-10',
      slug: 'hollow-square-pattern',
      indexInCategory: 10,
      title: 'Hollow Square Pattern',
      categorySlug: 'patterns',
      categoryTitle: 'Pattern Programs',
      difficulty: 'Beginner',
      description: 'Print a hollow square or rectangle pattern.',
      code: `#include <stdio.h>

int main(void) {
    int size = 5;

    for (int i = 1; i <= size; i++) {
        for (int j = 1; j <= size; j++) {
            // Print star on boundaries, space inside
            if (i == 1 || i == size || j == 1 || j == size) {
                printf("* ");
            } else {
                printf("  ");
            }
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `* * * * * 
*       * 
*       * 
*       * 
* * * * * `,
      explanation: {
        concept: 'Conditional rendering inside 2D matrix iteration. A star is printed only when on the outer perimeter (first/last row or column).',
        algorithm: [
          'Iterate row i from 1 to size.',
          'Iterate column j from 1 to size.',
          'If on any perimeter boundary (i==1 || i==size || j==1 || j==size), print star.',
          'Otherwise print spaces.',
        ],
        keyConstructs: ['Boundary condition testing', 'Logical OR (||)', '2D coordinate checks'],
        complexity: 'Time: O(size^2), Space: O(1)',
      },
      tags: ['Boundaries', 'Conditionals', 'Patterns'],
    },
  ],
};
