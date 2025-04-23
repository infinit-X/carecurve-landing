import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './ProblemStatement.css';

// Import Videos
import videoRain from '../../assets/videos/rain-lightning.mp4';
import videoAccess from '../../assets/videos/accessibility-bg.mp4';
import videoIncomplete from '../../assets/videos/incomplete-bg.mp4';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ProblemCard = ({ title, description, video, index }) => {
  return (
    <motion.div 
      className="problem-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="card-video-container">
        <video autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="glass-effect" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </motion.div>
  );
};

const ProblemStatement = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const problems = [
    {
      title: 'Misplaced / Damaged',
      description: "The physical records are easily misplaced during moves, damaged by humidity, or simply wear out, erasing irreplaceable health history.",
      video: videoRain
    },
    {
      title: 'Limited Accessibility',
      description: "Accessing records quickly in emergencies or across different clinics becomes a significant challenge.",
      video: videoAccess
    },
    {
      title: 'Incomplete Information',
      description: "Manual entries are prone to errors or illegibility. Healthcare providers face delays when crucial data isn't readily available.",
      video: videoIncomplete
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="problem-statement-section">
      <motion.h2 
        ref={titleRef} 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Common Problems with Physical Health Records
      </motion.h2>
      <div className="problem-cards-container">
        {problems.map((problem, index) => (
          <ProblemCard key={index} {...problem} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProblemStatement;