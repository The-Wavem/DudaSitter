import { Fragment, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import LoadingFallback from "./components/ui/LoadingFallback";
import PageTransition from "./components/ui/PageTransition";

const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Admin = lazy(() => import("./pages/admin/Admin"));

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Fragment>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "1rem",
            background: "rgba(255, 251, 246, 0.98)",
            color: "var(--color-brown-900)",
            border: "1px solid rgba(235, 223, 212, 0.95)",
            boxShadow: "0 16px 32px rgba(53, 39, 31, 0.16)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #5e7d61 0%, #6f926d 100%)",
              color: "white",
              border: "none",
            },
            iconTheme: { primary: "white", secondary: "#5e7d61" },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #d47a56 0%, #c9633e 100%)",
              color: "white",
              border: "none",
            },
            iconTheme: { primary: "white", secondary: "#d47a56" },
          },
        }}
        containerStyle={{ zIndex: 99999 }}
      />
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/sobre"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/contato"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
          <Route
            path="/admin"
            element={
              <PageTransition>
                <Admin />
              </PageTransition>
            }
          />
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
