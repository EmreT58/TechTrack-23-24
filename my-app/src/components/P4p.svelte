<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/p4pfighters.json";
  
    onMount(() => {
      // Set up the chart dimensions
      const width = 800; // Increased width
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 30, left: 180 }; // Adjusted left margin
  
      // Create an SVG container
      const svg = d3.select('section')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
  
      // Extract wins and losses data
      const data = dataset.map(fighter => ({
        name: fighter.name,
        wins: fighter.wins,
        losses: fighter.losses
      }));
  
      // Create a stacked bar chart
      const stackedBars = svg.selectAll('.stacked-bar')
        .data(data)
        .enter().append('g')
        .attr('class', 'stacked-bar')
        .attr('transform', (d, i) => `translate(0, ${i * 30})`);
  
      stackedBars.selectAll('rect')
        .data(d => [d.wins, d.losses])
        .enter().append('rect')
        .attr('x', (d, i) => i === 0 ? margin.left : margin.left + data[i - 1].wins * 10)
        .attr('y', 0)
        .attr('width', d => d * 10)
        .attr('height', 20)
        .style('fill', (d, i) => i === 0 ? 'green' : 'red');
  
      // Add labels
      stackedBars.append('text')
        .attr('x', margin.left - 5)
        .attr('y', 10)
        .attr('text-anchor', 'end')
        .text(d => d.name)
  
      // Add legend
      const legend = svg.append('g')
        .attr('transform', `translate(${width - margin.right}, ${margin.top})`);
  
      legend.append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', 'green');
  
      legend.append('text')
        .attr('x', 30)
        .attr('y', 10)
        .text('Wins');
  
      legend.append('rect')
        .attr('y', 30)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', 'red');
  
      legend.append('text')
        .attr('x', 30)
        .attr('y', 40)
        .text('Losses');
    });
</script>
<!-- HTML -->

<h1>Stacked barchart P4P Fighters</h1>
<section></section>

<!-- CSS -->
<style>
/* Add any additional styling here */
</style>