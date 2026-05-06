import { motion } from 'framer-motion';
import { Image as ImageIcon, CheckCircle2, PawPrint, Utensils } from 'lucide-react';
import styles from './Services.module.css';

const MotionSection = motion.section;
const MotionDiv = motion.div;

export default function Services({ onOpenGallery = () => {} }) {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', bounce: 0.4 },
    },
  };

  const cardVariantsWithDelay = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', bounce: 0.4, delay: 0.2 },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>Nossa Especialidade</span>
          <h2 className={styles.title}>Serviços Oferecidos</h2>
        </div>

        <div className={styles.grid}>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapSitter}>
                <PawPrint className={styles.serviceIcon} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>Pet Sitter</h3>
            </div>

            <p className={styles.cardDescription}>
              Acompanhamento completo na sua própria casa, ideal para viagens longas ou dias fora. Mantém a rotina, o cheirinho familiar e minimiza o estresse da separação.
            </p>

            <div className={styles.list}>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconSitter} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Alimentação & Hidratação</span>
                  <span className={styles.listText}>Troca de água e comida nos horários habituais.</span>
                </div>
              </div>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconSitter} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Higienização Completa</span>
                  <span className={styles.listText}>Limpeza de tapetes, cata-cacas e caixas de areia.</span>
                </div>
              </div>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconSitter} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Administração de Medicamentos</span>
                  <span className={styles.listText}>Cuidado especializado e seguro (via oral ou tópica).</span>
                </div>
              </div>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconSitter} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Muito Carinho</span>
                  <span className={styles.listText}>Sessões de brincadeiras e muito dengo garantidos.</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenGallery('Sitter')}
              className={styles.galleryButton}
              type="button"
            >
              <ImageIcon className={styles.buttonIcon} aria-hidden="true" />
              Ver Momentos Sitter
            </motion.button>
          </MotionDiv>

          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariantsWithDelay}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapWalker}>
                <Utensils className={styles.serviceIcon} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>Dog Walker</h3>
            </div>

            <p className={styles.cardDescription}>
              Passeios de qualidade desenhados para gastar a energia física e mental do seu pet. Cães que passeiam regularmente são mais calmos e saudáveis.
            </p>

            <div className={styles.list}>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconWalker} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Passeios Seguros</span>
                  <span className={styles.listText}>45 a 60 minutos de caminhada monitorada.</span>
                </div>
              </div>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconWalker} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Enriquecimento Ambiental</span>
                  <span className={styles.listText}>Estímulos olfativos durante o trajeto.</span>
                </div>
              </div>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconWalker} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Hidratação no Role</span>
                  <span className={styles.listText}>Sempre com garrafinha d'água fresca.</span>
                </div>
              </div>
              <div className={styles.listItem}>
                <CheckCircle2 className={styles.checkIconWalker} aria-hidden="true" />
                <div>
                  <span className={styles.listTitle}>Fotos e Vídeos</span>
                  <span className={styles.listText}>Atualizações em tempo real no WhatsApp.</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenGallery('Walker')}
              className={styles.galleryButton}
              type="button"
            >
              <ImageIcon className={styles.buttonIcon} aria-hidden="true" />
              Ver Momentos Walker
            </motion.button>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}