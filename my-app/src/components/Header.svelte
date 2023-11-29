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
<header>
  <img src="/images/ufc-logo.png" alt="UFC logo">
  <h1>- Top 10 Pound For Pound Fighters</h1>
</header>
<section>
  <article>
    <h3>Fighter1</h3>
    <img src="/images/" alt="Mugshot fighter 1">
  </article>
  <article>
    <h3>Fighter2</h3>
    <img src="" alt="Mugshot fighter 2">
  </article>
</section>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
    height: 10vh;
    border: 5px solid red;
    margin: 1em;
    text-align: center;
    align-items: center;
  }
  header img {
    width: 10em;
    height: auto; 
  }
  /* additional CSS */
  section {
    border: 1px solid red;
    display: flex;
    width: 100%;
    height: 50vh;
    flex-direction: row;
    justify-content: space-around;
  }
  article {
    display: flex;
    width: 40%;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  section> article:first-of-type {
    background-color: paleturquoise;
  }
  section> article:last-of-type {
    background-color: salmon;
  }
  article > img {
    border: 1px solid blue;
    height: 100%;

  }
</style>
