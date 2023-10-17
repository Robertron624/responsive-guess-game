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
