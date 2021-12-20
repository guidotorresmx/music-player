import { $, $$ } from './utils.js'
import { formatTime } from './utils.js'
import { playlist } from '../assets/img/music.js'

// Documern elements
// |---controls
const audioPlayer = $(`.controls`)
const play = $(`#btn-play`)
const pause = $(`#pause`)
const playPrev = $(`#skip-prev`)
const playNext = $(`#skip-next`)
const playlistEle = $(`.playlist`)

// |---progress
const currentTime = $(`#progress-time`)
const totalTime = $(`#total-time`)
const progressBar = $(`#progress-bar`)
const trackVolume = $(`#volume-bar`)

// Script level variables
let playingIndex = 0;
const song = new Audio();


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

    play.addEventListener(`click`, function(event) {
        song.play()
        pause.classList.remove(`hidden`)
        play.classList.add(`hidden`)
    })

    pause.addEventListener(`click`, function(event) {
        song.pause()
        play.classList.remove(`hidden`)
        pause.classList.add(`hidden`)

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


    trackVolume.addEventListener(`input`, function(event) {
        setVolume(trackVolume.value)
    })

    setVolume(trackVolume.value)
})