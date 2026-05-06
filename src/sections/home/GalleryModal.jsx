import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './GalleryModal.module.css';

const MotionDiv = motion.div;

export default function GalleryModal({ isOpen, onClose, service, images = [] }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlay}
        >
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.35 }}
            className={styles.modal}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>Momentos {service === 'Sitter' ? 'Pet Sitter' : 'Dog Walker'}</h3>
              <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Fechar galeria">
                <X className={styles.closeIcon} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.body}>
              {images.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>Nenhuma foto adicionada ainda.</p>
                </div>
              ) : (
                <div className={styles.grid}>
                  {images.map((image) => (
                    <MotionDiv
                      key={image.id}
                      whileHover={{ scale: 1.04 }}
                      className={styles.imageCard}
                    >
                      <img src={image.url} alt="Momento pet" className={styles.image} />
                    </MotionDiv>
                  ))}
                </div>
              )}
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}