<!-- HTML -->
<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/p4pfighters.json";
  
    // Function to calculate total fights for a fighter
    function calculateTotalFights(fighter) {
      return fighter.wins + fighter.losses + fighter.draws;
    }
  
    onMount(() => {
      // Choose the fighters for the diverging bar chart
      const fighters = ["Islam Makhachev", "Charles Oliveira"];
  
      // Set the dimensions of the chart
      const chartWidth = 400;
      const chartHeight = 200;
      const margin = { top: 50, right: 50, bottom: 50, left: 100 };
  
      // Create an SVG container
      const svg = d3.select("section")
        .append("svg")
        .attr("width", chartWidth + margin.left + margin.right)
        .attr("height", chartHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([-1, 1])
        .range([0, chartWidth]);
  
      const yScale = d3.scaleBand()
        .domain(fighters)
        .range([0, chartHeight])
        .padding(0.1);
  
      // Create a color scale
      const colorScale = d3.scaleOrdinal()
        .domain(["Wins", "Losses"])
        .range(["green", "red"]);
  
      // Create bars for each fighter
      fighters.forEach((fighterName, index) => {
        const fighterData = dataset.find(fighter => fighter.name === fighterName);
        const totalFights = calculateTotalFights(fighterData);
  
        svg.selectAll(`rect${index}`)
          .data(["Wins", "Losses"])
          .enter()
          .append("rect")
          .attr("x", d => (d === "Wins") ? xScale(0) : xScale(-1 * fighterData.losses / totalFights))
          .attr("y", yScale(fighterName))
          .attr("width", d => Math.abs(xScale(d === "Wins" ? fighterData.wins / totalFights : fighterData.losses / totalFights) - xScale(0)))
          .attr("height", yScale.bandwidth())
          .attr("fill", d => colorScale(d));
      });
  
      // Add x-axis
      svg.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale).ticks(10).tickFormat(d => Math.abs(d)));
  
      // Add y-axis
      svg.append("g")
        .call(d3.axisLeft(yScale));
  
      // Add chart title
      svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Diverging Bar Chart: Wins and Losses");
    });
  </script>
  
  <!-- HTML -->
  <h1>Diverging Bar Chart: Wins and Losses</h1>
  <section></section>
  