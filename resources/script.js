const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('music-cover');
const prevBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Song title
const songs = ['Antohin', 'Cholo Bristite bhiji-habib', 'Cholo Bristite bhiji-kona'];

// Keep track of songs
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `resources/audio/${song}.mp3`;
    cover.src = `resources/img/${song}.jpg`
}

// Play Songs
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');

    audio.play();
}

// Previous Songs
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Songs
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}

// Set Progress bar manually 
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    playBtn.querySelector('i.fa').classList.add('fa-play');

    audio.pause();
}
// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// automatically next song
audio.addEventListener('ended', nextSong);