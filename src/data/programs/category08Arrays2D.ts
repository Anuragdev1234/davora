import type { ProgramCategory } from './types';

export const category08Arrays2D: ProgramCategory = {
  id: 'cat-2d-arrays',
  index: 8,
  title: '2D Array Programs',
  slug: 'arrays-2d',
  description: 'Work with matrices, rows, columns, and two-dimensional data.',
  difficulty: 'Intermediate',
  filterTag: 'Arrays',
  programs: [
    {
      id: 'mat-1',
      slug: 'matrix-addition',
      indexInCategory: 1,
      title: 'Matrix Addition',
      categorySlug: 'arrays-2d',
      categoryTitle: '2D Array Programs',
      difficulty: 'Intermediate',
      description: 'Add two matrices of identical dimensions element-by-element.',
      code: `#include <stdio.h>

#define ROWS 2
#define COLS 3

int main(void) {
    int A[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    int B[ROWS][COLS] = {
        {7, 8, 9},
        {3, 2, 1}
    };
    int C[ROWS][COLS];

    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }

    printf("Sum Matrix (A + B):\\n");
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%3d ", C[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `Sum Matrix (A + B):
  8  10  12 
  7   7   7 `,
      explanation: {
        concept: 'Two-dimensional matrix addition: sums corresponding elements C[i][j] = A[i][j] + B[i][j] across all row and column coordinates.',
        algorithm: [
          'Loop outer index i from 0 to ROWS - 1.',
          'Loop inner index j from 0 to COLS - 1.',
          'Add A[i][j] and B[i][j] into C[i][j].',
          'Print resulting 2D matrix in rows and columns.',
        ],
        keyConstructs: ['2D array declaration', 'Nested row-column iteration', 'Formatted matrix grid output'],
        complexity: 'Time: O(ROWS * COLS), Space: O(ROWS * COLS)',
      },
      tags: ['Matrix', '2D Arrays', 'Addition'],
    },
    {
      id: 'mat-2',
      slug: 'transpose-of-a-matrix',
      indexInCategory: 2,
      title: 'Transpose of a Matrix',
      categorySlug: 'arrays-2d',
      categoryTitle: '2D Array Programs',
      difficulty: 'Intermediate',
      description: 'Compute the transpose of an M x N matrix by swapping row and column indices.',
      code: `#include <stdio.h>

#define ROWS 2
#define COLS 3

int main(void) {
    int A[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    int T[COLS][ROWS];

    // Transpose: T[j][i] = A[i][j]
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            T[j][i] = A[i][j];
        }
    }

    printf("Original Matrix (%dx%d):\\n", ROWS, COLS);
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) printf("%d ", A[i][j]);
        printf("\\n");
    }

    printf("Transpose Matrix (%dx%d):\\n", COLS, ROWS);
    for (int i = 0; i < COLS; i++) {
        for (int j = 0; j < ROWS; j++) printf("%d ", T[i][j]);
        printf("\\n");
    }

    return 0;
}`,
      output: `Original Matrix (2x3):
1 2 3 
4 5 6 
Transpose Matrix (3x2):
1 4 
2 5 
3 6 `,
      explanation: {
        concept: 'The transpose flips a matrix over its diagonal, switching the row and column indices: T[j][i] = A[i][j].',
        algorithm: [
          'Declare transpose array T with dimensions inverted (COLS x ROWS).',
          'Assign T[j][i] = A[i][j] inside nested loop.',
          'Display original and transposed grids.',
        ],
        keyConstructs: ['Dimension inversion', 'Index coordinate swapping', 'Matrix transformation'],
        complexity: 'Time: O(ROWS * COLS), Space: O(COLS * ROWS)',
      },
      tags: ['Transpose', 'Matrix', '2D Arrays'],
    },
    {
      id: 'mat-3',
      slug: 'matrix-multiplication',
      indexInCategory: 3,
      title: 'Matrix Multiplication',
      categorySlug: 'arrays-2d',
      categoryTitle: '2D Array Programs',
      difficulty: 'Intermediate',
      description: 'Multiply two compatible matrices using triple nested loop dot products.',
      code: `#include <stdio.h>

#define R1 2
#define C1 2
#define R2 2
#define C2 2

int main(void) {
    int A[R1][C1] = {{1, 2}, {3, 4}};
    int B[R2][C2] = {{5, 6}, {7, 8}};
    int C[R1][C2];

    // Matrix Multiplication requires C1 == R2
    for (int i = 0; i < R1; i++) {
        for (int j = 0; j < C2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < C1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("Result Matrix (A x B):\\n");
    for (int i = 0; i < R1; i++) {
        for (int j = 0; j < C2; j++) {
            printf("%4d ", C[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
      output: `Result Matrix (A x B):
  19   22 
  43   50 `,
      explanation: {
        concept: 'Row-by-column dot product: element C[i][j] is the sum of A[i][k] * B[k][j] across all shared index positions k.',
        algorithm: [
          'Outer loop i iterates rows of A.',
          'Middle loop j iterates columns of B.',
          'Inner loop k accumulates dot product sum into C[i][j].',
        ],
        keyConstructs: ['Triple nested loops', 'Dot product accumulation', 'Linear algebra rules'],
        complexity: 'Time: O(R1 * C2 * C1), Space: O(R1 * C2)',
      },
      tags: ['Multiplication', 'Linear Algebra', 'Matrix'],
    },
    {
      id: 'mat-4',
      slug: 'sum-of-diagonals-square-matrix',
      indexInCategory: 4,
      title: 'Sum of Diagonals in a Square Matrix',
      categorySlug: 'arrays-2d',
      categoryTitle: '2D Array Programs',
      difficulty: 'Intermediate',
      description: 'Calculate the sum of both the primary (main) and secondary (anti) diagonals.',
      code: `#include <stdio.h>

#define N 3

int main(void) {
    int matrix[N][N] = {
        {2, 4, 6},
        {1, 5, 9},
        {8, 3, 7}
    };

    int mainDiag = 0;
    int antiDiag = 0;

    for (int i = 0; i < N; i++) {
        mainDiag += matrix[i][i];            // Primary diagonal: row == col
        antiDiag += matrix[i][N - 1 - i];     // Secondary diagonal: col == N - 1 - row
    }

    printf("Primary Diagonal Sum:   %d\\n", mainDiag);
    printf("Secondary Diagonal Sum: %d\\n", antiDiag);

    return 0;
}`,
      output: `Primary Diagonal Sum:   14
Secondary Diagonal Sum: 19`,
      explanation: {
        concept: 'Single O(N) loop computes both diagonal sums: primary diagonal elements are at (i, i), secondary diagonal elements are at (i, N - 1 - i).',
        algorithm: [
          'Loop index i from 0 to N - 1.',
          'Add matrix[i][i] to mainDiag.',
          'Add matrix[i][N - 1 - i] to antiDiag.',
        ],
        keyConstructs: ['Single-loop diagonal access', 'Square matrix geometry', 'Index arithmetic'],
        complexity: 'Time: O(N), Space: O(1)',
      },
      tags: ['Diagonals', 'Square Matrix', 'Math'],
    },
    {
      id: 'mat-5',
      slug: 'check-symmetric-matrix',
      indexInCategory: 5,
      title: 'Check Symmetric Matrix',
      categorySlug: 'arrays-2d',
      categoryTitle: '2D Array Programs',
      difficulty: 'Intermediate',
      description: 'Determine whether a square matrix is equal to its transpose (A[i][j] == A[j][i]).',
      code: `#include <stdio.h>

#define N 3

int isSymmetric(int matrix[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            if (matrix[i][j] != matrix[j][i]) {
                return 0; // Not symmetric
            }
        }
    }
    return 1;
}

int main(void) {
    int symMatrix[N][N] = {
        {1, 2, 3},
        {2, 4, 5},
        {3, 5, 6}
    };

    if (isSymmetric(symMatrix)) {
        printf("The matrix is SYMMETRIC (A == A^T).\\n");
    } else {
        printf("The matrix is NOT symmetric.\\n");
    }

    return 0;
}`,
      output: `The matrix is SYMMETRIC (A == A^T).`,
      explanation: {
        concept: 'A matrix is symmetric if A[i][j] == A[j][i] for all entries. We only need to check the upper triangle (j = i + 1 to N-1).',
        algorithm: [
          'Loop i from 0 to N - 1.',
          'Loop j from i + 1 to N - 1 (upper triangle).',
          'If matrix[i][j] != matrix[j][i], return 0.',
          'Return 1 if all pairs match.',
        ],
        keyConstructs: ['Upper-triangular traversal optimization', 'Symmetry test', 'Early exit return'],
        complexity: 'Time: O(N^2 / 2), Space: O(1)',
      },
      tags: ['Symmetry', 'Optimization', 'Matrix'],
    },
  ],
};
