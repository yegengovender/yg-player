<script lang="ts">
  import type { Track } from "./models/Track";
  import { createEventDispatcher } from "svelte";
  import type { Artist } from "./models/Artist";
  import type { Album } from "./models/Album";
  const dispatch = createEventDispatcher();
  var DZ;
  
  export let track: Track;
  export let trackPlaying: boolean;
  export const proto = {
    playPause: () => {
      if (trackPlaying) {
        DZ.player.pause();
        return;
      }
      DZ.player.play();
    },
    prevTrack: () => {
      DZ.player.prev();
    },
    nextTrack: () => {
      DZ.player.next();
    },
  };

  window.dzAsyncInit = async function () {
    DZ = window.DZ;
    await DZ.init({
      appId: "389904",
      channelUrl: "http://localhost:5500/legacy/channel.html",
      player: {
        onload: onPlayerLoaded,
      },
    });
  };

  async function getAlbumInfo(albumId): Promise<Album> {
    let getAlbumP: Promise<Album> = new Promise((resolve, reject) => {
      DZ.api("/album/" + albumId, async function (response) {
        resolve(response);
      });
    });

    return getAlbumP;
  }

  async function getArtistInfo(artistId): Promise<Artist> {
    let getArtistP = new Promise<Artist>((resolve, reject) => {
      DZ.api("/artist/" + artistId, async function (response) {
        resolve(response);
      });
    });

    return getArtistP;
  }

  async function onPlayerLoaded() {
    console.log("playerLoaded");
    DZ.player.playPlaylist(890674641);
    DZ.player.setShuffle(true);

    DZ.Event.subscribe("current_track", async function (arg) {
      let currentTrack = arg.track;
      console.log(currentTrack);

      let album = await getAlbumInfo(currentTrack.album.id);
      console.log("Album", album);

      let artist = await getArtistInfo(currentTrack.artist.id);
      console.log("Artist", artist);

      track = {
        id: currentTrack.id,
        title: currentTrack.title,
        artist: {
          id: artist.id,
          name: artist.name,
          picture: artist.picture_xl,
        },
        album: {
          artistId: artist.id,
          id: album.id,
          title: album.title,
          cover: album.cover_medium,
        },
      };
      dispatch("track_loaded", track);
    });

    DZ.Event.subscribe("player_play", function (evt_name) {
      console.log("player play");
      trackPlaying = true;
      dispatch("player_play");
    });

    DZ.Event.subscribe("player_paused", function (evt_name) {
      console.log("player paused");
      trackPlaying = false;
      dispatch("player_paused");
    });
  }
</script>

<svelte:head>
  <script
    type="text/javascript"
    src="https://e-cdns-files.dzcdn.net/js/min/dz.js"
    async>
  </script>
</svelte:head>

<div id="dz-root" />
