import React from 'react';
import './styles.css';
import Nav from './components/Nav';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Header />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default App; 