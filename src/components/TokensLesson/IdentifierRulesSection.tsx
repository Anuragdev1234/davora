import { useState } from 'react';
import { Check, X, ShieldAlert, CheckCircle2, Terminal } from 'lucide-react';
import {
  IDENTIFIER_RULES,
  C_KEYWORDS_LIST,
} from '../../data/tokensLessonData';
import styles from './IdentifierRulesSection.module.css';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function IdentifierRulesSection() {
  const [testInput, setTestInput] = useState<string>('total');

  // Real-time C Lexical Identifier Validator
  const validateIdentifier = (input: string): ValidationResult => {
    const trimmed = input.trim();
    if (!trimmed) {
      return { isValid: false, message: 'Please enter a candidate identifier to validate.' };
    }

    // Rule 2: Cannot begin with a digit
    if (/^[0-9]/.test(trimmed)) {
      return {
        isValid: false,
        message: `Violates Rule 02: Starts with numeric digit '${trimmed[0]}'. Identifiers must begin with a letter (a-z, A-Z) or an underscore (_).`,
      };
    }

    // Rule 1: Allowed characters: letters, digits, underscores
    const illegalMatch = trimmed.match(/[^a-zA-Z0-9_]/);
    if (illegalMatch) {
      const char = illegalMatch[0] === ' ' ? 'whitespace' : `'${illegalMatch[0]}'`;
      return {
        isValid: false,
        message: `Violates Rule 01: Contains illegal character ${char}. Only letters, digits, and underscores (_) are allowed.`,
      };
    }

    // Rule 3: Cannot be a C keyword
    if (C_KEYWORDS_LIST.includes(trimmed)) {
      return {
        isValid: false,
        message: `Violates Rule 03: '${trimmed}' is a reserved C keyword. Keywords have fixed grammatical meanings and cannot be declared as variables or functions.`,
      };
    }

    // Rule 4: Case sensitivity note
    return {
      isValid: true,
      message: `Valid C identifier! Conforms to all lexical constraints. Remember: '${trimmed}' is strictly case-sensitive in memory.`,
    };
  };

  const validation = validateIdentifier(testInput);

  const testChips = [
    { label: 'age', isValid: true },
    { label: 'total', isValid: true },
    { label: '_count', isValid: true },
    { label: 'calculateSum', isValid: true },
    { label: '2fast', isValid: false },
    { label: 'total-cost', isValid: false },
    { label: 'float', isValid: false },
    { label: 'my age', isValid: false },
  ];

  return (
    <section id="identifier-rules" className={styles.sectionWrapper} aria-labelledby="identifier-rules-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>02</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>IDENTIFIER ARCHITECTURE</span>
          </div>

          <h2 id="identifier-rules-heading" className={styles.mainHeading}>
            Rules for Identifiers
          </h2>

          <p className={styles.subHeading}>
            Identifiers are names assigned to variables, functions, and symbols. The C compiler
            enforces four strict lexical rules before admitting a name into the symbol table.
          </p>
        </div>

        {/* 4 Core Rules Cards Grid */}
        <div className={styles.rulesGrid}>
          {IDENTIFIER_RULES.map((rule) => (
            <div key={rule.id} className={styles.ruleCard}>
              <div className={styles.ruleHeader}>
                <span className={styles.ruleNumberBadge}>{rule.number}</span>
                <h3 className={styles.ruleTitle}>{rule.ruleTitle}</h3>
              </div>

              <div className={styles.ruleSummary}>{rule.summary}</div>
              <p className={styles.ruleExplanation}>{rule.explanation}</p>

              <div className={styles.examplesTagList}>
                <span className={styles.validLabel}>Valid examples</span>
                <div className={styles.tagPills}>
                  {rule.validExamples.map((ex) => (
                    <span key={ex} className={styles.tagPillValid}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Identifier Lab / Live Validator */}
        <div className={styles.labCard}>
          <div className={styles.labHeader}>
            <div>
              <h3 className={styles.labTitle}>
                <Terminal className={styles.labIcon} size={22} aria-hidden="true" />
                <span>Interactive Identifier Validator</span>
              </h3>
              <p className={styles.labSubtitle}>
                Type any proposed variable or function name to test it against C standard lexical rules in real-time.
              </p>
            </div>
          </div>

          <div className={styles.validatorInputWrap}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.identifierInput}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Type an identifier name (e.g. user_age, 2count, float)..."
                aria-label="Test candidate identifier"
                spellCheck={false}
              />

              <div
                className={`${styles.inputStatusBadge} ${
                  validation.isValid ? styles.statusValid : styles.statusInvalid
                }`}
              >
                {validation.isValid ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span>Valid</span>
                  </>
                ) : (
                  <>
                    <X size={14} aria-hidden="true" />
                    <span>Invalid</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick test chip buttons */}
            <div className={styles.testChipsRow}>
              <span className={styles.testChipsLabel}>Try presets:</span>
              {testChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className={styles.testChipBtn}
                  onClick={() => setTestInput(chip.label)}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Diagnostic Message */}
            <div
              className={`${styles.diagnosticBox} ${
                validation.isValid ? styles.diagnosticValid : styles.diagnosticInvalid
              }`}
            >
              {validation.isValid ? (
                <CheckCircle2 size={18} aria-hidden="true" />
              ) : (
                <ShieldAlert size={18} aria-hidden="true" />
              )}
              <div className={styles.diagText}>{validation.message}</div>
            </div>
          </div>
        </div>

        {/* Valid vs Invalid Side-by-Side Reference */}
        <div className={styles.comparisonGrid}>
          {/* Valid Identifiers Column */}
          <div className={styles.comparisonCol}>
            <div className={styles.colHeaderValid}>
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>Valid C Identifiers</span>
            </div>
            <ul className={styles.tableList}>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdValid}`}>age</code>
                <span className={styles.codeReason}>Letters only; conventional variable name</span>
              </li>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdValid}`}>_count</code>
                <span className={styles.codeReason}>Starts with underscore; allowed in C</span>
              </li>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdValid}`}>calculateSum</code>
                <span className={styles.codeReason}>Standard camelCase function identifier</span>
              </li>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdValid}`}>total_100</code>
                <span className={styles.codeReason}>Digits permitted after leading letter</span>
              </li>
            </ul>
          </div>

          {/* Invalid Identifiers Column */}
          <div className={styles.comparisonCol}>
            <div className={styles.colHeaderInvalid}>
              <X size={16} aria-hidden="true" />
              <span>Invalid C Identifiers (Syntax Errors)</span>
            </div>
            <ul className={styles.tableList}>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdInvalid}`}>2fast</code>
                <span className={styles.codeReason}>Starts with a digit (triggers numeric literal parse)</span>
              </li>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdInvalid}`}>total-cost</code>
                <span className={styles.codeReason}>Hyphen (-) is treated as a subtraction operator</span>
              </li>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdInvalid}`}>float</code>
                <span className={styles.codeReason}>Reserved C keyword cannot be an identifier</span>
              </li>
              <li className={styles.tableRow}>
                <code className={`${styles.codeIdentifier} ${styles.codeIdInvalid}`}>my age</code>
                <span className={styles.codeReason}>Spaces are illegal delimiters inside names</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
