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


// Script level variables
let playingIndex = 0;
const song = new Audio();

window.addEventListener(`load`, function() {
    song.src = playlist[playingIndex]
    playlist.forEach(
        function(item, index) {
            playlistEle.innerHTML +=
                `<li class="playlist-element" data-index="${index}">${item.innerHTML}</li>`
        })
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

})


playNext.addEventListener(`click`, function(event) {
    const nextIndex = (playingIndex + 1) > playlist.length - 1 ? 0 : playingIndex + 1;
    loadSongFromPlaylistById(nextIndex);
})

playPrev.addEventListener(`click`, function(event) {
    const nextIndex = (playingIndex - 1) < 0 ? playlist.length - 1 : playingIndex - 1;
    loadSongFromPlaylistById(nextIndex);
})

const loadSongFromPlaylistById = function(id) {
    playingIndex = id;
    let playing = !song.paused
    song.src = playlist[playingIndex];
    if (playing)
        song.play();
}

playlistEle.addEventListener(`click`, function(event) {
    const songToPlay = event.target
    if (songToPlay.matches(`li`)) {
        playingIndex = Number(songToPlay.dataset.index)
        song.src = playlist[playingIndex]
        song.play()
    }
})