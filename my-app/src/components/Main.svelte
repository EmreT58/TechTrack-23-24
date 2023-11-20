<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/newdata.json";
    
  // Sample data for Conor McGregor
  const fighterData = {
    "name": "Conor McGregor",
    "significant_strikes_landed_per_minute": 5.32,
    "significant_strikes_absorbed_per_minute": 4.66,
    "average_takedowns_landed_per_15_minutes": 0.67,
    "average_submissions_attempted_per_15_minutes": 5.32
  };
  
    onMount(() => {

    const width = 500;
    const height = 500;

    const svg = d3.select("section")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const keys = Object.keys(fighterData).slice(1); // Exclude "name" and "wins" from key
    const values = keys.map(key => fighterData[key]);

    const maxRadius = Math.min(width, height) / 2 - 50;

    const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(values)])
      .range([0, maxRadius]);

    const angleScale = d3.scaleBand()
      .domain(keys)
      .range([0, 2 * Math.PI]);

    const line = d3.lineRadial()
      .angle(d => angleScale(d))
      .radius(d => radiusScale(fighterData[d]));

    svg.append("path")
      .datum(keys)
      .attr("d", line)
      .attr("fill", "steelblue")
      .attr("opacity", 0.7)
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // Adding labels
    svg.selectAll("text")
      .data(keys)
      .enter().append("text")
      .attr("x", (d, i) => radiusScale(fighterData[d]) * Math.cos(angleScale(d) - Math.PI / 2))
      .attr("y", (d, i) => radiusScale(fighterData[d]) * Math.sin(angleScale(d) - Math.PI / 2))
      .attr("dy", "0.35em")
      .text(d => d)
      .attr("text-anchor", "middle");


    });
</script>

<!-- HTML -->

<section>
  <h1>Radial Chart</h1>
</section>

<!-- CSS -->
<style>

</style>
  