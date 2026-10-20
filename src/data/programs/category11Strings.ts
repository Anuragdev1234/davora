import type { ProgramCategory } from './types';

export const category11Strings: ProgramCategory = {
  id: 'cat-strings',
  index: 11,
  title: 'String Programs',
  slug: 'strings',
  description: 'Work with character arrays and common string operations.',
  difficulty: 'Intermediate',
  filterTag: 'Strings',
  programs: [
    {
      id: 'str-1',
      slug: 'find-string-length-without-strlen',
      indexInCategory: 1,
      title: 'Find String Length Without strlen',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Count characters in a null-terminated string manually using array indexing.',
      code: `#include <stdio.h>

int myStrlen(const char str[]) {
    int length = 0;
    while (str[length] != '\\0') {
        length++;
    }
    return length;
}

int main(void) {
    char greeting[] = "Hello, DEVORA!";
    printf("String: \\"%s\\"\\n", greeting);
    printf("Length without strlen: %d\\n", myStrlen(greeting));
    return 0;
}`,
      output: `String: "Hello, DEVORA!"
Length without strlen: 14`,
      explanation: {
        concept: 'In C, strings are null-terminated character arrays. Traversal stops when reaching the sentinel character \\0.',
        algorithm: [
          'Initialize length = 0.',
          'While str[length] != \\0, increment length.',
          'Return length.',
        ],
        keyConstructs: ['Null-terminated string sentinel', 'Array indexing', 'While loop counter'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Strings', 'strlen', 'Manual Traversal'],
    },
    {
      id: 'str-2',
      slug: 'copy-string-without-strcpy',
      indexInCategory: 2,
      title: 'Copy String Without strcpy',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Copy characters from source string into destination buffer and append the null terminator.',
      code: `#include <stdio.h>

void myStrcpy(char dest[], const char src[]) {
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0'; // Explicitly terminate destination
}

int main(void) {
    char source[] = "Systems Architecture";
    char destination[50];

    myStrcpy(destination, source);

    printf("Source:      \\"%s\\"\\n", source);
    printf("Destination: \\"%s\\"\\n", destination);

    return 0;
}`,
      output: `Source:      "Systems Architecture"
Destination: "Systems Architecture"`,
      explanation: {
        concept: 'Deep string copying: transfers individual character bytes and explicitly adds the terminating null byte at the final index.',
        algorithm: [
          'Loop while src[i] != \\0.',
          'Assign dest[i] = src[i].',
          'After loop, assign dest[i] = \\0.',
        ],
        keyConstructs: ['Character assignment', 'Explicit null termination', 'Buffer bounds safety'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Strings', 'strcpy', 'Buffer Copy'],
    },
    {
      id: 'str-3',
      slug: 'concatenate-strings-without-strcat',
      indexInCategory: 3,
      title: 'Concatenate Two Strings Without strcat',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Append a source string to the end of a destination string buffer manually.',
      code: `#include <stdio.h>

void myStrcat(char dest[], const char src[]) {
    // 1. Find the end of dest
    int i = 0;
    while (dest[i] != '\\0') {
        i++;
    }

    // 2. Copy src characters starting at dest[i]
    int j = 0;
    while (src[j] != '\\0') {
        dest[i] = src[j];
        i++;
        j++;
    }
    dest[i] = '\\0';
}

int main(void) {
    char prefix[60] = "The Logic ";
    char suffix[] = "Core";

    myStrcat(prefix, suffix);
    printf("Concatenated string: \\"%s\\"\\n", prefix);

    return 0;
}`,
      output: `Concatenated string: "The Logic Core"`,
      explanation: {
        concept: 'Finds the existing null terminator of dest and overwrites it with characters of src, followed by a new null terminator.',
        algorithm: [
          'Find length of destination string.',
          'Copy characters of source into destination starting at that index.',
          'Append null byte \\0.',
        ],
        keyConstructs: ['String concatenation', 'End-of-string offset indexing', 'Null termination'],
        complexity: 'Time: O(len(dest) + len(src)), Space: O(1)',
      },
      tags: ['Strings', 'strcat', 'Concatenation'],
    },
    {
      id: 'str-4',
      slug: 'compare-strings-without-strcmp',
      indexInCategory: 4,
      title: 'Compare Two Strings Without strcmp',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Perform lexicographical comparison between two strings based on ASCII character differences.',
      code: `#include <stdio.h>

int myStrcmp(const char s1[], const char s2[]) {
    int i = 0;
    while (s1[i] != '\\0' && s2[i] != '\\0') {
        if (s1[i] != s2[i]) {
            return (unsigned char)s1[i] - (unsigned char)s2[i];
        }
        i++;
    }
    return (unsigned char)s1[i] - (unsigned char)s2[i];
}

int main(void) {
    char a[] = "Apple";
    char b[] = "Apply";

    int diff = myStrcmp(a, b);
    if (diff == 0) {
        printf("Strings are EQUAL\\n");
    } else if (diff < 0) {
        printf("\\"%s\\" precedes \\"%s\\" alphabetically\\n", a, b);
    } else {
        printf("\\"%s\\" succeeds \\"%s\\" alphabetically\\n", a, b);
    }

    return 0;
}`,
      output: `"Apple" precedes "Apply" alphabetically`,
      explanation: {
        concept: 'Lexicographical order compares character values at the first differing position and returns the numerical difference.',
        algorithm: [
          'Loop while neither string has reached \\0.',
          'If characters differ, return s1[i] - s2[i].',
          'At end of loop, return difference of terminal bytes.',
        ],
        keyConstructs: ['Lexicographical comparison', 'Unsigned char casting', 'Alphabetical ordering'],
        complexity: 'Time: O(min(len(s1), len(s2))), Space: O(1)',
      },
      tags: ['Strings', 'strcmp', 'Comparison'],
    },
    {
      id: 'str-5',
      slug: 'reverse-a-string',
      indexInCategory: 5,
      title: 'Reverse a String',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Reverse characters of a string in-place using two-pointer index swapping.',
      code: `#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int left = 0;
    int right = (int)strlen(str) - 1;

    while (left < right) {
        char temp = str[left];
        str[left] = str[right];
        str[right] = temp;
        left++;
        right--;
    }
}

int main(void) {
    char word[] = "algorithm";
    printf("Original: \\"%s\\"\\n", word);
    reverseString(word);
    printf("Reversed: \\"%s\\"\\n", word);
    return 0;
}`,
      output: `Original: "algorithm"
Reversed: "mhtirogla"`,
      explanation: {
        concept: 'Two pointers starting at opposite ends swap characters and converge at the midpoint, mutating the array in-place.',
        algorithm: [
          'Calculate length and set left = 0, right = len - 1.',
          'Swap str[left] and str[right].',
          'Increment left and decrement right until pointers cross.',
        ],
        keyConstructs: ['Two-pointer string reversal', 'In-place memory mutation', 'Character swapping'],
        complexity: 'Time: O(n/2) = O(n), Space: O(1)',
      },
      tags: ['Strings', 'Reversal', 'Two Pointers'],
    },
    {
      id: 'str-6',
      slug: 'check-palindrome-string',
      indexInCategory: 6,
      title: 'Check Palindrome String',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Check if a string reads the same forwards and backwards ignoring case sensitivity.',
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int isPalindromeString(const char str[]) {
    int left = 0;
    int right = (int)strlen(str) - 1;

    while (left < right) {
        if (tolower(str[left]) != tolower(str[right])) {
            return 0; // Mismatch found
        }
        left++;
        right--;
    }
    return 1;
}

int main(void) {
    char word1[] = "Racecar";
    char word2[] = "Devora";

    printf("\\"%s\\" is palindrome? %s\\n", word1, isPalindromeString(word1) ? "YES" : "NO");
    printf("\\"%s\\" is palindrome? %s\\n", word2, isPalindromeString(word2) ? "YES" : "NO");

    return 0;
}`,
      output: `"Racecar" is palindrome? YES
"Devora" is palindrome? NO`,
      explanation: {
        concept: 'Symmetrical character testing from outermost to innermost pair with tolower normalization for case insensitivity.',
        algorithm: [
          'Set left = 0, right = length - 1.',
          'Compare tolower(str[left]) and tolower(str[right]).',
          'If mismatch, return 0.',
          'If pointers meet or cross, return 1.',
        ],
        keyConstructs: ['Symmetry testing', 'tolower from ctype.h', 'Two-pointer traversal'],
        complexity: 'Time: O(n/2), Space: O(1)',
      },
      tags: ['Palindrome', 'Strings', 'Case Insensitivity'],
    },
    {
      id: 'str-7',
      slug: 'toggle-case-of-characters',
      indexInCategory: 7,
      title: 'Toggle Case of Characters',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Invert character case: convert uppercase letters to lowercase and lowercase to uppercase.',
      code: `#include <stdio.h>

void toggleCase(char str[]) {
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            str[i] = str[i] - ('a' - 'A'); // Lowercase to uppercase
        } else if (str[i] >= 'A' && str[i] <= 'Z') {
            str[i] = str[i] + ('a' - 'A'); // Uppercase to lowercase
        }
    }
}

int main(void) {
    char text[] = "Devora Logic Core v2.0";
    printf("Original: \\"%s\\"\\n", text);
    toggleCase(text);
    printf("Toggled:  \\"%s\\"\\n", text);
    return 0;
}`,
      output: `Original: "Devora Logic Core v2.0"
Toggled:  "dEVORA lOGIC cORE V2.0"`,
      explanation: {
        concept: 'ASCII arithmetic: the distance between uppercase and lowercase is 32 (value of \'a\' - \'A\'). Adding or subtracting 32 flips the case bit.',
        algorithm: [
          'Loop through string characters.',
          'If between a and z, subtract 32.',
          'Else if between A and Z, add 32.',
          'Leave non-alphabetical symbols unchanged.',
        ],
        keyConstructs: ['ASCII arithmetic offset', 'In-place character mutation', 'Range testing'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Toggle Case', 'ASCII', 'Strings'],
    },
    {
      id: 'str-8',
      slug: 'count-vowels-consonants-digits-spaces',
      indexInCategory: 8,
      title: 'Count Vowels, Consonants, Digits, and Spaces',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Parse a text string and accumulate counts for vowels, consonants, digits, and whitespace.',
      code: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char str[] = "C Language was created in 1972 by Dennis Ritchie.";
    int vowels = 0, consonants = 0, digits = 0, spaces = 0;

    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = tolower(str[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            vowels++;
        } else if (ch >= 'a' && ch <= 'z') {
            consonants++;
        } else if (ch >= '0' && ch <= '9') {
            digits++;
        } else if (ch == ' ') {
            spaces++;
        }
    }

    printf("Text: \\"%s\\"\\n", str);
    printf("Vowels:      %d\\n", vowels);
    printf("Consonants:  %d\\n", consonants);
    printf("Digits:      %d\\n", digits);
    printf("Spaces:      %d\\n", spaces);

    return 0;
}`,
      output: `Text: "C Language was created in 1972 by Dennis Ritchie."
Vowels:      14
Consonants:  22
Digits:      4
Spaces:      7`,
      explanation: {
        concept: 'Multi-bucket tallying across character classes using normalized lowercase conversion.',
        algorithm: [
          'Normalize each character using tolower().',
          'Test vowel equality (a, e, i, o, u).',
          'Else test consonant range [a..z].',
          'Else test numeric digit range [0..9].',
          'Else test space.',
        ],
        keyConstructs: ['Character classification', 'Multiple counters', 'tolower normalization'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Parsing', 'Counting', 'Strings'],
    },
    {
      id: 'str-9',
      slug: 'find-frequency-of-a-character',
      indexInCategory: 9,
      title: 'Find Frequency of a Character',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Count how many times a given target character appears in a string.',
      code: `#include <stdio.h>

int countFrequency(const char str[], char target) {
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] == target) {
            count++;
        }
    }
    return count;
}

int main(void) {
    char sentence[] = "programming in the logic core";
    char target = 'r';

    int freq = countFrequency(sentence, target);
    printf("String: \\"%s\\"\\n", sentence);
    printf("Character '%c' occurs %d times.\\n", target, freq);

    return 0;
}`,
      output: `String: "programming in the logic core"
Character 'r' occurs 4 times.`,
      explanation: {
        concept: 'Linear scanning with equality check against a search target.',
        algorithm: [
          'Initialize count = 0.',
          'Iterate through characters until null terminator.',
          'If character matches target, increment count.',
          'Return count.',
        ],
        keyConstructs: ['Linear character scan', 'Frequency accumulator', 'Match testing'],
        complexity: 'Time: O(n), Space: O(1)',
      },
      tags: ['Frequency', 'Search', 'Strings'],
    },
    {
      id: 'str-10',
      slug: 'sort-characters-in-string',
      indexInCategory: 10,
      title: 'Sort Characters in a String Alphabetically',
      categorySlug: 'strings',
      categoryTitle: 'String Programs',
      difficulty: 'Intermediate',
      description: 'Sort the characters of a string in ascending alphabetical order.',
      code: `#include <stdio.h>
#include <string.h>

void sortString(char str[]) {
    int n = (int)strlen(str);

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (str[j] > str[j + 1]) {
                char temp = str[j];
                str[j] = str[j + 1];
                str[j + 1] = temp;
            }
        }
    }
}

int main(void) {
    char word[] = "systems";
    printf("Before sorting: \\"%s\\"\\n", word);
    sortString(word);
    printf("After sorting:  \\"%s\\"\\n", word);
    return 0;
}`,
      output: `Before sorting: "systems"
After sorting:  "emsssty"`,
      explanation: {
        concept: 'Treats string as an array of ASCII character codes and applies bubble sort to arrange them in lexicographical order.',
        algorithm: [
          'Measure string length.',
          'Run nested bubble sort loops comparing str[j] and str[j + 1].',
          'Swap adjacent characters when out of order.',
        ],
        keyConstructs: ['Character bubble sort', 'In-place character swapping', 'ASCII comparison'],
        complexity: 'Time: O(n^2), Space: O(1)',
      },
      tags: ['Sorting', 'Bubble Sort', 'Strings'],
    },
  ],
};
