<script>
    import '../styles/global.css';
    import Barchart1 from "../components/Barchart1.svelte"
    import Barchart2 from '../components/Barchart2.svelte'
    import Stackedbars from '../components/Stackedbars.svelte';
    import Radarchart from '../components/Radarchart.svelte';
    import Scatterplot from '../components/Scatterplot.svelte';
    import Divergingbarchart from '../components/Divergingbarchart.svelte';
    import Header from '../components/Header.svelte'
</script>
<!-- Data visualisation components go in the main -->
<main>
    <Header/>
    <Radarchart/>
    <Scatterplot/>


    <!-- <Stackedbars/> -->
    <!-- <Barchart1/> -->
    <!-- <Barchart2/> -->
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        width: 60vw;
        background-color: aliceblue;
        padding: 1.5em;
        border-radius: 50px;
        margin: 1em auto 1em auto;
    }
</style>