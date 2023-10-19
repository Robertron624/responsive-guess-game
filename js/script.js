import { words } from "./words.js";
import { getWord } from "./utils.js";

// Game constants
const MAX_TRIES = 6;

// Game initial state
let currentWord = getWord(words[Math.floor(Math.random() * words.length)]);

console.log(currentWord)
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
        box.setAttribute("maxlength", "1");
        box.classList.add("box");
        userInput.appendChild(box);
    }
}

function removeUserInputBoxes () {
    userInput.innerHTML = "";
}

function checkValidCharacter (letter) {
    const {scrambledWord} = currentWord;
    let isCorrect = false;
    for (let i = 0; i < scrambledWord.length; i++) {
        if (scrambledWord[i] === letter) {
            isCorrect = true;
            let letterBoxes = document.querySelectorAll(".box");

            let letterBox = letterBoxes[i].value 

            if(letterBox !== "") {
                letterBoxes[i].value += letter;
            }
        }
    }
    return isCorrect;
}

function checkIfUserWon (letter) {
    let userWon = false;
    const {word} = currentWord;
    let userWord = "";
    let letterBoxes = document.querySelectorAll(".box");
    letterBoxes.forEach(box => userWord += box.value);
    userWord += letter;

    if (userWord === word) {
        userWon = true;
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

    const boxes = document.querySelectorAll(".user-input .box");

    boxes.forEach(box => {
        box.addEventListener("keyup", (e) => {
            const letter = e.target.value;
            const isCorrect = checkValidCharacter(letter);
            if (!isCorrect) {
                currentTries++;
                currentMistakes.push(letter);
                mistakeDots[currentTries - 1].classList.add("active");

                let mistakeListItem = document.createElement("li");

                mistakeListItem.textContent = letter;

                mistakesContainer.appendChild(mistakeListItem);
                e.target.value = "";
            }

            if (currentTries === MAX_TRIES) {
                alert("You lost!");
                resetGame();
            }

            if (checkIfUserWon(letter)) {
                alert("You won!");
                resetGame();
            }
        });
    });

});