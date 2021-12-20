import { $, $$ } from './utils.js'
import { formatTime } from './utils.js'
import { playlist } from '../assets/img/music.js'

// Documern elements
// |---controls
const audioPlayer = $(`.controls`)
const playOrPause = $(`#btn-play-pause`)
const playPrev = $(`#skip-prev`)
const playNext = $(`#skip-next`)
const playlistEle = $(`.playlist`)
const remove = $(`#btn-remove`)
const fav = $(`#btn-fav`)

// |---progress
const currentTime = $(`#progress-time`)
const totalTime = $(`#total-time`)
const progressBar = $(`#progress-bar`)
const muteBtn = $(`#btn-mute`)
const shuffleBtn = $(`#btn-shuffle`)
const resetBtn = $(`#btn-playlist-reset`)

// Script level variables
let playingIndex = 0;
const song = new Audio();
let isDragging = false;


//function
const loadSongFromPlaylistById = function(id, start = false) {
    playingIndex = id;
    let playing = !song.paused
    song.src = playlist[playingIndex];

    $$(`.playing`).forEach(li => li.classList.remove(`playing`));
    $(`[data-index="${playingIndex}"]`).classList.add(`playing`);
    if (playing || start)
        song.play();
}

const loadPlaylistFromArray = function(playlist) {
    playlistEle.innerHTML = ``
    playlist.forEach(
        function(item, index) {
            playlistEle.innerHTML +=
                `<li class="playlist-element" data-index="${index}">${item.innerHTML}</li>`
        })
}


const setVolume = function(volume) {
    song.volume = volume;
}

//app core
window.addEventListener(`load`, function() {

    loadPlaylistFromArray(playlist)
    loadSongFromPlaylistById(playingIndex)

    muteBtn.addEventListener(`click`, function(event) {
        if (muteBtn.textContent.includes(`volume_up`)) {
            muteBtn.innerHTML = `<span id="mute" class="material-icons">volume_off</span>`;
            setVolume(0.0)
        } else {
            muteBtn.innerHTML = `<span id="mute" class="material-icons">volume_up</span>`;
            setVolume(1.0)
        }
    })


    playOrPause.addEventListener(`click`, function(event) {
        if (playOrPause.textContent.includes(`play`)) {
            playOrPause.innerHTML = `<span id="pause" class="material-icons">pause</span>`;
            song.play()
        } else {
            playOrPause.innerHTML = `<span id="play" class="material-icons">play_arrow</span>`;
            song.pause()
        }
    })

    remove.addEventListener(`click`, function(event) {
        playlist.splice(playingIndex, 1)
        loadPlaylistFromArray(playlist)
        loadSongFromPlaylistById(playingIndex, true)
    })

    fav.addEventListener(`click`, function(event) {
        if (fav.textContent.includes(`border`)) {
            fav.innerHTML = `<span id="fav" class="material-icons">favorite</span>`;
        } else {
            fav.innerHTML = `<span id="fav" class="material-icons">favorite_border</span>`;
        }
    })


    playNext.addEventListener(`click`, function(event) {
        const nextIndex = (playingIndex + 1) > playlist.length - 1 ? 0 : playingIndex + 1;
        loadSongFromPlaylistById(nextIndex);
    })

    playPrev.addEventListener(`click`, function(event) {
        const nextIndex = (playingIndex - 1) < 0 ? playlist.length - 1 : playingIndex - 1;
        loadSongFromPlaylistById(nextIndex);
    })

    playlistEle.addEventListener(`click`, function(event) {
        const songToPlay = event.target
        if (songToPlay.matches(`li`)) {
            playingIndex = Number(songToPlay.dataset.index)
            loadSongFromPlaylistById(playingIndex, true)
        }
    })


    song.addEventListener(`durationchange`, function() {
        totalTime.textContent = formatTime(song.duration);
    })

    song.addEventListener(`timeupdate`, function() {
        currentTime.textContent = formatTime(song.currentTime);
        console.log(song.currentTime, song.duration)
        if (Number.isNaN(song.duration)) return
        progressBar.value = (song.currentTime / song.duration) * 100;
    })

    progressBar.addEventListener(`input`, function(event) {
        isDragging = true;
    })
    progressBar.addEventListener(`change`, function(event) {
        isDragging = false;
        song.currentTime = (progressBar.value / 100) * song.duration;
    })
})