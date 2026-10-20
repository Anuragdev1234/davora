/**
 * DEVORA — History of C Timeline Data
 */

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  side: 'top' | 'bottom';
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: '1972',
    title: 'Birth at Bell Labs',
    description: 'Dennis Ritchie develops C at Bell Labs, evolving it from the B language on a PDP-11 minicomputer.',
    side: 'top',
  },
  {
    year: '1973',
    title: 'Unix rewritten in C',
    description: 'The Unix kernel is rewritten in C, demonstrating that an operating system could be written in a high-level language.',
    side: 'bottom',
  },
  {
    year: '1974',
    title: 'Unix distributed widely',
    description: 'Bell Labs licenses Unix to universities, spreading C across academic computer science departments.',
    side: 'top',
  },
  {
    year: '1978',
    title: 'K&R Book published',
    description: 'Kernighan and Ritchie publish "The C Programming Language," which becomes the de facto language reference.',
    side: 'bottom',
  },
  {
    year: 'C89',
    title: 'First ANSI standard',
    description: 'ANSI X3.159-1989 standardizes C, establishing function prototypes, the standard library, and portability guarantees.',
    side: 'top',
  },
  {
    year: 'C99',
    title: 'Modern features',
    description: 'Adds inline functions, variable-length arrays, designated initializers, single-line comments, and intermingled declarations.',
    side: 'bottom',
  },
  {
    year: 'C11',
    title: 'Concurrency & safety',
    description: 'Introduces threads, atomics, _Generic selections, anonymous structs/unions, and static assertions.',
    side: 'top',
  },
  {
    year: 'C17',
    title: 'Corrections',
    description: 'A defect-repair release that clarified existing features without adding new functionality.',
    side: 'bottom',
  },
  {
    year: 'C23',
    title: 'Latest standard',
    description: 'Adds constexpr objects, typeof, improved enumerations, #embed, nullptr, binary literals, and modern attributes.',
    side: 'top',
  },
];
