import { useState } from 'react';
import { CONDITIONAL_EXAMPLES } from '../../data/conditionalLessonData';
import styles from './ConditionalExamplesSection.module.css';

export function ConditionalExamplesSection() {
  // Card 01: if Statement (Age)
  const [exAge, setExAge] = useState<number>(20);
  const outIf = exAge >= 18 ? 'You are eligible to vote.' : '[Condition false: No output]';

  // Card 02: if-else Statement (Number)
  const [exNumber, setExNumber] = useState<number>(7);
  const outIfElse = exNumber % 2 === 0 ? 'Even number' : 'Odd number';

  // Card 03: else-if Ladder (Marks)
  const [exMarks, setExMarks] = useState<number>(85);
  let outLadder = 'Grade C or below';
  if (exMarks >= 90) outLadder = 'Grade A+';
  else if (exMarks >= 80) outLadder = 'Grade A';
  else if (exMarks >= 70) outLadder = 'Grade B';

  // Card 04: Nested if (Scenario)
  const [exScenario, setExScenario] = useState<string>('adult-with-id');
  let outNested = 'Entry allowed';
  if (exScenario === 'adult-no-id') outNested = 'ID required';
  if (exScenario === 'minor') outNested = 'Entry not allowed';

  // Card 05: switch Statement (Day)
  const [exDay, setExDay] = useState<number>(2);
  let outSwitch = 'Invalid day';
  if (exDay === 1) outSwitch = 'Monday';
  else if (exDay === 2) outSwitch = 'Tuesday';
  else if (exDay === 3) outSwitch = 'Wednesday';

  // Card 06: Conditional Operator (Pair)
  const [exPair, setExPair] = useState<string>('10,20');
  const [valA, valB] = exPair.split(',').map((s) => parseInt(s, 10));
  const outTernary = `Largest = ${valA > valB ? valA : valB}`;

  return (
    <section className={styles.section} id="conditional-examples">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Examples of Conditional Statements in C</h2>
          <p className={styles.sectionSubtitle}>
            Explore C decision structures with live parameter controls and real-time output evaluation.
          </p>
        </div>

        {/* 6 Aligned Column Cards matching Reference Board */}
        <div className={styles.examplesGrid}>
          {CONDITIONAL_EXAMPLES.map((ex) => {
            return (
              <div
                key={ex.id}
                className={styles.exampleCard}
                style={{ color: ex.color }}
              >
                <div>
                  {/* Badge Header */}
                  <div className={styles.cardBadgeRow}>
                    <span
                      className={styles.badgePill}
                      style={{
                        backgroundColor: ex.accentBg,
                        color: ex.color,
                      }}
                    >
                      <span className={styles.badgeNumber}>{ex.number}</span>
                      <span>{ex.title}</span>
                    </span>
                  </div>

                    {/* Code Snippet Box */}
                    <div className={styles.codeContainer}>
                      {ex.id === 'ex-if' && (
                        <>
                          <span style={{ color: '#0284c7' }}>int</span> age = {exAge};{'\n\n'}
                          <span style={{ color: '#e11d48', fontWeight: 700 }}>if</span> (age &gt;= 18) {'{\n'}
                          {'    '}printf("You are eligible to vote.\n");{'\n'}
                          {'}'}
                        </>
                      )}

                      {ex.id === 'ex-if-else' && (
                        <>
                          <span style={{ color: '#0284c7' }}>int</span> number = {exNumber};{'\n\n'}
                          <span style={{ color: '#e11d48', fontWeight: 700 }}>if</span> (number % 2 == 0) {'{\n'}
                          {'    '}printf("Even number\n");{'\n'}
                          {'}'} <span style={{ color: '#e11d48', fontWeight: 700 }}>else</span> {'{\n'}
                          {'    '}printf("Odd number\n");{'\n'}
                          {'}'}
                        </>
                      )}

                      {ex.id === 'ex-else-if' && (
                        <>
                          <span style={{ color: '#0284c7' }}>int</span> marks = {exMarks};{'\n\n'}
                          <span style={{ color: '#e11d48', fontWeight: 700 }}>if</span> (marks &gt;= 90) {'{\n'}
                          {'    '}printf("Grade A+\n");{'\n'}
                          {'}'} <span style={{ color: '#e11d48', fontWeight: 700 }}>else if</span> (marks &gt;= 80) {'{\n'}
                          {'    '}printf("Grade A\n");{'\n'}
                          {'}'} <span style={{ color: '#e11d48', fontWeight: 700 }}>else if</span> (marks &gt;= 70) {'{\n'}
                          {'    '}printf("Grade B\n");{'\n'}
                          {'}'} <span style={{ color: '#e11d48', fontWeight: 700 }}>else</span> {'{\n'}
                          {'    '}printf("Grade C or below\n");{'\n'}
                          {'}'}
                        </>
                      )}

                      {ex.id === 'ex-nested-if' && (
                        <>
                          <span style={{ color: '#0284c7' }}>int</span> age = {exScenario === 'minor' ? 16 : 22};{'\n'}
                          <span style={{ color: '#0284c7' }}>int</span> hasID = {exScenario === 'adult-no-id' ? 0 : 1};{'\n\n'}
                          <span style={{ color: '#e11d48', fontWeight: 700 }}>if</span> (age &gt;= 18) {'{\n'}
                          {'    '}<span style={{ color: '#e11d48', fontWeight: 700 }}>if</span> (hasID == 1) {'{\n'}
                          {'        '}printf("Entry allowed\n");{'\n'}
                          {'    }'} <span style={{ color: '#e11d48', fontWeight: 700 }}>else</span> {'{\n'}
                          {'        '}printf("ID required\n");{'\n'}
                          {'    }\n'}
                          {'}'} <span style={{ color: '#e11d48', fontWeight: 700 }}>else</span> {'{\n'}
                          {'    '}printf("Entry not allowed\n");{'\n'}
                          {'}'}
                        </>
                      )}

                      {ex.id === 'ex-switch' && (
                        <>
                          <span style={{ color: '#0284c7' }}>int</span> day = {exDay};{'\n\n'}
                          <span style={{ color: '#e11d48', fontWeight: 700 }}>switch</span> (day) {'{\n'}
                          {'    '}<span style={{ color: '#059669', fontWeight: 700 }}>case 1:</span> printf("Monday\n"); break;{'\n'}
                          {'    '}<span style={{ color: '#059669', fontWeight: 700 }}>case 2:</span> printf("Tuesday\n"); break;{'\n'}
                          {'    '}<span style={{ color: '#059669', fontWeight: 700 }}>case 3:</span> printf("Wednesday\n"); break;{'\n'}
                          {'    '}<span style={{ color: '#e11d48', fontWeight: 700 }}>default:</span> printf("Invalid day\n");{'\n'}
                          {'}'}
                        </>
                      )}

                      {ex.id === 'ex-ternary' && (
                        <>
                          <span style={{ color: '#0284c7' }}>int</span> a = {valA}, b = {valB};{'\n'}
                          <span style={{ color: '#0284c7' }}>int</span> largest = (a &gt; b) ? a : b;{'\n\n'}
                          printf("Largest = %d\n", largest);
                        </>
                      )}
                    </div>

                  {/* Interactive Live Test Controls */}
                  <div className={styles.interactiveControlBar}>
                    {ex.id === 'ex-if' && (
                      <>
                        <div className={styles.controlHeader}>
                          <span className={styles.controlLabel}>Test Age:</span>
                          <span className={styles.controlValueBadge}>{exAge}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="40"
                          value={exAge}
                          onChange={(e) => setExAge(parseInt(e.target.value, 10))}
                          className={styles.controlSlider}
                          style={{ accentColor: ex.color }}
                        />
                      </>
                    )}

                    {ex.id === 'ex-if-else' && (
                      <>
                        <div className={styles.controlHeader}>
                          <span className={styles.controlLabel}>Test Number:</span>
                        </div>
                        <div className={styles.toggleGroup}>
                          {[7, 8, 15, 42].map((num) => (
                            <button
                              key={num}
                              type="button"
                              className={`${styles.toggleOptionBtn} ${
                                exNumber === num ? styles.toggleOptionBtnActive : ''
                              }`}
                              style={{
                                color: exNumber === num ? '#ffffff' : ex.color,
                                backgroundColor: exNumber === num ? ex.color : '#ffffff',
                              }}
                              onClick={() => setExNumber(num)}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {ex.id === 'ex-else-if' && (
                      <>
                        <div className={styles.controlHeader}>
                          <span className={styles.controlLabel}>Test Marks:</span>
                          <span className={styles.controlValueBadge}>{exMarks}</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={exMarks}
                          onChange={(e) => setExMarks(parseInt(e.target.value, 10))}
                          className={styles.controlSlider}
                          style={{ accentColor: ex.color }}
                        />
                      </>
                    )}

                    {ex.id === 'ex-nested-if' && (
                      <>
                        <div className={styles.controlHeader}>
                          <span className={styles.controlLabel}>Test Scenario:</span>
                        </div>
                        <select
                          value={exScenario}
                          onChange={(e) => setExScenario(e.target.value)}
                          className={styles.controlSelect}
                        >
                          <option value="adult-with-id">Age 22, ID: Yes (Allowed)</option>
                          <option value="adult-no-id">Age 22, ID: No (ID req)</option>
                          <option value="minor">Age 16 (Minor - Not allowed)</option>
                        </select>
                      </>
                    )}

                    {ex.id === 'ex-switch' && (
                      <>
                        <div className={styles.controlHeader}>
                          <span className={styles.controlLabel}>Test Day:</span>
                        </div>
                        <div className={styles.toggleGroup}>
                          {[1, 2, 3, 9].map((d) => (
                            <button
                              key={d}
                              type="button"
                              className={`${styles.toggleOptionBtn} ${
                                exDay === d ? styles.toggleOptionBtnActive : ''
                              }`}
                              style={{
                                color: exDay === d ? '#ffffff' : ex.color,
                                backgroundColor: exDay === d ? ex.color : '#ffffff',
                              }}
                              onClick={() => setExDay(d)}
                            >
                              {d === 9 ? 'Def' : d}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {ex.id === 'ex-ternary' && (
                      <>
                        <div className={styles.controlHeader}>
                          <span className={styles.controlLabel}>Test Values (a, b):</span>
                        </div>
                        <select
                          value={exPair}
                          onChange={(e) => setExPair(e.target.value)}
                          className={styles.controlSelect}
                        >
                          <option value="10,20">a = 10, b = 20</option>
                          <option value="50,30">a = 50, b = 30</option>
                          <option value="15,15">a = 15, b = 15</option>
                        </select>
                      </>
                    )}
                  </div>
                </div>

                {/* Dark Output Section */}
                <div className={styles.outputSection}>
                  <div className={styles.outputBox}>
                    <span className={styles.outputHeader}>Output</span>
                    <span className={styles.outputValue}>
                      {ex.id === 'ex-if' && (
                        <span className={exAge >= 18 ? styles.outputValueHighlight : ''}>
                          {outIf}
                        </span>
                      )}
                      {ex.id === 'ex-if-else' && (
                        <span className={styles.outputValueHighlight}>{outIfElse}</span>
                      )}
                      {ex.id === 'ex-else-if' && (
                        <span className={styles.outputValueHighlight}>{outLadder}</span>
                      )}
                      {ex.id === 'ex-nested-if' && (
                        <span className={styles.outputValueHighlight}>{outNested}</span>
                      )}
                      {ex.id === 'ex-switch' && (
                        <span className={styles.outputValueHighlight}>{outSwitch}</span>
                      )}
                      {ex.id === 'ex-ternary' && (
                        <span className={styles.outputValueHighlight}>{outTernary}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
