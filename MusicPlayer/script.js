// script.js
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const coverImage = document.getElementById("coverImage");
const playlist = document.getElementById("playlist");

const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "song3.mp3",
    cover: "cover3.jpg"
  }
];

let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;

// Load playlist
function loadPlaylist() {
  playlist.innerHTML = songs
    .map(
      (song, index) =>
        `<li onclick="playSongFromPlaylist(${index})">${song.title} - ${song.artist}</li>`
    )
    .join("");
}

// Load song
function loadSong(song) {
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  coverImage.src = song.cover;
  highlightPlayingSong();
}

// Play song
function playSong() {
  audio.play();
  playPauseBtn.innerHTML = "&#10074;&#10074;"; // Pause icon
}

// Pause song
function pauseSong() {
  audio.pause();
  playPauseBtn.innerHTML = "&#9658;"; // Play icon
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

// Next song
function nextSong() {
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}

// Shuffle songs
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.style.backgroundColor = isShuffle ? "#f39c12" : "#444";
}

// Repeat song
function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.style.backgroundColor = isRepeat ? "#f39c12" : "#444";
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Play song from playlist
function playSongFromPlaylist(index) {
  currentSongIndex = index;
  loadSong(songs[currentSongIndex]);
  playSong();
}

// Highlight playing song in playlist
function highlightPlayingSong() {
  const playlistItems = document.querySelectorAll("#playlist li");
  playlistItems.forEach((item, index) => {
    item.classList.toggle("playing", index === currentSongIndex);
  });
}

// Event Listeners
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
shuffleBtn.addEventListener("click", toggleShuffle);
repeatBtn.addEventListener("click", toggleRepeat);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Load the first song and playlist on startup
loadSong(songs[currentSongIndex]);
loadPlaylist();
// Existing code...

// Toggle playlist visibility
const togglePlaylistBtn = document.getElementById("togglePlaylistBtn");
const playlistContainer = document.getElementById("playlistContainer");

togglePlaylistBtn.addEventListener("click", () => {
  playlistContainer.classList.toggle("collapsed");
});

// Load the first song and playlist on startup
loadSong(songs[currentSongIndex]);
loadPlaylist();