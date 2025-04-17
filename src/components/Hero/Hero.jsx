import React from 'react';
import './Hero.css'; // We'll create this file next
import backgroundVideo from '../../assets/videos/hero-background.mp4'; // Adjust path/name if needed

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>Your Child's Health Journey, <br/> Digitally Secured</h1>
        <button className="learn-more-button">Learn more</button>
      </div>
    </section>
  );
};

export default Hero;