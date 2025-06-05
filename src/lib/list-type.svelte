<script>
    import MainList from '../assets/main-list.png'
    import ExtendedList from '../assets/extended-list.png'
    import LegacyList from '../assets/legacy-list.png'
    import { api } from './apiStore.js';

  function setMain() {
    api.set('https://pointercrate.com/api/v2/demons/listed/?limit=75');
  }

  function setExtended() {
    api.set('https://pointercrate.com/api/v2/demons/listed/?limit=75&after=75');
  }

  function setLegacy() {
    api.set('combined-last-link');
  }
</script>

<div>
    <img src={MainList} alt="Main List" onclick={setMain}>
    <img src={ExtendedList} alt="Extended List" onclick={setExtended}>
    <img src={LegacyList} alt="Legacy List" onclick={setLegacy}>
</div>

<style>
    div {
        width: 90%;
        padding: 0.25rem;
        height: 6rem;
        background-color: rgb(153, 85, 51);
        border: 1rem solid;
        border-image: url('../assets/brownbox.png') 10% round;
        display: flex;
        justify-content: space-evenly;
        background-clip: padding-box;
        margin-bottom: 2rem;
    }

    div img {
        height: 100%;
        cursor: pointer;
        transition: 0.1s;
    }

    div img:hover {
        scale: 1.05;
    }
</style>