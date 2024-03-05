// Target DOM elements
// still need to create these id's in html
const choices = ['rock', 'paper', 'scissors'];
const playerDisplay = document.getElementById('playerDisplay');
const computerDisplay = document.getElementById('computerDisplay');
const resultDisplay = document.getElementById('resultDisplay');

const winCounter;
const roundCounter;

// Function for playing the game
function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  console.log(computerChoice);
  let result = '';

  // Validates if player choice is equal to computer choice
  if (playerChoice === computerChoice) {
    result = "It's a Tie!";
  } else {
    // Switch case for each possibility
    switch (playerChoice) {
      case 'rock':
        result = computerChoice === 'scissors' ? 'You Win!' : 'You Lose';
        break;
      case 'paper':
        result = computerChoice === 'rock' ? 'You Win!' : 'You Lose';
        break;
      case 'scissors':
        result = computerChoice === 'paper' ? 'You Win!' : 'You Lose';
        break;
    }
  }

  // Displaying what the player and computer chose
  playerDisplay.textContent = `PLAYER: ${playerChoice}`;
  computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
  resultDisplay.textContent = result;
}


// Need to store who has won in the database for the leaderboard