<script lang="ts">
  import AlbumArt from "./albumArt.svelte";
  import Controls from "./controls.svelte";
  import type { Track } from "./models/Track";

  export let track: Track;
  export let trackPlaying: boolean;
</script>

<div class="player">
{#if track && track.artist && track.album}
  <AlbumArt cover={track?.album.cover} />
  <Controls on:playpause_click on:back_click on:forward_click bind:trackPlaying/>

  <h3 class="track-name">{track?.title}</h3>
  <h4 class="artist">{track?.artist.name}</h4>
{/if}
</div>

<style>
  .player {
    z-index: 10;
    position: absolute;
    padding: 15px;
    opacity: 1;
    transition: opacity 5s;
    background-color: rgba(117, 117, 117, 0.7);
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 450px;
    box-shadow: black 0 0 25px -5px;
    font-family: sans-serif;
    color: antiquewhite;
  }
</style>
