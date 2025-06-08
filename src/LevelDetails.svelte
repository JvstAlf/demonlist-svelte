<script>
  import Navbar from './lib/navbar.svelte';
  import like from './assets/like.png'; import download from './assets/download.png'; import song from './assets/song.png'; import time from './assets/time.png'; import youtube from './assets/youtube.png'
import "/node_modules/flag-icons/css/flag-icons.min.css";

  let position = $state()
  let demon = $state(null);
  let levelData = $state(null);
  let fullLevelData = $state(null)
  let lastPos = $state(null);
  let loading = $state(false);
  let creators = $state()
  let video = $state()
  let offset = $state()
  let thumbnailUrl = 'https://levelthumbs.prevter.me/thumbnail/'
  const points = $state(["350", "331.71", "313.42", "291.70", "271.78", "253.53", "236.80", "221.47", "207.42", "194.54", "182.73", "171.91", "161.99", "152.89", "144.56", "136.92", "129.92", "123.50", "117.62", "112.23", "110.81", "109.39", "107.99", "106.61", "105.24", "103.88", "102.54", "101.21", "99.89", "98.58", "97.29", "96.01", "94.75", "93.49", "92.25", "89.95", "87.73", "85.58", "83.51", "81.51", "79.58", "77.72", "75.92", "74.19", "72.52", "70.90", "69.34", "67.83", "66.38", "64.98", "63.62", "62.31", "61.05", "59.83", "58.66", "57.60", "56.47", "55.37", "54.30", "53.26", "52.25", "51.26", "50.30", "49.37", "48.46", "47.57", "46.71", "45.87", "45.06", "44.26", "43.49", "42.74", "42.01", "41.30", "40.60", "39.93", "39.27", "38.63", "38.01", "37.41", "36.82", "36.24", "35.69", "35.14", "34.61", "34.10", "33.60", "33.11", "32.64", "32.18", "31.73", "31.29", "30.87", "30.45", "30.05", "29.66", "29.28", "28.91", "28.55", "28.19", "27.85", "27.52", "27.19", "26.88", "26.57", "26.27", "25.98", "25.70", "25.42", "25.16", "24.90", "24.64", "24.39", "24.15", "23.92", "23.69", "23.47", "23.26", "23.05", "22.84", "22.64", "22.45", "22.26", "22.08", "21.90", "21.73", "21.56", "21.39", "21.23", "21.08", "20.92", "20.78", "20.63", "20.49", "20.36", "20.23", "20.10", "19.97", "19.85", "19.73", "19.62", "19.50", "19.39", "19.29", "19.18", "19.08", "18.99", "18.89", "18.80", "18.71"]);

  // Optionally derive `position` manually if needed
    const match = location.pathname.match(/\/level\/(\d+)/);
    if (match) {
      position = Number(match[1]);
    }
  async function loadDemon() {
    try {
      offset = position - 1;
      if (isNaN(offset) || offset < 0) {
        demon = null;
        return;
      }

      loading = true;
      const res = await fetch(`https://pointercrate.com/api/v2/demons/listed/?limit=1&after=${offset}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        demon = { ...data[0] };
      } else {
        demon = null;
      }

      const url = demon.video
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
     
      let videoId
      if (match) {
          videoId = match[1];
      }

      video = `https://www.youtube.com/embed/${videoId}`

      // full info from pointercrate - Full creator list and records
      const fullResponse = await fetch(`https://pointercrate.com/api/v2/demons/${demon.id}`)
      const fullLevelInfo = await fullResponse.json()
      fullLevelData = fullLevelInfo.data

      creators = fullLevelData.creators.map(creator => creator.name).join(', ');

      // load level info from gdbrowser.com
      const response = await fetch(`https://gdbrowser.com/api/level/${demon.level_id}`)
      levelData = await response.json()

    } catch {
      demon = null;
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    if (position != null && position !== lastPos) {
      lastPos = position;
      loadDemon();
    }
  });
</script>

<svelte:head>
  {#if demon}
  <title>{demon.position} - {demon.name}</title>
  {:else}
  <title>Loading...</title>
  {/if}
</svelte:head>

<Navbar />

{#if loading}
  <main><p>Loading demon...</p></main>
{:else if demon}
  <main>
    
    <div class="title">
    {#if position != 1}

    <!-- <a href="../level/{position - 1}">&#11164;</a> -->
    <a href="../level/{position - 1}"><</a>
    <h1>{demon.name}</h1>
    <a href="../level/{position + 1}">></a>
    <!-- <a href="../level/{position + 1}">&#11166;</a> -->

    {:else}

    <a style="opacity: 0; pointer-events: none;" href="">&#11164;</a>
    <h1>{demon.name}</h1>
    <a href="../level/{position + 1}">&#11166;</a>

    {/if}
    </div>
    
    {#if fullLevelData.creators.length > 1}
    <h2 class="gold-text">by {demon.publisher.name} <abbr data-creators={creators}>and more</abbr></h2>
    {:else}
    <h2 class="gold-text">by {demon.publisher.name}</h2>
    {/if}

    <section class="description">
        <p>{levelData.description}</p>
    </section>

    <iframe src={video} title="video"></iframe>

    <div class="level-details">
      <div>
        <p>Verifier</p>
        <p>{demon.verifier.name}</p>
      </div>
      <div>
        <p>Points</p>
        {#if points[offset]}
        <p>{points[offset]}</p>
        {:else}
        <p>Legacy</p>
        {/if}
      </div>
      <div>
        <p>Points ({demon.requirement}%)</p>
        {#if points[offset]}
        <p>{(Number(points[offset]) / 10).toFixed(2)}</p>
        {:else}
        <p>Legacy</p>
        {/if}
      </div>
    </div>

    <div class="level-info" style="background-image: url({thumbnailUrl}{demon.level_id});">
        <div>
        <div><img src={time} alt="time"/><p>{levelData.length}</p></div>
        <div><img src={download} alt="downloads"/><p>{levelData.downloads}</p></div>
        <div><img src={like} alt="likes"/><p>{levelData.likes}</p></div>
        <div>
            <a href="https://www.newgrounds.com/audio/listen/{levelData.songID}" target="_blank">
                <img src={song} alt="song"/><p>{levelData.songName}</p>
            </a>
        </div>
        </div>
    </div>

    <div class="records">

{#if fullLevelData.records.length > 0}
<table>
  <thead>
    <tr>
      <th>Player Name</th>
      <th>Progress</th>
      <th>Video</th>
    </tr>
  </thead>

  <tbody>
    {#each fullLevelData.records as record}
      <tr>
        <td><span class="fi fi-{record.nationality?.country_code.toLowerCase() ?? ''}"></span> {record.player?.name ?? 'N/A'}</td>
        <td>{record.progress ?? 'N/A'}%</td>
        <td>
          {#if record.video}
            <a href={record.video} target="_blank" rel="noopener noreferrer"><img src={youtube} style="height: 40px;" alt="yt"></a>
          {:else}
            N/A
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
{:else}
<p>No records yet!</p>
{/if}
    </div>

  </main>
{:else}
  <main><h1>Demon not found</h1></main>
{/if}

<style>
    main {
        padding: 2rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        font-size: 7rem;
        letter-spacing: 4px;
        text-shadow: 5px 5px 2px rgba(0, 0, 0, 0.3);
        font-weight: normal;
        -webkit-text-stroke: 2px black;
        text-align: center;
    }

    h2 {
        font-size: 2.5rem;
        font-weight: normal;
        -webkit-text-stroke: 1px black;
        -webkit-filter: drop-shadow(3px 3px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(4px 4px rgba(0, 0, 0, 0.3));
    cursor: pointer;
    text-align: center;
    }

    .gold-text {
    background: -webkit-linear-gradient(#e28000, #ffee44);
    background-clip: text;
    width: fit-content;
    vertical-align: top;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: black;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
}

abbr {
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-color: rgb(255, 196, 0);
    content: '';
    position: relative;
    background: -webkit-linear-gradient(#e28000, #ffee44);
    background-clip: text;
    width: fit-content;
    vertical-align: top;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: black;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    text-decoration-thickness: 2px;
}

abbr:hover::after {
    content: attr(data-creators);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 50;
    padding: 0;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
    font-size: 2rem;
    color: #ffc229;
    -webkit-text-fill-color: #ffc229;
    text-wrap: stable;
    width: 50vw;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
    background-color: rgba(0, 32, 80, 0.5);
}

.description {
    background-color: #003686;
    border-radius: 1rem;
    padding: 2rem;
    font-size: 1.25rem;
    margin: 2rem 0;
    text-align: center;
    font-family: sans-serif;
    color: white;
    width: 80%;
}

.description p {
    font-family: sans-serif;
    line-height: 25px;
}

iframe {
    width: 70%;
    height: auto;
    aspect-ratio: 16/9 !important;
    border: none;
    outline: none;
    border-radius: 1rem;
}

.level-info {
    width: 80%;
    border-radius: 2rem;
    background-position: center center;
    background-size: cover;
    margin: 2rem 0;
    height: 6rem;
    background-color: #00255c;
    display: flex;
}

.level-info > div > div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    -webkit-text-stroke: 1px black;
    text-shadow: 5px 5px 2px rgba(0, 0, 0, 0.5);
}

.level-info > div {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    backdrop-filter: brightness(0.5);
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    gap: 2rem;
}

.level-info a {
    height: 100%;
    display: flex;
    justify-self: center;
    align-items: center;
    color: inherit;
    text-decoration: none;
}

.level-info img {
    height: 75%;
    object-fit: contain;
    padding: 0.25rem 0.5rem;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title a {
    font-size: 3rem;
    text-decoration: none;
    color: inherit;
    padding: 0 2rem;
    -webkit-text-stroke: 1px black;
}

.level-details {
  width: 70%;
  display: flex;
  padding: 0.75rem;
  margin-top: 2rem;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: #00255c;
  justify-content: space-evenly;
  font-size: 1.25rem;
}

.level-details div {
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
  background-color: #001f4e;
  border-radius: 1rem;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.level-details div p:last-child {
  background: -webkit-linear-gradient(#e28000, #ffee44);
    background-clip: text;
    width: fit-content;
    vertical-align: top;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-size: 120%;
    text-align: center;
}

.records {
  width: 80%;
  padding: 1rem;
  background-color: #001f4e;
  border-radius: 1rem;
}

.records p {
  width: 100%;
  text-align: center;
  font-size: 2rem;
}

table {
  width: 100%;
  font-size: 1.5rem;
  padding: 1rem;
  -webkit-text-stroke: 1px black;
}

table th {
  padding: 0.5rem;
  background-color: #001535;
  border-radius: 0.5rem;
  font-size: 2rem;
}

table td {
  padding: 0.25rem;
  text-align: center;
  background-color: #002f75;
  border-radius: 0.5rem;
}

@media screen and (max-width: 1080px) {
  .title h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 2rem;
  }

  .level-details {
  padding: 0.5em;
  margin-top: 2rem;
  gap: 0.5rem;
  font-size: 1rem;
}

.level-info div div {
  font-size: 1.25rem;
  word-wrap: break-word;
}

table {
  font-size: 1.25rem;
}

table th {
  font-size: 1.5rem;
}

table img {
  height: 32px !important;
}
}

@media screen and (orientation: portrait) {
    .title h1 {
    font-size: 3rem;
    letter-spacing: normal;
  }
  
  .title a {
    font-size: 2rem;
    padding: 0 1rem;
}

  h2 {
    font-size: 1.5rem;
  }

  .level-details {
  padding: 0.5em;
  margin: 2rem 0;
  gap: 0.5rem;
  font-size: 1rem;
  width: 100%;
}

.level-info {
  display: none;
}


table {
  font-size: 0.8rem;
  overflow: scroll;
  table-layout: fixed;
  width: 100%;
  -webkit-text-stroke: 0.25px black;
}

.records {
  width: 100%;
  padding: 0.25rem;
}

.records p {
  font-size: 1.5rem;
}

table th {
  font-size: 1rem;
}

table img {
  height: 24px !important;
}

.description {
    padding: 1rem;
    font-size: 1rem;
    width: 100%;
}

main {
  width: 100%;
  padding: 1rem;
}

iframe {
  width: 100%;
}

.level-details div {
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
}
}
</style>
