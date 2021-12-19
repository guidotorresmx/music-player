import { formatTime } from './utils.js'

// Documern elements
// |---controls
const audioPlayer = $(`.controls`)
const play = $(`#play`)
const pause = $(`#pause`)
const playPrev = $(`#skip-prev`)
const playNext = $(`#skip-next`)
const playlistEle = $(`.playlist`)

// |---progress
const currentTime = $(`#progress-time`)
const totalTime = $(`#total-time`)


// Script level variables
const playlist = [
    "https://www.fesliyanstudios.com/musicfiles/2015-09-25_-_Old_Video_Game_Music_1_-_David_Fesliyan.mp3",
    "https://www.fesliyanstudios.com/musicfiles/2019-01-10_-_Land_of_8_Bits_-_Stephen_Bennett_-_FesliyanStudios.com.mp3",
]

playingIndex = 0
const song = new Audio()

window.addEventListener(`load`, () => {
    song.src = playlist[playingIndex]
    playlist.forEach(
        function(item, index) {
            playlistEle.innerHTML +=
                `<li class="playlist-element" data-index="${index}">${item.innerHTML}</li>`
        })
})