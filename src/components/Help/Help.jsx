import React from 'react';
import { motion } from 'framer-motion';
import {
  RocketIcon,
  QuestionMarkCircledIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons';
import ScrollReveal from '../shared/ScrollReveal';
import './Help.css';

const categories = [
  {
    title: 'Getting Started',
    icon: RocketIcon,
    items: [
      'Platform Overview',
      'Quick Start Guide',
      'Basic Navigation'
    ]
  },
  {
    title: 'FAQs',
    icon: QuestionMarkCircledIcon,
    items: [
      'Common Questions',
      'Troubleshooting',
      'Best Practices'
    ]
  },
  {
    title: 'Support',
    icon: ChatBubbleIcon,
    items: [
      'Contact Support',
      'Knowledge Base',
      'Video Tutorials'
    ]
  }
];

const Help = () => {
  return (
    <section className="help-section" id="help">
      <div className="help-background-glow" />
      <div className="help-container">
        <ScrollReveal>
          <h2 className="help-title">How Can We Help You?</h2>
          <p className="help-subtitle">
            Find answers, explore our guides, or get in touch with our dedicated support team.
          </p>
        </ScrollReveal>

        <div className="help-content">
          <div className="help-categories">
            {categories.map((cat, index) => {
              const IconComponent = cat.icon;
              return (
                <ScrollReveal key={cat.title} delay={index * 0.1}>
                  <motion.div
                    className="help-category"
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <div className="help-category-header">
                      <div className="help-icon-wrapper">
                        <IconComponent className="help-icon" />
                      </div>
                      <h3>{cat.title}</h3>
                    </div>
                    <ul>
                      {cat.items.map((item) => (
                        <li key={item} className="help-item">
                          <span>{item}</span>
                          <ChevronRightIcon className="help-item-chevron" />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <motion.div
              className="help-contact-info"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="help-contact-icon-wrapper">
                <EnvelopeClosedIcon className="help-contact-icon" />
              </div>
              <h3>Need Direct Assistance?</h3>
              <p>Our support team is available 24/7 to help you</p>
              <motion.button
                className="help-contact-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Help;
