'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');

const player1CurrentScore = document.querySelector('#current--0');
const player2CurrentScore = document.querySelector('#current--1');

let activePlayer = '.player--0';
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const rollHold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
let gameOver = false;

// ------------------Rules------------------------------
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// -------------Game-------------------------------

function playWins() {
  gameOver = true;
  rollDice.removeEventListener('click', rollDiceFunction);
  rollHold.removeEventListener('click', changePlayer);
  if (activePlayer == '.player--0') {
    document.querySelector('#name--0').textContent = 'Player 1 Wins 🎉';
  } else {
    document.querySelector('#name--1').textContent = 'Player 2 Wins 🎉';
  }
}

function changePlayer() {
  addCurrentScoreToMainCourse();
  if (!gameOver) {
    if (activePlayer == '.player--0') {
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
      activePlayer = '.player--1';
    } else {
      player1.classList.add('player--active');
      player2.classList.remove('player--active');
      activePlayer = '.player--0';
    }
  }
}

function addCurrentScoreToMainCourse() {
  if (activePlayer == '.player--0') {
    const currentScore = Number(player1CurrentScore.textContent);
    const score = Number(player1Score.textContent);
    player1Score.textContent = currentScore + score;
    player1CurrentScore.textContent = 0;
    if (currentScore + score >= 100) {
      playWins();
    }
  } else {
    const currentScore = Number(player2CurrentScore.textContent);
    const score = Number(player2Score.textContent);
    player2Score.textContent = currentScore + score;
    player2CurrentScore.textContent = 0;
    if (currentScore + score >= 100) {
      playWins();
    }
  }
}

function addtoCurrentScore(value) {
  if (activePlayer == '.player--0') {
    const score = Number(player1CurrentScore.textContent) + value;
    player1CurrentScore.textContent = score;
  } else {
    const score = Number(player2CurrentScore.textContent) + value;
    player2CurrentScore.textContent = score;
  }
}

function oneOnDish() {
  if (activePlayer == '.player--0') {
    player1CurrentScore.textContent = 0;
  } else {
    player2CurrentScore.textContent = 0;
  }
  changePlayer();
}

function rollDiceFunction() {
  const value = Math.round(Math.random() * 5) + 1;
  dice.src = `./images/dice-${value}.png`;
  if (value != 1) {
    addtoCurrentScore(value);
  } else {
    oneOnDish();
  }
}

rollDice.addEventListener('click', rollDiceFunction);

rollHold.addEventListener('click', changePlayer);

newGame.addEventListener('click', function () {
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  gameOver = false;
  rollDice.addEventListener('click', rollDiceFunction);
  rollHold.addEventListener('click', changePlayer);
  if (activePlayer == '.player--0') {
    document.querySelector('#name--0').textContent = 'Player 1';
  } else {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    document.querySelector('#name--1').textContent = 'Player 2';
  }
  activePlayer = '.player--0';
});
