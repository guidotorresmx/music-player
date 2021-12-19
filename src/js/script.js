import { formatTime } from './utils.js'

// Documern elements
// |---controls
const audioPlayer = $(`.controls`)
const play = $(`#play`)
const pause = $(`#pause`)
const playPrev = $(`#skip-prev`)
const playNext = $(`#skip-next`)

// |---progress
const currentTime = $(`#progress-time`)
const totalTime = $(`#total-time`)