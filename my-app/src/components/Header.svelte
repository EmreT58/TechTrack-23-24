<!-- Scatterplot.svelte -->
<script>
    import { storeFighter1, storeFighter2 } from '../lib/selectedFighters.js';

    // fighter mugshot selector | 0 = placeholder image
    let fighter1Img = 0;
    let fighter2Img = 0;

    // Convert selected fighter 1's id to image id
    storeFighter1.subscribe((fighterId) => {
      fighter1Img = fighterId;
    })

    // Convert selected fighter 2's id to image id
    storeFighter2.subscribe((fighterId) => {
      fighter2Img = fighterId;
    })
</script>

<!-- HTML -->
<header>
  <img src="/images/ufc-logo.png" alt="UFC logo">
  <h1>- Top 10 Pound For Pound Fighters</h1>
</header>
<hr>
<h2>Select 2 fighters you want to compare</h2>
<section>
  <article>
    <h3>Blue corner</h3>
    <img src="/images/mugshots/{fighter1Img}.png" alt="Mugshot fighter 1">
  </article>
  <article>
    <h3>Red corner</h3>
    <img src="/images/mugshots/{fighter2Img}.png" alt="Mugshot fighter 1">
  </article>
</section>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
    height: 10vh;
    margin: 1em;
    text-align: center;
    align-items: center;
  }
  header img {
    width: 10em;
    height: auto;
  }
  hr {
    margin: 1em;
  }
  h2 {
    text-align: center;
  }
  section {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
  section article {
    display: flex;
    width: 40%;
    flex-direction: column;
    align-items: center;
    border-radius: 1em;
    justify-content: space-between;
    overflow: hidden;
    height: 275px;
  }
  section> article:first-of-type {
    background-color: cornflowerblue;
  }
  section> article:last-of-type {
    background-color: tomato;
  }
  section article img {
    width: 100%;
    height: auto;
  }
  section article h3 {
    margin-top: 1em;
  }
  @media only screen and (max-width: 1200px) {
    section article {
      height: auto;
    }
  }
</style>
