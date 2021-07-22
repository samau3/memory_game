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

  let counter = 0 // define counter outside of loop so it's scope applies to to eventListener and also retains value

  for (let color of colors) {
    const card = document.createElement('div')
    card.classList.add(color)
    gameBoard.appendChild(card)

    card.addEventListener('click', function (e) {
      if (counter < 2) {
        counter += handleCardClick(e)
      }
      console.log(counter)
    })
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = card.classList
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.removeAttribute('style')
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  if (!evt.target.style.backgroundColor) {
    flipCard(evt.target)
    return 1
  }
  return 0
}

// need a variable/tracker to keep track of number of cards flipped
// compare first card with second card to see if they match
// if they don't math, remove backgroundColor and prevent being clicked on 
// if they do match, remove eventListener

// matching
// need a way to store or compare cards clicked
