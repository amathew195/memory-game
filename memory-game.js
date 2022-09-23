
const memoryCards = document.querySelectorAll(".memoryCard");
shuffleCards();

const startButton = document.querySelector("#startButton");
startButton.addEventListener('click', () => {
  memoryCards.forEach(memoryCard => {
    memoryCard.addEventListener('click', flipCard);
  });
});

let hasPlayerFlipped = false;
let firstCard;
let secondCard;
let lockBoard = false;
let tries = 0;
const tryTracker = document.querySelector("#tries");

/** Flip a card face-up. */
function flipCard(evt) {
  //flip the card
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipCard');
  //assign firstCard and secondCard
  if (!hasPlayerFlipped) {
    hasPlayerFlipped = true;
    firstCard = this;
    console.log(`FIRST CARD: ${firstCard}`);
  } else {
    if (firstCard && this !== firstCard) {
      secondCard = this;
      console.log(`SECOND CARD: ${secondCard}`);
      hasPlayerFlipped = false;
      matchChecking();
      tries++;
      tryTracker.innerText = tries;
    }
  }
}

function matchChecking() {
  if (firstCard.className !== secondCard.className) {
    unFlipCard();
  } else {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }
}

function resetFirstAndSecondCards() {
  hasPlayerFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// /** Flip a card face-down. */
function unFlipCard() {
  lockBoard = true;
  setTimeout(function () {
    firstCard.classList.remove('flipCard');
    secondCard.classList.remove('flipCard');
    resetFirstAndSecondCards();
  }, 1000);
}

function shuffleCards() {
  memoryCards.forEach(memoryCard => {
    let order = Math.floor(Math.random() * 10);
    memoryCard.style.order = order;
  });

}

const resetButton = document.querySelector("#resetButton");

resetButton.addEventListener('click', function () {
  memoryCards.forEach(memoryCard => {
    memoryCard.classList.remove('flipCard');
    memoryCard.removeEventListener('click', flipCard);
  });
  tries = 0;
  tryTracker.innerText = tries;
});