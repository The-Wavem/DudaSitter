import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, FilePenLine, LogOut, MessageSquare, PawPrint } from 'lucide-react';
import { getMessages } from '@/services/messagesAPI';
import styles from './AdminSidebar.module.css';

const navButtonMotion = {
  rest: { x: 0, scale: 1 },
  hover: { x: 3, scale: 1.01 },
  tap: { scale: 0.99 },
};

export default function AdminSidebar({ activeTab, setActiveTab, handleLogout }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const tabs = [
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'agenda', label: 'Agenda Semanal', icon: CalendarClock },
    { id: 'cms', label: 'Editor do Site', icon: FilePenLine },
  ];

  useEffect(() => {
    let isActive = true;

    const updateUnreadCount = async () => {
      const nextMessages = await getMessages();

      if (!isActive) {
        return;
      }

      setUnreadCount(nextMessages.filter((message) => message.status === 'new').length);
    };

    updateUnreadCount();
    window.addEventListener('duda-messages-updated', updateUnreadCount);

    return () => {
      isActive = false;
      window.removeEventListener('duda-messages-updated', updateUnreadCount);
    };
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <motion.div className={`${styles.logoContainer} ${styles.hiddenOnMobile}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
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
              aria-label={tab.label}
              className={`${styles.navButton} ${activeTab === tab.id ? styles.navButtonActive : ''}`}
              variants={navButtonMotion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <tab.icon className={styles.navIcon} aria-hidden="true" />
              <span className={styles.navLabel}>{tab.label}</span>
              {tab.id === 'messages' && unreadCount > 0 && <span className={styles.navBadge}>{unreadCount}</span>}
            </motion.button>
          ))}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <motion.button type="button" onClick={handleLogout} className={styles.logoutButton} aria-label="Sair" whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <LogOut className={styles.logoutIcon} aria-hidden="true" />
          <span>Sair</span>
        </motion.button>

        <motion.div className={`${styles.profileContainer} ${styles.hiddenOnMobile}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} whileHover={{ y: -2 }}>
          <div className={styles.profileCard}>
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
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
