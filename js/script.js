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

const mistakesContainer = document.querySelector(".mistakes-container");

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

function addEventListenersToBoxes () {
    const boxes = document.querySelectorAll(".user-input .box");

    boxes.forEach((box, index) => {
        box.addEventListener("keyup", (e) => {


            if(!isKeyValid(e.key)) {
                e.target.value = "";
                return;
            };

            const letter = e.target.value;

            let isValid  = checkValidCharacter(letter, index);

            if(isValid) {
                e.target.value = letter;
                checkIfUserWon(letter) ? alert("You won!") : null;
            }
            else {
                currentTries++;
                currentMistakes.push(letter);
                mistakeDots[currentTries - 1].classList.add("active");
                mistakesContainer.textContent = currentMistakes.join(", ");
                // removing the last letter from the input box
                e.target.value = "";
            }

        });
    });
}

function isKeyValid (key) {
    // Check if key is a letter from the alphabet
    let isValid = false;

    if(key.length > 1) return isValid;

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    if(alphabet.includes(key)) isValid = true;

    return isValid;
}

function resetGame () {
    currentWord = getWord(words[Math.floor(Math.random() * words.length)]);
    currentTries = 0;
    currentMistakes = [];
    lettersContainer.innerHTML = "";
    removeUserInputBoxes();
    mistakeDots.forEach(dot => dot.classList.remove("active"));
    displayWord();
    displayUserInputBoxes();
    addEventListenersToBoxes();
}

function displayUserInputBoxes () {
    const numberOfBoxes = currentWord.scrambledWord.length;
    for (let i = 0; i < numberOfBoxes; i++) {
        let box = document.createElement("input");
        box.setAttribute("type", "text");
        box.setAttribute("maxlength", "1");
        box.classList.add("box");
        userInput.appendChild(box);
    }
}

function removeUserInputBoxes () {
    userInput.innerHTML = "";
}

function checkValidCharacter (letter, index) {
    const {originalWord} = currentWord;
    let isCorrect = false;

    // check if the letter introduced is in the word at the index position
    if (originalWord[index] === letter) {
        isCorrect = true;
    }

    return isCorrect;
}

function checkIfUserWon (letter) {
    let userWon = false;
    const {originalWord} = currentWord;
    let userWord = "";
    let letterBoxes = document.querySelectorAll(".box");
    letterBoxes.forEach(box => userWord += box.value);

    if (userWord === originalWord) {
        userWon = true;
        console.log("User won!")
    }

    return userWon;
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

    // Add event listeners to all input boxes and bind onKeyUp event to checkValidCharacter function
    addEventListenersToBoxes();
});