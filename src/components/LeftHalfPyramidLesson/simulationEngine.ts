export interface SimStep {
  stepIndex: number;
  line: number;
  flowchartNode: string;
  vars: {
    n: string;
    i: string;
    j: string;
    k: string;
    nMinusI: string;
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

export function generateLeftPyramidSimulationSteps(n: number): SimStep[] {
  const steps: SimStep[] = [];
  let currentOutput = '';
  let stepIdx = 0;

  // Step 0: Start / Process Entry
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
      condOuter: '—',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: 'Process starts execution. Memory is allocated for variable n.',
    currentRow: 0,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Step 1: Prompt
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
      condOuter: '—',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: 'Console prompt printed requesting row count from user.',
    currentRow: 0,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Step 2: Read & Validate input
  currentOutput += `${n}\n`;
  steps.push({
    stepIndex: stepIdx++,
    line: 8,
    flowchartNode: 'validate',
    vars: {
      n: String(n),
      i: '—',
      j: '—',
      k: '—',
      nMinusI: '—',
      condOuter: '—',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: `User input read into n = ${n}. Validation (1 <= ${n} <= 10) confirmed.`,
    currentRow: 0,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Outer loop: i runs from 1 to n
  for (let i = 1; i <= n; i++) {
    const requiredSpaces = n - i;

    // Outer loop init / iteration check
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
        condOuter: `${i} <= ${n} (true)`,
        condSpace: '—',
        condStar: '—',
      },
      output: currentOutput,
      description: i === 1
        ? `Initialize outer loop: i = 1. Condition (1 <= ${n}) is true. Starting row 1.`
        : `Outer loop check: i = ${i} <= ${n} is true. Starting row ${i} (needs ${requiredSpaces} space units, ${i} stars).`,
      currentRow: i,
      spacesInRow: 0,
      starsInRow: 0,
    });

    // Space loop: j runs from 1 to n - i
    let spacesCount = 0;
    if (requiredSpaces > 0) {
      for (let j = 1; j <= requiredSpaces; j++) {
        // Space condition check
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
            condOuter: `${i} <= ${n} (true)`,
            condSpace: `${j} <= ${requiredSpaces} (true)`,
            condStar: '—',
          },
          output: currentOutput,
          description: `Space loop: j = ${j} <= ${requiredSpaces} is true. Ready to print leading space unit.`,
          currentRow: i,
          spacesInRow: spacesCount,
          starsInRow: 0,
        });

        // Print space unit (two spaces to match "* ")
        currentOutput += '  ';
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
            condOuter: `${i} <= ${n} (true)`,
            condSpace: `${j} <= ${requiredSpaces} (true)`,
            condStar: '—',
          },
          output: currentOutput,
          description: `Printed leading space unit ${spacesCount} of ${requiredSpaces} for row ${i}.`,
          currentRow: i,
          spacesInRow: spacesCount,
          starsInRow: 0,
        });

        // Increment j
        steps.push({
          stepIndex: stepIdx++,
          line: 14,
          flowchartNode: 'inc-j',
          vars: {
            n: String(n),
            i: String(i),
            j: String(j + 1),
            k: '—',
            nMinusI: String(requiredSpaces),
            condOuter: `${i} <= ${n} (true)`,
            condSpace: `${j + 1} <= ${requiredSpaces} (${j + 1 <= requiredSpaces ? 'true' : 'false'})`,
            condStar: '—',
          },
          output: currentOutput,
          description: `Incremented space counter: j = ${j + 1}.`,
          currentRow: i,
          spacesInRow: spacesCount,
          starsInRow: 0,
        });
      }
    }

    // Space condition failed (j > n - i)
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
        condOuter: `${i} <= ${n} (true)`,
        condSpace: `${requiredSpaces + 1} <= ${requiredSpaces} (false)`,
        condStar: '—',
      },
      output: currentOutput,
      description: requiredSpaces > 0
        ? `Space loop condition (${requiredSpaces + 1} <= ${requiredSpaces}) is false. All ${requiredSpaces} space units printed.`
        : `Space condition (1 <= 0) is false for the final row. No leading spaces needed.`,
      currentRow: i,
      spacesInRow: spacesCount,
      starsInRow: 0,
    });

    // Star loop: k runs from 1 to i
    let starsCount = 0;
    for (let k = 1; k <= i; k++) {
      // Star condition check
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
          condOuter: `${i} <= ${n} (true)`,
          condSpace: 'false',
          condStar: `${k} <= ${i} (true)`,
        },
        output: currentOutput,
        description: `Star loop: k = ${k} <= ${i} is true. Ready to print star ${k} of ${i}.`,
        currentRow: i,
        spacesInRow: spacesCount,
        starsInRow: starsCount,
      });

      // Print star
      currentOutput += '* ';
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
          condOuter: `${i} <= ${n} (true)`,
          condSpace: 'false',
          condStar: `${k} <= ${i} (true)`,
        },
        output: currentOutput,
        description: `Printed star ${starsCount} of ${i} in row ${i}.`,
        currentRow: i,
        spacesInRow: spacesCount,
        starsInRow: starsCount,
      });

      // Increment k
      steps.push({
        stepIndex: stepIdx++,
        line: 18,
        flowchartNode: 'inc-k',
        vars: {
          n: String(n),
          i: String(i),
          j: String(requiredSpaces + 1),
          k: String(k + 1),
          nMinusI: String(requiredSpaces),
          condOuter: `${i} <= ${n} (true)`,
          condSpace: 'false',
          condStar: `${k + 1} <= ${i} (${k + 1 <= i ? 'true' : 'false'})`,
        },
        output: currentOutput,
        description: `Incremented star counter: k = ${k + 1}.`,
        currentRow: i,
        spacesInRow: spacesCount,
        starsInRow: starsCount,
      });
    }

    // Star condition failed (k > i)
    steps.push({
      stepIndex: stepIdx++,
      line: 18,
      flowchartNode: 'cond-k',
      vars: {
        n: String(n),
        i: String(i),
        j: String(requiredSpaces + 1),
        k: String(i + 1),
        nMinusI: String(requiredSpaces),
        condOuter: `${i} <= ${n} (true)`,
        condSpace: 'false',
        condStar: `${i + 1} <= ${i} (false)`,
      },
      output: currentOutput,
      description: `Star loop condition (${i + 1} <= ${i}) is false. All ${i} stars printed for row ${i}.`,
      currentRow: i,
      spacesInRow: spacesCount,
      starsInRow: starsCount,
    });

    // Print newline
    currentOutput += '\n';
    steps.push({
      stepIndex: stepIdx++,
      line: 22,
      flowchartNode: 'print-newline',
      vars: {
        n: String(n),
        i: String(i),
        j: String(requiredSpaces + 1),
        k: String(i + 1),
        nMinusI: String(requiredSpaces),
        condOuter: `${i} <= ${n} (true)`,
        condSpace: '—',
        condStar: '—',
      },
      output: currentOutput,
      description: `Row ${i} complete. Printed newline (\\n) to advance console cursor.`,
      currentRow: i,
      spacesInRow: spacesCount,
      starsInRow: starsCount,
    });

    // Increment i
    steps.push({
      stepIndex: stepIdx++,
      line: 13,
      flowchartNode: 'inc-i',
      vars: {
        n: String(n),
        i: String(i + 1),
        j: '—',
        k: '—',
        nMinusI: String(Math.max(0, n - (i + 1))),
        condOuter: `${i + 1} <= ${n} (${i + 1 <= n ? 'true' : 'false'})`,
        condSpace: '—',
        condStar: '—',
      },
      output: currentOutput,
      description: `Incremented outer loop counter: i = ${i + 1}.`,
      currentRow: i + 1,
      spacesInRow: 0,
      starsInRow: 0,
    });
  }

  // Outer loop condition failed (i > n)
  steps.push({
    stepIndex: stepIdx++,
    line: 13,
    flowchartNode: 'cond-i',
    vars: {
      n: String(n),
      i: String(n + 1),
      j: '—',
      k: '—',
      nMinusI: '0',
      condOuter: `${n + 1} <= ${n} (false)`,
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: `Outer loop condition (${n + 1} <= ${n}) is false. All ${n} rows have finished.`,
    currentRow: n + 1,
    spacesInRow: 0,
    starsInRow: 0,
  });

  // Return 0
  steps.push({
    stepIndex: stepIdx++,
    line: 25,
    flowchartNode: 'end',
    vars: {
      n: String(n),
      i: String(n + 1),
      j: '—',
      k: '—',
      nMinusI: '0',
      condOuter: 'false',
      condSpace: '—',
      condStar: '—',
    },
    output: currentOutput,
    description: 'Execution reached return 0. Process terminated cleanly with status code 0.',
    currentRow: n,
    spacesInRow: 0,
    starsInRow: 0,
  });

  return steps;
}
