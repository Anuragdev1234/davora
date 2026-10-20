export interface SimulationStep {
  stepIndex: number;
  line: number;
  flowchartNode: string;
  vars: {
    n: string;
    i: string;
    j: string;
    k: string;
    nMinusI: string;
    twoIMinusOne: string;
    condOuter: string;
    condSpace: string;
    condStar: string;
  };
  output: string;
  description: string;
  currentRow: number;
  spacesInRow: number;
  starsInRow: number;
}

export function generateFullPyramidSimulationSteps(n: number): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepIdx = 0;
  let currentOutput = '';

  // Step 0: Program Entry & Variable Allocation
  steps.push({
    stepIndex: stepIdx++,
    line: 4,
    flowchartNode: 'start',
    vars: {
      n: '—',
      i: '—',
      j: '—',
      k: '—',
      nMinusI: '—',
      twoIMinusOne: '—',
      condOuter: '—',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: 'Process starts at main(void). Stack allocates integer n.',
    currentRow: 0,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Step 1: Prompt printed
  currentOutput += 'Enter the number of rows (1-10): ';
  steps.push({
    stepIndex: stepIdx++,
    line: 6,
    flowchartNode: 'input-n',
    vars: {
      n: '—',
      i: '—',
      j: '—',
      k: '—',
      nMinusI: '—',
      twoIMinusOne: '—',
      condOuter: '—',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: 'Console prompt printed requesting pyramid row count from user.',
    currentRow: 0,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Step 2: Read & Validate input
  currentOutput += `${n}\n`;
  steps.push({
    stepIndex: stepIdx++,
    line: 8,
    flowchartNode: 'valid-n',
    vars: {
      n: String(n),
      i: '—',
      j: '—',
      k: '—',
      nMinusI: '—',
      twoIMinusOne: '—',
      condOuter: '—',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: `User input read into n = ${n}. Validation guard (1 <= ${n} <= 10) confirmed valid.`,
    currentRow: 0,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Outer loop: i runs from 1 to n
  for (let i = 1; i <= n; i++) {
    const requiredSpaces = n - i;
    const requiredStars = 2 * i - 1;

    // Outer loop init / condition check
    steps.push({
      stepIndex: stepIdx++,
      line: 13,
      flowchartNode: i === 1 ? 'init-i' : 'cond-i',
      vars: {
        n: String(n),
        i: String(i),
        j: '—',
        k: '—',
        nMinusI: String(requiredSpaces),
        twoIMinusOne: String(requiredStars),
        condOuter: `${i} <= ${n} (true)`,
        condSpace: '—',
        condStar: '—',
      },
      output: currentOutput,
      description: i === 1
        ? `Initialize outer loop: i = 1. Condition (1 <= ${n}) is true. Starting row 1.`
        : `Outer loop check: i = ${i} <= ${n} is true. Starting row ${i} (needs ${requiredSpaces} spaces, ${requiredStars} stars).`,
      currentRow: i,
      spacesInRow: 0,
      starsInRow: 0,
    });

    // Space loop: j runs from 1 to n - i
    let spacesCount = 0;
    if (requiredSpaces > 0) {
      for (let j = 1; j <= requiredSpaces; j++) {
        // Space loop condition check
        steps.push({
          stepIndex: stepIdx++,
          line: 14,
          flowchartNode: j === 1 ? 'init-j' : 'cond-j',
          vars: {
            n: String(n),
            i: String(i),
            j: String(j),
            k: '—',
            nMinusI: String(requiredSpaces),
            twoIMinusOne: String(requiredStars),
            condOuter: `${i} <= ${n} (true)`,
            condSpace: `${j} <= ${requiredSpaces} (true)`,
            condStar: '—',
          },
          output: currentOutput,
          description: `Space loop: j = ${j} <= ${requiredSpaces} is true. Ready to print leading space.`,
          currentRow: i,
          spacesInRow: spacesCount,
          starsInRow: 0,
        });

        // Print leading space (single space " ")
        currentOutput += ' ';
        spacesCount++;
        steps.push({
          stepIndex: stepIdx++,
          line: 15,
          flowchartNode: 'print-space',
          vars: {
            n: String(n),
            i: String(i),
            j: String(j),
            k: '—',
            nMinusI: String(requiredSpaces),
            twoIMinusOne: String(requiredStars),
            condOuter: `${i} <= ${n} (true)`,
            condSpace: `${j} <= ${requiredSpaces} (true)`,
            condStar: '—',
          },
          output: currentOutput,
          description: `Executed printf(" "): printed space ${j} of ${requiredSpaces} for row ${i}.`,
          currentRow: i,
          spacesInRow: spacesCount,
          starsInRow: 0,
        });
      }

      // Space loop exit check: j = requiredSpaces + 1
      steps.push({
        stepIndex: stepIdx++,
        line: 14,
        flowchartNode: 'cond-j',
        vars: {
          n: String(n),
          i: String(i),
          j: String(requiredSpaces + 1),
          k: '—',
          nMinusI: String(requiredSpaces),
          twoIMinusOne: String(requiredStars),
          condOuter: `${i} <= ${n} (true)`,
          condSpace: `${requiredSpaces + 1} <= ${requiredSpaces} (false)`,
          condStar: '—',
        },
        output: currentOutput,
        description: `Space loop exit: j = ${requiredSpaces + 1} > ${requiredSpaces}. All leading spaces complete for row ${i}.`,
        currentRow: i,
        spacesInRow: spacesCount,
        starsInRow: 0,
      });
    } else {
      // row n has 0 spaces: j = 1 <= 0 is false immediately
      steps.push({
        stepIndex: stepIdx++,
        line: 14,
        flowchartNode: 'cond-j',
        vars: {
          n: String(n),
          i: String(i),
          j: '1',
          k: '—',
          nMinusI: '0',
          twoIMinusOne: String(requiredStars),
          condOuter: `${i} <= ${n} (true)`,
          condSpace: '1 <= 0 (false)',
          condStar: '—',
        },
        output: currentOutput,
        description: `Row ${i} requires 0 leading spaces (n - i = 0). Space loop skipped immediately.`,
        currentRow: i,
        spacesInRow: 0,
        starsInRow: 0,
      });
    }

    // Star loop: k runs from 1 to 2 * i - 1
    let starsCount = 0;
    for (let k = 1; k <= requiredStars; k++) {
      // Star loop condition check
      steps.push({
        stepIndex: stepIdx++,
        line: 18,
        flowchartNode: k === 1 ? 'init-k' : 'cond-k',
        vars: {
          n: String(n),
          i: String(i),
          j: String(requiredSpaces + 1),
          k: String(k),
          nMinusI: String(requiredSpaces),
          twoIMinusOne: String(requiredStars),
          condOuter: `${i} <= ${n} (true)`,
          condSpace: `${requiredSpaces + 1} <= ${requiredSpaces} (false)`,
          condStar: `${k} <= ${requiredStars} (true)`,
        },
        output: currentOutput,
        description: `Star loop: k = ${k} <= ${requiredStars} is true. Ready to print star.`,
        currentRow: i,
        spacesInRow: spacesCount,
        starsInRow: starsCount,
      });

      // Print star ("*")
      currentOutput += '*';
      starsCount++;
      steps.push({
        stepIndex: stepIdx++,
        line: 19,
        flowchartNode: 'print-star',
        vars: {
          n: String(n),
          i: String(i),
          j: String(requiredSpaces + 1),
          k: String(k),
          nMinusI: String(requiredSpaces),
          twoIMinusOne: String(requiredStars),
          condOuter: `${i} <= ${n} (true)`,
          condSpace: `${requiredSpaces + 1} <= ${requiredSpaces} (false)`,
          condStar: `${k} <= ${requiredStars} (true)`,
        },
        output: currentOutput,
        description: `Executed printf("*"): printed star ${k} of ${requiredStars} on row ${i}.`,
        currentRow: i,
        spacesInRow: spacesCount,
        starsInRow: starsCount,
      });
    }

    // Star loop exit check: k = requiredStars + 1
    steps.push({
      stepIndex: stepIdx++,
      line: 18,
      flowchartNode: 'cond-k',
      vars: {
        n: String(n),
        i: String(i),
        j: String(requiredSpaces + 1),
        k: String(requiredStars + 1),
        nMinusI: String(requiredSpaces),
        twoIMinusOne: String(requiredStars),
        condOuter: `${i} <= ${n} (true)`,
        condSpace: `${requiredSpaces + 1} <= ${requiredSpaces} (false)`,
        condStar: `${requiredStars + 1} <= ${requiredStars} (false)`,
      },
      output: currentOutput,
      description: `Star loop exit: k = ${requiredStars + 1} > ${requiredStars}. All ${requiredStars} stars printed for row ${i}.`,
      currentRow: i,
      spacesInRow: spacesCount,
      starsInRow: starsCount,
    });

    // Newline execution: printf("\n");
    currentOutput += '\n';
    steps.push({
      stepIndex: stepIdx++,
      line: 22,
      flowchartNode: 'print-newline',
      vars: {
        n: String(n),
        i: String(i),
        j: String(requiredSpaces + 1),
        k: String(requiredStars + 1),
        nMinusI: String(requiredSpaces),
        twoIMinusOne: String(requiredStars),
        condOuter: `${i} <= ${n} (true)`,
        condSpace: '—',
        condStar: '—',
      },
      output: currentOutput,
      description: `Executed printf("\\n"): row ${i} finalized, cursor moved to the next line.`,
      currentRow: i,
      spacesInRow: spacesCount,
      starsInRow: starsCount,
    });
  }

  // Outer loop exit check: i = n + 1
  steps.push({
    stepIndex: stepIdx++,
    line: 13,
    flowchartNode: 'cond-i',
    vars: {
      n: String(n),
      i: String(n + 1),
      j: '—',
      k: '—',
      nMinusI: '—',
      twoIMinusOne: '—',
      condOuter: `${n + 1} <= ${n} (false)`,
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: `Outer loop exit: i = ${n + 1} > ${n}. All ${n} rows successfully rendered!`,
    currentRow: n,
    spacesInRow: 0,
    starsInRow: 2 * n - 1,
  });

  // Step End: return 0;
  steps.push({
    stepIndex: stepIdx++,
    line: 25,
    flowchartNode: 'end',
    vars: {
      n: String(n),
      i: String(n + 1),
      j: '—',
      k: '—',
      nMinusI: '—',
      twoIMinusOne: '—',
      condOuter: `${n + 1} <= ${n} (false)`,
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: 'Executed return 0: Program terminates cleanly with exit code 0.',
    currentRow: n,
    spacesInRow: 0,
    starsInRow: 2 * n - 1,
  });

  return steps;
}
