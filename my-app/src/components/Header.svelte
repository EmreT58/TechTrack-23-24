<!-- Scatterplot.svelte -->
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
      if (d3Active == true) { //hierin komt code

      } 
    })

    // Function in order to highlight the 2 selected fighters
    storeFighter2.subscribe((fighterId) => {
      console.log("storeupdate", fighterId);
      fighterId = +fighterId;
      if (d3Active == true) { // hierin komt code
        
      } 
    })

    onMount(() => {

    });
</script>

<!-- HTML -->
<img src="/images/ufc-logo.png" alt="ufc logo">
<h1> Top 10 - Pound For Pound fighters Of The World</h1>

<style>
/* additional CSS */
</style>
