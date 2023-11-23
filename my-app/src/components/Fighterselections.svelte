<!-- Fighterselections.svelte -->
<script>
    import { onMount, setContext } from "svelte";
    import * as d3 from 'd3';
    import dataset from "../lib/p4pfighters.json";

    // Track selected fighters
    let selectedFighter1;
    let selectedFighter2;

    // Initialize the context for communication with other components
    setContext('selectedFighters', { selectedFighter1, selectedFighter2 });

    onMount(() => {
        // Additional setup code if needed
    });

    function handleSelection1(event) {
        selectedFighter1 = event.target.value;
        console.log("Selected Fighter 1:", selectedFighter1);
    }

    function handleSelection2(event) {
        selectedFighter2 = event.target.value;
        console.log("Selected Fighter 2:", selectedFighter2);
    }
</script>

<!-- HTML -->
<section>
    <label for="fighterSelection1">Select Fighter 1:</label>
    <select id="fighterSelection1" on:change={handleSelection1}>
        {#each dataset as fighter (fighter.id)}
            <option value={fighter.name}>{fighter.name}</option>
        {/each}
    </select>

    <label for="fighterSelection2">Select Fighter 2:</label>
    <select id="fighterSelection2" on:change={handleSelection2}>
        {#each dataset as fighter (fighter.id)}
            <option value={fighter.name}>{fighter.name}</option>
        {/each}
    </select>
</section>

<style>
    /* additional css */
</style>
