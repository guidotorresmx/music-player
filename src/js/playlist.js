import { loadTrack, updatePlayer } from './script.js'

export const getPlaylistFromHTML = async(plSelector, songSelector = `${plSelector} > *`) => {

    const playlist = document.querySelector(plSelector)
    const songs = document.querySelectorAll(songSelector) || []


    const tracks = Array.from(songs).map((track, index) => {
        // Store all "data-" attribute data to the object, as well as as reference to the element
        track.dataset.index = index
        return {...track.dataset, ref: track }
    })


    if (playlist) {
        playlist.addEventListener(`click`, event => {
            const ele = event.target.closest(songSelector)
            if (!ele) return

            loadTrack(tracks, ele.dataset.index).then((currTrack) => {
                updatePlayer(true)
            })
        })
    }

    return tracks
}