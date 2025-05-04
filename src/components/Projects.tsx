import React from 'react';
import Map from './Map';

const Projects: React.FC = () => (
  <section id="projects">
    <h2>My Projects</h2>
    <div className="project">
      <h3>Clustering-Based School Assignment Model for SFUSD</h3>
      <p>
        As part of UC Berkeley's Fall 2024 Datathon, where my team won 2nd
        place, I helped develop a model to assign San Francisco students to
        elementary schools in a way that promoted racial diversity and income
        equity. We used demographic, income, and census data to build a
        permutation-based clustering algorithm and visualized the results
        using GeoPandas and Folium. The project combined data science,
        geospatial analysis, and a strong emphasis on social impact.
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

    <div className="project">
      <h3>3D Model Viewer</h3>
      <p>
        Built a Three.js viewer for interactive CAD models with measurement
        tools and REST API integration.
      </p>
      <div className="project-tech">
        <span>Three.js</span>
        <span>JavaScript</span>
        <span>REST API</span>
      </div>
    </div>
  </section>
);

export default Projects; 