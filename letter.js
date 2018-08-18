function Letter(char) {
    this.letterString = char;
    this.guessed = false;
    this.returnChar = function () {
        if (this.guessed === false){
            return "_";
        }
        else if (this.guessed === true){
            return char;
        }
    }
    this.checkChar = function (userInput) {
        if (userInput === this.letterString) {
            this.guessed = true;
            return true;
        }
    }
}

//Testing all the properties and methods

//var theLetter = new Letter("a");
//console.log(theLetter.letterString);
//console.log(theLetter.guessed);
//console.log(theLetter.returnChar());
//theLetter.checkChar("a");
//console.log(theLetter.guessed);
//console.log(theLetter.returnChar());

module.exports = Letter;