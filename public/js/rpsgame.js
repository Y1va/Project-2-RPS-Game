// Target DOM elements
const choices = ['rock', 'paper', 'scissors'];
const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
const playerImg = document.getElementById('defaultPlayer');
const cpuImg = document.getElementById('defaultCPU');
const playerScoreCircles = document.getElementById('playerScoreCircles');
const cpuScoreCircles = document.getElementById('cpuScoreCircles');
const displayResult = document.getElementById('displayResult');
const opponentChoosingMessage = document.getElementById('opponentChoosingMessage');
const cpuChoiceDisplay = document.getElementById('cpuChoiceDisplay');
const spinner = document.getElementById('spinner');

let playerScore = 0;
let computerScore = 0;

// Function to get the computer's choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function for playing the game
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  animateChoices(playerChoice);
  animateChoices(computerChoice);

  const result = determineWinner(playerChoice, computerChoice);
  console.log('Result from determineWinner:', result); // Add this line for debugging
  setTimeout(() => {
    updateScore(result);
  }, 3000); // Adjust the delay time as needed
}

function determineWinner(playerChoice, computerChoice) {
  console.log('Player Choice:', playerChoice);
  console.log('Computer Choice:', computerChoice);
  playerChoice = playerChoice.toLowerCase(); // Convert player's choice to lowercase
  computerChoice = computerChoice.toLowerCase();

  let result;
  if (playerChoice === computerChoice) {
    // displayResult.textContent = "It's a tie!";
    result = "tie";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    // displayResult.textContent = 'You Win!';
    console.log('You Win!');
    result = 'player';
  } else {
    // displayResult.textContent = 'You Lose!';
    console.log('You Lose!');
    result = 'cpu';
  }

  // Return the result
  return result;
}

// Function to update scores and display result
function updateScore(result) {
  console.log('Result in updateScore:', result); // Add this line for debugging
  if (result === 'player') {
    playerScore++;
    playerWinsRound();
  } else if (result === 'cpu') {
    computerScore++;
    cpuWinsRound();
  }
  checkWinner(); // Check if the game has been won after each round
}

function changePlayerImageWithShake(newImageSrc, defaultImageSrc, callback) {
  // Set the new image source immediately
  playerImg.src = newImageSrc;

  // Execute the callback function if provided
  if (typeof callback === 'function') {
    callback();
  }

  // If a default image source is provided, reset to it after a delay
  if (defaultImageSrc) {
    setTimeout(() => {
      playerImg.src = defaultImageSrc;
    }, 1750); 
  }
}

function handlePlayerChoice(playerChoice) {
  if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
    const playerImagePath = `/images/${playerChoice}Player.png`;
    const computerChoice = getComputerChoice();
    const cpuImagePath = `/images/${computerChoice}CPU.png`;

    changePlayerImageWithShake(playerImagePath, '/images/rockPlayer.png', () => {
      playGame(playerChoice); // Pass playerChoice to playGame function
    });
     // Animate the player's choice
     animateChoices(playerChoice, 'player', playerChoice); 
  }
}


function animateChoices(choice, player, playerChoice) {
  const img = player === 'player' ? playerImg : cpuImg;

  // Set the initial default image sources
  img.src = player === 'player' ? '/images/rockPlayer.png' : '/images/rockCPU.png';

  // Shake the images
  img.classList.add('shake');

  setTimeout(() => {
    // Remove the shake animation
    img.classList.remove('shake');
    
    // Update the image source to the chosen image after the animation
    img.src = player === 'player' ? `/images/${choice}Player.png` : `/images/${choice}CPU.png`;

    // Display the CPU's choice
    if (player === 'cpu' && cpuChoiceDisplay) {
  
      // Determine the winner and update the score
      const result = determineWinner(player, choice);
      updateScore(result);
    }

    // Reset the images after a delay
    setTimeout(() => {
      resetImages();
    }, 3000); // Longer delay before resetting to default image
  }, 2500); // Delay added to simulate the choice animation
}

function resetImages() {
  playerImg.src = '/images/rockPlayer.png'; // Player's default image
  cpuImg.src = '/images/rockCPU.png'; // CPU's default image

  // Reset the CPU choice display to blank
  if (cpuChoiceDisplay) cpuChoiceDisplay.textContent = '';

  // Show the spinner
  if (spinner) spinner.style.display = 'inline-block';
}

// Event listeners for player choices
rockBtn.addEventListener('click', () => handlePlayerChoice('rock'));
paperBtn.addEventListener('click', () => handlePlayerChoice('paper'));
scissorsBtn.addEventListener('click', () => handlePlayerChoice('scissors'));

function updateScoreDisplay() {
    // Loop over player score circles
    const playerCircles = playerScoreCircles.children;
    for (let i = 0; i < playerCircles.length; i++) {
      const circle = playerCircles[i];
      if (i < playerScore) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    }
  
    // Loop over CPU score circles
    const cpuCircles = cpuScoreCircles.children;
    for (let i = 0; i < cpuCircles.length; i++) {
      const circle = cpuCircles[i];
      if (i < computerScore) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    }
  }
  
  // Function to check if there is a winner
  function checkWinner() {
    if (playerScore === 5) {
      alert('Congratulations! You win!');
      resetGame();
    } else if (computerScore === 5) {
      alert('You lose! Try again.');
      resetGame();
    }
  }
  
  // Function to reset the game
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
  }
  
  // Function to handle player winning a round
  function playerWinsRound() {
    updateScoreDisplay();
    checkWinner();
  }
  
  // Function to handle CPU winning a round
  function cpuWinsRound() {
    updateScoreDisplay();
    checkWinner();
  }
  
  // Initialize score display
  updateScoreDisplay();
