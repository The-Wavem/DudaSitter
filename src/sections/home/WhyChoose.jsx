import { motion, useReducedMotion } from 'framer-motion';
import styles from './WhyChoose.module.css';

const MotionSection = motion.section;
const MotionDiv = motion.div;

export default function WhyChoose() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 110, damping: 18 },
    },
  };

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={styles.section}
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <MotionDiv variants={fadeUp} className={styles.content}>
          <h2 className={styles.title}>Por que escolher um Pet Sitter?</h2>
          <p className={styles.description}>
            Cuidado no conforto do seu lar, evitando mudanças de ambiente, <strong className={styles.highlight}>reduzindo a ansiedade</strong> do seu pet e garantindo qualidade de vida na sua ausência.
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}