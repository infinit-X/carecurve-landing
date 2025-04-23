import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import ScrollReveal from '../shared/ScrollReveal';
import Container from '../shared/Container';
import './FeaturesSection.css';

const features = [
  {
    title: "Digital Record Keeping",
    description: "Store and access your child's health records securely in the cloud",
    icon: "📱",
  },
  {
    title: "Easy Access",
    description: "Access records instantly from any device, anywhere, anytime",
    icon: "🔐",
  },
  {
    title: "Smart Analytics",
    description: "Track growth patterns and health trends with intelligent insights",
    icon: "📊",
  },
  {
    title: "Data Security",
    description: "Bank-level encryption keeping your child's health data safe",
    icon: "🛡️",
  },
  {
    title: "Doctor Integration",
    description: "Share records seamlessly with healthcare providers",
    icon: "👨‍⚕️",
  },
  {
    title: "Emergency Access",
    description: "Quick access to vital information during emergencies",
    icon: "🚨",
  }
];

const FeatureCard = ({ title, description, icon, index }) => {
  return (
    <ScrollReveal 
      className="feature-card-wrapper"
      delay={index * 0.1}
    >
      <motion.div 
        className="feature-card"
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
      >
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </motion.div>
    </ScrollReveal>
  );
};

const FeaturesSection = () => {
  const parallaxRef = useParallax(0.2);

  return (
    <section className="features-section" id="features">
      <div className="features-background" ref={parallaxRef} />
      <Container>
        <ScrollReveal>
          <h2 className="section-title">
            Powerful Features for Peace of Mind
          </h2>
        </ScrollReveal>
        
        <motion.div 
          className="features-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
