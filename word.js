var Letter = require("./letter.js");
function Word(wordString) {
    this.wordArray = wordString.split("");
    this.letterArray = [];
    for (i = 0; i < this.wordArray.length; i++) {
        var eachLetter = new Letter(this.wordArray[i]);
        this.letterArray.push(eachLetter);
        //console.log(this.letterArray);
    }
    this.displayWord = function () {
        var newString = "";
        for (n = 0; n < this.letterArray.length; n++) {
            newString += (" " + this.letterArray[n].returnChar());
        }
        return newString
    }
    this.checkEachLetter = function (character) {
        for (k = 0; k < this.letterArray.length; k++){
            this.letterArray[k].checkChar(character);
        }
    }
}
//Testing all properties and methods
//var myWord = new Word("trapezoid");
//console.log(myWord.displayWord());
//myWord.checkEachLetter("a");
//console.log(myWord.displayWord());

module.exports = Word;