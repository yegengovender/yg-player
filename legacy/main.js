let song = "get back";
let artist = "the beatles";
var imgInterval = 0;

function setDivBg(divId, img) {
  $("#" + divId).css("backgroundImage", img);
}

function startSlides(images) {
  clearInterval(imgInterval);
  let imgIndex = 0;
  let imgUrl = images[0];
  $(".img1").css("background-image", "url(" + imgUrl + ")");
  imgInterval = setInterval(() => {
    imgIndex++;
    let i = imgIndex % 4;
    let imgUrl = images[i];
    if (imgUrl) {
      $(".img1").css("background-image", "url(" + imgUrl + ")");
    }
  }, 5000);
}

function getSongInfo(artist, albumId) {
  $.get(
    "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artist,
    (data) => {
      console.log("audioDB", data);

      let images = [
        data.artists[0].strArtistFanart,
        data.artists[0].strArtistFanart2,
        data.artists[0].strArtistFanart3,
        data.artists[0].strArtistFanart4,
      ];

      document.querySelector(".banner").style.backgroundImage =
        "url(" + data.artists[0].strArtistBanner + ")";
      startSlides(images);
    }
  );

  DZ.api("/album/" + albumId, function (response) {
    console.log("Album", response);
    document.querySelector(".album-art").style.backgroundImage =
        "url(" + response.cover_medium + ")";
  });
}

function div_append() {
  var pre = document.getElementById(arguments[0]);
  var line = [];
  for (var i = 1; i < arguments.length; i++) {
    line.push(arguments[i]);
  }
  pre.innerHTML += line.join(" ") + "\n";
}

function initButtons() {
  document.querySelector(".prev").addEventListener("click", () => {
    DZ.player.prev();
    return false;
  });
  document.querySelector(".next").addEventListener("click", () => {
    DZ.player.next();
    return false;
  });
  document.querySelector(".play-pause").addEventListener("click", () => {
    if (DZ.player.isPlaying()) {
      DZ.player.pause();
      return false;
    }

    DZ.player.play();
    return false;
  });
}

function onPlayerLoaded() {
  DZ.player.playPlaylist(4939696564);
  DZ.player.setShuffle(true);

  document.querySelector(".player").style.opacity = 1;
  initButtons();

  DZ.Event.subscribe("current_track", function (arg) {
    console.log("Current track", arg);
    document.querySelector(".track-name").innerHTML = arg.track.title;
    document.querySelector(".artist").innerHTML = arg.track.artist.name;

    getSongInfo(arg.track.artist.name, arg.track.album.id);
  });

  DZ.Event.subscribe("player_play", function (evt_name) {
    console.log("Player is playing");
    document.querySelector(".play-pause").classList.remove("player-paused");
  });

  DZ.Event.subscribe("player_paused", function (evt_name) {
    console.log("Player is paused");
    document.querySelector(".play-pause").classList.add("player-paused");
  });
  // DZ.Event.subscribe("player_position", function (arg) {
  //   event_listener_append("position", arg[0], arg[1]);
  //   $("#slider_seek")
  //     .find(".bar")
  //     .css("width", (100 * arg[0]) / arg[1] + "%");
  // });

  // DZ.Event.subscribe("track_end", function () {
  //   event_listener_append("track_end");
  // });
}
document.addEventListener("DOMContentLoaded", function () {
  DZ.init({
    appId: "389904",
    channelUrl: "http://localhost:5500/legacy/channel.html",
    player: {
      onload: onPlayerLoaded,
    },
  });
});
