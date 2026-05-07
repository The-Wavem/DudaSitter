import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import AdminLogin from '@/sections/admin/AdminLogin';
import AdminSidebar from '@/sections/admin/AdminSidebar';
import { logout, subscribeToAuthChanges } from '@/services/authAPI';
import styles from './Admin.module.css';

const AdminMessages = lazy(() => import('@/sections/admin/AdminMessages'));
const AdminAgenda = lazy(() => import('@/sections/admin/AdminAgenda'));
const AdminCMS = lazy(() => import('@/sections/admin/AdminCMS'));

const pageVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

const sectionFallbackVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionFallback() {
  return (
    <MotionDiv className={styles.loadingState} variants={sectionFallbackVariants} initial="hidden" animate="visible">
      <motion.span className={styles.loadingPaw} animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
        DS
      </motion.span>
      <p className={styles.loadingText}>Carregando seção...</p>
    </MotionDiv>
  );
}


const MotionDiv = motion.div;
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setIsAuthenticated(Boolean(user));
      if (user) {
        setActiveTab('messages');
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    let isActive = true;

    const warmUpDashboard = async () => {
      await Promise.all([
        import('@/sections/admin/AdminMessages'),
        import('@/sections/admin/AdminAgenda'),
        import('@/sections/admin/AdminCMS'),
      ]);

      if (!isActive) {
        return;
      }
    };

    warmUpDashboard();

    return () => {
      isActive = false;
    };
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setActiveTab('messages');
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setActiveTab('messages');
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isAuthenticated ? (
        <MotionDiv key="login" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
          <AdminLogin onSuccess={handleLoginSuccess} />
        </MotionDiv>
      ) : (
        <MotionDiv key="dashboard" className={styles.layout} variants={pageVariants} initial="hidden" animate="visible" exit="exit">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

          <main className={styles.main}>
            <Suspense fallback={<SectionFallback />}>
              <AnimatePresence mode="wait" initial={false}>
                <MotionDiv
                  key={activeTab}
                  className={styles.mainContent}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeTab === 'messages' && <AdminMessages onOpenAgenda={() => setActiveTab('agenda')} />}
                  {activeTab === 'agenda' && <AdminAgenda />}
                  {activeTab === 'cms' && <AdminCMS />}
                </MotionDiv>
              </AnimatePresence>
            </Suspense>
          </main>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}