import styles from './InteractiveKeyboard.module.css';

interface InteractiveKeyboardProps {
  activeKeys?: string[];
  onKeyPress?: (char: string) => void;
}

export function InteractiveKeyboard({ activeKeys = [], onKeyPress }: InteractiveKeyboardProps) {
  // Normalize active keys to uppercase
  const activeSet = new Set(activeKeys.map((k) => k.toUpperCase()));

  const handleKeyClick = (key: string) => {
    if (onKeyPress) {
      onKeyPress(key);
    }
  };

  const isKeyActive = (key: string) => {
    return activeSet.has(key.toUpperCase());
  };

  return (
    <div className={styles.keyboardWrapper} aria-label="Simulated Mechanical Keyboard Visualizer">
      <div className={styles.contactShadow} aria-hidden="true" />
      <div className={styles.keyboardChassis}>
        <div className={styles.statusLed} title="Power / Caps Status" />

        <div className={styles.keyGrid}>
          {/* Row 1: Function / Numbers */}
          <div className={styles.keyRow}>
            <span className={styles.keycap} onClick={() => handleKeyClick('`')}>~</span>
            <span className={`${styles.keycap} ${isKeyActive('1') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('1')}>1</span>
            <span className={`${styles.keycap} ${isKeyActive('2') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('2')}>2</span>
            <span className={`${styles.keycap} ${isKeyActive('3') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('3')}>3</span>
            <span className={`${styles.keycap} ${isKeyActive('4') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('4')}>4</span>
            <span className={`${styles.keycap} ${isKeyActive('5') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('5')}>5</span>
            <span className={`${styles.keycap} ${isKeyActive('6') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('6')}>6</span>
            <span className={`${styles.keycap} ${isKeyActive('7') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('7')}>7</span>
            <span className={`${styles.keycap} ${isKeyActive('8') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('8')}>8</span>
            <span className={`${styles.keycap} ${isKeyActive('9') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('9')}>9</span>
            <span className={`${styles.keycap} ${isKeyActive('0') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('0')}>0</span>
            <span className={styles.keycap} onClick={() => handleKeyClick('-')}>-</span>
            <span className={styles.keycap} onClick={() => handleKeyClick('=')}>+</span>
            <span className={`${styles.keycap} ${styles.keyModifier}`} onClick={() => handleKeyClick('DEL')}>⌫</span>
          </div>

          {/* Row 2: QWERTY */}
          <div className={styles.keyRow}>
            <span className={`${styles.keycap} ${styles.keyTab}`}>Tab</span>
            <span className={`${styles.keycap} ${isKeyActive('Q') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('Q')}>Q</span>
            <span className={`${styles.keycap} ${isKeyActive('W') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('W')}>W</span>
            <span className={`${styles.keycap} ${isKeyActive('E') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('E')}>E</span>
            <span className={`${styles.keycap} ${isKeyActive('R') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('R')}>R</span>
            <span className={`${styles.keycap} ${isKeyActive('T') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('T')}>T</span>
            <span className={`${styles.keycap} ${isKeyActive('Y') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('Y')}>Y</span>
            <span className={`${styles.keycap} ${isKeyActive('U') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('U')}>U</span>
            <span className={`${styles.keycap} ${isKeyActive('I') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('I')}>I</span>
            <span className={`${styles.keycap} ${isKeyActive('O') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('O')}>O</span>
            <span className={`${styles.keycap} ${isKeyActive('P') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('P')}>P</span>
            <span className={styles.keycap} onClick={() => handleKeyClick('[')}>[</span>
            <span className={styles.keycap} onClick={() => handleKeyClick(']')}>]</span>
          </div>

          {/* Row 3: ASDF */}
          <div className={styles.keyRow}>
            <span className={`${styles.keycap} ${styles.keyCaps}`}>Caps</span>
            <span className={`${styles.keycap} ${isKeyActive('A') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('A')}>A</span>
            <span className={`${styles.keycap} ${isKeyActive('S') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('S')}>S</span>
            <span className={`${styles.keycap} ${isKeyActive('D') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('D')}>D</span>
            <span className={`${styles.keycap} ${isKeyActive('F') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('F')}>F</span>
            <span className={`${styles.keycap} ${isKeyActive('G') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('G')}>G</span>
            <span className={`${styles.keycap} ${isKeyActive('H') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('H')}>H</span>
            <span className={`${styles.keycap} ${isKeyActive('J') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('J')}>J</span>
            <span className={`${styles.keycap} ${isKeyActive('K') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('K')}>K</span>
            <span className={`${styles.keycap} ${isKeyActive('L') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('L')}>L</span>
            <span className={styles.keycap} onClick={() => handleKeyClick(';')}>;</span>
            <span className={`${styles.keycap} ${styles.keyEnter} ${isKeyActive('ENTER') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('ENTER')}>Return</span>
          </div>

          {/* Row 4: ZXCV */}
          <div className={styles.keyRow}>
            <span className={`${styles.keycap} ${styles.keyShift}`}>Shift</span>
            <span className={`${styles.keycap} ${isKeyActive('Z') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('Z')}>Z</span>
            <span className={`${styles.keycap} ${isKeyActive('X') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('X')}>X</span>
            <span className={`${styles.keycap} ${isKeyActive('C') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('C')}>C</span>
            <span className={`${styles.keycap} ${isKeyActive('V') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('V')}>V</span>
            <span className={`${styles.keycap} ${isKeyActive('B') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('B')}>B</span>
            <span className={`${styles.keycap} ${isKeyActive('N') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('N')}>N</span>
            <span className={`${styles.keycap} ${isKeyActive('M') ? styles.keycapActive : ''}`} onClick={() => handleKeyClick('M')}>M</span>
            <span className={styles.keycap} onClick={() => handleKeyClick(',')}>,</span>
            <span className={styles.keycap} onClick={() => handleKeyClick('.')}>.</span>
            <span className={`${styles.keycap} ${styles.keyShift}`}>Shift</span>
          </div>

          {/* Row 5: Spacebar & Modifiers */}
          <div className={styles.keyRow}>
            <span className={`${styles.keycap} ${styles.keyModifier}`}>Ctrl</span>
            <span className={`${styles.keycap} ${styles.keyModifier}`}>Alt</span>
            <span className={`${styles.keycap} ${styles.keyModifier}`}>Cmd</span>
            <span
              className={`${styles.keycap} ${styles.keySpace} ${isKeyActive(' ') || isKeyActive('SPACE') ? styles.keycapActive : ''}`}
              onClick={() => handleKeyClick(' ')}
              aria-label="Spacebar"
            />
            <span className={`${styles.keycap} ${styles.keyModifier}`}>Cmd</span>
            <span className={`${styles.keycap} ${styles.keyArrow}`}>◀</span>
            <span className={`${styles.keycap} ${styles.keyArrow}`}>▲</span>
            <span className={`${styles.keycap} ${styles.keyArrow}`}>▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
