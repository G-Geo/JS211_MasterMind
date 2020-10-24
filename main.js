'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let guess = ''
let turnCounter = 0
let correctLetterLocations = 0
let correctLetters = 0

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  //This resets solution each game
  solution = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


const generateHint = (guess) =>{

  var solutionArray = solution.split('');
  var guessArray = guess.split('');
  //Resets correct positions each turn
  correctLetterLocations = 0
  correctLetters = 0
  
 for (let i = 0; i < solutionArray.length; i++){
     if (solutionArray[i] === guessArray[i]){
       //This determines how many correct letters and positions are guessed
         correctLetterLocations = correctLetterLocations + 1
       //This sets correct guesses in the array to null, so we can compare correct letters later on
         solutionArray[i] = null
       //This keeps the game from logging more correctLetters than are available
         guessArray[i] = "q"
     }
    //  console.log(solutionArray)
 }

 for (let i = 0; i < solutionArray.length; i++){
  //This loops through the array, and adds one for every correct letter
  let correctIndex = solutionArray.indexOf(guessArray[i])
  if (correctIndex > -1){
    //This sets correct letters as null so repeat letters do not count as correct unless they are repeated in solution
    solutionArray[correctIndex] = null
    correctLetters = correctLetters + 1
  }
 }
 //This counts how many turns
turnCounter = turnCounter + 1
console.log(`Turns taken: ${turnCounter}`)
 //This is your generated hint
 console.log(`You have guessed ${correctLetterLocations} correct letter positions, and ${correctLetters} correct letters in incorrect positions`)

 return (`${correctLetterLocations}-${correctLetters}`)
}

const mastermind = (guess) => {

  generateHint(guess)


  if (correctLetterLocations === 4){
    console.log("You Win!!")
    return "You Win!!"

  } else if (turnCounter === 10){
    console.log("You Lose!!")
    console.log(`The answer was ${solution}`)
    generateSolution()
    turnCounter = 0
  } 

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    generateHint(guess)
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You Win!!');
    });
  });
  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });
    it('should register a guess and generate hints', () => {
      generateHint('aabb');
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}