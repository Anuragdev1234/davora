/**
 * DEVORA — Theory Diagram Data
 * 
 * Defines the nodes, connections, and explanations for the
 * interactive Theory concept diagram.
 * 
 * Every connection communicates a meaningful educational relationship.
 */

export interface DiagramNode {
  id: string;
  label: string;
  group: 'instruction' | 'memory' | 'control' | 'systems';
  x: number;     // percentage position (0-100)
  y: number;
  explanation: string;
  codeExample?: string;
}

export interface DiagramConnection {
  id: string;
  from: string;
  to: string;
  explanation: string;
  important?: boolean;
}

export const diagramGroups = {
  instruction: {
    label: 'C instruction',
    color: '#191B19',
    description: 'The fundamental unit of C: a statement that directs computation.',
  },
  memory: {
    label: 'Memory',
    color: '#191B19',
    description: 'How C programs store, access, and manage data in memory.',
  },
  control: {
    label: 'Control',
    color: '#191B19',
    description: 'How C programs make decisions and repeat operations.',
  },
  systems: {
    label: 'Systems',
    color: '#191B19',
    description: 'How C programs interact with the operating system and hardware.',
  },
};

export const diagramNodes: DiagramNode[] = [
  // Instruction group
  {
    id: 'expression',
    label: 'Expression',
    group: 'instruction',
    x: 12, y: 20,
    explanation: 'An expression computes a value. In C, nearly everything is built from expressions — arithmetic, comparisons, assignments, and function calls.',
    codeExample: 'int result = a + b * 2;',
  },
  {
    id: 'variable',
    label: 'Variable',
    group: 'memory',
    x: 35, y: 15,
    explanation: 'A variable is a named object that stores a value. It has a type, a name, a storage duration, and an address in memory.',
    codeExample: 'int count = 0;\nchar letter = \'A\';',
  },
  {
    id: 'pointer',
    label: 'Pointer',
    group: 'memory',
    x: 55, y: 12,
    explanation: 'A pointer stores the address of another object or function. It enables indirect access, dynamic data structures, and efficient parameter passing.',
    codeExample: 'int x = 42;\nint *p = &x;  // p points to x',
  },
  {
    id: 'address',
    label: 'Address',
    group: 'memory',
    x: 55, y: 30,
    explanation: 'Every object in memory has an address. The & operator yields the address of its operand. Whether addresses map directly to hardware locations is implementation-defined.',
    codeExample: 'int x = 10;\nprintf("Address: %p\\n", (void *)&x);',
  },
  {
    id: 'stack',
    label: 'Stack',
    group: 'memory',
    x: 38, y: 38,
    explanation: 'The stack holds local variables and function call frames. Storage is automatic — allocated on entry and released on exit. The C standard describes automatic storage duration without mandating a hardware stack.',
    codeExample: 'void greet(void) {\n    int local = 5;  // automatic\n}',
  },
  {
    id: 'heap',
    label: 'Heap',
    group: 'memory',
    x: 55, y: 48,
    explanation: 'The heap provides dynamically allocated memory. You request memory with malloc and release it with free. Forgetting to free causes memory leaks.',
    codeExample: 'int *arr = malloc(n * sizeof(int));\n// ... use arr ...\nfree(arr);',
  },
  {
    id: 'condition',
    label: 'Condition',
    group: 'control',
    x: 12, y: 55,
    explanation: 'A condition is a controlling expression that evaluates to true (nonzero) or false (zero), determining which execution path the program takes.',
    codeExample: 'if (temperature > 100) {\n    printf("Boiling!\\n");\n}',
  },
  {
    id: 'loop',
    label: 'Loop',
    group: 'control',
    x: 30, y: 62,
    explanation: 'A loop repeats a block of statements while a condition holds. C provides for, while, and do-while loops for different iteration patterns.',
    codeExample: 'for (int i = 0; i < n; i++) {\n    sum += arr[i];\n}',
  },
  {
    id: 'function',
    label: 'Function',
    group: 'control',
    x: 12, y: 78,
    explanation: 'A function encapsulates a sequence of statements. Calling a function passes arguments, executes its body, and returns a result. Functions enable modularity and reuse.',
    codeExample: 'int square(int n) {\n    return n * n;\n}',
  },
  {
    id: 'controlflow',
    label: 'Control Flow',
    group: 'control',
    x: 45, y: 72,
    explanation: 'Control flow determines the order of statement execution. Branches, loops, function calls, and returns all alter the sequential flow.',
  },
  {
    id: 'compilation',
    label: 'Compilation',
    group: 'systems',
    x: 75, y: 18,
    explanation: 'The compiler translates C source code into machine code through preprocessing, compilation, assembly, and linking stages.',
  },
  {
    id: 'os',
    label: 'OS Interaction',
    group: 'systems',
    x: 78, y: 40,
    explanation: 'C programs interact with the operating system through system calls — requesting file I/O, memory, process management, and more.',
    codeExample: 'FILE *f = fopen("data.txt", "r");\n// ... read from f ...\nfclose(f);',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    group: 'systems',
    x: 88, y: 58,
    explanation: 'C provides low-level access to hardware through pointers, bit manipulation, and memory-mapped I/O. This makes C essential for embedded systems and operating systems.',
  },
  {
    id: 'resources',
    label: 'Resources',
    group: 'systems',
    x: 75, y: 72,
    explanation: 'Resource management in C is manual. The programmer allocates and releases memory, opens and closes files, and manages all system resources explicitly.',
  },
];

export const diagramConnections: DiagramConnection[] = [
  {
    id: 'expr-var',
    from: 'expression',
    to: 'variable',
    explanation: 'Expressions read from and write to variables. An assignment expression stores a computed value into a named variable.',
    important: true,
  },
  {
    id: 'var-addr',
    from: 'variable',
    to: 'address',
    explanation: 'Every variable occupies memory at a specific address. The & operator yields the address of a variable.',
  },
  {
    id: 'ptr-addr',
    from: 'pointer',
    to: 'address',
    explanation: 'A pointer stores an address value. Dereferencing a pointer (*p) accesses the object at that address.',
    important: true,
  },
  {
    id: 'var-stack',
    from: 'variable',
    to: 'stack',
    explanation: 'Local variables have automatic storage duration. They are typically placed on the call stack and exist only while their enclosing block executes.',
  },
  {
    id: 'ptr-heap',
    from: 'pointer',
    to: 'heap',
    explanation: 'Pointers enable access to dynamically allocated memory on the heap. malloc returns a pointer to newly allocated storage.',
    important: true,
  },
  {
    id: 'cond-flow',
    from: 'condition',
    to: 'controlflow',
    explanation: 'The result of a controlling expression determines which path executes. A nonzero value means true; zero means false.',
    important: true,
  },
  {
    id: 'loop-flow',
    from: 'loop',
    to: 'controlflow',
    explanation: 'Loops create repeated execution paths. The loop condition is checked before (or after) each iteration to determine whether to continue.',
  },
  {
    id: 'func-flow',
    from: 'function',
    to: 'controlflow',
    explanation: 'Calling a function transfers control to its body. Return transfers control back to the call site. Arguments pass values; the return statement delivers results.',
    important: true,
  },
  {
    id: 'func-stack',
    from: 'function',
    to: 'stack',
    explanation: 'Each function call creates a new stack frame holding its local variables, parameters, and return address.',
  },
  {
    id: 'expr-comp',
    from: 'expression',
    to: 'compilation',
    explanation: 'The compiler translates source expressions into machine instructions. Optimization may reorder or eliminate operations while preserving observable behavior.',
  },
  {
    id: 'heap-os',
    from: 'heap',
    to: 'os',
    explanation: 'Dynamic memory allocation ultimately requests memory from the operating system. malloc manages a pool; the OS provides the underlying pages.',
  },
  {
    id: 'os-hw',
    from: 'os',
    to: 'hardware',
    explanation: 'The operating system mediates between C programs and hardware. System calls abstract hardware details into portable operations.',
  },
  {
    id: 'os-res',
    from: 'os',
    to: 'resources',
    explanation: 'The OS manages shared resources — files, network sockets, devices. C programs request and release these resources through system interfaces.',
  },
  {
    id: 'ptr-hw',
    from: 'pointer',
    to: 'hardware',
    explanation: 'In systems programming, pointers can reference hardware registers through memory-mapped I/O. This is implementation-specific and requires care.',
  },
  {
    id: 'comp-os',
    from: 'compilation',
    to: 'os',
    explanation: 'The compiler produces an executable that the OS loads and runs. The linker resolves references to OS-provided libraries.',
  },
  {
    id: 'flow-res',
    from: 'controlflow',
    to: 'resources',
    explanation: 'Proper control flow ensures resources are correctly acquired and released. Early returns or errors can leak resources if not handled carefully.',
  },
];
