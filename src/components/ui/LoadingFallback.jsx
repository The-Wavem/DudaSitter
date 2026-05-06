import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import styles from './LoadingFallback.module.css';

export default function LoadingFallback() {
  return (
    <div className={styles.container}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className={styles.icon}
      >
        <PawPrint className={styles.paw} aria-hidden="true" />
      </motion.div>
    </div>
  );
}