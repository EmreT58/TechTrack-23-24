<!-- Scatterplot.svelte -->
<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/p4pfighters.json";
    import { storeFighter1, storeFighter2 } from '../lib/selectedFighters.js';

    var d3Active = false; //svelte check

    // Function to highlight the selected fighters
    function highlightSelectedFighter(fighterId1, fighterId2) {
      console.log("storeupdate", fighterId1, fighterId2);
      fighterId1 = +fighterId1; // Makes sure that the ID's are integers and not strings
      fighterId2 = +fighterId2;
      
      if (d3Active == true) { //sveltecheck causes this to only work after the bubbles are generated
        d3.selectAll('circle.fighterBubble').style("fill", (data) => {
          if (data.id === fighterId1) {
            return "blue";
          } else if (data.id === fighterId2) {
            return "red";
          } else {
            return "gray";
          }
        });
      }
    }

    // Subscribe to both storeFighter1 and storeFighter2
    // This double subscription ensures that there are always only 2 highlighted players
    storeFighter1.subscribe(($fighterId1) => {
      storeFighter2.subscribe(($fighterId2) => {
        highlightSelectedFighter($fighterId1, $fighterId2);
      });
    });

    storeFighter2.subscribe(($fighterId2) => {
      storeFighter1.subscribe(($fighterId1) => {
        highlightSelectedFighter($fighterId1, $fighterId2);
      });
    });

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
      const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([160, d3.max(scatterData, d => d.reach)]) // Modified to start at 160
        .range([0, width - margin.left - margin.right])
        .nice(); // adding valie to last tick
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.height)])
        .range([height - margin.top - margin.bottom, 0])
        .nice();
  
      const sizeScale = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.weight)])
        .range([5, 20]); // Controlls and maintains an appropiate sizing range for the circles
  
      // Add a tooltip
      const tooltip = d3.select("#scatterplot")
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
        .classed('fighterBubble', true) // Add class to enable interaction
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
  
      // Add y-axis
      svg.append("g")
        .call(d3.axisLeft(yScale))

      // Add x-axis label
      svg.append("text")
        .attr("transform", `translate(${width / 2},${height + margin.top - 50})`)
        .style("text-anchor", "middle")
        .text("Reach (cm)");

      // Add y-axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2.5))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Height (cm)");

      svg.selectAll(".fighterBubble")
        .style("stroke", "#fff")
        .style("stroke-width", 2);
    });
</script>

<!-- HTML -->
<hr>
<h3>Scatterplot: Height, Reach and Weight</h3>
<p>Bubble size = Fighter weight (kg)</p>
<section id="scatterplot"></section>

<style>
  hr {
    margin: 0em 1em 1em 1em;
  }
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
    margin-bottom: 1em
  }
  #scatterplot {
    display: flex;
    justify-content: center;
  }
</style>
