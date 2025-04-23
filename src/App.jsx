import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '../src/components/shared/ThemeProvider';
import { ToastProvider } from '../src/components/shared/Toast/Toast';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/shared/Loading';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import CustomCursor from './components/shared/CustomCursor/CustomCursor';
import ScrollToTop from './components/shared/ScrollToTop/ScrollToTop';
import CookieConsent from './components/shared/CookieConsent/CookieConsent';
import PageProgress from './components/shared/PageProgress/PageProgress';
import BackgroundAnimation from './components/shared/BackgroundAnimation/BackgroundAnimation';
import { usePreloadImages } from './hooks/usePreloadImages';
import { useScrollProgress } from './hooks/useScrollProgress';
import Analytics from './utils/analytics';
import './App.css';

// Import all images that need preloading
import logoLight from './assets/images/logo full - w.png';
import logoDark from './assets/images/logo full - b.png';
import logo from './assets/images/logo.png';

// Lazy load components
const Hero = lazy(() => import('./components/Hero/Hero'));
const ProblemStatement = lazy(() => import('./components/ProblemStatement/ProblemStatement'));
const CareCurveIntro = lazy(() => import('./components/carecurve-intro/CareCurveIntro'));
const FeaturesSection = lazy(() => import('./components/FeaturesSection/FeaturesSection'));
const FeatureSpotlight = lazy(() => import('./components/FeatureSpotlight/FeatureSpotlight'));
const HowItWorks = lazy(() => import('./components/HowItWorks/HowItWorks'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs/WhyChooseUs'));
const FinalCTA = lazy(() => import('./components/FinalCTA/FinalCTA'));
const Services = lazy(() => import('./components/Services/Services'));
const Help = lazy(() => import('./components/Help/Help'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function AppContent() {
  const [navbarDark, setNavbarDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const problemStatementRef = useRef(null);
  const carecurveIntroRef = useRef(null);

  // Initialize analytics and track page load
  useEffect(() => {
    Analytics.init();
    Analytics.markPerformance('app_mount');

    return () => {
      Analytics.measurePerformance('app_mount', 'app_unmount', 'total_session_time');
    };
  }, []);

  // Preload essential images
  const imagesLoaded = usePreloadImages([logoLight, logoDark, logo]);

  // Handle scroll-based navbar color change
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      setNavbarDark(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle initial loading state
  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(() => {
        setIsLoading(false);
        Analytics.markPerformance('content_visible');
        Analytics.measurePerformance('app_mount', 'content_visible', 'initial_load_time');
      }, 500);
    }
  }, [imagesLoaded]);

  return (
    <div className="App">
      <CustomCursor />
      <ScrollToTop />
      <PageProgress />
      <CookieConsent />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loading fullScreen message="Loading CareCurve..." />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BackgroundAnimation />
            <Navbar darkMode={navbarDark} />

            <main>
              <Suspense fallback={<Loading />}>
                <div ref={heroRef} id="home">
                  <Hero />
                </div>

                <div ref={problemStatementRef}>
                  <ProblemStatement />
                </div>

                <div ref={carecurveIntroRef} id="platform">
                  <CareCurveIntro />
                </div>

                <div id="features">
                  <FeaturesSection />
                </div>

                <div id="services">
                  <Services />
                </div>

                <FeatureSpotlight />
                <HowItWorks />
                <WhyChooseUs />
                <FinalCTA />

                <div id="help">
                  <Help />
                </div>
              </Suspense>
            </main>

            <Suspense fallback={<Loading />}>
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}


export default App;
