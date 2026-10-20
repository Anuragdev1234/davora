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

export function generateSimulationSteps(n: number): SimStep[] {
  const steps: SimStep[] = [];
  let currentOutput = '';
  let stepIdx = 0;

  // Step 0: Start / Variable declaration
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
    description: 'Program execution starts. Variable n is allocated in memory.',
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
    description: `User input read into n = ${n}. Validation (1 <= ${n} <= 10) passed.`,
    currentRow: 0,
    starsInRow: 0,
  });

  // Outer loop execution
  for (let i = 1; i <= n; i++) {
    // Outer loop init / iteration check
    steps.push({
      stepIndex: stepIdx++,
      line: 13,
      flowchartNode: i === 1 ? 'init-i' : 'cond-i',
      vars: {
        n: String(n),
        i: String(i),
        j: '—',
        condOuter: `${i} <= ${n} (true)`,
        condInner: '—',
      },
      output: currentOutput,
      description: i === 1
        ? `Initialize outer loop: i = 1. Condition (1 <= ${n}) is true.`
        : `Outer loop check: i = ${i} <= ${n} is true. Starting row ${i}.`,
      currentRow: i,
      starsInRow: 0,
    });

    // Inner loop execution for row i
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
          condOuter: `${i} <= ${n} (true)`,
          condInner: `${j} <= ${i} (true)`,
        },
        output: currentOutput,
        description: `Inner loop: j = ${j} <= ${i} is true. Ready to print star.`,
        currentRow: i,
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
          condOuter: `${i} <= ${n} (true)`,
          condInner: `${j} <= ${i} (true)`,
        },
        output: currentOutput,
        description: `Printed star ${starsCount} of ${i} in row ${i}.`,
        currentRow: i,
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
          condOuter: `${i} <= ${n} (true)`,
          condInner: `${j + 1} <= ${i} (${j + 1 <= i ? 'true' : 'false'})`,
        },
        output: currentOutput,
        description: `Incremented inner loop counter: j = ${j + 1}.`,
        currentRow: i,
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
        condOuter: `${i} <= ${n} (true)`,
        condInner: `${i + 1} <= ${i} (false)`,
      },
      output: currentOutput,
      description: `Inner loop condition (${i + 1} <= ${i}) is false. Exiting inner loop.`,
      currentRow: i,
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
        condOuter: `${i} <= ${n} (true)`,
        condInner: '—',
      },
      output: currentOutput,
      description: `Row ${i} complete. Printed newline (\\n) to advance cursor.`,
      currentRow: i,
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
        condOuter: `${i + 1} <= ${n} (${i + 1 <= n ? 'true' : 'false'})`,
        condInner: '—',
      },
      output: currentOutput,
      description: `Incremented outer loop counter: i = ${i + 1}.`,
      currentRow: i + 1,
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
      condOuter: `${n + 1} <= ${n} (false)`,
      condInner: '—',
    },
    output: currentOutput,
    description: `Outer loop condition (${n + 1} <= ${n}) is false. Exiting outer loop.`,
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
      i: String(n + 1),
      j: '—',
      condOuter: 'false',
      condInner: '—',
    },
    output: currentOutput,
    description: 'Execution reached return 0. Program terminated successfully with code 0.',
    currentRow: n,
    starsInRow: 0,
  });

  return steps;
}
