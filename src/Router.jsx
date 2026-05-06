import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/public/Home';
import About from './pages/public/About';

export default function Router() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}
