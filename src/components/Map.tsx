/**
 * Map.tsx - React Leaflet map with interactive features from original map.js
 */
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const schoolColors: Record<string, string> = {
  'Mission Bay Elementary': '#0000FF', // blue
  'Webster (Daniel) Elementary': '#FFD700' // gold
};

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const geojsonLayer = useRef<L.GeoJSON<any> | null>(null);
  const infoControl = useRef<L.Control | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (leafletMap.current) return;

    // Initialize map
    leafletMap.current = L.map(mapRef.current).setView([37.7749, -122.4194], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(leafletMap.current);

    // Info control
    infoControl.current = L.control({ position: 'topright' });
    infoControl.current.onAdd = function () {
      const div = L.DomUtil.create('div', 'info');
      (infoControl.current as any)._div = div; // Store reference for updateInfo
      div.innerHTML = '<h4 style="color: #333;">SF School District</h4><div style="color: #333;">Hover over a district</div>';
      return div;
    };
    infoControl.current.addTo(leafletMap.current);

    // Legend control
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const schools = Object.keys(schoolColors);
      div.innerHTML = '<h4 style="color: #333;">Schools</h4>';
      for (let i = 0; i < schools.length; i++) {
        div.innerHTML +=
          '<i style="background:' + schoolColors[schools[i]] + '; width: 18px; height: 18px; display: inline-block; margin-right: 8px; opacity: 0.7; vertical-align: middle;"></i> ' +
          '<span style="color: #333; vertical-align: middle;">' + schools[i] + '</span><br>';
      }
      return div;
    };
    legend.addTo(leafletMap.current);

    // Style for school districts
    function getDistrictStyle(feature: any) {
      const school = feature.properties.school;
      return {
        fillColor: schoolColors[school] || '#ccc',
        weight: 0,
        opacity: 1,
        color: 'white',
        dashArray: '4',
        fillOpacity: 0.5
      };
    }

    // Highlight feature on hover
    function highlightFeature(e: L.LeafletEvent) {
      const layer = e.target as L.Path;
      layer.setStyle({
        weight: 1.5,
        color: '#ffffff',
        dashArray: '',
        fillOpacity: 0.7
      });
      if (layer.bringToFront) layer.bringToFront();
      updateInfo(layer.feature?.properties);
    }

    // Reset highlight
    function resetHighlight(e: L.LeafletEvent) {
      geojsonLayer.current?.resetStyle(e.target as L.Layer);
      updateInfo();
    }

    // Zoom to feature on click
    function zoomToFeature(e: L.LeafletEvent) {
      leafletMap.current?.fitBounds((e.target as L.Layer).getBounds());
    }

    // Bind popup and events
    function onEachFeature(feature: any, layer: L.Layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
      const school = feature.properties.school;
      const blockGroup = feature.properties.blockGroup;
      layer.bindPopup(
        `<strong>School:</strong> ${school}<br><strong>Block Group:</strong> ${blockGroup}`
      );
    }

    // Info update function
    function updateInfo(props?: any) {
      if (!infoControl.current) return;
      const div = (infoControl.current as any)._div as HTMLDivElement;
      if (!div) return;
      div.innerHTML = '<h4 style="color: #333;">SF School District</h4>' + (props ?
        `<div style="color: #333;"><b>School: </b>${props.school}<br /><b>Block Group: </b>${props.blockGroup}</div>` :
        '<div style="color: #333;">Hover over a district</div>'
      );
    }

    // Fetch and add GeoJSON
    fetch(`${import.meta.env.BASE_URL}assets/block_groups.geojson`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        geojsonLayer.current = L.geoJSON(data, {
          style: getDistrictStyle,
          onEachFeature
        }).addTo(leafletMap.current!);
        leafletMap.current?.fitBounds(geojsonLayer.current.getBounds());
      })
      .catch(err => {
        console.error('Failed to load GeoJSON:', err);
      });

    setTimeout(() => {
      leafletMap.current?.invalidateSize();
    }, 0);

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default Map; 