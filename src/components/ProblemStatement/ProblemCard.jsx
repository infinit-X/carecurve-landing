import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useTypewriter from '../../hooks/useTypewriter'; // Import the hook
import './ProblemStatement.css'; // We'll add card styles to this main CSS file

// Placeholder Icon Component (Replace with actual SVGs later)
const PlaceholderIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);


const ProblemCard = ({ title, description, icon = 'placeholder', delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it comes into view
    threshold: 0.3, // Trigger when 30% of the card is visible
    delay: delay, // Optional delay before triggering observer
  });

  // Use the typewriter hook for the description, but only start when inView
  // Pass an empty string initially if not inView to prevent typing prematurely
  const { displayText: typedDescription, isTyping: isDescriptionTyping } = useTypewriter(
    inView ? description : '', // Only pass text when inView
    30, // Faster typing speed for cards? Adjust as needed
    100 // Short delay after becoming visible
  );

  return (
    <div ref={ref} className={`problem-card ${inView ? 'is-visible' : ''}`}>
      <div className="card-icon">
        {/* Render actual icon based on 'icon' prop later */}
        <PlaceholderIcon />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">
        {typedDescription}
        {/* Show cursor only while this card's description is typing */}
        {isDescriptionTyping && <span className="typing-cursor">|</span>}
      </p>
    </div>
  );
};

export default ProblemCard;