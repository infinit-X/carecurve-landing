import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import ScrollReveal from '../shared/ScrollReveal';
import Container from '../shared/Container';
import './WhyChooseUs.css';

const reasons = [
  {
    title: 'Security First',
    description: "Bank-level encryption and security measures to protect your child's sensitive health information.",
    icon: '🛡️',
    color: '#4f46e5'
  },
  {
    title: 'Always Available',
    description: "24/7 access to your child's health records from any device, anywhere in the world.",
    icon: '🌐',
    color: '#059669'
  },
  {
    title: 'Easy Integration',
    description: 'Seamless integration with healthcare providers and existing medical record systems.',
    icon: '🔄',
    color: '#0ea5e9'
  },
  {
    title: 'Smart Analytics',
    description: 'Advanced analytics to track growth, development, and health patterns over time.',
    icon: '📊',
    color: '#dc2626'
  },
  {
    title: 'Parent-Friendly',
    description: 'Intuitive interface designed specifically for busy parents and caregivers.',
    icon: '👨‍👩‍👧‍👦',
    color: '#8b5cf6'
  },
  {
    title: 'Emergency Ready',
    description: 'Quick access to critical information during emergencies when every second counts.',
    icon: '🚑',
    color: '#f97316'
  }
];

const FeatureCard = ({ title, description, icon, color, index }) => (
  <ScrollReveal delay={index * 0.1}>
    <motion.div 
      className="why-choose-card"
      style={{ '--card-color': color }}
      whileHover={{ 
        y: -5,
        boxShadow: `0 10px 30px ${color}20`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="card-icon-wrapper">
        <span className="card-icon">{icon}</span>
        <div className="icon-backdrop" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <motion.div 
        className="card-highlight"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  </ScrollReveal>
);

const WhyChooseUs = () => {
  const parallaxRef = useParallax(0.15);

  return (
    <section className="why-choose-us" id="why-choose-us">
      <div className="background-effects" ref={parallaxRef}>
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob blob-3" />
      </div>

      <Container>
        <ScrollReveal>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose CareCurve?</h2>
            <p className="section-subtitle">
              Experience the future of pediatric health record management
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="features-grid">
          {reasons.map((reason, index) => (
            <FeatureCard key={index} {...reason} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
