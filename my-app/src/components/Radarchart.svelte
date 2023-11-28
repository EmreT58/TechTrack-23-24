<!-- Radarchart.svelte -->
<script>
  import { onMount } from "svelte";
  import * as d3 from 'd3';
  import dataset from "../lib/p4pfighters.json";
  import { storeFighter1, storeFighter2 } from '../lib/selectedFighters.js';

  onMount(() => {
    // Function to update the radar radarchart based on selected fighters
    function updateRadarChart(fighter1, fighter2) {
      // Convert selected fighter IDs to numbers
      const selectedFighter1 = +fighter1;
      const selectedFighter2 = +fighter2;
      
      console.log("blauw fighter1:", selectedFighter1);
      console.log("rood fighter2:", selectedFighter2);
      
      // Extracting data for the selected fighters
      const fightersData = dataset
        .filter(fighter => fighter.id === selectedFighter1 || fighter.id === selectedFighter2)
        .map((fighter, index) => ({
          name: fighter.name,
          metrics: {
            significant_striking_accuracy: fighter.significant_striking_accuracy,
            significant_strike_defence: fighter.significant_strike_defence,
            takedown_accuracy: fighter.takedown_accuracy,
            takedown_defense: fighter.takedown_defense,
          },
          color: fighter.id === selectedFighter1 ? "blue" : "red", // Assign colors dynamically based on order
        }));

        console.log(fightersData);
      // Update the radarchart based on the selected fighters
      updateChart(svg, fightersData);
    }

    // Function to update the radar radarchart
    function updateChart(svg, fighters) {
      // Create line function
      const line = d3.lineRadial()
        .angle((_, i) => (i * 2 * Math.PI) / metrics.length)
        .radius(d => rScale(d))
        .curve(d3.curveLinearClosed); // Close the path

      // Add a tooltip
      const tooltip = d3.select("#radarchart")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px");

      // Update lines
      svg.selectAll(".line")
        .data(fighters)
        .join("path")
        .attr("class", "line")
        .attr("d", fighter => line(metrics.map(metric => fighter.metrics[metric])))
        .attr("stroke", fighter => fighter.color)
        .attr("fill", fighter => fighter.color) // Set fill color
        .attr("fill-opacity", 0.1) // Set fill opacity
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
            .html(`
              <strong>Name:</strong> ${d.name}<br>
              <strong>striking accuracy:</strong> ${d.metrics.significant_striking_accuracy}%<br>
              <strong>striking defence:</strong> ${d.metrics.significant_strike_defence}%<br>
              <strong>takedown accuracy:</strong> ${d.metrics.takedown_accuracy}%<br>
              <strong>takedown defense:</strong> ${d.metrics.takedown_defense}%
            `)
            .style("color", fighter => fighter.color)
            .style("top", event.pageY + "px")
            .style("left", event.pageX + "px");
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
        
      // Update data points
      svg.selectAll(".dot")
        .data(fighters.flatMap(d => metrics.map(metric => ({ fighter: d, metric: metric }))))
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => rScale(d.fighter.metrics[d.metric]) * Math.cos((metrics.indexOf(d.metric) * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .attr("cy", d => rScale(d.fighter.metrics[d.metric]) * Math.sin((metrics.indexOf(d.metric) * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .attr("r", 5)
        .style("fill", d => d.fighter.color)
        .style("opacity", 0.8);


      // Add labels for each metric
      const labels = svg.selectAll(".label")
        .data(metrics)
        .enter().append("text")
        .attr("x", (d, i) => rScale.range()[1] * Math.cos((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .attr("y", (d, i) => rScale.range()[1] * Math.sin((i * 2 * Math.PI) / metrics.length - Math.PI / 2))
        .text(d => d)
        .style("text-anchor", "middle")
        .style("font-size", "12px");
    }

    // Extracting data from the dataset
    const fightersData = dataset.map(fighter => ({
      id: fighter.id,
      name: fighter.name,
      metrics: {
        significant_striking_accuracy: fighter.significant_striking_accuracy,
        significant_strike_defence: fighter.significant_strike_defence,
        takedown_accuracy: fighter.takedown_accuracy,
        takedown_defense: fighter.takedown_defense,
      },
    }));

    // Set up the dimensions of the radarchart
    const width = 400;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const radius = Math.min(width / 2, height) / 1 - margin.top; // Adjusted radius

    // Create SVG container for the radarchart
    const svg = d3.select("#radarchart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // List of metric names
    const metrics = Object.keys(fightersData[0].metrics);

    // Scale for the radius
    const rScale = d3.scaleLinear()
      .domain([0, 100]) // Assuming percentages for the metrics
      .range([0, radius]);

    // Create a circular grid
    const circles = svg.selectAll("circle")
      .data(rScale.ticks(5).slice(1))
      .enter().append("circle")
      .attr("r", d => rScale(d))
      .style("stroke", "#888")
      .style("fill", "none");

    // Dropdown menu for fighter selection
    const dropdown = d3.select("#fighterDropdown");
    dropdown
      .append("option")
      .text("Select a fighter")
      .attr("value", "");

    dropdown
      .selectAll("option:not(:first-child)")
      .data(dataset.map(d => ({ id: d.id, name: d.name })))
      .enter()
      .append("option")
      .text(d => d.name)
      .attr("value", d => d.id);

    const dropdown2 = d3.select("#fighterDropdown2");
    dropdown2
      .append("option")
      .text("Select a fighter")
      .attr("value", "");

    dropdown2
      .selectAll("option:not(:first-child)")
      .data(dataset.map(d => ({ id: d.id, name: d.name })))
      .enter()
      .append("option")
      .text(d => d.name)
      .attr("value", d => d.id);

    // Event listener for dropdown changes
    dropdown.on("change", () => {
      const selectedFighter1 = dropdown.property("value");
      const selectedFighter2 = dropdown2.property("value");
      updateRadarChart(selectedFighter1, selectedFighter2);
      storeFighter1.set(selectedFighter1);
    });

    dropdown2.on("change", () => {
      const selectedFighter1 = dropdown.property("value");
      const selectedFighter2 = dropdown2.property("value");
      updateRadarChart(selectedFighter1, selectedFighter2);
      storeFighter2.set(selectedFighter2);
    });
  });
</script>

<!-- HTML -->
<h2>Fighter Comparison Radar Chart</h2>
<section>
  <div id="fighter-selector">
    <div>
      <label for="fighterDropdown">Fighter 1:</label>
      <select id="fighterDropdown"></select>
    </div>
    <div>
      <label for="fighterDropdown2">Fighter 2:</label>
      <select id="fighterDropdown2"></select>
    </div>
  </div>
  <div id="radarchart"></div>
</section>

<!-- CSS -->
<style>
  section {
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: column;
  }
  #fighter-selector {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #radarchart {
    display: flex;
    justify-content: center;
  }
  #fighter-selector > div:first-of-type {
    color: blue;
  }
  #fighter-selector > div:last-of-type {
    color: red;
  }
</style>
