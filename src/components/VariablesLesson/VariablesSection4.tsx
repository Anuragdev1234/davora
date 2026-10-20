import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { BASIC_DATA_TYPES, CODE_EXAMPLES } from '../../data/variablesLessonData';
import styles from './VariablesArticle.module.css';

export function VariablesSection4() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="section-datatypes" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-datatypes">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>04</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>MANUSCRIPT CHAPTER FOUR</span>
          </div>

          <h2 id="heading-datatypes" className={styles.mainHeading}>
            4. Data Types in C
          </h2>

          <p className={styles.bodyText}>
            A data type specifies the kind of value an object can represent and determines the operations
            permitted on it. Types also affect object size, alignment, and value representation.
          </p>

          <p className={styles.bodyText}>
            C provides several categories of types.
          </p>
        </div>

        {/* 4.1 Basic Data Types */}
        <h3 className={styles.subHeading}>Basic Data Types</h3>

        {/* Complete Table from Manuscript */}
        <div className={styles.tableContainer}>
          <table className={styles.editorialTable} aria-label="Basic Data Types in C">
            <thead>
              <tr>
                <th scope="col" style={{ width: '18%' }}>Data type</th>
                <th scope="col" style={{ width: '48%' }}>Purpose</th>
                <th scope="col" style={{ width: '34%' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {BASIC_DATA_TYPES.map((type) => (
                <tr key={type.name}>
                  <td>
                    <code className={styles.typeCodeTag}>{type.name}</code>
                  </td>
                  <td>{type.purpose}</td>
                  <td>
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>{type.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.bodyText}>
          The header <code>&lt;stdbool.h&gt;</code> provides the names <code>bool</code>, <code>true</code>,
          and <code>false</code> in C versions before C23. In C23, <code>bool</code>, <code>true</code>, and{' '}
          <code>false</code> are language keywords.
        </p>

        {/* 4.2 Integer Type Modifiers */}
        <h3 className={styles.subHeading}>Integer Type Modifiers</h3>
        <p className={styles.bodyText}>
          C supports modifiers that change the range or representation of certain integer types.
        </p>

        <p className={styles.bodyText}>Examples include:</p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>short int</code></span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>long int</code></span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>long long int</code></span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>unsigned int</code></span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><code>signed char</code></span>
          </li>
        </ul>

        <p className={styles.bodyText}>
          The precise sizes and ranges depend on the implementation, subject to the requirements of the C
          standard. Use <code>sizeof</code> and the limits defined in <code>&lt;limits.h&gt;</code> to check
          implementation-specific properties.
        </p>

        {/* 4.3 Derived Types */}
        <h3 className={styles.subHeading}>Derived Types</h3>
        <p className={styles.bodyText}>
          Derived types are formed from other types. Important examples include:
        </p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>Arrays:</strong> Store multiple elements of the same element type.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>Pointers:</strong> Store addresses of objects or functions, where applicable.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>Function types:</strong> Describe functions by their return and parameter types.</span>
          </li>
        </ul>

        <p className={styles.bodyText}><strong>Example:</strong></p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>derived_types.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.derivedTypes, 'derived')}
            >
              {copiedKey === 'derived' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'derived' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.derivedTypes}</code>
          </pre>
        </div>

        <p className={styles.bodyText}>
          Here, <code>numbers</code> is an array of three integers, and <code>ptr</code> is a pointer to an
          integer.
        </p>

        {/* 4.4 User-Defined Types */}
        <h3 className={styles.subHeading}>User-Defined Types</h3>
        <p className={styles.bodyText}>
          C also supports types created using language constructs such as:
        </p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>struct:</strong> Groups members, potentially of different types.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>union:</strong> Allows members to share storage.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>enum:</strong> Defines named integer constants.</span>
          </li>
          <li className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span><strong>typedef:</strong> Creates an alias for an existing type name; it does not create a distinct type.</span>
          </li>
        </ul>

        <p className={styles.bodyText}><strong>Example:</strong></p>

        <div className={styles.codePanelWrap}>
          <div className={styles.codePanelHeader}>
            <div className={styles.codePanelTitle}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span>user_defined_types.c</span>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(CODE_EXAMPLES.userDefinedTypes, 'userdef')}
            >
              {copiedKey === 'userdef' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
              <span>{copiedKey === 'userdef' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className={styles.codePre}>
            <code>{CODE_EXAMPLES.userDefinedTypes}</code>
          </pre>
        </div>

        <p className={styles.bodyText}>
          This defines a structure type named <code>struct Student</code> with two members.
        </p>
      </div>
    </section>
  );
}
