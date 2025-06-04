<script>
  import { navigateTo } from './router.svelte.js';

  let { demon, even } = $props();
  let thumbnailUrl = 'https://levelthumbs.prevter.me/thumbnail/'
  function openUrl(link) {
    window.open(link)
  }
  function openLevel(url) {
    navigateTo(url)
  }
</script>

<section class={even} onclick={() => openLevel(`/level/${demon.position}`)}>
  <a href={demon.video} target="_blank"><img src={demon.thumbnail} alt="thumbnail" /></a>
  <div class="info">
    <div id="thumbnail" style="background-image: url({thumbnailUrl + demon.level_id});"></div>
    <p class="name">{demon.position} - {demon.name}</p>
    <p class="author gold-text">by {demon.publisher.name}</p>
    <p class="id gold-text">{demon.level_id}</p>
  </div>
</section>

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
</style>
