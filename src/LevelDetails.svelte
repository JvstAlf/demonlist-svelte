<script>
  import Navbar from './lib/navbar.svelte';
  import like from './assets/like.png'; import download from './assets/download.png'; import song from './assets/song.png'; import time from './assets/time.png';

  let position = $state()
  let demon = $state(null);
  let levelData = $state(null);
  let fullLevelData = $state(null)
  let lastPos = $state(null);
  let loading = $state(false);
  let creators = $state()
  let video = $state()
  let thumbnailUrl = 'https://levelthumbs.prevter.me/thumbnail/'

  // Optionally derive `position` manually if needed
    const match = location.pathname.match(/\/level\/(\d+)/);
    if (match) {
      position = Number(match[1]);
    }
  async function loadDemon() {
    try {
      const offset = position - 1;
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


<Navbar />

{#if loading}
  <main><p>Loading demon...</p></main>
{:else if demon}
  <main>
    
    <div class="title">
    {#if position != 1}

    <a href="../level/{position - 1}">&#11164;</a>
    <h1>{demon.name}</h1>
    <a href="../level/{position + 1}">&#11166;</a>

    {:else}

    <a style="opacity: 0; pointer-events: none;">&#11164;</a>
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
    }

    h2 {
        font-size: 2.5rem;
        font-weight: normal;
        -webkit-text-stroke: 1px black;
        -webkit-filter: drop-shadow(3px 3px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(4px 4px rgba(0, 0, 0, 0.3));
    cursor: pointer;
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
</style>