import { words } from "./words.js";
import { getWord } from "./utils.js";

// Game constants
const MAX_TRIES = 5;

// Game initial state
let currentWord = getWord(words[Math.floor(Math.random() * words.length)]);
let currentTries = 0;
let currentMistakes = []; // array of wrong letters

// DOM Elements

const wordScreen = document.querySelector("#word-screen");
const lettersContainer = wordScreen.querySelector(".letters-container");
const mistakeDots = document.querySelectorAll(".tries-mistakes .dots .dot");

console.log(mistakeDots)
console.log(wordScreen)


// Game functions

function displayWord () {
    const {scrambledWord} = currentWord;
    for (let i = 0; i < scrambledWord.length; i++) {
        let letter = document.createElement("span");
        letter.classList.add("letter");
        letter.textContent = scrambledWord[i];
        lettersContainer.appendChild(letter);
    }
}

function resetGame () {
    currentWord = getWord(words[Math.floor(Math.random() * words.length)]);
    currentTries = 0;
    currentMistakes = [];
    lettersContainer.innerHTML = "";
    mistakeDots.forEach(dot => dot.classList.remove("active"));
    displayWord();
}

// start when page loads

document.addEventListener("DOMContentLoaded", () => {
    displayWord();
});