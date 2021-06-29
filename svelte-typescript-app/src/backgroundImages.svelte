<script lang="ts">
  import { afterUpdate } from "svelte";

  import type { Artist } from "./models/Artist";

  export let artist: Artist;
  export let images: Array<string> = [""];
  let currentImage, nextImage: string;
  var currentArtist: Artist;
  var imgInterval, imgCounter: number;

  afterUpdate(async () => {
    if (!artist || !artist.name) {
      return;
    }

    if (currentArtist === artist) {
      return;
    }

    currentArtist = artist;

    const res = await fetch(
      "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artist.name
    );
    const data = await res.json();

    if (!data.artists[0]) {
      images = [artist.picture];
      console.log("ARTIST", images);
      return;
    }

    images = [
      data.artists[0].strArtistFanart,
      data.artists[0].strArtistFanart2,
      data.artists[0].strArtistFanart3,
      data.artists[0].strArtistFanart4,
    ];

    showImages();

  });

  function showImages() {
    let imgArray = images.filter(i=> i && i !== '');
    let imgCount = images.length
    imgCounter = 0;
    console.log("ARTIST", imgArray);
    clearInterval(imgInterval);
    imgInterval = setInterval(() => {
      currentImage = imgArray[imgCounter % imgCount];
      nextImage = imgArray[(imgCounter + 1) % imgCount];
      imgCounter++;
    }, 5000);
  }
</script>

<div class="bg bg1" style="background-image: url({currentImage})" />
<div class="bg bg2" style="background-image: url({nextImage})" />

<style lang="scss">
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-position: center;

    &.bg1 {
      z-index: 1;
    }
    &.bg2 {
      z-index: 0;
    }
  }
</style>
