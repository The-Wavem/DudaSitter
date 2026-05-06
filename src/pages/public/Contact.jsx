import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ContactInfo from '@/sections/contact/ContactInfo';
import ContactForm from '@/sections/contact/ContactForm';
import { getContactData } from '@/lib/utils';
import styles from './Contact.module.css';

export default function Contact() {
  const [contactData, setContactData] = useState({ whatsapp: '21972229509', instagram: 'dudasitter', introText: '' });

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setContactData(getContactData());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className={styles.page}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className={styles.blobPrimary}
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
        className={styles.blobSecondary}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Vamos <span className={styles.titleAccent}>conversar?</span>
          </h1>
          <p className={styles.subtitle}>{contactData.introText}</p>
        </div>

        <div className={styles.contentGrid}>
          <ContactInfo data={contactData} />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}