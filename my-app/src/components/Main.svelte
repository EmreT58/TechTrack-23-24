<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    
    onMount(async () => { //Javascript komt hier in
        console.log('Dit is de main test');

        // .on('mouseover touchstart', (e,d) => { == eventlister

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
        background-color: goldenrod;
    }
    article {
        border: 5px solid black;
        margin: 1em;
        border-radius: 15px;
        padding: 1rem;
    }
</style>