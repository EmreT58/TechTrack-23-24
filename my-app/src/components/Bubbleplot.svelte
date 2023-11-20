<!-- BubblePlot.svelte -->
<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/newdata.json";
  
    // Set the weight class range
    const minWeight = 66;
    const maxWeight = 75;
  
    onMount(() => {
      // Filter the dataset based on the weight class criterion
      const filteredDataset = dataset.filter(d => d.weight_in_kg >= minWeight && d.weight_in_kg <= maxWeight);
  
      // Create the SVG container
      const svg = d3.select("section")
        .append("svg")
        .attr("width", 1200)
        .attr("height", 500);
  
      // Scale for the bubble size based on wins
      const winScale = d3.scaleLinear()
        .domain([0, d3.max(filteredDataset, d => d.wins)])
        .range([5, 30]); // Adjust the range for bubble size
  
      // Create bubbles
      svg.selectAll("circle")
        .data(filteredDataset)
        .enter()
        .append("circle")
        .attr("cx", d => Math.random() * 1200) // Random x position for illustration
        .attr("cy", d => Math.random() * 500) // Random y position for illustration
        .attr("r", d => winScale(d.wins))
        .attr("fill", "steelblue")
        .attr("opacity", 0.7)
        .on("mouseover", (event, d) => showTooltip(event, d.name, d.wins))
        .on("mouseout", hideTooltip);
  
      // Tooltip
      const tooltip = d3.select("section")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "rgba(255, 255, 255, 0.8)")
        .style("border", "1px solid #000")
        .style("padding", "5px")
        .style("visibility", "hidden");
  
      function showTooltip(event, name, wins) {
        const [x, y] = d3.pointer(event);
        tooltip.style("top", `${y}px`).style("left", `${x}px`).html(`<strong>${name}</strong><br>Wins: ${wins}`).style("visibility", "visible");
      }
  
      function hideTooltip() {
        tooltip.style("visibility", "hidden");
      }
    });
  </script>
  
  <!-- HTML -->
  <section></section>
  <!-- CSS -->
  <style>

  </style>
  