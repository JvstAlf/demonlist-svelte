<script>
  import { navigateTo } from './router.svelte.js';
  import Copy from './copy.svelte'

  let { demon, even } = $props();
  let thumbnailUrl = 'https://levelthumbs.prevter.me/thumbnail/'
  let visible = $state(false)

  function openLevel(url) {
    navigateTo(url)
  }
  function copy(id) {
    navigator.clipboard.writeText(id)
    visible = true
    console.log(visible)
    setTimeout(() => {
      visible = false
      console.log(visible)
    }, 2000);
  }
</script>

<section class={even}>
  <a href={demon.video} target="_blank"><img src={demon.thumbnail} alt="thumbnail" /></a>
  <div class="info">
    <div id="thumbnail" style="background-image: url({thumbnailUrl + demon.level_id});"></div>
    <p class="name" onclick={() => openLevel(`/level/${demon.position}`)}>{demon.position} - {demon.name}</p>
    <p class="author gold-text" onclick={() => openLevel(`/level/${demon.position}`)}>by {demon.publisher.name}</p>
    <p class="id gold-text" onclick={() => copy(demon.level_id)}>{demon.level_id}</p>
  </div>
</section>

{#if visible}
<Copy />
{/if}

<style>
  section {
    height: 10rem;
    width: 100%;
    display: flex;
    padding: 1rem;
    border-radius: 1rem;
  }

  section img {
    border-radius: 1rem;
    height: 100%;
    aspect-ratio: 16/9 !important;
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1.5rem;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    align-items: flex-start;
    position: relative;
  }

  #thumbnail {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
    background-size: cover;
    background-position: center center;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  section img:hover {
    opacity: 0.8;
  }

  .name {
    font-size: 4rem;
    height: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-text-stroke: 2px black;
    z-index: 10;
    text-shadow: 4px 6px 2px rgba(0, 0, 0, 0.4);
  }

  .author {
    height: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-text-stroke: 1px black;
    font-size: 2rem;
  }

  .id {
    position: absolute;
    bottom: 1%;
    right: 1%;
    -webkit-text-stroke: 1px black;
    cursor: pointer;
  }

  .name:hover, .author:hover, .id:hover {
    scale: 1.05;
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
    -webkit-filter: drop-shadow(0.2vh 0.2vh rgba(0, 0, 0, 0.25));
    filter: drop-shadow(0.2vh 0.2vh rgba(0, 0, 0, 0.25));
}

.even {
  background-color: rgb(193, 116, 63);
}

@media screen and (max-width: 1440px) {
  .name {
    font-size: 3.5rem;
  }
}

@media screen and (max-width: 1080px) {
  .name {
    font-size: 2.5rem;
  }
  .author {
    font-size: 1.75rem;
  }
}

@media screen and (orientation: portrait) {
  #thumbnail {
    display: none;
  }

  .info {
    padding: 0.5rem;
    width: 100%;
    height: 100%;
    align-items: center !important;
  }

  .name {
    font-size: 2rem;
    text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.4);
    text-align: center;
  }

  .author {
    font-size: 1.5rem;
    text-align: center;
  }

  section img {
    width: 80%;
  }

  section a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  section {
    flex-direction: column;
    display: flex;
    align-items: center;
    height: auto;
    width: 100%;
    padding: 1rem 0;
  }

  .id {
    display: none;
  }
}
</style>
