import React from 'react';
import Map from './Map';

const Projects: React.FC = () => (
  <section id="projects">
    <h2>My Projects</h2>
    <div className="project">
      <h3>Relativity Space: 3D Model Renderer (Lead Frontend Developer)</h3>
      <p>
        <b>My Contribution:</b> As the <b>lead frontend developer</b> on a team contracted by <b>Relativity Space</b>, I architected and built the interactive 3D CAD model renderer using React, Three.js, and TypeScript. The final product was delivered as part of a secure web platform with user authentication and a Postgres database. This embedded viewer is an adaptation of my core contribution, showcasing the renderer's interactive features for my portfolio.
      </p>
      <div className="project-demo">
        <iframe
          src="https://jvuo728.github.io/three.js-viewer/"
          title="Relativity Space 3D Viewer"
          style={{ width: '100%', height: '97vh', border: 'none' }}
          allowFullScreen
        ></iframe>
      </div>
      <div className="project-tech">
        <span>React</span>
        <span>Typescript</span>
        <span>Three.js</span>
        <span>Javascript</span>
      </div>
      <a
        href="https://jvuo728.github.io/three.js-viewer/"
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        View Full Project →
      </a>
    </div>
    <div className="project">
      <h3>Clustering-Based School Assignment Model for SFUSD</h3>
      <p>
        As part of UC Berkeley's Fall 2024 Datathon, where my team won 2nd
        place, I helped develop a model to assign San Francisco students to
        elementary schools in a way that promoted racial diversity and income
        equity. We used demographic, income, and census data to build a
        permutation-based clustering algorithm and visualized the results
        using GeoPandas and Folium. The project combined data science, 
        machine learning,and a strong emphasis on social impact.
      </p>
      <div className="project-demo">
        <div className="map-container">
          <Map />
        </div>
      </div>
      <div className="project-tech">
        <span>Python</span>
        <span>Machine Learning</span>
        <span>Data Analysis</span>
      </div>
      <a
        href="https://deepnote.com/app/datathon-fall-2024/Datathon-Fall-2024-f5e651ad-5eee-402d-a771-d60f326b92f5?utm_content=f5e651ad-5eee-402d-a771-d60f326b92f5&__run=true"
        target="_blank"
        className="project-link"
        rel="noopener noreferrer"
      >
        View Full Project →
      </a>
    </div>
  </section>
);

export default Projects; 