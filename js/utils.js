export function getScrambleWord(word) {
    return word
        .split("")
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join("");
}

export function getWord(originalWord) {
    return {
        originalWord,
        scrambledWord: getScrambleWord(originalWord),
    };
}

export function isKeyValid (key) {
    // Check if key is a letter from the alphabet
    let isValid = false;

    if(key.length > 1) return isValid;

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    if(alphabet.includes(key)) isValid = true;

    return isValid;
}