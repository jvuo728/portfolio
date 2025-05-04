import React, { useEffect, useState } from 'react';
import profileImg from '../assets/profile.jpg';

const words = [
  'data scientist',
  'machine learning enthusiast',
  'software developer',
  'calisthenics performer',
  'lifelong learner',
];

const TYPING_SPEED = 80;
const PAUSE = 1000;

const Header: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentWord = words[wordIndex];
    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1));
      }, TYPING_SPEED / 2);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <header id="home">
      <div className="header-content">
        <div className="header-text">
          <h1>Hi, I'm James!</h1>
          <div className="typing-text">
            <span>I'm a </span>
            <span className="typing-words">
              <span>{displayed}</span>
              <span className="typing-cursor">|</span>
            </span>
          </div>
          <p className="subtitle">based in Berkeley, CA.</p>
        </div>
        <div className="profile-container">
          <img
            src={profileImg}
            alt="James Vuong"
            className="profile-image"
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 