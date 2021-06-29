<script lang="ts">
  export let cover: String;
</script>

<style>
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

<div class="album-art" style="background-image: url({cover})" />
