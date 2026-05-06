import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import styles from './AdminLogin.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === 'admin') {
      setError('');
      onSuccess();
      return;
    }

    setError('Senha incorreta.');
  };

  return (
    <div className={styles.page}>
      <motion.div className={styles.orbOne} aria-hidden="true" animate={{ y: [0, -10, 0], x: [0, 6, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className={styles.orbTwo} aria-hidden="true" animate={{ y: [0, 8, 0], x: [0, -8, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />

      <motion.div className={styles.card} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -3, scale: 1.005 }}>
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <Lock className={styles.icon} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>Área Administrativa</h1>
          <p className={styles.subtitle}>Acesso exclusivo para Duda</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="admin-password" className={styles.label}>Senha de Acesso</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
              className={styles.input}
              placeholder="••••••"
            />
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.hint}>Dica: a senha é admin</p>
          </div>

          <button type="submit" className={styles.submitButton}>Entrar</button>
        </form>
      </motion.div>
    </div>
  );
}