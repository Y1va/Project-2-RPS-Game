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
  }, 3000); 
}

function determineWinner(playerChoice, computerChoice) {
  console.log('Player Choice:', playerChoice);
  console.log('Computer Choice:', computerChoice);
  playerChoice = playerChoice.toLowerCase(); 
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

  return result;
}

// Function to update scores and display result
function updateScore(result) {
  console.log('Result in updateScore:', result); 
  if (result === 'player') {
    playerScore++;
    playerWinsRound();
    recordMatch(userId, 'win');
  } else if (result === 'cpu') {
    computerScore++;
    cpuWinsRound();
    recordMatch(userId, 'loss')
  }
  checkWinner(); 

function changePlayerImageWithShake(newImageSrc, defaultImageSrc, callback) {
  playerImg.src = newImageSrc;

  if (typeof callback === 'function') {
    callback();
  }

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
      playGame(playerChoice); 
    });
     animateChoices(playerChoice, 'player', playerChoice); 
  }
}


function animateChoices(choice, player, playerChoice) {
  const img = player === 'player' ? playerImg : cpuImg;

  img.src = player === 'player' ? '/images/rockPlayer.png' : '/images/rockCPU.png';

  img.classList.add('shake');

  setTimeout(() => {
    img.classList.remove('shake');
    img.src = player === 'player' ? `/images/${choice}Player.png` : `/images/${choice}CPU.png`;

    if (player === 'cpu' && cpuChoiceDisplay) {
      const result = determineWinner(player, choice);
      updateScore(result);
    }

    setTimeout(() => {
      resetImages();
    }, 3000); 
  }, 2500); 
}

function resetImages() {
  playerImg.src = '/images/rockPlayer.png'; 
  cpuImg.src = '/images/rockCPU.png';

  if (cpuChoiceDisplay) cpuChoiceDisplay.textContent = '';
  if (spinner) spinner.style.display = 'inline-block';
}

rockBtn.addEventListener('click', () => handlePlayerChoice('rock'));
paperBtn.addEventListener('click', () => handlePlayerChoice('paper'));
scissorsBtn.addEventListener('click', () => handlePlayerChoice('scissors'));

function updateScoreDisplay() {
    const playerCircles = playerScoreCircles.children;
    for (let i = 0; i < playerCircles.length; i++) {
      const circle = playerCircles[i];
      if (i < playerScore) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    }
  
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
}
