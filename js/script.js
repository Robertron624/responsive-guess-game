import { words } from "./words.js";
import { getWord } from "./utils.js";

// Game constants
const MAX_TRIES = 6;

// Game initial state
let currentWord = getWord(words[Math.floor(Math.random() * words.length)]);
let currentTries = 0;
let currentMistakes = []; // array of wrong letters

// DOM Elements

const wordScreen = document.querySelector("#word-screen");
const lettersContainer = wordScreen.querySelector(".letters-container");
const mistakeDots = document.querySelectorAll(".tries-mistakes .dots .dot");
const userInput = document.querySelector(".user-input");

const randomButton = document.querySelector("#random-btn");
const reetButton = document.querySelector("#reset-btn");

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

function displayUserInputBoxes () {
    const numberOfBoxes = currentWord.scrambledWord.length;
    for (let i = 0; i < numberOfBoxes; i++) {
        let box = document.createElement("input");
        box.setAttribute("type", "text");
        box.classList.add("box");
        userInput.appendChild(box);
    }
}

function removeUserInputBoxes () {
    userInput.innerHTML = "";
}

// start when page loads
document.addEventListener("DOMContentLoaded", () => {
    displayWord();
    displayUserInputBoxes();


    randomButton.addEventListener("click", () => {
        currentWord = getWord(words[Math.floor(Math.random() * words.length)]);
        lettersContainer.innerHTML = "";
        displayWord();
        removeUserInputBoxes();
        displayUserInputBoxes();
    });
    reetButton.addEventListener("click", resetGame);
});