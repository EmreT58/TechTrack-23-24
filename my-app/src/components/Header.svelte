<!-- Scatterplot.svelte -->
<script>
    import { storeFighter1, storeFighter2 } from '../lib/selectedFighters.js';
    import dataset from "../lib/p4pfighters.json";

    let fighter1Img = 0;
    let fighter2Img = 0;
    // Function in order to highlight the 2 selected fighters
    storeFighter1.subscribe((fighterId) => {
      fighter1Img = fighterId;
    })

    // Function in order to highlight the 2 selected fighters
    storeFighter2.subscribe((fighterId) => {
      fighter2Img = fighterId;

    })

    // Extracting data for the selected fighters
    const fightersData = dataset
  .filter(fighter => fighter.id === fighter1Img || fighter.id === fighter2Img)
  .map((fighter, index) => ({
    name: fighter.name,
    metrics: {
      name: fighter.name,
      nickname: fighter.nickname,
      p4p_ranking: fighter.p4p_ranking,
      stance: fighter.stance,
    }
  }));

</script>

<!-- HTML -->
<header>
  <img src="/images/ufc-logo.png" alt="UFC logo">
  <h1>- Top 10 Pound For Pound Fighters</h1>
</header>
<section>
  <article>
    <h3>Blue corner</h3>
    <h4>Fighter1</h4>
    <img src="/images/mugshots/{fighter1Img}.png" alt="Mugshot fighter 1">
  </article>
  <article>
    <h2>Red corner</h2>
    <h4>Fighter2</h4>
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
  /* additional CSS */
  section {
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
    border-radius: 1em;
  }
  section article {
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
  section> article:first-of-type {
    background-color: paleturquoise;
  }
  section> article:last-of-type {
    background-color: salmon;
  }
  section article img {
    width: 100%;
    height: auto;

  }
</style>
