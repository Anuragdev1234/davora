import { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import styles from './IoArticle.module.css';

export function IoInDepthManuscript() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={styles.manuscriptContainer}>
      {/* ========================================================
          CHAPTER 1: What is Input and Output in C?
          ======================================================== */}
      <section className={styles.sectionWrapper} id="what-is-io">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>01</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>Foundations</span>
            </div>
            <h2 className={styles.mainHeading}>What Is Input and Output in C?</h2>
            <p className={styles.bodyText}>
              In C, <strong>Input and Output (I/O)</strong> refers to operations that move data into a program from an external source (such as keyboard, file, or network socket) or transmit data out of a program to a destination (such as terminal screen, printer, or disk file).
            </p>
            <p className={styles.bodyText}>
              Unlike modern object-oriented languages where I/O might be baked into language grammar or classes, C treats all input and output as <strong>streams of sequential bytes</strong> managed by the Standard C Runtime Library declared in <code>&lt;stdio.h&gt;</code>.
            </p>
          </div>

          {/* Standard Streams Architecture Diagram */}
          <div className={styles.streamsDiagramCard}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 6px 0', color: '#1e293b' }}>
              The Three Standard Streams
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
              Whenever a C program starts execution, the operating system automatically opens three standard streams:
            </p>

            <div className={styles.streamFlowGrid}>
              <div className={styles.streamCard}>
                <div className={styles.streamCardHeader}>
                  <span className={styles.streamName}>stdin</span>
                  <span className={styles.streamTypePill} style={{ background: '#dbeafe', color: '#1e40af' }}>
                    Input
                  </span>
                </div>
                <div className={styles.streamDesc}>
                  <strong>Standard Input</strong> (file descriptor 0). Defaults to the keyboard buffer. Functions like <code>scanf()</code>, <code>getchar()</code>, and <code>fgets()</code> consume bytes from this stream.
                </div>
              </div>

              <div className={styles.streamCard}>
                <div className={styles.streamCardHeader}>
                  <span className={styles.streamName}>stdout</span>
                  <span className={styles.streamTypePill} style={{ background: '#dcfce7', color: '#166534' }}>
                    Output
                  </span>
                </div>
                <div className={styles.streamDesc}>
                  <strong>Standard Output</strong> (file descriptor 1). Defaults to the terminal console display. Usually line-buffered when connected to a terminal, meaning text is flushed on <code>\n</code>.
                </div>
              </div>

              <div className={styles.streamCard}>
                <div className={styles.streamCardHeader}>
                  <span className={styles.streamName}>stderr</span>
                  <span className={styles.streamTypePill} style={{ background: '#fee2e2', color: '#991b1b' }}>
                    Diagnostics
                  </span>
                </div>
                <div className={styles.streamDesc}>
                  <strong>Standard Error</strong> (file descriptor 2). Unbuffered error logging stream printed directly to terminal display without waiting for buffer flushes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 2: Formatted vs Unformatted I/O
          ======================================================== */}
      <section className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} id="formatted-vs-unformatted">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>02</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>Taxonomy</span>
            </div>
            <h2 className={styles.mainHeading}>Types of Input and Output Functions in C</h2>
            <p className={styles.bodyText}>
              C standard library I/O functions fall into two primary architectural categories based on whether they transform character data into binary internal representations:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {/* Formatted I/O */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ background: '#3b82f6', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                  TYPE A
                </span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  Formatted I/O
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: 14 }}>
                Functions that parse, convert, and format data according to specified format codes (e.g. converting the characters <code style={{ color: '#2563eb' }}>"42"</code> into the 4-byte two's-complement integer <code style={{ color: '#2563eb' }}>0x0000002A</code>).
              </p>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.82rem', background: '#ffffff', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }}>
                • <code>printf()</code> — Formatted console output<br />
                • <code>scanf()</code> — Formatted console input<br />
                • <code>sprintf() / snprintf()</code> — String buffer formatting<br />
                • <code>fprintf() / fscanf()</code> — File stream formatting
              </div>
            </div>

            {/* Unformatted I/O */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ background: '#10b981', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                  TYPE B
                </span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  Unformatted I/O
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: 14 }}>
                Functions that read or write raw characters and text blocks without any type conversion or parsing. They transfer bytes directly between memory and streams.
              </p>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.82rem', background: '#ffffff', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }}>
                • <code>getchar() / putchar()</code> — Single character read/write<br />
                • <code>fgets() / fputs()</code> — Bounded line read/write<br />
                • <code>fgetc() / fputc()</code> — Stream character operations<br />
                • <code>fread() / fwrite()</code> — Binary block operations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 3: printf() & Formatted Output
          ======================================================== */}
      <section className={styles.sectionWrapper} id="printf-deep-dive">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>03</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>Formatted Output</span>
            </div>
            <h2 className={styles.mainHeading}><code>printf()</code> and Formatted Output</h2>
            <p className={styles.bodyText}>
              The <code>printf()</code> function (print formatted) produces output according to a format control string. The format string contains ordinary characters copied directly to <code>stdout</code> and conversion specifications beginning with <code>%</code>.
            </p>
          </div>

          <div className={styles.codeAndOutputDuo}>
            <div className={styles.codePanel}>
              <div className={styles.panelHeader}>
                <span className={styles.fileName}>printf_formatting.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() =>
                    handleCopy(
                      `#include <stdio.h>\n\nint main(void) {\n    int count = 42;\n    double ratio = 3.14159265;\n    char grade = 'A';\n\n    printf("Count: %-5d | Hex: 0x%04X\\n", count, count);\n    printf("Pi: %.2f | Precision: %.6f\\n", ratio, ratio);\n    printf("Grade: %c | Percentage: 100%%\\n", grade);\n    return 0;\n}`,
                      1
                    )
                  }
                >
                  {copiedIndex === 1 ? <Check size={12} color="#86efac" /> : <Copy size={12} />}
                  <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeContent}>
{`#include <stdio.h>

int main(void) {
    int count = 42;
    double ratio = 3.14159265;
    char grade = 'A';

    printf("Count: %-5d | Hex: 0x%04X\\n", count, count);
    printf("Pi: %.2f | Precision: %.6f\\n", ratio, ratio);
    printf("Grade: %c | Percentage: 100%%\\n", grade);

    return 0;
}`}
              </pre>
            </div>

            <div className={styles.terminalPanel}>
              <div className={styles.terminalHeader}>
                <span>Terminal Output</span>
              </div>
              <pre className={styles.terminalBody}>
{`Count: 42    | Hex: 0x002A
Pi: 3.14 | Precision: 3.141593
Grade: A | Percentage: 100%`}
              </pre>
            </div>
          </div>

          {/* Escape Sequences Box */}
          <div className={styles.calloutBox}>
            <Info size={20} className={styles.calloutIcon} color="#2563eb" />
            <div className={styles.calloutText}>
              <strong>Common Escape Sequences:</strong> <code>\n</code> (newline, moves cursor to line start), <code>\t</code> (horizontal tab), <code>\\</code> (literal backslash), <code>\"</code> (literal double quote), and <code>%%</code> (literal percent sign in <code>printf</code>).
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 4: scanf() & Formatted Input
          ======================================================== */}
      <section className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} id="scanf-deep-dive">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>04</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>Formatted Input</span>
            </div>
            <h2 className={styles.mainHeading}><code>scanf()</code> and the Address Operator (&)</h2>
            <p className={styles.bodyText}>
              <code>scanf()</code> reads data from <code>stdin</code>, interprets the characters according to conversion specifiers, and writes the results into the memory locations referenced by argument pointers.
            </p>
          </div>

          {/* Address-of Operator Callout */}
          <div className={styles.calloutBox} style={{ borderLeftColor: '#f59e0b', background: '#fffdfa' }}>
            <AlertTriangle size={20} className={styles.calloutIcon} color="#d97706" />
            <div className={styles.calloutText}>
              <strong>Why & (address-of) is mandatory:</strong> C strictly evaluates and passes function arguments <em>by value</em> (making a local copy). If you write <code>scanf("%d", age)</code>, <code>scanf</code> only receives a copy of the number, making it impossible to update your variable. Passing <code>&age</code> provides the actual memory address so <code>scanf</code> can dereference and store the parsed integer directly into your stack variable!
            </div>
          </div>

          <div className={styles.codeAndOutputDuo}>
            <div className={styles.codePanel}>
              <div className={styles.panelHeader}>
                <span className={styles.fileName}>scanf_validation.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() =>
                    handleCopy(
                      `#include <stdio.h>\n\nint main(void) {\n    int age;\n    printf("Enter your age: ");\n\n    if (scanf("%d", &age) != 1) {\n        printf("Error: Invalid numeric input.\\n");\n        return 1;\n    }\n\n    printf("Verified age: %d years old.\\n", age);\n    return 0;\n}`,
                      2
                    )
                  }
                >
                  {copiedIndex === 2 ? <Check size={12} color="#86efac" /> : <Copy size={12} />}
                  <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeContent}>
{`#include <stdio.h>

int main(void) {
    int age;
    printf("Enter your age: ");

    // Always check return value of scanf!
    if (scanf("%d", &age) != 1) {
        printf("Error: Invalid numeric input.\\n");
        return 1;
    }

    printf("Verified age: %d years old.\\n", age);
    return 0;
}`}
              </pre>
            </div>

            <div className={styles.terminalPanel}>
              <div className={styles.terminalHeader}>
                <span>Interactive Execution Sample</span>
              </div>
              <pre className={styles.terminalBody}>
{`$ ./scanf_validation
Enter your age: 24
Verified age: 24 years old.

--- Or upon invalid typing: ---
$ ./scanf_validation
Enter your age: twenty
Error: Invalid numeric input.`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 5: Character & String I/O (getchar, putchar, fgets)
          ======================================================== */}
      <section className={styles.sectionWrapper} id="unformatted-io">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>05</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>Character & String I/O</span>
            </div>
            <h2 className={styles.mainHeading}>Safe String Input: Why <code>fgets()</code> Replaced <code>gets()</code></h2>
            <p className={styles.bodyText}>
              In early C standards, <code>gets()</code> was commonly used for string input. However, <code>gets()</code> had no parameter to specify the destination buffer size, causing endless buffer overflow security breaches whenever input exceeded array bounds.
            </p>
          </div>

          <div className={styles.calloutBox} style={{ borderLeftColor: '#10b981', background: '#f6fdf9' }}>
            <ShieldCheck size={20} className={styles.calloutIcon} color="#059669" />
            <div className={styles.calloutText}>
              <strong>Modern Standard Requirement:</strong> <code>gets()</code> was officially deprecated in ISO C99 and completely <strong>removed</strong> from the C language in ISO C11. Always use <code>fgets(buffer, sizeof buffer, stdin)</code>, which guarantees bounded reads and null-termination.
            </div>
          </div>

          <div className={styles.codeAndOutputDuo}>
            <div className={styles.codePanel}>
              <div className={styles.panelHeader}>
                <span className={styles.fileName}>safe_string_io.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() =>
                    handleCopy(
                      `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char name[32];\n\n    printf("Enter full name: ");\n    if (fgets(name, sizeof(name), stdin) != NULL) {\n        // Strip optional trailing newline stored by fgets\n        name[strcspn(name, "\\n")] = '\\0';\n        printf("Welcome, %s!\\n", name);\n    }\n    return 0;\n}`,
                      3
                    )
                  }
                >
                  {copiedIndex === 3 ? <Check size={12} color="#86efac" /> : <Copy size={12} />}
                  <span>{copiedIndex === 3 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeContent}>
{`#include <stdio.h>
#include <string.h>

int main(void) {
    char name[32];

    printf("Enter full name: ");
    if (fgets(name, sizeof(name), stdin) != NULL) {
        // Strip trailing newline character stored by fgets
        name[strcspn(name, "\\n")] = '\\0';
        printf("Welcome, %s!\\n", name);
    }

    return 0;
}`}
              </pre>
            </div>

            <div className={styles.terminalPanel}>
              <div className={styles.terminalHeader}>
                <span>Terminal Session</span>
              </div>
              <pre className={styles.terminalBody}>
{`Enter full name: Ada Lovelace
Welcome, Ada Lovelace!`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 6: The Full Compilable Example with Validation
          ======================================================== */}
      <section className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} id="complete-compilable-program">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>06</span>
              <span className={styles.eyebrowDivider}>/</span>
              <span>Synthesized Program</span>
            </div>
            <h2 className={styles.mainHeading}>The Complete Compilable Program</h2>
            <p className={styles.bodyText}>
              Below is the complete, robustly validated C program demonstrated in our hero laboratory, featuring formatted output prompts, input validation, binary arithmetic processing, and formatted calculation delivery.
            </p>
          </div>

          <div className={styles.codeAndOutputDuo}>
            <div className={styles.codePanel}>
              <div className={styles.panelHeader}>
                <span className={styles.fileName}>main.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() =>
                    handleCopy(
                      `#include <stdio.h>\n\nint main(void) {\n    int a, b, sum;\n\n    printf("Enter two integers: ");\n\n    if (scanf("%d %d", &a, &b) != 2) {\n        printf("Invalid input.\\n");\n        return 1;\n    }\n\n    sum = a + b;\n\n    printf("Sum = %d\\n", sum);\n\n    return 0;\n}`,
                      4
                    )
                  }
                >
                  {copiedIndex === 4 ? <Check size={12} color="#86efac" /> : <Copy size={12} />}
                  <span>{copiedIndex === 4 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeContent}>
{`#include <stdio.h>

int main(void) {
    int a, b, sum;

    printf("Enter two integers: ");

    if (scanf("%d %d", &a, &b) != 2) {
        printf("Invalid input.\\n");
        return 1;
    }

    sum = a + b;

    printf("Sum = %d\\n", sum);

    return 0;
}`}
              </pre>
            </div>

            <div className={styles.terminalPanel}>
              <div className={styles.terminalHeader}>
                <span>Command Line Compilation & Runs</span>
              </div>
              <pre className={styles.terminalBody}>
{`$ gcc -Wall -Wextra -O2 main.c -o sum_program

$ ./sum_program
Enter two integers: 10 20
Sum = 30

$ ./sum_program
Enter two integers: 7 8
Sum = 15

$ ./sum_program
Enter two integers: 42 abc
Invalid input.`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
