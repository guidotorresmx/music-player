//Utility functions for the application

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const formatTime = (time) => {
        return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, `0`)}`
  }

export function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
}