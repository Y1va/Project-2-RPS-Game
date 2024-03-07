// Getting the buttons and result div from the DOM
const rockButton = document.getElementById('rockBtn');
const paperButton = document.getElementById('paperBtn');
const scissorsButton = document.getElementById('scissorsBtn');
const resultDiv = document.getElementById('result');

// Click event listeners for the rock, paper and scissors buttons
rockButton.addEventListener('click', async function () {
  await playGame(0);
});

paperButton.addEventListener('click', async function () {
  await playGame(1);
});

scissorsButton.addEventListener('click', async function () {
  await playGame(2);
});

// API/fetch call to matchRoutes & function to play the game
async function playGame(choice) {
  const response = await fetch('/matches/play', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ choice })
  });
  // Parse the response as JSON
  const data = await response.json();
  const { result, computerChoice } = data;

  let resultText;
  if (result === 'win') {
    resultText = 'You Win!';
  } else if (result === 'tie') {
    resultText = 'It is a tie.';
  } else {
    resultText = 'You lost :(';
  }

  // Updating the text content of the result div
  resultDiv.textContent = `${resultText}. CPU chose ${choiceName(
    computerChoice
  )}`;
}

// Function to get the name of the users choice
function choiceName(choice) {
  switch (choice) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
    default:
      return '';
  }
}





// Need to store who has won in the database for the leaderboard

// Need model for rps matches - Will store the result and will have associations such as user has many match and match belongs to user
// Match routes file inside of controllers folder - This will contain a route to play a match, for e.g post route to /play. A route to get all matches, this route is a get route. When do / can get find all
// In front end - do a fetch request to /play, get a response back, response will have computer choice and result
// In /play, post route is the logic to generate computers choice, to calculate game result and record the match result in the database

// Front end is for interactivity such as hitting the play route and sending that fetch request. Once that play route is hit any logic inside the route will trigger such as comparing the computer choice and comparing it against the user choice
