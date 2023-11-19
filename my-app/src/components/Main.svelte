<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    
            // Data
let myData = [40, 10, 20, 60, 30];
    onMount(async () => { //Javascript komt hier in
        console.log('Dit is de main test');



// Chart dimensions
const width = 400;
const height = 80;

// Create an SVG element
const svg = d3.select('#chart')
  .attr('width', width)
  .attr('height', height);

// Create bars
svg.selectAll('rect')
  .data(myData)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 30)
  .attr('y', (d) => height - d) // Invert the bars to have the taller bars at the bottom
  .attr('width', 20)
  .attr('height', (d) => d);

// Optional: Add labels to the bars
svg.selectAll('text')
  .data(myData)
  .enter()
  .append('text')
  .attr('x', (d, i) => i * 30 + 10)
  .attr('y', (d) => height - d - 5) // Adjust text position for readability
  .attr('text-anchor', 'middle') // Center the text
  .text((d) => d);


    });
</script>
<!-- HTML komt hier -->
<!-- deze component gebruiken om een header te maken-->
<section id="main">
    <h1>Main</h1>
    <article>
        <h2>Artikel</h2>
    </article>
    <article>
        <h2>Artikel</h2>
    </article>
    <article>
        <h2>Artikel</h2>
        <p>je bent niet hard</p>    
    </article>
</section>

<!-- CSS komt hiern -->
<style> 
    section {
        height: 95vh;
        background-color: beige;
    }
    article {
        border: 5px solid black;
        margin: 1em;
        border-radius: 15px;
        padding: 1rem;
    }
</style>