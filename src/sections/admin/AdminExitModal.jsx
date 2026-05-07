import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import styles from './AdminExitModal.module.css';

const MotionDiv = motion.div;

export default function AdminExitModal({ isOpen, onClose, onGoHome, onConfirmLogout }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionDiv
            className={styles.modal}
            initial={{ scale: 0.94, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: 'spring', bounce: 0.28, duration: 0.35 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>Sair do painel?</h3>
                <p className={styles.subtitle}>Escolha se quer apenas voltar para a página principal ou encerrar sua sessão.</p>
              </div>

              <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">
                <X className={styles.closeIcon} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.body}>
              <button type="button" className={`${styles.actionButton} ${styles.homeButton}`} onClick={onGoHome}>
                Voltar para a página principal
              </button>

              <button type="button" className={`${styles.actionButton} ${styles.logoutButton}`} onClick={onConfirmLogout}>
                <LogOut className={styles.actionIcon} aria-hidden="true" />
                Sair da conta e fazer logout
              </button>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}