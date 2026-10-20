import type { ProgramCategory } from './types';

export const category07Arrays1D: ProgramCategory = {
  id: 'cat-1d-arrays',
  index: 7,
  title: '1D Array Programs',
  slug: 'arrays-1d',
  description: 'Store, search, sort, and transform one-dimensional collections.',
  difficulty: 'Intermediate',
  filterTag: 'Arrays',
  programs: [
    {
      id: 'arr-1',
      slug: 'find-maximum-and-minimum-element',
      indexInCategory: 1,
      title: 'Find Maximum and Minimum Element',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Find the largest and smallest values in an integer array in a single pass.',
      code: `#include <stdio.h>

int main(void) {
    int arr[] = {34, 12, 89, 5, 67, 23, 91, 18};
    int size = sizeof(arr) / sizeof(arr[0]);

    int min = arr[0];
    int max = arr[0];

    for (int i = 1; i < size; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    printf("Array elements: ");
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);
    printf("\\n");

    printf("Minimum Element: %d\\n", min);
    printf("Maximum Element: %d\\n", max);

    return 0;
}`,
      output: `Array elements: 34 12 89 5 67 23 91 18 
Minimum Element: 5
Maximum Element: 91`,
      explanation: {
        concept: 'Single-pass linear scan tracks running minimum and maximum values against the initialized first element.',
        algorithm: [
          'Initialize min and max with arr[0].',
          'Loop from index 1 to size - 1.',
          'If current element < min, update min.',
          'If current element > max, update max.',
        ],
        keyConstructs: ['Array traversal', 'Single-pass scan', 'Comparative assignment'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Arrays', 'Min/Max', 'Linear Scan'],
    },
    {
      id: 'arr-2',
      slug: 'reverse-an-array',
      indexInCategory: 2,
      title: 'Reverse an Array',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Reverse the elements of an array in-place using two-pointer swapping.',
      code: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50, 60};
    int n = sizeof(arr) / sizeof(arr[0]);

    int left = 0;
    int right = n - 1;

    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }

    printf("Reversed array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    return 0;
}`,
      output: `Reversed array: 60 50 40 30 20 10 `,
      explanation: {
        concept: 'Two pointers moving towards the center swap elements in place without allocating extra memory buffer arrays.',
        algorithm: [
          'Set left pointer to 0, right pointer to n - 1.',
          'While left < right: swap arr[left] and arr[right].',
          'Increment left, decrement right.',
        ],
        keyConstructs: ['Two-pointer algorithm', 'In-place array mutation', 'While loop indexing'],
        complexity: 'Time: O(n/2) = O(n), Space: O(1)',
      },
      tags: ['Two Pointers', 'In-Place', 'Reversal'],
    },
    {
      id: 'arr-3',
      slug: 'linear-search-in-an-array',
      indexInCategory: 3,
      title: 'Linear Search in an Array',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Search for a target value by inspecting each array element sequentially.',
      code: `#include <stdio.h>

int linearSearch(const int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Return matched index
        }
    }
    return -1; // Not found
}

int main(void) {
    int arr[] = {15, 23, 7, 42, 19, 88};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 42;

    int idx = linearSearch(arr, n, target);
    if (idx != -1) {
        printf("Element %d found at index %d.\\n", target, idx);
    } else {
        printf("Element %d not found in array.\\n", target);
    }

    return 0;
}`,
      output: `Element 42 found at index 2... wait:
Element 42 found at index 3.`,
      explanation: {
        concept: 'Examines every array element sequentially from 0 to n-1. Operates on both sorted and unsorted data.',
        algorithm: [
          'Iterate index i from 0 to size - 1.',
          'If arr[i] == target, return index i immediately.',
          'If loop concludes without match, return -1.',
        ],
        keyConstructs: ['Sequential search', 'Early return on match', 'Sentinel value -1'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Search', 'Linear Search', 'Arrays'],
    },
    {
      id: 'arr-4',
      slug: 'binary-search-in-sorted-array',
      indexInCategory: 4,
      title: 'Binary Search in a Sorted Array',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Search for a key in a sorted array in logarithmic time O(log n) by interval halving.',
      code: `#include <stdio.h>

int binarySearch(const int arr[], int size, int key) {
    int low = 0;
    int high = size - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents integer overflow

        if (arr[mid] == key) {
            return mid;
        } else if (arr[mid] < key) {
            low = mid + 1; // Key is in right half
        } else {
            high = mid - 1; // Key is in left half
        }
    }

    return -1;
}

int main(void) {
    int sorted[] = {4, 9, 15, 22, 35, 48, 63, 77, 91};
    int size = sizeof(sorted) / sizeof(sorted[0]);
    int key = 48;

    int result = binarySearch(sorted, size, key);
    if (result != -1) {
        printf("Key %d found at index %d.\\n", key, result);
    } else {
        printf("Key %d not present in array.\\n", key);
    }

    return 0;
}`,
      output: `Key 48 found at index 5.`,
      explanation: {
        concept: 'Divide-and-conquer on sorted sequence: compares target with middle element and discards half the search range per step.',
        algorithm: [
          'Set search interval [low..high].',
          'Calculate mid = low + (high - low) / 2.',
          'If arr[mid] == key, return mid.',
          'If arr[mid] < key, search right half (low = mid + 1).',
          'Else search left half (high = mid - 1).',
        ],
        keyConstructs: ['Interval halving', 'Overflow-safe mid formula', 'Logarithmic efficiency'],
        complexity: 'Time: O(log n), Space: O(1)',
      },
      tags: ['Binary Search', 'Algorithms', 'Sorted'],
    },
    {
      id: 'arr-5',
      slug: 'count-even-and-odd-in-array',
      indexInCategory: 5,
      title: 'Count Even and Odd Numbers in an Array',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Partition count of even and odd values across an array of numbers.',
      code: `#include <stdio.h>

int main(void) {
    int arr[] = {12, 7, 19, 24, 30, 41, 56, 63, 70};
    int size = sizeof(arr) / sizeof(arr[0]);
    int evenCount = 0;
    int oddCount = 0;

    for (int i = 0; i < size; i++) {
        if (arr[i] % 2 == 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    printf("Total Elements: %d\\n", size);
    printf("Even Elements:  %d\\n", evenCount);
    printf("Odd Elements:   %d\\n", oddCount);

    return 0;
}`,
      output: `Total Elements: 9
Even Elements:  5
Odd Elements:   4`,
      explanation: {
        concept: 'Categorizes array items through modular parity tests and maintains distinct accumulator tallies.',
        algorithm: [
          'Loop through all elements.',
          'If element % 2 == 0, increment evenCount; else increment oddCount.',
          'Display both totals.',
        ],
        keyConstructs: ['Modulo 2 parity testing', 'Dual counters', 'Linear traversal'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Parity', 'Counting', 'Arrays'],
    },
    {
      id: 'arr-6',
      slug: 'bubble-sort',
      indexInCategory: 6,
      title: 'Bubble Sort',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Sort an array in ascending order by repeatedly swapping adjacent out-of-order elements.',
      code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        // If no two elements were swapped by inner loop, array is sorted
        if (swapped == 0) break;
    }
}

int main(void) {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    return 0;
}`,
      output: `Sorted array: 11 12 22 25 34 64 90 `,
      explanation: {
        concept: 'Compares adjacent items and bubbles larger items toward the end. Includes swapped flag optimization for O(n) best-case performance.',
        algorithm: [
          'Outer loop runs n - 1 passes.',
          'Inner loop compares arr[j] and arr[j + 1], swapping if arr[j] > arr[j + 1].',
          'Break early if no swaps occurred in a pass.',
        ],
        keyConstructs: ['Adjacent item comparison', 'Swapped flag optimization', 'In-place sorting'],
        complexity: 'Time: O(n^2) worst/average, O(n) best; Space: O(1)',
      },
      tags: ['Sorting', 'Bubble Sort', 'Algorithms'],
    },
    {
      id: 'arr-7',
      slug: 'find-second-largest-element',
      indexInCategory: 7,
      title: 'Find Second Largest Element',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Find the second distinct maximum value in an array in a single O(n) pass.',
      code: `#include <stdio.h>
#include <limits.h>

int main(void) {
    int arr[] = {12, 35, 1, 10, 34, 35, 20};
    int n = sizeof(arr) / sizeof(arr[0]);

    int first = INT_MIN;
    int second = INT_MIN;

    for (int i = 0; i < n; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        } else if (arr[i] > second && arr[i] != first) {
            second = arr[i];
        }
    }

    if (second == INT_MIN) {
        printf("There is no distinct second largest element.\\n");
    } else {
        printf("First largest:  %d\\n", first);
        printf("Second largest: %d\\n", second);
    }

    return 0;
}`,
      output: `First largest:  35
Second largest: 34`,
      explanation: {
        concept: 'Tracks two leader values simultaneously. When a new leader is found, the previous leader drops to become the second leader.',
        algorithm: [
          'Initialize first and second to INT_MIN.',
          'For each element: if greater than first, second = first, first = arr[i].',
          'Else if greater than second and not duplicate of first, update second.',
        ],
        keyConstructs: ['INT_MIN from limits.h', 'Simultaneous leader tracking', 'Duplicate value handling'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Leader Tracking', 'Single Pass', 'Arrays'],
    },
    {
      id: 'arr-8',
      slug: 'copy-array-elements',
      indexInCategory: 8,
      title: 'Copy Array Elements',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Duplicate all elements from a source array into a destination buffer.',
      code: `#include <stdio.h>

int main(void) {
    int source[] = {5, 10, 15, 20, 25};
    int n = sizeof(source) / sizeof(source[0]);
    int destination[5];

    // Copy element by element
    for (int i = 0; i < n; i++) {
        destination[i] = source[i];
    }

    printf("Destination array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", destination[i]);
    }
    printf("\\n");

    return 0;
}`,
      output: `Destination array: 5 10 15 20 25 `,
      explanation: {
        concept: 'Deep array copy: assigns values index by index to create an independent memory copy of array data.',
        algorithm: [
          'Allocate destination buffer of identical size.',
          'Loop index i from 0 to n - 1.',
          'Assign destination[i] = source[i].',
        ],
        keyConstructs: ['Indexed assignment', 'Buffer copy', 'Independent memory state'],
        complexity: 'Time: O(n), Space: O(n)',
      },
      tags: ['Copy', 'Buffer', 'Arrays'],
    },
    {
      id: 'arr-9',
      slug: 'check-if-array-is-sorted',
      indexInCategory: 9,
      title: 'Check if Array is Sorted',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Verify if elements are in non-decreasing sorted order with early termination.',
      code: `#include <stdio.h>

int isSorted(const int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // If an element is greater than its successor, array is not sorted
        if (arr[i] > arr[i + 1]) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    int arr1[] = {10, 20, 30, 40, 50};
    int arr2[] = {10, 35, 20, 40, 50};

    printf("arr1 is sorted? %s\\n", isSorted(arr1, 5) ? "YES" : "NO");
    printf("arr2 is sorted? %s\\n", isSorted(arr2, 5) ? "YES" : "NO");

    return 0;
}`,
      output: `arr1 is sorted? YES
arr2 is sorted? NO`,
      explanation: {
        concept: 'Linear validation: an array is sorted in ascending order if and only if arr[i] <= arr[i + 1] holds for all i.',
        algorithm: [
          'Loop i from 0 to n - 2.',
          'If arr[i] > arr[i + 1], return 0 immediately.',
          'If all adjacent pairs satisfy the invariant, return 1.',
        ],
        keyConstructs: ['Invariant testing', 'Adjacent element index (i, i + 1)', 'Early exit'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Validation', 'Sorted Order', 'Arrays'],
    },
    {
      id: 'arr-10',
      slug: 'merge-two-arrays',
      indexInCategory: 10,
      title: 'Merge Two Arrays',
      categorySlug: 'arrays-1d',
      categoryTitle: '1D Array Programs',
      difficulty: 'Intermediate',
      description: 'Combine two sorted arrays into a single composite sorted array.',
      code: `#include <stdio.h>

void mergeSorted(const int a[], int n1, const int b[], int n2, int result[]) {
    int i = 0, j = 0, k = 0;

    while (i < n1 && j < n2) {
        if (a[i] <= b[j]) {
            result[k++] = a[i++];
        } else {
            result[k++] = b[j++];
        }
    }

    // Append remaining elements of a
    while (i < n1) result[k++] = a[i++];

    // Append remaining elements of b
    while (j < n2) result[k++] = b[j++];
}

int main(void) {
    int a[] = {1, 3, 5, 7};
    int b[] = {2, 4, 6, 8, 10};
    int result[9];

    mergeSorted(a, 4, b, 5, result);

    printf("Merged sorted array: ");
    for (int i = 0; i < 9; i++) printf("%d ", result[i]);
    printf("\\n");

    return 0;
}`,
      output: `Merged sorted array: 1 2 3 4 5 6 7 8 10 `,
      explanation: {
        concept: 'The core merge step of Merge Sort: tracks two read pointers and appends the smaller current value to the output buffer.',
        algorithm: [
          'Compare a[i] and b[j].',
          'Put smaller into result[k] and advance its pointer.',
          'Drain any leftover elements from either array.',
        ],
        keyConstructs: ['Merge algorithm', 'Pointer synchronization', 'Buffer combining'],
        complexity: 'Time: O(n1 + n2), Space: O(n1 + n2)',
      },
      tags: ['Merge', 'Merge Sort', 'Two Arrays'],
    },
  ],
};
