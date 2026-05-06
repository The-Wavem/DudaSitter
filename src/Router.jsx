import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

export default function Router() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}
