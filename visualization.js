// Data structure for student enrollment clustering
const enrollmentData = {
    points: [
        // Each point represents a student-family assignment
        {
            x: 0, // Replace with actual x-coordinate (could be latitude or demographic score)
            y: 0, // Replace with actual y-coordinate (could be longitude or another demographic score)
            cluster: 0, // Cluster assignment (0 to n-1)
            school: "School Name", // Name of assigned school
            demographics: {
                income: 0, // Replace with actual income data
                diversity: 0, // Replace with actual diversity score
                distance: 0 // Replace with actual distance to school
            }
        }
        // Add more points for each student-family assignment
    ],
    clusters: [
        // Each cluster represents a school or group of schools
        {
            id: 0, // Cluster ID (0 to n-1)
            color: "#8b5cf6", // Cluster color
            name: "School Group 1", // Name of the school or group
            center: { x: 0, y: 0 }, // Center point of the cluster
            radius: 0, // Radius of influence
            metrics: {
                avgIncome: 0, // Average income in cluster
                diversityScore: 0, // Diversity score
                avgDistance: 0 // Average distance to school
            }
        }
        // Add more clusters for each school or group
    ]
};

function createVisualization() {
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create SVG container
    const svg = d3.select("#clustering-visualization")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            }));

    const g = svg.append("g");

    // Calculate scales based on actual data ranges
    const xExtent = d3.extent(enrollmentData.points, d => d.x);
    const yExtent = d3.extent(enrollmentData.points, d => d.y);

    const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([height - margin.bottom, margin.top]);

    // Add cluster circles
    const clusters = g.selectAll(".cluster")
        .data(enrollmentData.clusters)
        .enter()
        .append("g")
        .attr("class", "cluster");

    clusters.append("circle")
        .attr("cx", d => xScale(d.center.x))
        .attr("cy", d => yScale(d.center.y))
        .attr("r", d => d.radius)
        .attr("fill", d => d.color)
        .attr("opacity", 0.2);

    // Add points
    const points = g.selectAll(".point")
        .data(enrollmentData.points)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 5)
        .attr("fill", d => enrollmentData.clusters[d.cluster].color)
        .on("mouseover", function(event, d) {
            d3.select(this)
                .attr("r", 8)
                .attr("stroke", "#fff")
                .attr("stroke-width", 2);

            // Enhanced tooltip with more information
            tooltip
                .style("opacity", 1)
                .html(`
                    <strong>${d.school}</strong><br>
                    Cluster: ${d.cluster + 1}<br>
                    Income: $${d.demographics.income.toLocaleString()}<br>
                    Diversity Score: ${d.demographics.diversity.toFixed(2)}<br>
                    Distance: ${d.demographics.distance.toFixed(1)} miles
                `)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", function() {
            d3.select(this)
                .attr("r", 5)
                .attr("stroke", "none");
            tooltip.style("opacity", 0);
        });

    // Add tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "rgba(31, 41, 55, 0.9)")
        .style("padding", "0.5rem")
        .style("border-radius", "0.375rem")
        .style("color", "white")
        .style("font-family", "'Clash Display', sans-serif")
        .style("font-size", "0.9rem")
        .style("pointer-events", "none");

    // Add control button functionality
    let showClusters = true;
    d3.select("#toggle-clusters").on("click", function() {
        showClusters = !showClusters;
        clusters.select("circle")
            .attr("opacity", showClusters ? 0.2 : 0);
    });

    d3.select("#reset-view").on("click", function() {
        svg.transition()
            .duration(750)
            .call(d3.zoom().transform, d3.zoomIdentity);
    });
}

// Initialize visualization when the page loads
document.addEventListener('DOMContentLoaded', createVisualization); 