import styles from './AboutStats.module.css';
import { Briefcase, GraduationCap, Stethoscope } from 'lucide-react';

export default function AboutStats({ semester = '5º período' }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <GraduationCap className={styles.iconSage} aria-hidden="true" />
            <span className={styles.label}>Medicina Vet.</span>
            <span className={styles.value}>{semester}</span>
          </div>

          <div className={styles.card}>
            <Briefcase className={styles.iconMustard} aria-hidden="true" />
            <span className={styles.label}>Experiência</span>
            <span className={styles.value}>Creche Canina</span>
          </div>

          <div className={styles.cardWide}>
            <Stethoscope className={styles.iconSage} aria-hidden="true" />
            <span className={styles.label}>Cuidados</span>
            <span className={styles.value}>Manejo Seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
}