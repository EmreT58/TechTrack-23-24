<script>
    import '../styles/global.css';
    import Header from "../components/Header.svelte"
    import Main from '../components/Main.svelte';
    import Footer from '../components/Footer.svelte';
    import Test from '../components/Test.svelte'
    import Bubbleplot from '../components/Bubbleplot.svelte'
    import Scatterplot from '../components/Scatterplot.svelte'
    import P4p from '../components/P4p.svelte';
    import Radarchart from '../components/Radarchart.svelte';
    import Fighter1 from '../components/Fighter1.svelte';
    import Divergingbarchart from '../components/Divergingbarchart.svelte';
    import Fighterselections from '../components/Fighterselections.svelte';
</script>
<!-- Data visualisation components go in the main -->
<main>
<Fighter1/>
<Divergingbarchart/>
<Radarchart/>

</main>

<style>
    /* .row {
        display: flex;
        flex-direction: row;
        border: 3px solid red;
        height: 95vh;
        width: 100%;
        justify-content: space-around;
    }
    .column {
        border: 1px solid green;
        width: 50%;
        height: auto;
        margin: 10px;
    } */
</style>