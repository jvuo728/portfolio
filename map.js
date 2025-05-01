// Initialize the map centered on San Francisco
const map = L.map('map').setView([37.7749, -122.4194], 12);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// School assignment colors
const schoolColors = {
    'Mission Bay Elementary': '#0000FF',  // blue
    'Webster (Daniel) Elementary': '#FFD700'  // gold
};

// Define a style for the school districts
function getDistrictStyle(feature) {
    const school = feature.properties.school;
    return {
        fillColor: schoolColors[school] || '#ccc',
        weight: 0,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Function to highlight feature on hover
function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 1.5,
        color: '#ffffff',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
    info.update(layer.feature.properties);
}

// Function to reset highlight
function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
    info.update();
}

// Function to zoom to feature on click
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// Function to bind popup
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    
    const school = feature.properties.school;
    const blockGroup = feature.properties.blockGroup;
    layer.bindPopup(`
        <strong>School:</strong> ${school}<br>
        <strong>Block Group:</strong> ${blockGroup}
    `);
}

// Create custom info control
const info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4 style="color: #333;">SF School District</h4>' + (props ?
        '<div style="color: #333;"><b>School: </b>' + props.school + '<br />' +
        '<b>Block Group: </b>' + props.blockGroup + '</div>'
        : '<div style="color: #333;">Hover over a district</div>');
};

info.addTo(map);

// Create legend
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const schools = Object.keys(schoolColors);
    
    div.innerHTML = '<h4 style="color: #333;">Schools</h4>';
    
    for (let i = 0; i < schools.length; i++) {
        div.innerHTML +=
            '<i style="background:' + schoolColors[schools[i]] + '"></i> ' +
            '<span style="color: #333;">' + schools[i] + '</span><br>';
    }
    
    return div;
};

legend.addTo(map);

// Load and display GeoJSON data
let geojsonLayer;
fetch('block_groups.geojson')
    .then(response => response.json())
    .then(data => {
        geojsonLayer = L.geoJSON(data, {
            style: getDistrictStyle,
            onEachFeature: onEachFeature
        }).addTo(map);
        
        // Fit the map to the GeoJSON bounds
        map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => console.error('Error loading GeoJSON:', error)); 