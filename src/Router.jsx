import { Fragment, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import LoadingFallback from './components/ui/LoadingFallback';

const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Admin = lazy(() => import('./pages/admin/Admin'));

export default function Router() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Fragment>
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </Fragment>
  );
}
