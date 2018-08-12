const inquirer = require('inquirer');
function whichLetter() {
    inquirer.prompt([
        {
            type: "list",
            name: "letterChooser",
            message: "Guess a letter!",
            choices: ["a", "b"]
        }
    ])
};
//Randomly selects a word
var possibleWords = [""];
//Use the `Word` constructor to store it