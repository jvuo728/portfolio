import React from 'react';
import dragonLogo from '../assets/dragon-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const NAV_HEIGHT = 80; // px, adjust if your nav height is different

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  const href = e.currentTarget.getAttribute('href');
  if (href && href.startsWith('#')) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
};

const Nav: React.FC = () => (
  <nav>
    <div className="nav-content">
      <a href="#home" className="nav-brand" onClick={handleNavClick}>
        <img src={dragonLogo} alt="Dragon Logo" />
      </a>
      <div className="nav-links">
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#projects" onClick={handleNavClick}>Projects</a>
        <a href="#contact" onClick={handleNavClick}>Contact</a>
        <div className="social-links">
          <a
            href="https://github.com/jvuo728"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/james-vuong-2748a4293/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav; 