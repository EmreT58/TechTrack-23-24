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
    import Fighterselector from '../components/Fighterselector.svelte';
</script>
<!-- Data visualisation components go in the main -->
<main>
    <Radarchart/>
    <Fighter1/>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin: auto;
        width: 50%;
        background-color: aliceblue;
        padding: 1.5em;
        border-radius: 50px;
        margin: 1em auto 1em auto;
    }
</style>