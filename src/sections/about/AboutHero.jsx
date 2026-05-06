import { motion } from 'framer-motion';
import { HeartPulse, GraduationCap } from 'lucide-react';
import styles from './AboutHero.module.css';

const MotionDiv = motion.div;

export default function AboutHero({ bioParagraphs = [], mission = '', age = '', semester = '' }) {
  return (
    <section className={styles.section}>
      <MotionDiv
        aria-hidden="true"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className={styles.blobPrimary}
      />
      <MotionDiv
        aria-hidden="true"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
        className={styles.blobSecondary}
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
            className={styles.imageColumn}
          >
            <div className={styles.imageFrame}>
              <img
                src="https://images.unsplash.com/photo-1516366478661-5aba0f5ea228?auto=format&fit=crop&w=800&q=80"
                alt="Duda e Mel"
                className={styles.image}
              />
            </div>

            <div className={styles.decorPrimary} />
            <div className={styles.decorSecondary} />
            <div className={styles.decorTertiary} />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
            className={styles.textColumn}
          >
            <span className={styles.kicker}>
              <HeartPulse className={styles.kickerIcon} aria-hidden="true" /> Sobre Mim
            </span>

            <h1 className={styles.title}>
              Olá, eu sou a <span className={styles.titleAccent}>Duda!</span>
            </h1>

            <div className={styles.bio}>
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.missionBox}>
              <div className={styles.missionBadge}>
                <HeartPulse className={styles.missionIcon} aria-hidden="true" />
              </div>
              <h3 className={styles.missionTitle}>A Minha Missão</h3>
              <p className={styles.missionText}>{mission}</p>
            </div>

            <div className={styles.inlineInfo}>
              <span className={styles.inlineChip}>
                <GraduationCap className={styles.inlineIcon} aria-hidden="true" />
                {semester}
              </span>
              <span className={styles.inlineMeta}>{age}</span>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}