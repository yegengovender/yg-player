<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let trackPlaying: boolean;

  function playPauseClicked() {
    console.log("playpause clicked");
    dispatch("playpause_click");
  }

  function backClicked() {
    console.log("back clicked");
    dispatch("back_click");
  }

  function forwardClicked() {
    console.log("forward clicked");
    dispatch("forward_click");
  }
</script>

<div class="controls">
  <button class="prev" on:click={backClicked}>
    <i class="fas fa-backward" />
  </button>
  <button class="play-pause player-paused" on:click={playPauseClicked}>
    {#if trackPlaying}
      <i class="fas fa-pause pause-icon" />
    {:else}
      <i class="fas fa-play play-icon" />
    {/if}
  </button>
  <button class="next" on:click={forwardClicked}>
    <i class="fas fa-forward" />
  </button>
</div>

<style>
  .controls > button {
    border-radius: 50%;
    text-align: center;
    background-color: #474747;
    color: #c7c7c7;
    border-width: 0;
    margin: 6px;
    box-shadow: black 0 0 25px -5px;
  }
  .controls > button.prev,
  .controls > button.next {
    height: 50px;
    width: 50px;
    font-size: 1em;
  }
  .controls > button.play-pause {
    height: 60px;
    width: 60px;
    font-size: 1.4em;
  }
  .controls > button.play-pause > i.play-icon,
  .controls > button.play-pause > i.pause-icon {
    display: block;
  }
  .controls > button.play-pause.player-paused > i.play-icon {
    display: block;
  }
  .controls > button.play-pause.player-paused > i.pause-icon {
    display: block;
  }
</style>
