import { CheckCircle2, Bookmark } from 'lucide-react';
import { MANUSCRIPT_KEY_TAKEAWAYS } from '../../data/variablesLessonData';
import styles from './VariablesArticle.module.css';

export function VariablesKeyTakeaways() {
  return (
    <section id="section-takeaways" className={`${styles.sectionWrapper} ${styles.sectionWrapperAlt}`} aria-labelledby="heading-takeaways">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>06</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>SUMMARY & PRINCIPLES</span>
          </div>

          <h2 id="heading-takeaways" className={styles.mainHeading}>
            Summary / Key Takeaways
          </h2>

          <p className={styles.bodyText}>
            Review the essential principles governing variables, objects, memory lifetimes, and type
            systems in standard C.
          </p>
        </div>

        {/* Takeaway Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px',
            marginTop: '24px',
          }}
        >
          {MANUSCRIPT_KEY_TAKEAWAYS.map((takeaway, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e2da',
                borderRadius: '12px',
                padding: '20px 22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#f4f4f0',
                  color: '#191b19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: '1px solid #e0e0d6',
                }}
              >
                0{idx + 1}
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.98rem',
                    lineHeight: 1.55,
                    color: '#191b19',
                    fontWeight: 500,
                  }}
                >
                  {takeaway}
                </p>
              </div>

              <CheckCircle2 size={18} color="#2b531e" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
            </div>
          ))}
        </div>

        {/* Editorial Footnote Note */}
        <div
          style={{
            marginTop: '28px',
            padding: '16px 20px',
            background: 'rgba(25, 27, 25, 0.03)',
            borderRadius: '10px',
            border: '1px dashed #d5d5cb',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.86rem',
            color: '#555950',
          }}
        >
          <Bookmark size={18} color="#191b19" style={{ flexShrink: 0 }} />
          <span>
            Every C object has a size (in bytes) determined by <code>sizeof</code>, a lifetime determined by
            its storage duration (automatic, static, or allocated), and a scope determined by its declaration location.
          </span>
        </div>
      </div>
    </section>
  );
}
