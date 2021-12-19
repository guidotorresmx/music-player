//Utility functions for the application

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const formatTime = (time) => {
        return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, `0`)}`
  }