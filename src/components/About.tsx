import React from 'react';

const About: React.FC = () => (
  <section id="about">
    <h2>More about me</h2>
    <div className="about-content">
      <p>
        Hi! I'm an undergraduate student at
        <span className="about-highlight">UC Berkeley</span> studying Data
        Science. I'm curious about how technology can help us better
        understand the world and improve people's lives, especially in areas
        like
        <span className="about-highlight">
          health, learning, and human performance
        </span>
        .
      </p>
      <p>
        Currently, I'm exploring opportunities in
        <span className="about-highlight">
          data science and software development
        </span>
        through hands-on projects, new tools, and experimentation. Outside of
        school, I train
        <span className="about-highlight">calisthenics</span>, travel when I can,
        and like learning new skills. I enjoy being around friends and family
        and making time for the people in my life.
      </p>
    </div>
  </section>
);

export default About; 