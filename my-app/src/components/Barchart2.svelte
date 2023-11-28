<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/newdata.json";
    
    // Find the first fighter with the name "Conor McGregor" in the dataset
    const fighter1 = dataset.find(fighter => fighter.name === "Khabib Nurmagomedov");
  
    // Find the second fighter with a different name (you can replace this with another fighter's name)
    const fighter2 = dataset.find(fighter => fighter.name === "Conor McGregor");
  
    onMount(() => {
      // Access specific values for both fighters
      const fighter1Wins = fighter1.wins;
      const fighter2Wins = fighter2.wins;
  
      // The rest of your D3 code for visualization goes here...
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  
      const svg = d3.select("section")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // Example: Creating bars for wins of both fighters
      svg.append("rect")
        .attr("x", 10)
        .attr("y", height - fighter1Wins * 10)
        .attr("width", 40)
        .attr("height", fighter1Wins * 10)
        .attr("fill", "steelblue")
        .on("mouseover", () => tooltip.text(`Wins: ${fighter1Wins}`).style("visibility", "visible"))
        .on("mouseout", () => tooltip.style("visibility", "hidden"));
  
      svg.append("rect")
        .attr("x", 60) // Assuming a gap of 10 for better separation
        .attr("y", height - fighter2Wins * 10)
        .attr("width", 40)
        .attr("height", fighter2Wins * 10)
        .attr("fill", "orange")
        .on("mouseover", () => tooltip.text(`Wins: ${fighter2Wins}`).style("visibility", "visible"))
        .on("mouseout", () => tooltip.style("visibility", "hidden"));
  
      // Labels inside the bars, rotated vertically
      svg.append("text")
        .attr("transform", `translate(${10 + 20}, ${height - fighter1Wins * 10 / 2}) rotate(-90)`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .text(fighter1.name);
  
      svg.append("text")
        .attr("transform", `translate(${60 + 20}, ${height - fighter2Wins * 10 / 2}) rotate(-90)`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .text(fighter2.name);
  
      // X and Y axes
      const xScale = d3.scaleBand()
        .domain([fighter1.name, fighter2.name])
        .range([0, width])
        .padding(0.1);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max([fighter1Wins, fighter2Wins])])
        .range([height, 0]);
  
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
  
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
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
    });
</script>

<!-- HTML -->
<h1>Fighter</h1>

<!-- CSS -->
<style>
</style>
  