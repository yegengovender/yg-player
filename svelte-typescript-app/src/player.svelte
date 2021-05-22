<script>
  import Controls from './controls.svelte';
</script>
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
  .album-art {
    height: 190px;
    width: 190px;
    align-self: center;
    box-shadow: black 0px 0px 25px -5px;
    margin: 10px 0 20px;
    background-position: center;
    background-size: cover;
  }
</style>

<div class="player">
  <div class="album-art" />

  <Controls />
  
  <h3 class="track-name" />
  <h4 class="artist" />
</div>
