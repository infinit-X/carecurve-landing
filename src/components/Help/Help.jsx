import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <section className="help-section">
      <div className="help-container">
        <h2>How Can We Help You?</h2>
        <div className="help-content">
          <div className="help-categories">
            <div className="help-category">
              <h3>Getting Started</h3>
              <ul>
                <li>Platform Overview</li>
                <li>Quick Start Guide</li>
                <li>Basic Navigation</li>
              </ul>
            </div>
            <div className="help-category">
              <h3>FAQs</h3>
              <ul>
                <li>Common Questions</li>
                <li>Troubleshooting</li>
                <li>Best Practices</li>
              </ul>
            </div>
            <div className="help-category">
              <h3>Support</h3>
              <ul>
                <li>Contact Support</li>
                <li>Knowledge Base</li>
                <li>Video Tutorials</li>
              </ul>
            </div>
          </div>
          <div className="help-contact-info">
            <h3>Need Direct Assistance?</h3>
            <p>Our support team is available 24/7 to help you</p>
            <button className="help-contact-button">Contact Support</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
