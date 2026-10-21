import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProblemStatement.css';

const ProblemCard = ({ title, description, video, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          if (videoRef.current && videoRef.current.src) {
            videoRef.current.play().catch(() => {});
          }
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoadVideo]);

  return (
    <motion.div
      ref={cardRef}
      className="problem-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index || 0) * 0.2 }}
    >
      <div className="card-video-container">
        <video
          ref={videoRef}
          src={shouldLoadVideo && video ? video : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
      </div>
      <div className="glass-effect" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
