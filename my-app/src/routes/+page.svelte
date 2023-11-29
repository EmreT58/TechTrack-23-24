<script>
    import '../styles/global.css';
    import Radarchart from '../components/Radarchart.svelte';
    import Scatterplot from '../components/Scatterplot.svelte';
    import Header from '../components/Header.svelte'
</script>
<!-- Data visualisation components go in the main -->
<main>
    <Header/>
    <Radarchart/>
    <Scatterplot/>
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
        border-style: ridge;
        margin: 1em auto 1em auto;
    }
    @media only screen and (max-width: 1200px) {
        main {
        width: 90vw;
        font-size: small;
    }
}
</style>