import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import ScrollReveal from '../shared/ScrollReveal';
import Container from '../shared/Container';
import './Services.css';

const services = [
  {
    title: "Digital Record Management",
    description: "Comprehensive digital health record management system, making it easy to store, organize, and access your child's medical history.",
    icon: "📱",
    color: "#4f46e5"
  },
  {
    title: "Healthcare Provider Integration",
    description: "Seamless integration with healthcare providers, ensuring your child's records are always up-to-date and accessible to authorized medical professionals.",
    icon: "🏥",
    color: "#059669"
  },
  {
    title: "Emergency Access",
    description: "Quick emergency access features allowing healthcare providers to access critical information when needed most.",
    icon: "🚨",
    color: "#dc2626"
  },
  {
    title: "Growth Tracking",
    description: "Advanced analytics and tracking tools to monitor your child's growth and development milestones.",
    icon: "📈",
    color: "#0ea5e9"
  }
];

const ServiceCard = ({ title, description, icon, color, index }) => {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div 
        className="service-card"
        style={{ '--card-color': color }}
        whileHover={{ 
          y: -10,
          boxShadow: `0 20px 40px ${color}20`
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="service-icon-wrapper">
          <span className="service-icon">{icon}</span>
        </div>
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        <motion.div 
          className="service-shine"
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </ScrollReveal>
  );
};

const Services = () => {
  const parallaxRef = useParallax(0.2);

  return (
    <section className="services-section" id="services">
      <div className="services-background" ref={parallaxRef}>
        <div className="gradient-sphere gradient-1" />
        <div className="gradient-sphere gradient-2" />
        <div className="gradient-sphere gradient-3" />
      </div>
      
      <Container>
        <ScrollReveal>
          <h2 className="services-title">
            Our Comprehensive Services
          </h2>
          <p className="services-subtitle">
            Empowering parents with modern healthcare management tools
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
