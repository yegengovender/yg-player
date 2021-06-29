<script lang="ts">
  import { Track } from "./models/Track";
  import Deezer from "./Deezer.svelte";
  import Player from "./player.svelte";
  import BackgroundImages from "./backgroundImages.svelte";

  var proto, trackPlaying;

  export let track: Track = new Track();
  async function trackLoaded(e) {
    console.log("EVENT", e.detail);
    track = e.detail;
  }

  function playPause() {
    proto.playPause();
  }

  function prevTrack() {
    proto.prevTrack();
  }

  function nextTrack() {
    proto.nextTrack();
  }
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/939bd7d03e.js"
    crossorigin="anonymous">
  </script>
  <title>YG Player</title>
</svelte:head>

<Deezer bind:proto bind:track bind:trackPlaying on:track_loaded={trackLoaded} />
<Player
  bind:track
  bind:trackPlaying
  on:playpause_click={playPause}
  on:back_click={prevTrack}
  on:forward_click={nextTrack}
/>
<BackgroundImages bind:artist={track.artist} />
