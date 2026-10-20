import type { ProgramCategory } from './types';

export const category09Pointers: ProgramCategory = {
  id: 'cat-pointers',
  index: 9,
  title: 'Pointer Programs',
  slug: 'pointers',
  description: 'Understand addresses, indirection, pointer arithmetic, and memory access.',
  difficulty: 'Advanced',
  filterTag: 'Pointers',
  programs: [
    {
      id: 'ptr-1',
      slug: 'basic-pointer-dereferencing',
      indexInCategory: 1,
      title: 'Basic Pointer Dereferencing',
      categorySlug: 'pointers',
      categoryTitle: 'Pointer Programs',
      difficulty: 'Advanced',
      description: 'Explore memory addresses using the address-of operator (&) and indirection dereference (*).',
      code: `#include <stdio.h>

int main(void) {
    int target = 42;
    int *ptr = &target; // ptr holds memory address of target

    printf("Variable value (target):   %d\\n", target);
    printf("Memory address (&target):   %p\\n", (void*)&target);
    printf("Pointer stored address:     %p\\n", (void*)ptr);
    printf("Dereferenced value (*ptr): %d\\n", *ptr);

    // Mutate value through the pointer
    *ptr = 99;
    printf("\\nAfter '*ptr = 99':\\n");
    printf("Variable value (target):   %d\\n", target);

    return 0;
}`,
      output: `Variable value (target):   42
Memory address (&target):   0x7ffee4b2a8ac
Pointer stored address:     0x7ffee4b2a8ac
Dereferenced value (*ptr): 42

After '*ptr = 99':
Variable value (target):   99`,
      explanation: {
        concept: 'A pointer stores the numerical memory address of another variable. Dereferencing reads or mutates the value stored at that specific address.',
        algorithm: [
          'Declare int target and initialize to 42.',
          'Declare int *ptr = &target.',
          'Print direct and indirect values and addresses.',
          'Mutate target by assigning *ptr = 99.',
        ],
        keyConstructs: ['Address-of operator (&)', 'Dereference operator (*)', 'Pointer type declaration', '%p format specifier'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Pointers', 'Dereference', 'Memory'],
    },
    {
      id: 'ptr-2',
      slug: 'swap-numbers-using-pointers',
      indexInCategory: 2,
      title: 'Swap Two Numbers Using Pointers',
      categorySlug: 'pointers',
      categoryTitle: 'Pointer Programs',
      difficulty: 'Advanced',
      description: 'Exchange values between two variables in the caller function by passing pointer arguments.',
      code: `#include <stdio.h>

void swapPointers(int *px, int *py) {
    int temp = *px;
    *px = *py;
    *py = temp;
}

int main(void) {
    int a = 15;
    int b = 75;

    printf("Before swap: a = %d, b = %d\\n", a, b);
    swapPointers(&a, &b);
    printf("After swap:  a = %d, b = %d\\n", a, b);

    return 0;
}`,
      output: `Before swap: a = 15, b = 75
After swap:  a = 75, b = 15`,
      explanation: {
        concept: 'Passes memory addresses to allow a callee function to alter memory belonging to the callers stack frame.',
        algorithm: [
          'Pass &a and &b to swapPointers.',
          'In function, save value at px into temp.',
          'Copy value from py to px.',
          'Copy temp to py.',
        ],
        keyConstructs: ['Pointer parameters', 'Memory indirection', 'Cross-stack frame mutation'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Swap', 'Pointers', 'Call by Reference'],
    },
    {
      id: 'ptr-3',
      slug: 'access-array-elements-using-pointers',
      indexInCategory: 3,
      title: 'Access Array Elements Using Pointers',
      categorySlug: 'pointers',
      categoryTitle: 'Pointer Programs',
      difficulty: 'Advanced',
      description: 'Traverse an array using pointer arithmetic and offset dereferencing *(ptr + i).',
      code: `#include <stdio.h>

int main(void) {
    int arr[] = {100, 200, 300, 400, 500};
    int n = sizeof(arr) / sizeof(arr[0]);
    int *ptr = arr; // Decay to pointer to first element

    printf("Traversing array via pointer arithmetic:\\n");
    for (int i = 0; i < n; i++) {
        printf("Address: %p | Value: *(ptr + %d) = %d\\n", 
               (void*)(ptr + i), i, *(ptr + i));
    }

    return 0;
}`,
      output: `Traversing array via pointer arithmetic:
Address: 0x7ffe0000 | Value: *(ptr + 0) = 100
Address: 0x7ffe0004 | Value: *(ptr + 1) = 200
Address: 0x7ffe0008 | Value: *(ptr + 2) = 300
Address: 0x7ffe000c | Value: *(ptr + 3) = 400
Address: 0x7ffe0010 | Value: *(ptr + 4) = 500`,
      explanation: {
        concept: 'Array name decays to a pointer to its first element. Adding an integer i to a pointer advances it by (i * sizeof(type)) bytes in memory.',
        algorithm: [
          'Point ptr to the array start: int *ptr = arr.',
          'Iterate index i from 0 to n - 1.',
          'Access element using offset dereference *(ptr + i).',
        ],
        keyConstructs: ['Pointer arithmetic', 'Array decay', 'Offset notation *(ptr + i)'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Pointer Arithmetic', 'Arrays', 'Memory Offsets'],
    },
    {
      id: 'ptr-4',
      slug: 'dynamic-memory-allocation-malloc',
      indexInCategory: 4,
      title: 'Dynamic Memory Allocation (malloc)',
      categorySlug: 'pointers',
      categoryTitle: 'Pointer Programs',
      difficulty: 'Advanced',
      description: 'Allocate heap memory dynamically with malloc, verify allocation, and release with free.',
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    // Allocate contiguous heap block for n integers
    int *heapArr = (int *)malloc(n * sizeof(int));

    // Verify allocation succeeded
    if (heapArr == NULL) {
        printf("Error: Memory allocation failed!\\n");
        return 1;
    }

    // Populate allocated heap memory
    for (int i = 0; i < n; i++) {
        heapArr[i] = (i + 1) * 10;
    }

    printf("Dynamically allocated array on Heap: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", heapArr[i]);
    }
    printf("\\n");

    // Free allocated memory to prevent memory leaks
    free(heapArr);
    heapArr = NULL; // Clear dangling pointer

    printf("Heap memory successfully freed.\\n");
    return 0;
}`,
      output: `Dynamically allocated array on Heap: 10 20 30 40 50 
Heap memory successfully freed.`,
      explanation: {
        concept: 'malloc() requests raw memory from the heap at runtime. Every malloc() call must be checked for NULL and paired with free() to avoid memory leaks.',
        algorithm: [
          'Call malloc(n * sizeof(int)).',
          'Check if pointer is NULL.',
          'Use buffer like a normal array.',
          'Call free(heapArr) and set pointer to NULL.',
        ],
        keyConstructs: ['malloc() and free() from stdlib.h', 'Heap allocation', 'NULL checking', 'Dangling pointer prevention'],
        complexity: 'Time: O(n), Space: O(n) on Heap',
      },
      tags: ['malloc', 'Heap', 'Dynamic Memory', 'free'],
    },
    {
      id: 'ptr-5',
      slug: 'find-length-of-string-using-pointers',
      indexInCategory: 5,
      title: 'Find Length of String Using Pointers',
      categorySlug: 'pointers',
      categoryTitle: 'Pointer Programs',
      difficulty: 'Advanced',
      description: 'Compute string length by advancing a character pointer until encountering the null terminator.',
      code: `#include <stdio.h>

int stringLengthPtr(const char *str) {
    const char *ptr = str;
    while (*ptr != '\\0') {
        ptr++;
    }
    // Difference between pointers gives number of characters
    return (int)(ptr - str);
}

int main(void) {
    const char text[] = "DEVORA Systems";
    int len = stringLengthPtr(text);

    printf("String: \\"%s\\"\\n", text);
    printf("Length: %d characters\\n", len);

    return 0;
}`,
      output: `String: "DEVORA Systems"
Length: 14 characters`,
      explanation: {
        concept: 'Pointer subtraction: subtracting starting pointer str from final pointer ptr yields the exact count of elements between them (ptrdiff_t).',
        algorithm: [
          'Set ptr to start of string.',
          'Increment ptr until *ptr is null terminator \\0.',
          'Return (ptr - str).',
        ],
        keyConstructs: ['Pointer subtraction', 'Null terminator test (*ptr != \\0)', 'const correctness'],
        complexity: 'Time: O(len), Space: O(1)',
      },
      tags: ['Strings', 'Pointers', 'Pointer Subtraction'],
    },
  ],
};
