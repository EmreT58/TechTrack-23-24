<!-- HTML -->
<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/p4pfighters.json";
    
    onMount(() => {
      // Function to update the radar charts based on selected fighters
      function updateRadarCharts(fighter1, fighter2) {
        // Extracting data for the selected fighters
        const fightersData = dataset
          .filter(fighter => fighter.name === fighter1 || fighter.name === fighter2)
          .map(fighter => ({
            name: fighter.name,
            metrics: {
              significant_striking_accuracy: fighter.significant_striking_accuracy,
              significant_strike_defence: fighter.significant_strike_defence,
              takedown_accuracy: fighter.takedown_accuracy,
              takedown_defense: fighter.takedown_defense,
            },
          }));
  
        // Update the chart based on the selected fighters
        updateChart(svg1, fightersData[0], "blue");
        updateChart(svg2, fightersData[1], "red");
      }
  
      // Function to update a single radar chart
      function updateChart(svg, fighter, color) {
        // Update lines
        console.log("change player", svg, fighter);
        svg.selectAll(".line")
          .data(metrics)
          .join("path")
          .attr("class", "line")
          .attr("d", d3.lineRadial()
            .angle((_, i) => (i * 2 * Math.PI) / metrics.length)
            .radius((d, i) => rScale(fighter.metrics[metrics[i]]))
          )
          .attr("stroke", color)
          .attr("fill", color)
          .attr("fill-opacity", 0.1);
  
        // Update data points
        svg.selectAll(".dot")
          .data(metrics)
          .join("circle")
          .attr("class", "dot")
          .attr("cx", (_, i) => rScale(fighter.metrics[metrics[i]]) * Math.cos((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
          .attr("cy", (_, i) => rScale(fighter.metrics[metrics[i]]) * Math.sin((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
          .attr("r", 5)
          .style("fill", color)
          .style("opacity", 0.8);
      }
  
      // Extracting data from the dataset
      const fightersData = dataset.map(fighter => ({
        name: fighter.name,
        metrics: {
          significant_striking_accuracy: fighter.significant_striking_accuracy,
          significant_strike_defence: fighter.significant_strike_defence,
          takedown_accuracy: fighter.takedown_accuracy,
          takedown_defense: fighter.takedown_defense,
        },
      }));
  
      // Set up the dimensions of the chart
      const width = 800; // Increased width for two charts
      const height = 400;
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const radius = Math.min(width / 2, height) / 2 - margin.top; // Adjusted radius
  
      // Create SVG containers for each chart
      const svg1 = d3.select("#chart1")
        .append("svg")
        .attr("width", width / 2)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 4},${height / 2})`);
  
      const svg2 = d3.select("#chart2")
        .append("svg")
        .attr("width", width / 2)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 4},${height / 2})`);
  
      // List of metric names
      const metrics = Object.keys(fightersData[0].metrics);
  
      // Scale for the radius
      const rScale = d3.scaleLinear()
        .domain([0, 100]) // Assuming percentages for the metrics
        .range([0, radius]);
  
      // Create a circular grid for both charts
      const circles1 = svg1.selectAll("circle")
        .data(rScale.ticks(5).slice(1))
        .enter().append("circle")
        .attr("r", d => rScale(d))
        .style("stroke", "#888")
        .style("fill", "none");
  
      const circles2 = svg2.selectAll("circle")
        .data(rScale.ticks(5).slice(1))
        .enter().append("circle")
        .attr("r", d => rScale(d))
        .style("stroke", "#888")
        .style("fill", "none");
  
      // Create lines for each metric for both charts
      const lines1 = metrics.map(metric => {
        return svg1.append("path")
          .datum(fightersData[0])
          .attr("class", "line")
          .attr("d", d3.lineRadial()
            .angle((_, i) => (i * 2 * Math.PI) / metrics.length)
            .radius((d, i) => rScale(d.metrics[metrics[i]]))
          )
          .attr("stroke", "blue")
          .attr("stroke-width", 2)
          .attr("fill", "blue")
          .attr("fill-opacity", 0.1);
      });
  
      const lines2 = metrics.map(metric => {
        return svg2.append("path")
          .datum(fightersData[1])
          .attr("class", "line")
          .attr("d", d3.lineRadial()
            .angle((_, i) => (i * 2 * Math.PI) / metrics.length)
            .radius((d, i) => rScale(d.metrics[i]))
          )
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          .attr("fill", "red")
          .attr("fill-opacity", 0.1);
      });
  
      // Add labels for each metric for both charts
      const labels1 = svg1.selectAll(".label")
        .data(metrics)
        .enter().append("text")
        .attr("x", (d, i) => rScale.range()[1] * Math.cos((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .attr("y", (d, i) => rScale.range()[1] * Math.sin((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .text(d => d)
        .style("text-anchor", "middle")
        .style("font-size", "12px");
  
      const labels2 = svg2.selectAll(".label")
        .data(metrics)
        .enter().append("text")
        .attr("x", (d, i) => rScale.range()[1] * Math.cos((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .attr("y", (d, i) => rScale.range()[1] * Math.sin((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .text(d => d)
        .style("text-anchor", "middle")
        .style("font-size", "12px");
  
      // Dropdown menu for fighter selection
      const dropdown = d3.select("#fighterDropdown");
      dropdown
        .selectAll("option")
        .data(dataset.map(d => d.name))
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);
  
      const dropdown2 = d3.select("#fighterDropdown2");
      dropdown2
        .selectAll("option")
        .data(dataset.map(d => d.name))
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);
  
      // Event listener for dropdown changes
      dropdown.on("change", () => {
        const selectedFighter1 = dropdown.property("value");
        const selectedFighter2 = dropdown2.property("value");
        updateRadarCharts(selectedFighter1, selectedFighter2);
      });
  
      dropdown2.on("change", () => {
        const selectedFighter1 = dropdown.property("value");
        const selectedFighter2 = dropdown2.property("value");
        updateRadarCharts(selectedFighter1, selectedFighter2);
      });
    });
  </script>
  
  <!-- HTML -->
  <h1>Fighter Comparison Radar Charts</h1>
  <div>
    <label for="fighterDropdown">Select Fighter 1:</label>
    <select id="fighterDropdown"></select>
  </div>
  <div id="chart1"></div>
  
  <div>
    <label for="fighterDropdown2">Select Fighter 2:</label>
    <select id="fighterDropdown2"></select>
  </div>
  <div id="chart2"></div>
  
  <!-- CSS -->
  <style>
    /* Add any additional styling here */
  </style>
  