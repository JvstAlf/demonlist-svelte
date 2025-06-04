<script>
  import Navbar from './lib/navbar.svelte';
  import ListType from './lib/list-type.svelte';
  import Level from './lib/level.svelte';
  import Logo from './assets/logo.png';

  let { demons } = $props();
  let search = $state('')

</script>

<main>
  <Navbar />
  <img src={Logo} alt="Demonlist" class="logo" />
  <ListType />

  <input placeholder="Search for Level or Creator..." bind:value={search}/>

  <div class="list">
    {#each demons.filter(demon => demon.name.toLowerCase().includes(search.toLowerCase()) ||demon.publisher.name.toLowerCase().includes(search.toLowerCase())) as demon, i (demon.id)}
      <Level {demon} even={i % 2 === 1 ? 'even' : ''} />
    {/each}
  </div>
</main>

<style>
  .list {
    width: 90%;
    display: flex;
    flex-direction: column;
    border: 1.5rem solid;
    border-image: url('./assets/brownbox.png') 10% round;
    background-color: #995533;
    background-size: cover;
    background-clip: padding-box;
    background-origin: border-box;
  }

  .logo {
    padding: 2rem;
    width: 90%;
    margin: 2rem 0;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 90%;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    background-color: rgb(0, 43, 107);
    color: white;
    font-size: 1.75rem;
    -webkit-text-stroke: 1px black;
    margin-bottom: 2rem;
  }

  input::placeholder {
    color: #6f98d8;
  }

  input:active {
    border: none;
    outline: none;
  }
</style>
