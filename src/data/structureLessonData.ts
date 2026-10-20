export interface ProgramComponent {
  id: string;
  number: string; // e.g. "01", "02"
  title: string;
  badge: string;
  shortRole: string;
  snippet: string;
  explanation: string;
  keyTakeaway: string;
  highlightLines: number[]; // 1-indexed line numbers in the 8-line program
  iconName: 'file-text' | 'cpu' | 'database' | 'play' | 'corner-down-left' | 'message-square';
}

export interface CodeLine {
  lineNum: number;
  code: string;
  componentId: string | null;
  badgeIndex?: number;
}

export interface ExecutionStep {
  step: number;
  title: string;
  codeSnippet: string;
  highlightLine: number;
  description: string;
  variableState: {
    name: string;
    type: string;
    value: string;
    isAllocated: boolean;
    memoryAddress?: string;
  };
  terminalOutput: string | null;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface NextTopic {
  title: string;
  category: string;
  description: string;
  path: string;
  iconName: 'terminal' | 'layers' | 'git-branch' | 'box';
}

export const C_PROGRAM_CODE = `#include <stdio.h>

int main(void)
{
    int number = 10;
    printf("Number = %d\\n", number);
    return 0;
}`;

export const PROGRAM_LINES: CodeLine[] = [
  { lineNum: 1, code: '#include <stdio.h>', componentId: 'header', badgeIndex: 1 },
  { lineNum: 2, code: '', componentId: null },
  { lineNum: 3, code: 'int main(void)', componentId: 'main', badgeIndex: 2 },
  { lineNum: 4, code: '{', componentId: 'main' },
  { lineNum: 5, code: '    int number = 10;', componentId: 'variables', badgeIndex: 3 },
  { lineNum: 6, code: '    printf("Number = %d\\n", number);', componentId: 'statements', badgeIndex: 4 },
  { lineNum: 7, code: '    return 0;', componentId: 'return', badgeIndex: 5 },
  { lineNum: 8, code: '}', componentId: 'main' },
];

export const PROGRAM_COMPONENTS: ProgramComponent[] = [
  {
    id: 'header',
    number: '01',
    title: 'Header Files',
    badge: 'Preprocessor',
    shortRole: 'Provide declarations for library functions.',
    snippet: '#include <stdio.h>',
    explanation:
      'Before compilation begins, the preprocessor scans the file. The #include directive copies the standard I/O library declarations into our program, teaching the compiler how to validate functions like printf(). Without this header, the compiler cannot verify argument types or return signatures.',
    keyTakeaway: 'Always placed at the top so declarations precede their usage.',
    highlightLines: [1],
    iconName: 'file-text',
  },
  {
    id: 'main',
    number: '02',
    title: 'Main Function',
    badge: 'Entry Point',
    shortRole: 'The execution entry point of every C program.',
    snippet: 'int main(void)',
    explanation:
      'Execution of every C program begins at main(). When launched, the operating system jumps directly to this function. "int" indicates that main returns an integer status code to the environment, and "void" specifies it takes no command-line arguments. The curly braces { ... } enclose the function body.',
    keyTakeaway: 'Every valid C program must contain exactly one main() function.',
    highlightLines: [3, 4, 8],
    iconName: 'cpu',
  },
  {
    id: 'variables',
    number: '03',
    title: 'Variable Declarations',
    badge: 'Memory & Storage',
    shortRole: 'Define variables used to store data, such as integers and characters.',
    snippet: 'int number = 10;',
    explanation:
      'Variable declarations instruct the compiler to allocate storage on the execution stack. Here, "int" designates a 32-bit signed integer, "number" is the symbolic identifier, and "= 10" initializes it with the literal value 10 in memory. In C, all variables must be declared with their types before access.',
    keyTakeaway: 'Binds a human-readable name and strict type to a chunk of memory.',
    highlightLines: [5],
    iconName: 'database',
  },
  {
    id: 'statements',
    number: '04',
    title: 'Executable Statements',
    badge: 'Operations & I/O',
    shortRole: 'Instructions that perform operations and produce output.',
    snippet: 'printf("Number = %d\\n", number);',
    explanation:
      'Executable statements perform operations when the CPU runs. printf() is a standard function that writes formatted text to standard output. "%d" is a conversion placeholder replaced at runtime by the integer value of number. The statement concludes with a mandatory semicolon (;) which terminates the instruction.',
    keyTakeaway: 'Executes runtime logic; every statement must conclude with a semicolon (;).',
    highlightLines: [6],
    iconName: 'play',
  },
  {
    id: 'return',
    number: '05',
    title: 'Return Statement',
    badge: 'Program Exit',
    shortRole: 'Terminates execution and returns an exit code to the OS.',
    snippet: 'return 0;',
    explanation:
      'The return statement terminates the main() function and hands an exit status code back to the parent process. In Unix and standard computing conventions, 0 communicates success, while any non-zero integer indicates an error or diagnostic condition.',
    keyTakeaway: 'Signals clean exit (code 0) back to the terminal or calling process.',
    highlightLines: [7],
    iconName: 'corner-down-left',
  },
  {
    id: 'comments',
    number: '06',
    title: 'Comments',
    badge: 'Documentation',
    shortRole: 'Human-readable notes ignored by the compiler.',
    snippet: '// This is a comment',
    explanation:
      'Comments explain code intent for human readers. Single-line comments begin with //, while multi-line comments are wrapped in /* ... */. During the preprocessing phase, the preprocessor replaces all comments with whitespace, so they occupy zero CPU cycles and zero bytes in the final executable binary.',
    keyTakeaway: 'Stripped completely during preprocessing; cost zero bytes in machine code.',
    highlightLines: [],
    iconName: 'message-square',
  },
];

export const EXECUTION_STEPS: ExecutionStep[] = [
  {
    step: 1,
    title: 'Program enters main',
    codeSnippet: 'int main(void)',
    highlightLine: 3,
    description:
      'Execution begins. The operating system invokes the entry point main(), establishing local scope for the function execution.',
    variableState: {
      name: 'number',
      type: 'int',
      value: 'Not initialized',
      isAllocated: false,
    },
    terminalOutput: null,
  },
  {
    step: 2,
    title: 'Declaration initializes number',
    codeSnippet: 'int number = 10;',
    highlightLine: 5,
    description:
      'Storage is reserved for integer variable "number" within local scope and initialized with the value 10.',
    variableState: {
      name: 'number',
      type: 'int',
      value: '10',
      isAllocated: true,
    },
    terminalOutput: null,
  },
  {
    step: 3,
    title: 'printf statement produces output',
    codeSnippet: 'printf("Number = %d\\n", number);',
    highlightLine: 6,
    description:
      'The printf function reads the value of number (10), substitutes the %d placeholder, and sends "Number = 10" to standard output.',
    variableState: {
      name: 'number',
      type: 'int',
      value: '10',
      isAllocated: true,
    },
    terminalOutput: 'Number = 10',
  },
  {
    step: 4,
    title: 'return 0 terminates program',
    codeSnippet: 'return 0;',
    highlightLine: 7,
    description:
      'main() terminates successfully and returns exit code 0 to the host environment, signaling completion without errors.',
    variableState: {
      name: 'number',
      type: 'int',
      value: '10',
      isAllocated: true,
    },
    terminalOutput: 'Number = 10',
  },
];

export const PRACTICE_QUIZ: QuizQuestion = {
  id: 'quiz-structure-1',
  question: 'Which statement declares and initializes the variable number to 10?',
  options: [
    {
      id: 'opt-a',
      text: '#include <stdio.h>',
      isCorrect: false,
      explanation: '#include <stdio.h> is a preprocessor directive that imports standard I/O library declarations.',
    },
    {
      id: 'opt-b',
      text: 'int number = 10;',
      isCorrect: true,
      explanation: 'int number = 10; declares an integer variable named number and immediately initializes its memory with 10.',
    },
    {
      id: 'opt-c',
      text: 'printf("Number = %d\\n", number);',
      isCorrect: false,
      explanation: 'printf is an executable statement that formats and prints the variable value to stdout.',
    },
    {
      id: 'opt-d',
      text: 'return 0;',
      isCorrect: false,
      explanation: 'return 0; terminates the main function and returns exit code 0 to the operating system.',
    },
  ],
};

export const NEXT_TOPICS: NextTopic[] = [
  {
    title: 'Input and Output',
    category: 'BASICS · LESSON 04',
    description: 'Master printf() placeholders, format specifiers, and user input capture via scanf().',
    path: '/theory',
    iconName: 'terminal',
  },
  {
    title: 'Data Types & Memory',
    category: 'BASICS · LESSON 05',
    description: 'Explore primitive types, signed vs unsigned integers, floating points, and byte representations.',
    path: '/theory',
    iconName: 'layers',
  },
  {
    title: 'Control Flow',
    category: 'CONTROL · LESSON 06',
    description: 'Direct execution pathways using conditional branching, switch cases, and iteration loops.',
    path: '/theory',
    iconName: 'git-branch',
  },
  {
    title: 'Functions & Scope',
    category: 'STRUCTURE · LESSON 07',
    description: 'Decompose complex software into reusable modular functions with strict lexical boundaries.',
    path: '/theory',
    iconName: 'box',
  },
];
