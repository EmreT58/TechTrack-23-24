<!-- HTML -->
<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/p4pfighters.json";
    import { storeFighter1, storeFighter2 } from '../lib/selectedFighters.js';

    var d3Active = false;

    // Function in order to highlight the 2 selected fighters
    storeFighter1.subscribe((fighterId) => {
      console.log("storeupdate", fighterId);
      fighterId = +fighterId;
      if (d3Active == true) {
        d3.selectAll('circle.fighterBubble').style("fill", (data) => data.id === fighterId ? "blue" : " ");
      } 
    })

    // Function in order to highlight the 2 selected fighters
    storeFighter2.subscribe((fighterId) => {
      console.log("storeupdate", fighterId);
      fighterId = +fighterId;
      if (d3Active == true) {
        d3.selectAll('circle.fighterBubble').style("fill", (data) => data.id === fighterId ? "red" : " ");
      } 
    })

    onMount(() => {
      d3Active = true;
      
      // Extract data for the scatterplot
      const scatterData = dataset.map(fighter => ({
        id: fighter.id,
        name: fighter.name,
        height: fighter.height_cm,
        reach: fighter.reach_in_cm,
        weight: fighter.weight_in_kg,
      }));
  
      // Set the dimensions of the chart
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
      // Create an SVG container
      const svg = d3.select("section")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([160, d3.max(scatterData, d => d.reach)]) // Modified to start at 160
        .range([0, width - margin.left - margin.right]);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.height)])
        .range([height - margin.top - margin.bottom, 0]);
  
      const sizeScale = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.weight)])
        .range([5, 20]);
  
      // Add a tooltip
      const tooltip = d3.select("section")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px");
  
      // Create circles for each fighter
      svg.selectAll("circle")
        .data(scatterData)
        .enter().append("circle")
        .attr("cx", d => xScale(d.reach))
        .attr("cy", d => yScale(d.height))
        .attr("r", d => sizeScale(d.weight))
        .classed('fighterBubble', true)
        .style("opacity", 0.7)
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
            .html(`
              <strong>Name:</strong> ${d.name}<br>
              <strong>Height:</strong> ${d.height} cm<br>
              <strong>Reach:</strong> ${d.reach} cm<br>
              <strong>Weight:</strong> ${d.weight} kg
            `)
            .style("top", event.pageY + "px")
            .style("left", event.pageX + "px");
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
  
      // Add x-axis
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("x", width - margin.left - margin.right)
        .attr("y", -10)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("Reach (cm)");
  
      // Add y-axis
      svg.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("Height (cm)");
  
      // Add CSS styles
      svg.style("background-color", "#f9f9f9");
  
      svg.selectAll("circle")
        .style("stroke", "#fff")
        .style("stroke-width", 2);
    });
</script>

<!-- HTML -->
<h1>Scatterplot: Height vs. Reach</h1>
<section></section>

<style>

</style>
