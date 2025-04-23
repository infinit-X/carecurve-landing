import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import ScrollReveal from '../shared/ScrollReveal';
import Container from '../shared/Container';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: "Sign up in minutes with our simple registration process. Add your children's profiles and start your digital health journey.",
    icon: '📝'
  },
  {
    number: '02',
    title: 'Upload Records',
    description: 'Easily upload existing health records through our secure platform. Support for documents, images, and direct healthcare provider integration.',
    icon: '📤'
  },
  {
    number: '03',
    title: 'Track & Monitor',
    description: "Monitor your child's health metrics, set reminders for appointments and medications, and track developmental milestones.",
    icon: '📊'
  },
  {
    number: '04',
    title: 'Share Securely',
    description: 'Share records securely with healthcare providers. Grant and revoke access with complete control over your data.',
    icon: '🔒'
  }
];

const StepCard = ({ number, title, description, icon, isActive, onClick }) => (
  <motion.div 
    className={`step-card ${isActive ? 'active' : ''}`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="step-content">
      <div className="step-header">
        <span className="step-number">{number}</span>
        <span className="step-icon">{icon}</span>
      </div>
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
    <motion.div 
      className="step-progress"
      initial={false}
      animate={{ 
        width: isActive ? '100%' : '0%',
        backgroundColor: isActive ? 'var(--highlight-color)' : 'transparent'
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />
  </motion.div>
);

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const parallaxRef = useParallax(0.2);

  // Auto-advance steps
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-background" ref={parallaxRef}>
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>

      <Container>
        <ScrollReveal>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started with CareCurve in four simple steps
          </p>
        </ScrollReveal>

        <div className="steps-container">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              {...step}
              isActive={index === activeStep}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>

        <div className="steps-navigation">
          {steps.map((_, index) => (
            <motion.button
              key={index}
              className={`nav-dot ${index === activeStep ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
