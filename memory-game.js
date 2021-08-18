"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each"div"DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById('game');

  let flippedCards = []

  for (let color of colors) {
    const card = document.createElement('div')
    card.classList.add(color)
    gameBoard.appendChild(card)

    card.addEventListener('click', function (e) {
      if (flippedCards.length <= 1) {
        let flippedCard = handleCardClick(e)
        if (flippedCard !== undefined) {
          flippedCards.push(flippedCard)
        }
      }
      if (flippedCards.length === 2) {
        if (flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor) {
          flippedCards = []
        } else {
          setTimeout(() => {
            unFlipCard(flippedCards[0], flippedCards[1])
            flippedCards = []
          }, FOUND_MATCH_WAIT_MSECS);
        }
      }
    })
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = card.classList[0]

}

/** Flip a card face-down. */

function unFlipCard(card1, card2) {
  card1.removeAttribute('style')
  card2.removeAttribute('style')
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  if (!evt.target.style.backgroundColor) {
    flipCard(evt.target)
    return evt.target
  }
}