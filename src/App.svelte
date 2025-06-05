<script>
  import { routerState } from './lib/router.svelte.js';
  import List from './List.svelte';
  import LevelDetails from './LevelDetails.svelte';
  import { api } from './lib/apiStore.js';

  let demons = $state([]);
  let url = $state('');
  const cache = new Map();

  // The 3 simple URLs
  const urls = [
    'https://pointercrate.com/api/v2/demons/listed/?limit=75',
    'https://pointercrate.com/api/v2/demons/listed/?limit=75&after=75',
  ];

  // The "combined" last link URL key (your "last link" identifier)
  const combinedKey = 'combined-last-link';

  // The multiple URLs whose results you want to combine for the last link
  const combinedUrls = [
    'https://pointercrate.com/api/v2/demons/listed/?limit=100&after=150',
    'https://pointercrate.com/api/v2/demons/listed/?limit=100&after=250',
    'https://pointercrate.com/api/v2/demons/listed/?limit=100&after=350',
    'https://pointercrate.com/api/v2/demons/listed/?limit=100&after=450',
    'https://pointercrate.com/api/v2/demons/listed/?limit=100&after=550',
  ];

  // Preload first two normal URLs
  for (const u of urls) {
    fetch(u).then(r => r.json()).then(data => {
      cache.set(u, data);
      // preload first view
      if (u === urls[0]) demons = data;
    });
  }

  // Preload combined last link by fetching all combinedUrls and concatenating results
  Promise.all(combinedUrls.map(url => fetch(url).then(r => r.json())))
    .then(results => {
      // results is an array of JSON arrays, flatten them:
      const combined = results.flat();
      cache.set(combinedKey, combined);
    });

  // Subscribe to api store, note: we will use combinedKey string to switch to combined data
  api.subscribe(value => {
    url = value;
  });

  $effect(() => {
    if (url === combinedKey && cache.has(combinedKey)) {
      demons = cache.get(combinedKey);
    } else if (cache.has(url)) {
      demons = cache.get(url);
    } else if (url) {
      // fallback if url wasn't preloaded
      fetch(url).then(r => r.json()).then(data => {
        demons = data;
        cache.set(url, data);
      });
    }
  });
</script>

{#if routerState.currentRoute === '/'}
  <List {demons} />
{:else if routerState.position !== null}
  <LevelDetails />
{:else}
  <p>Page not found</p>
{/if}
