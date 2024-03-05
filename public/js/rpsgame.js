// Target DOM elements
// still need to create these id's in html
const choices = ['rock', 'paper', 'scissors'];
const playerDisplay = document.getElementById('playerDisplay');
const computerDisplay = document.getElementById('computerDisplay');
const resultDisplay = document.getElementById('resultDisplay');


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

// Need model for rps matches - Will store the result and will have associations such as user has many match and match belongs to user
// Match routes file inside of controllers folder - This will contain a route to play a match, for e.g post route to /play. A route to get all matches, this route is a get route. When do / can get find all
// In front end - do a fetch request to /play, get a response back, response will have computer choice and result
// In /play, post route is the logic to generate computers choice, to calculate game result and record the match result in the database

// Front end is for interactivity such as hitting the play route and sending that fetch request. Once that play route is hit any logic inside the route will trigger such as comparing the computer choice and comparing it against the user choice