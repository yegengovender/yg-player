<style>
    .controls > button {
    border-radius: 50%;
    text-align: center;
    background-color: #c2c1ff;
    color: #636363;
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
  .controls > button.play-pause > i.play-icon {
    display: none;
  }
  .controls > button.play-pause > i.pause-icon {
    display: block;
  }
  .controls > button.play-pause.player-paused > i.play-icon {
    display: block;
  }
  .controls > button.play-pause.player-paused > i.pause-icon {
    display: none;
  }
</style>

<div class="controls">
  <button class="prev"> <i class="fas fa-backward" /> </button>
  <button class="play-pause player-paused">
    <i class="fas fa-play play-icon" />
    <i class="fas fa-pause pause-icon" />
  </button>
  <button class="next"> <i class="fas fa-forward" /> </button>
</div>
