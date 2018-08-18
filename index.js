const inquirer = require('inquirer');
const chalk = require('chalk');
const figures = require('figures');
var Word = require("./word.js");
var alphabet = [];
var guessedLetters = [];
var guessesRemaining = 10;
var outOfGuesses = false;
var possibleWords = [];
var currentWord;
var currentWordString;

//replenishes the alphabet and empties out guessed letters array - for each new word
function replenish() {
    alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    guessedLetters = [];
}

//refills the possible words array
function refill() {
    possibleWords = ["ochre", "chartreuse", "cinereous", "vermillion"];
}

//function that randomly selects a word from possible words array
function getNewWord() {
    var randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    currentWord = new Word(randomWord);
    currentWordString = randomWord;
}
//function to console log the underscores and guessed letters each time
function showWord() {
    console.log(currentWord.displayWord());
}

//function that uses inquirer to prompt user's selection and validates choice
function whichLetter() {
    inquirer.prompt([
        {
            type: "input",
            name: "letterChooser",
            message: "Guess a letter!"
        }
    ]).then(({ letterChooser }) => {
        var caseLetter = letterChooser.toLowerCase();
        if (caseLetter.length > 1) {
            console.log("Please choose only one letter.");
            console.log("");
            whichLetter();
        }
        else if (alphabet.indexOf(caseLetter) === -1 && guessedLetters.indexOf(caseLetter) === -1) {
            console.log("Please choose a valid letter.");
            console.log("");
            whichLetter();
        }
        else if (guessedLetters.indexOf(caseLetter) !== -1) {
            console.log("You already guessed that letter! Choose another.");
            console.log("");
            whichLetter();
        }
        else {
            checkInput(caseLetter);
        }
    });
};

//initializes the game - five functions above are called, guesses remaining and out of guesses reset
function initializeGame() {
    guessesRemaining = 10;
    outOfGuesses = false;
    replenish();
    refill();
    getNewWord();
    showWord();
    whichLetter();
}

function playAgainOption() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?"
        }
    ]).then(({ playAgain }) => {
        if (playAgain) {
            initializeGame();
        }
        else {
            console.log("Thanks for playing! Goodbye!");
            console.log("");
        }
    });

}

//Function to pass in user input - uses the Word object's checkEachLetter method
function checkInput(userInput) {
    var trueOrFalse = [];
    var guessedCheck = [];
    for (w = 0; w < currentWord.letterArray.length; w++) {
        currentWord.letterArray[w].checkChar(userInput);
        guessedCheck.push(currentWord.letterArray[w].checkChar(userInput));
        trueOrFalse.push(currentWord.letterArray[w].guessed);
    }
    //remove guessed letter from alphabet
    guessedLetters.push(userInput);
    var alphPosition = alphabet.indexOf(userInput);
    alphabet.splice(alphPosition, 1);
    //if letter guessed correctly
    if (guessedCheck.indexOf(true) !== -1) {
        console.log(chalk.green(figures.tick + " Correct!"));
        console.log("");
    }
    //if letter not guessed correctly
    else {
        if (guessesRemaining > 1) {
            console.log(chalk.red(figures.cross + " Incorrect!"));
            guessesRemaining--;
            console.log("You have " + guessesRemaining + " guesses remaining!");
            console.log("");
        }
        else {
            console.log("You ran out of guesses!");
            console.log("");
            outOfGuesses = true;
            playAgainOption();
        }
    }

    if (trueOrFalse.indexOf(false) === -1 && outOfGuesses === false) {
        if (possibleWords.length === 1) {
            console.log("Congratulations, you guessed all the words!");
            playAgainOption();
        }
        else {
            console.log("");
            console.log("You guessed it! The word was " + chalk.magenta(currentWordString) + ". Here's the next word:");
            console.log("");
            wordGuessed();
            showWord();
            whichLetter();
        }
    }
    else if (outOfGuesses === false) {
        showWord();
        whichLetter();
    }
}

//function to handle when word has been guessed
function wordGuessed() {
    //remove word from array so it doesn't get selected again
    currentWordIndex = possibleWords.indexOf(currentWordString);
    possibleWords.splice(currentWordIndex, 1);
    //replenish alphabet and empty guessed letters array
    replenish();
    //load a new word
    getNewWord();
}

function showStartMessage() {
    console.log("");
    console.log(chalk.magenta(figures.star) + chalk.blue(" ---------------------- ") + chalk.magenta.bold("GUESS THE COLORS") + chalk.blue(" ---------------------- ") + chalk.magenta(figures.star));
    console.log(chalk.cyan("This hangman-style game requires you to guess a series of words,"));
    console.log(chalk.cyan("letter by letter, for various colors. Good luck!"));
    console.log(chalk.magenta(figures.star)  + chalk.blue(" -------------------------------------------------------------- ") + chalk.magenta(figures.star));
    console.log("");
}

//start the game
showStartMessage();
initializeGame();