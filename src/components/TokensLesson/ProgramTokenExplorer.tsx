import { useState } from 'react';
import { Terminal, Tag } from 'lucide-react';
import { PROGRAM_TOKENS_LIST, type ProgramToken } from '../../data/tokensLessonData';
import styles from './ProgramTokenExplorer.module.css';

type FilterCategory =
  | 'all'
  | 'keyword'
  | 'identifier'
  | 'constant'
  | 'string_literal'
  | 'operator'
  | 'punctuator'
  | 'preprocessor';

export function ProgramTokenExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedTokenId, setSelectedTokenId] = useState<string>('tok-2'); // default to 'int'

  const selectedToken =
    PROGRAM_TOKENS_LIST.find((t) => t.id === selectedTokenId) || PROGRAM_TOKENS_LIST[1];

  const handleSelectToken = (token: ProgramToken) => {
    setSelectedTokenId(token.id);
  };

  const isTokenHighlighted = (category: ProgramToken['category']) => {
    if (activeFilter === 'all') return true;
    return activeFilter === category;
  };

  const filterButtons: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Tokens' },
    { id: 'keyword', label: 'Keywords (int, void, return)' },
    { id: 'identifier', label: 'Identifiers (main, age, printf)' },
    { id: 'constant', label: 'Constants (20, 0)' },
    { id: 'string_literal', label: 'String Literals ("Age = %d\\n")' },
    { id: 'operator', label: 'Operators (=)' },
    { id: 'punctuator', label: 'Punctuators (; , ( ) { })' },
    { id: 'preprocessor', label: 'Preprocessor (#include)' },
  ];

  return (
    <section id="program-tokens" className={styles.sectionWrapper} aria-labelledby="tokens-dissector-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>03</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>INTERACTIVE DISSECTOR</span>
          </div>

          <h2 id="tokens-dissector-heading" className={styles.mainHeading}>
            Tokens in Action
          </h2>

          <p className={styles.subHeading}>
            Examine how the lexical analyzer scans and parses an actual C program. Click any token in
            the code or filter by category to inspect its role.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className={styles.filterBar} role="toolbar" aria-label="Filter tokens by category">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === btn.id ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(btn.id)}
            >
              <span className={`${styles.filterDot} ${styles[`dot_${btn.id}`]}`} />
              <span>{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Interactive Dissector */}
        <div className={styles.dissectorStage}>
          {/* Left Column: Code Window */}
          <div className={styles.codeTerminal}>
            <div className={styles.terminalBar}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.fileName}>main.c &bull; Lexical Token Dissection</span>
              <Terminal size={14} color="#888" aria-hidden="true" />
            </div>

            <div className={styles.terminalBody}>
              {/* Line 1: #include <stdio.h> */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>1</span>
                <div className={styles.lineContent}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_preprocessor} ${
                      selectedTokenId === 'tok-1' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('preprocessor') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[0])}
                    aria-label="Token #include <stdio.h> Preprocessor Directive"
                  >
                    #include &lt;stdio.h&gt;
                  </button>
                </div>
              </div>

              {/* Line 2: Empty */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>2</span>
                <div className={styles.lineContent} />
              </div>

              {/* Line 3: int main(void) */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>3</span>
                <div className={styles.lineContent}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_keyword} ${
                      selectedTokenId === 'tok-2' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('keyword') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[1])}
                  >
                    int
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_identifier} ${
                      selectedTokenId === 'tok-3' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('identifier') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[2])}
                  >
                    main
                  </button>
                  <span style={{ color: '#999' }}>(</span>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_keyword} ${
                      selectedTokenId === 'tok-4' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('keyword') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[3])}
                  >
                    void
                  </button>
                  <span style={{ color: '#999' }}>)</span>
                </div>
              </div>

              {/* Line 4: { */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>4</span>
                <div className={styles.lineContent}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-5' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[4])}
                  >
                    &#123;
                  </button>
                </div>
              </div>

              {/* Line 5: int age = 20; */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>5</span>
                <div className={styles.lineContent} style={{ paddingLeft: '1.5rem' }}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_keyword} ${
                      selectedTokenId === 'tok-6' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('keyword') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[5])}
                  >
                    int
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_identifier} ${
                      selectedTokenId === 'tok-7' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('identifier') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[6])}
                  >
                    age
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_operator} ${
                      selectedTokenId === 'tok-8' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('operator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[7])}
                  >
                    =
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_constant} ${
                      selectedTokenId === 'tok-9' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('constant') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[8])}
                  >
                    20
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-10' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[9])}
                  >
                    ;
                  </button>
                </div>
              </div>

              {/* Line 6: printf("Age = %d\n", age); */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>6</span>
                <div className={styles.lineContent} style={{ paddingLeft: '1.5rem' }}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_identifier} ${
                      selectedTokenId === 'tok-11' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('identifier') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[10])}
                  >
                    printf
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-12' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[11])}
                  >
                    (
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_string_literal} ${
                      selectedTokenId === 'tok-13' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('string_literal') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[12])}
                  >
                    "Age = %d\n"
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-14' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[13])}
                  >
                    ,
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_identifier} ${
                      selectedTokenId === 'tok-15' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('identifier') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[14])}
                  >
                    age
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-16' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[15])}
                  >
                    )
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-17' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[16])}
                  >
                    ;
                  </button>
                </div>
              </div>

              {/* Line 7: return 0; */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>7</span>
                <div className={styles.lineContent} style={{ paddingLeft: '1.5rem' }}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_keyword} ${
                      selectedTokenId === 'tok-18' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('keyword') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[17])}
                  >
                    return
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_constant} ${
                      selectedTokenId === 'tok-19' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('constant') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[18])}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-20' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[19])}
                  >
                    ;
                  </button>
                </div>
              </div>

              {/* Line 8: } */}
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>8</span>
                <div className={styles.lineContent}>
                  <button
                    type="button"
                    className={`${styles.tokenChip} ${styles.token_punctuator} ${
                      selectedTokenId === 'tok-21' ? styles.activeToken : ''
                    } ${!isTokenHighlighted('punctuator') ? styles.tokenDimmed : ''}`}
                    onClick={() => handleSelectToken(PROGRAM_TOKENS_LIST[20])}
                  >
                    &#125;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Token Inspector */}
          <div className={styles.detailCard}>
            <div
              className={styles.detailCategoryBadge}
              style={{
                color:
                  selectedToken.color === 'blue'
                    ? '#0055ff'
                    : selectedToken.color === 'green'
                    ? '#10a37f'
                    : selectedToken.color === 'amber'
                    ? '#d97706'
                    : selectedToken.color === 'coral'
                    ? '#ea580c'
                    : selectedToken.color === 'orange'
                    ? '#f97316'
                    : selectedToken.color === 'purple'
                    ? '#8b5cf6'
                    : '#64748b',
              }}
            >
              <Tag size={14} aria-hidden="true" />
              <span>{selectedToken.categoryLabel}</span>
            </div>

            <div className={styles.detailTokenPreview}>
              <code>{selectedToken.text}</code>
            </div>

            <div className={styles.detailLineInfo}>Line {selectedToken.line} in main.c</div>

            <div className={styles.detailExplanation}>{selectedToken.description}</div>

            <div className={styles.roleBreakdownHeading}>Compiler Lexical Role</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              The lexical analyzer converts raw ASCII bytes matching{' '}
              <code style={{ fontFamily: 'var(--font-mono)' }}>{selectedToken.text}</code> into an
              internal token struct containing category{' '}
              <strong>{selectedToken.category.toUpperCase()}</strong>.
            </p>
          </div>
        </div>

        {/* Structured Program Breakdown Table (Matching prompt specifications) */}
        <div className={styles.programSummaryCard}>
          <h3 className={styles.summaryHeading}>In this program:</h3>
          <ul className={styles.summaryPointsList}>
            <li className={styles.summaryPointItem}>
              <span className={styles.summaryDot} style={{ background: '#0055ff' }} />
              <div>
                <strong>int</strong>, <strong>void</strong>, and <strong>return</strong> are{' '}
                <span style={{ color: '#0055ff', fontWeight: 600 }}>keywords</span>.
              </div>
            </li>
            <li className={styles.summaryPointItem}>
              <span className={styles.summaryDot} style={{ background: '#10a37f' }} />
              <div>
                <strong>main</strong>, <strong>age</strong>, and <strong>printf</strong> are{' '}
                <span style={{ color: '#10a37f', fontWeight: 600 }}>identifiers</span>.
              </div>
            </li>
            <li className={styles.summaryPointItem}>
              <span className={styles.summaryDot} style={{ background: '#d97706' }} />
              <div>
                <strong>20</strong> and <strong>0</strong> are{' '}
                <span style={{ color: '#d97706', fontWeight: 600 }}>integer constants</span>.
              </div>
            </li>
            <li className={styles.summaryPointItem}>
              <span className={styles.summaryDot} style={{ background: '#ea580c' }} />
              <div>
                <strong>"Age = %d\n"</strong> is a{' '}
                <span style={{ color: '#ea580c', fontWeight: 600 }}>string literal</span>.
              </div>
            </li>
            <li className={styles.summaryPointItem}>
              <span className={styles.summaryDot} style={{ background: '#f97316' }} />
              <div>
                <strong>=</strong> is an{' '}
                <span style={{ color: '#f97316', fontWeight: 600 }}>assignment operator</span>.
              </div>
            </li>
            <li className={styles.summaryPointItem}>
              <span className={styles.summaryDot} style={{ background: '#64748b' }} />
              <div>
                <strong>;</strong>, <strong>,</strong>, <strong>( )</strong>, and{' '}
                <strong>&#123; &#125;</strong> are{' '}
                <span style={{ color: '#64748b', fontWeight: 600 }}>punctuators</span>.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
