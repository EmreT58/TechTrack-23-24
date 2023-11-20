<!-- FighterPerformanceAnalysis.svelte -->
<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/newdata.json";
  
    onMount(() => {
      // Create the SVG container
      const svgHeight = 400;
      const svgWidth = 800;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  
      const svg = d3.select("section")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // Create scales for the axes
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.height_cm)])
        .range([0, svgWidth - margin.left - margin.right]);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.wins)])
        .range([svgHeight - margin.top - margin.bottom, 0]);
  
      // Create circles for each fighter
      svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.height_cm))
        .attr("cy", d => yScale(d.wins))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("opacity", 0.7)
        .on("mouseover", (event, d) => showTooltip(event, d.name, d.height_cm, d.wins))
        .on("mouseout", hideTooltip);
  
      // Axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
  
      svg.append("g")
        .attr("transform", `translate(0, ${svgHeight - margin.top - margin.bottom})`)
        .call(xAxis);
  
      svg.append("g")
        .call(yAxis);
  
      // Tooltip
      const tooltip = d3.select("section")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "rgba(255, 255, 255, 0.8)")
        .style("border", "1px solid #000")
        .style("padding", "5px")
        .style("visibility", "hidden");
  
      function showTooltip(event, name, height, wins) {
        const [x, y] = d3.pointer(event);
        tooltip.style("top", `${y}px`).style("left", `${x}px`).html(`<strong>${name}</strong><br>Height: ${height} cm<br>Wins: ${wins}`).style("visibility", "visible");
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
  