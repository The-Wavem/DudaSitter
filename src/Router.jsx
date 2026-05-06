import { Fragment, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import LoadingFallback from './components/ui/LoadingFallback';
import PageTransition from './components/ui/PageTransition';

const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Admin = lazy(() => import('./pages/admin/Admin'));

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Fragment>
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/sobre" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contato" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
    </Fragment>
  );
}

export default function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatedRoutes />
    </Suspense>
  );
}
