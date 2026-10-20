import type { ProgramCategory } from './types';

export const category10FileHandling: ProgramCategory = {
  id: 'cat-file-handling',
  index: 10,
  title: 'File Handling Programs',
  slug: 'file-handling',
  description: 'Read, write, append, and manage files using C.',
  difficulty: 'Advanced',
  filterTag: 'File Handling',
  programs: [
    {
      id: 'file-1',
      slug: 'write-to-a-text-file',
      indexInCategory: 1,
      title: 'Write to a Text File',
      categorySlug: 'file-handling',
      categoryTitle: 'File Handling Programs',
      difficulty: 'Advanced',
      description: 'Open a file stream in write mode ("w"), write formatted data with fprintf, and close the stream.',
      code: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("output.txt", "w");

    if (fp == NULL) {
        printf("Error: Could not create or open file for writing.\\n");
        return 1;
    }

    fprintf(fp, "DEVORA C Programming Library\\n");
    fprintf(fp, "Module: File Handling\\n");
    fprintf(fp, "Status: Success\\n");

    fclose(fp);
    printf("Successfully wrote 3 lines to 'output.txt'.\\n");

    return 0;
}`,
      output: `Successfully wrote 3 lines to 'output.txt'.`,
      explanation: {
        concept: 'fopen with "w" mode creates a new file or overwrites an existing one. fprintf writes formatted strings directly to the file stream buffer, and fclose flushes and closes it.',
        algorithm: [
          'Call fopen("output.txt", "w").',
          'Verify fp is not NULL.',
          'Use fprintf(fp, ...) to write lines.',
          'Always call fclose(fp) to flush stream buffers.',
        ],
        keyConstructs: ['FILE pointer', 'fopen() and fclose()', 'fprintf() stream output', 'NULL stream verification'],
        complexity: 'Time: O(data size), Space: O(1)',
      },
      tags: ['File I/O', 'Write', 'fprintf'],
    },
    {
      id: 'file-2',
      slug: 'read-from-a-text-file',
      indexInCategory: 2,
      title: 'Read from a Text File',
      categorySlug: 'file-handling',
      categoryTitle: 'File Handling Programs',
      difficulty: 'Advanced',
      description: 'Open a file stream in read mode ("r") and read line-by-line using fgets until EOF.',
      code: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("output.txt", "r");
    char buffer[256];

    if (fp == NULL) {
        printf("Error: File 'output.txt' not found or could not be opened.\\n");
        return 1;
    }

    printf("--- File Contents ---\\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    printf("--- End of File ---\\n");

    fclose(fp);
    return 0;
}`,
      output: `--- File Contents ---
DEVORA C Programming Library
Module: File Handling
Status: Success
--- End of File ---`,
      explanation: {
        concept: 'fgets reads up to buffer size - 1 characters or until a newline is encountered, returning NULL on End-Of-File (EOF) or error.',
        algorithm: [
          'Open file with fopen in "r" mode.',
          'Check for NULL.',
          'Loop while fgets(...) != NULL.',
          'Print buffer and close file.',
        ],
        keyConstructs: ['fgets() buffer reading', 'EOF detection', 'Stream safety buffer'],
        complexity: 'Time: O(file size), Space: O(buffer size)',
      },
      tags: ['File I/O', 'Read', 'fgets', 'EOF'],
    },
    {
      id: 'file-3',
      slug: 'append-data-to-a-text-file',
      indexInCategory: 3,
      title: 'Append Data to a Text File',
      categorySlug: 'file-handling',
      categoryTitle: 'File Handling Programs',
      difficulty: 'Advanced',
      description: 'Open an existing file stream in append mode ("a") to write new records at the end.',
      code: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("output.txt", "a");

    if (fp == NULL) {
        printf("Error: Could not open file for appending.\\n");
        return 1;
    }

    fprintf(fp, "Appended Record: Entry #4\\n");
    fclose(fp);

    printf("New record successfully appended to 'output.txt'.\\n");
    return 0;
}`,
      output: `New record successfully appended to 'output.txt'.`,
      explanation: {
        concept: 'Mode "a" positions the write pointer at the end of the file, preserving existing content while appending new data.',
        algorithm: [
          'Call fopen with mode "a".',
          'Write new lines using fprintf.',
          'Flush and close with fclose.',
        ],
        keyConstructs: ['Append mode ("a")', 'Preserving existing content', 'File pointer positioning'],
        complexity: 'Time: O(new data size), Space: O(1)',
      },
      tags: ['Append', 'File I/O', 'File Pointer'],
    },
    {
      id: 'file-4',
      slug: 'count-chars-words-lines-in-file',
      indexInCategory: 4,
      title: 'Count Characters, Words, and Lines in a File',
      categorySlug: 'file-handling',
      categoryTitle: 'File Handling Programs',
      difficulty: 'Advanced',
      description: 'Stream through a file character-by-character to count total characters, words, and lines (like wc).',
      code: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    FILE *fp = fopen("output.txt", "r");
    if (fp == NULL) {
        printf("Error: Cannot open file.\\n");
        return 1;
    }

    int chars = 0, words = 0, lines = 0;
    int inWord = 0;
    int ch;

    while ((ch = fgetc(fp)) != EOF) {
        chars++;

        if (ch == '\\n') {
            lines++;
        }

        if (isspace(ch)) {
            inWord = 0;
        } else if (!inWord) {
            inWord = 1;
            words++;
        }
    }

    fclose(fp);

    printf("File Statistics:\\n");
    printf("Characters: %d\\n", chars);
    printf("Words:      %d\\n", words);
    printf("Lines:      %d\\n", lines);

    return 0;
}`,
      output: `File Statistics:
Characters: 82
Words:      11
Lines:      4`,
      explanation: {
        concept: 'Finite state machine (FSM): uses inWord flag to identify word boundaries when transitioning between whitespace and non-whitespace characters.',
        algorithm: [
          'Stream character by character using fgetc().',
          'Increment characters counter.',
          'If newline, increment lines counter.',
          'If space, set inWord = 0; else if !inWord, set inWord = 1 and increment words.',
        ],
        keyConstructs: ['fgetc() stream reader', 'EOF check (int ch)', 'State machine for word tracking'],
        complexity: 'Time: O(file size), Space: O(1)',
      },
      tags: ['Word Count', 'State Machine', 'fgetc'],
    },
    {
      id: 'file-5',
      slug: 'copy-contents-of-one-file-to-another',
      indexInCategory: 5,
      title: 'Copy Contents of One File to Another',
      categorySlug: 'file-handling',
      categoryTitle: 'File Handling Programs',
      difficulty: 'Advanced',
      description: 'Implement a Unix cp / Windows copy utility that duplicates file contents in chunks.',
      code: `#include <stdio.h>

int main(void) {
    FILE *src = fopen("source.txt", "rb");
    if (src == NULL) {
        printf("Error: Source file could not be opened.\\n");
        return 1;
    }

    FILE *dest = fopen("destination.txt", "wb");
    if (dest == NULL) {
        printf("Error: Destination file could not be created.\\n");
        fclose(src);
        return 1;
    }

    char buffer[1024];
    size_t bytesRead;

    // Binary chunk copying
    while ((bytesRead = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, bytesRead, dest);
    }

    printf("File copied successfully.\\n");

    fclose(src);
    fclose(dest);
    return 0;
}`,
      output: `File copied successfully.`,
      explanation: {
        concept: 'High-performance buffered binary copy: reads raw blocks with fread and writes them with fwrite, supporting all file types (text and binary).',
        algorithm: [
          'Open source in "rb" mode and destination in "wb" mode.',
          'Loop while fread reads bytes > 0.',
          'Write read bytes to destination using fwrite.',
          'Close both file streams.',
        ],
        keyConstructs: ['fread() and fwrite()', 'Binary stream modes ("rb", "wb")', 'Chunk buffer copying'],
        complexity: 'Time: O(file size), Space: O(buffer size)',
      },
      tags: ['Copy File', 'Binary I/O', 'fread', 'fwrite'],
    },
  ],
};
