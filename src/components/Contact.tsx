import React from 'react';

const Contact: React.FC = () => (
  <section id="contact">
    <h2>Get in Touch</h2>
    <div className="contact-links">
      <a
        href="mailto:j.vuong@berkeley.edu"
        target="_blank"
        className="contact-link"
        rel="noopener noreferrer"
      >
        <span className="link-label">Email</span>
        <span className="link-value">j.vuong@berkeley.edu</span>
      </a>
    </div>
  </section>
);

export default Contact; 