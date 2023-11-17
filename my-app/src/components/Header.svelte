<script>
  import { onMount } from "svelte";
  import * as d3 from 'd3';
  import dataset from "../lib/data.json";

  // Fake data for demonstration
  // const dataset = [
  //   { label: "Category A", value: 30 },
  //   { label: "Category B", value: 45 },
  //   { label: "Category C", value: 20 },
  //   { label: "Category D", value: 60 },
  //   { label: "Category E", value: 10 }
  // ];

  onMount(() => {
    // Select the chart container
    const chartContainer = d3.select("#chart-container");

    // Set the width and height of the chart
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create an SVG element
    const svg = chartContainer.append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g') // Append a group element to hold the chart
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales for x and y axes
    const xScale = d3.scaleBand()
      .domain(dataset.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d.value)])
      .range([height, 0]);

    // Create bars
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "steelblue");

    // Create x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));
  });
</script>


  
  <!-- HTML -->
  <section>
    <div id="chart-container"></div>
  </section>
  
  <!-- CSS -->
  <style>
    section {
      height: 95vh;
      background-color: lightblue;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  