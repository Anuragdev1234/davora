export interface SimStep {
  stepIndex: number;
  line: number;
  flowchartNode: string;
  vars: {
    n: string;
    i: string;
    j: string;
    condOuter: string;
    condInner: string;
  };
  output: string;
  description: string;
  currentRow: number;
  starsInRow: number;
}

export function generateInvertedSimulationSteps(n: number): SimStep[] {
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
      condOuter: '—',
      condInner: '—',
    },
    output: currentOutput,
    description: 'Process starts execution. Variable n is allocated in stack frame.',
    currentRow: 0,
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
      condOuter: '—',
      condInner: '—',
    },
    output: currentOutput,
    description: 'Prompt printed to console requesting row count from user.',
    currentRow: 0,
    starsInRow: 0,
  });

  // Step 2: Read & Validate input
  currentOutput += `${n}\n`;
  steps.push({
    stepIndex: stepIdx++,
    line: 8,
    flowchartNode: 'input-n',
    vars: {
      n: String(n),
      i: '—',
      j: '—',
      condOuter: '—',
      condInner: '—',
    },
    output: currentOutput,
    description: `User input read into n = ${n}. Validation (1 <= ${n} <= 10) confirmed.`,
    currentRow: 0,
    starsInRow: 0,
  });

  // Outer loop execution: i starts at n and decrements to 1
  for (let i = n; i >= 1; i--) {
    const rowNumber = n - i + 1; // 1-based visual row order: Row 1 has n stars, Row n has 1 star

    // Outer loop init / iteration check
    steps.push({
      stepIndex: stepIdx++,
      line: 13,
      flowchartNode: i === n ? 'init-i' : 'cond-i',
      vars: {
        n: String(n),
        i: String(i),
        j: '—',
        condOuter: `${i} >= 1 (true)`,
        condInner: '—',
      },
      output: currentOutput,
      description: i === n
        ? `Initialize reverse outer loop: i = ${n}. Outer condition (${n} >= 1) is true. Starting top row.`
        : `Outer loop check: i = ${i} >= 1 is true. Processing row ${rowNumber} with ${i} stars.`,
      currentRow: rowNumber,
      starsInRow: 0,
    });

    // Inner loop execution for row i (prints i stars)
    let starsCount = 0;
    for (let j = 1; j <= i; j++) {
      // Inner loop condition check
      steps.push({
        stepIndex: stepIdx++,
        line: 14,
        flowchartNode: j === 1 ? 'init-j' : 'cond-j',
        vars: {
          n: String(n),
          i: String(i),
          j: String(j),
          condOuter: `${i} >= 1 (true)`,
          condInner: `${j} <= ${i} (true)`,
        },
        output: currentOutput,
        description: `Inner loop: j = ${j} <= ${i} is true. Ready to print star ${j} of ${i}.`,
        currentRow: rowNumber,
        starsInRow: starsCount,
      });

      // Print star
      currentOutput += '* ';
      starsCount++;
      steps.push({
        stepIndex: stepIdx++,
        line: 15,
        flowchartNode: 'print-star',
        vars: {
          n: String(n),
          i: String(i),
          j: String(j),
          condOuter: `${i} >= 1 (true)`,
          condInner: `${j} <= ${i} (true)`,
        },
        output: currentOutput,
        description: `Printed star ${starsCount} of ${i} in row ${rowNumber}.`,
        currentRow: rowNumber,
        starsInRow: starsCount,
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
          condOuter: `${i} >= 1 (true)`,
          condInner: `${j + 1} <= ${i} (${j + 1 <= i ? 'true' : 'false'})`,
        },
        output: currentOutput,
        description: `Incremented column counter: j = ${j + 1}.`,
        currentRow: rowNumber,
        starsInRow: starsCount,
      });
    }

    // Inner loop condition failed (j > i)
    steps.push({
      stepIndex: stepIdx++,
      line: 14,
      flowchartNode: 'cond-j',
      vars: {
        n: String(n),
        i: String(i),
        j: String(i + 1),
        condOuter: `${i} >= 1 (true)`,
        condInner: `${i + 1} <= ${i} (false)`,
      },
      output: currentOutput,
      description: `Inner loop condition (${i + 1} <= ${i}) is false. All ${i} stars printed for row ${rowNumber}.`,
      currentRow: rowNumber,
      starsInRow: starsCount,
    });

    // Print newline
    currentOutput += '\n';
    steps.push({
      stepIndex: stepIdx++,
      line: 17,
      flowchartNode: 'print-newline',
      vars: {
        n: String(n),
        i: String(i),
        j: String(i + 1),
        condOuter: `${i} >= 1 (true)`,
        condInner: '—',
      },
      output: currentOutput,
      description: `Row ${rowNumber} complete. Printed newline (\\n) to advance to the next line.`,
      currentRow: rowNumber,
      starsInRow: starsCount,
    });

    // Decrement i (Reverse counting!)
    steps.push({
      stepIndex: stepIdx++,
      line: 13,
      flowchartNode: 'dec-i',
      vars: {
        n: String(n),
        i: String(i - 1),
        j: '—',
        condOuter: `${i - 1} >= 1 (${i - 1 >= 1 ? 'true' : 'false'})`,
        condInner: '—',
      },
      output: currentOutput,
      description: `Decremented outer loop counter: i = ${i - 1} (i--).`,
      currentRow: rowNumber + 1,
      starsInRow: 0,
    });
  }

  // Outer loop condition failed (i = 0 < 1)
  steps.push({
    stepIndex: stepIdx++,
    line: 13,
    flowchartNode: 'cond-i',
    vars: {
      n: String(n),
      i: '0',
      j: '—',
      condOuter: '0 >= 1 (false)',
      condInner: '—',
    },
    output: currentOutput,
    description: 'Outer loop condition (0 >= 1) evaluated to false. Exiting reverse outer loop.',
    currentRow: n + 1,
    starsInRow: 0,
  });

  // Return 0
  steps.push({
    stepIndex: stepIdx++,
    line: 20,
    flowchartNode: 'end',
    vars: {
      n: String(n),
      i: '0',
      j: '—',
      condOuter: 'false',
      condInner: '—',
    },
    output: currentOutput,
    description: 'Execution reached return 0. Process terminated cleanly with status code 0.',
    currentRow: n,
    starsInRow: 0,
  });

  return steps;
}
