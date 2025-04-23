import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import ScrollReveal from '../shared/ScrollReveal';
import Container from '../shared/Container';
import './FeatureSpotlight.css';

const spotlightFeatures = [
  {
    id: 1,
    title: "Real-time Health Tracking",
    description: "Monitor your child's health metrics in real-time. Get instant updates and notifications about important changes.",
    icon: "📊",
    color: "#4f46e5"
  },
  {
    id: 2,
    title: "Secure Cloud Storage",
    description: "Your data is encrypted and securely stored in the cloud, accessible only to you and authorized healthcare providers.",
    icon: "🔒",
    color: "#059669"
  },
  {
    id: 3,
    title: "Smart Notifications",
    description: "Receive intelligent alerts for vaccinations, check-ups, and medication schedules. Never miss an important health event.",
    icon: "🔔",
    color: "#dc2626"
  }
];

const FeatureSpotlight = () => {
  const [activeFeature, setActiveFeature] = useState(spotlightFeatures[0]);
  const parallaxRef = useParallax(0.3);

  return (
    <section className="feature-spotlight">
      <div className="spotlight-background" ref={parallaxRef} />
      
      <Container>
        <ScrollReveal>
          <h2 className="spotlight-title">
            Core Features That Make a Difference
          </h2>
        </ScrollReveal>

        <div className="spotlight-content">
          <div className="spotlight-tabs">
            {spotlightFeatures.map((feature) => (
              <motion.button
                key={feature.id}
                className={`spotlight-tab ${activeFeature.id === feature.id ? 'active' : ''}`}
                onClick={() => setActiveFeature(feature)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  '--highlight-color': feature.color
                }}
              >
                <span className="tab-icon">{feature.icon}</span>
                {feature.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              className="spotlight-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="feature-icon-large"
                style={{ backgroundColor: activeFeature.color }}
              >
                {activeFeature.icon}
              </div>
              <h3 className="feature-title">{activeFeature.title}</h3>
              <p className="feature-description">{activeFeature.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

export default FeatureSpotlight;
