import { useEffect, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { saveMessage } from '@/services/messagesAPI';
import styles from './ContactForm.module.css';

const MotionButton = motion.button;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    petName: '',
    service: 'Pet Sitter (Hospedagem em casa)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!submitted) return undefined;

    const timeoutId = window.setTimeout(() => setSubmitted(false), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [submitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await saveMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', petName: '', service: 'Pet Sitter (Hospedagem em casa)', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.formCard}>
        {submitted && (
          <div className={styles.successOverlay}>
            <div className={styles.successIconWrap}>
              <CheckCircle2 className={styles.successIcon} aria-hidden="true" />
            </div>
            <h3 className={styles.successTitle}>Mensagem Enviada!</h3>
            <p className={styles.successText}>Obrigado pelo contato. Responderei o mais rápido possível.</p>
          </div>
        )}

        <h3 className={styles.title}>Mande uma Mensagem</h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Nome do Tutor</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Seu nome completo"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="petName" className={styles.label}>Nome e Raça do(s) Pet(s)</label>
            <input
              id="petName"
              name="petName"
              type="text"
              required
              value={formData.petName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: Mel (Shih Tzu) e Bento (SRD)"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="service" className={styles.label}>Qual serviço você precisa?</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="Pet Sitter (Hospedagem em casa)">Pet Sitter (Hospedagem em casa)</option>
              <option value="Dog Walker (Passeios)">Dog Walker (Passeios)</option>
              <option value="Visita Avulsa (Alimentação/Medição)">Visita Avulsa (Alimentação/Medição)</option>
              <option value="Outro">Outro (especifique na mensagem)</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>Mensagem</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Conte um pouquinho sobre o que você precisa..."
            />
          </div>

          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <Send className={styles.submitIcon} aria-hidden="true" /> {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </MotionButton>
        </form>
      </div>
    </section>
  );
}