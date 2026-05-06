import { Camera, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ContactInfo.module.css';

const MotionA = motion.a;

export default function ContactInfo({ data }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Contatos Diretos</h3>

      <div className={styles.links}>
        <MotionA
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`https://wa.me/55${data.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappCard}
        >
          <div className={styles.whatsappIconWrap}>
            <Phone className={styles.whatsappIcon} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.cardLabel}>WhatsApp</span>
            <span className={styles.cardValue}>{data.whatsapp}</span>
          </div>
        </MotionA>

        <MotionA
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`https://instagram.com/${data.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instagramCard}
        >
          <div className={styles.instagramIconWrap}>
            <Camera className={styles.instagramIcon} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.cardLabel}>Instagram</span>
            <span className={styles.cardValue}>@{data.instagram}</span>
          </div>
        </MotionA>
      </div>

      <div className={styles.serviceAreaCard}>
        <div className={styles.serviceAreaGlow} aria-hidden="true" />
        <h4 className={styles.serviceAreaTitle}>Área de Atendimento</h4>
        <p className={styles.serviceAreaText}>
          Atendendo primariamente em <strong>Curitiba (PR)</strong> e região metropolitana.
        </p>
      </div>
    </section>
  );
}