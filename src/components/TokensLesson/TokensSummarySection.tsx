import { Key, UserCheck, Blocks, ArrowRight, Sparkles } from 'lucide-react';
import styles from './TokensSummarySection.module.css';

export function TokensSummarySection() {
  return (
    <section id="tokens-summary" className={styles.sectionWrapper} aria-labelledby="tokens-summary-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>04</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>CORE PRINCIPLES</span>
          </div>

          <h2 id="tokens-summary-heading" className={styles.mainHeading}>
            The Lexical Mental Model
          </h2>

          <p className={styles.subHeading}>
            Solidify the distinction between predefined syntax, developer naming, and lexical
            tokenization before moving to memory and data representations.
          </p>
        </div>

        {/* Remember Core Takeaways 3-Column Card */}
        <div className={styles.rememberCard}>
          <div className={styles.rememberBadge}>
            <Sparkles size={14} aria-hidden="true" />
            <span>Essential Axioms &bull; Always Remember</span>
          </div>

          <div className={styles.rememberGrid}>
            {/* Column 1: Keywords */}
            <div className={styles.rememberCol}>
              <div className={styles.colIconWrap} style={{ background: '#eef4ff', color: '#0055ff' }}>
                <Key size={20} aria-hidden="true" />
              </div>
              <h3 className={styles.colTitle}>Keywords</h3>
              <p className={styles.colBody}>
                <strong>Keywords have predefined meanings.</strong> They are reserved by the C language
                standard and cannot be repurposed as variables, functions, or any user-defined identifiers.
              </p>
            </div>

            {/* Column 2: Identifiers */}
            <div className={styles.rememberCol}>
              <div className={styles.colIconWrap} style={{ background: '#eefaf3', color: '#10a37f' }}>
                <UserCheck size={20} aria-hidden="true" />
              </div>
              <h3 className={styles.colTitle}>Identifiers</h3>
              <p className={styles.colBody}>
                <strong>Identifiers are names chosen for program elements.</strong> Programmers pick
                names to identify variables, functions, structs, and labels, adhering to character,
                casing, and digit rules.
              </p>
            </div>

            {/* Column 3: Tokens */}
            <div className={styles.rememberCol}>
              <div className={styles.colIconWrap} style={{ background: '#fdf2f8', color: '#db2777' }}>
                <Blocks size={20} aria-hidden="true" />
              </div>
              <h3 className={styles.colTitle}>Tokens</h3>
              <p className={styles.colBody}>
                <strong>Tokens are the lexical building blocks.</strong> The compiler treats tokens as
                indivisible lexical atoms, transforming raw source text into keywords, identifiers,
                constants, strings, and operators.
              </p>
            </div>
          </div>
        </div>

        {/* Lexer Pipeline Diagram */}
        <div className={styles.lexerCard}>
          <div className={styles.lexerCardHeader}>
            <h3 className={styles.lexerTitle}>How the Compiler Scans Your Code</h3>
            <span className={styles.lexerBadge}>Lexical Analysis Pipeline</span>
          </div>

          <div className={styles.pipelineFlow}>
            {/* Stage 1 */}
            <div className={styles.pipelineStage}>
              <span className={styles.stageNumber}>STAGE 01</span>
              <div className={styles.stageName}>Source Characters</div>
              <div className={styles.stageDesc}>Raw UTF-8 / ASCII bytes from .c file</div>
            </div>

            <div className={styles.flowArrow} aria-hidden="true">
              <ArrowRight size={20} />
            </div>

            {/* Stage 2 */}
            <div className={styles.pipelineStage} style={{ borderColor: '#0055ff' }}>
              <span className={styles.stageNumber} style={{ color: '#72a9ff' }}>STAGE 02</span>
              <div className={styles.stageName}>Lexer / Scanner</div>
              <div className={styles.stageDesc}>Groups characters into tokens, discards comments & whitespace</div>
            </div>

            <div className={styles.flowArrow} aria-hidden="true">
              <ArrowRight size={20} />
            </div>

            {/* Stage 3 */}
            <div className={styles.pipelineStage}>
              <span className={styles.stageNumber}>STAGE 03</span>
              <div className={styles.stageName}>Token Stream</div>
              <div className={styles.stageDesc}>Typed stream: KEYWORD, ID, OPERATOR, LITERAL</div>
            </div>

            <div className={styles.flowArrow} aria-hidden="true">
              <ArrowRight size={20} />
            </div>

            {/* Stage 4 */}
            <div className={styles.pipelineStage}>
              <span className={styles.stageNumber}>STAGE 04</span>
              <div className={styles.stageName}>Parser & AST</div>
              <div className={styles.stageDesc}>Constructs syntactic Abstract Syntax Tree</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
