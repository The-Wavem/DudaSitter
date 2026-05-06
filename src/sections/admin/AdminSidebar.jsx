import { motion } from 'framer-motion';
import { LogOut, PawPrint } from 'lucide-react';
import styles from './AdminSidebar.module.css';

const navButtonMotion = {
  rest: { x: 0, scale: 1 },
  hover: { x: 3, scale: 1.01 },
  tap: { scale: 0.99 },
};

export default function AdminSidebar({ activeTab, setActiveTab, handleLogout }) {
  const tabs = [
    { id: 'messages', label: 'Mensagens', emoji: '💬' },
    { id: 'agenda', label: 'Agenda Semanal', emoji: '📅' },
    { id: 'cms', label: 'Editor do Site', emoji: '📝' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <motion.div className={styles.brandRow} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <motion.div className={styles.brandMark} whileHover={{ rotate: -4, scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <span>DS</span>
          </motion.div>
          <h1 className={styles.brandTitle}>Duda Sitter</h1>
        </motion.div>

        <nav className={styles.nav}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.navButton} ${activeTab === tab.id ? styles.navButtonActive : ''}`}
              variants={navButtonMotion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <span className={styles.navEmoji}>{tab.emoji}</span>
              <span className={styles.navLabel}>{tab.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <motion.button type="button" onClick={handleLogout} className={styles.logoutButton} whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <LogOut className={styles.logoutIcon} aria-hidden="true" />
          <span>Sair</span>
        </motion.button>

        <motion.div className={styles.profileCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} whileHover={{ y: -2 }}>
          <div className={styles.profileRow}>
            <div className={styles.avatar}><PawPrint className={styles.avatarIcon} aria-hidden="true" /></div>
            <div>
              <p className={styles.profileName}>Maria Eduarda</p>
              <p className={styles.profileRole}>Med. Veterinária</p>
            </div>
          </div>

          <div className={styles.progressRow}>
            <span className={styles.progressActive} />
            <span className={styles.progressActive} />
            <span className={styles.progressMuted} />
          </div>
        </motion.div>
      </div>
    </aside>
  );
}