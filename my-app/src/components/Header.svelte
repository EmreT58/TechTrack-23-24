<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    
    onMount(async () => { //Javascript komt hier in
        console.log('dit is de header test');

        // .on('mouseover touchstart', (e,d) => { == eventlister

    });
</script>
<!-- HTML komt hier -->
<!-- deze component gebruiken om een header te maken-->
<section id="header">
    <h1>header</h1>
</section>

<!-- CSS komt hiern -->
<style> 
    section {
        height: 95vh;
        background-color: lightblue;
    }
</style>