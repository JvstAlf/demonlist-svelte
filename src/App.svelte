<script>
  import { routerState } from './lib/router.svelte.js';
  import List from './List.svelte';
  import LevelDetails from './LevelDetails.svelte';
  import { onMount } from 'svelte';

  let demons = $state([]);

  onMount(async () => {
    const res = await fetch('https://pointercrate.com/api/v2/demons/listed/?limit=75');
    demons = await res.json();
  });
</script>

{#if routerState.currentRoute === '/'}
  <List {demons} />
{:else if routerState.position !== null}
  <LevelDetails />
{:else}
  <p>Page not found</p>
{/if}
