//Create a list that holds all of your cards

let cardClasses = ['fa-diamond','fa-diamond',
						'fa-bolt', 'fa-bolt',
						'fa-cube', 'fa-cube',
						'fa-bomb','fa-bomb',
						'fa-bicycle','fa-bicycle',
						'fa-leaf','fa-leaf',
						'fa-paper-plane-o','fa-paper-plane-o',
						'fa-anchor','fa-anchor'
						];

//grab the moves counter
let moves = document.querySelector('.moves');
let counter = 0;

//time variables
let myTimer;
let timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;

//grab stars in stat section
let stars = document.querySelectorAll('.stars .fa-star');

//grab the deck
let deck = document.querySelector('.deck');

//create array to hold cards for comparison
let openCards = [];

//create array for cards that are matched
let matchCards = [];

//grab all <li> elements with class of '.card'
let cards = document.querySelectorAll('.card');

// modal variables
let modal = document.getElementById('myModal');
let finalTime = document.getElementById('finalTime');
let finalMoves = document.getElementById('finalMoves');
let finalStars = document.getElementById('finalStars');
let span = document.getElementsByClassName("close")[0];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//create card HTML
 function createCard(card) {
 	return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //dynamically generate game board with randomized cards
 function preGame() {
 	// map cardClasses
 	let cardHTML = shuffle(cardClasses).map(function(card) {
 		return createCard(card);
 	});
 	//join mapped cardHTML to the game board
 	deck.innerHTML = cardHTML.join('');
	moves.innerHTML = `${counter} Moves`;
	timer.innerHTML = `${minutes} mins ${seconds} sec`;
 }

//function to increment moves
 function moveCounter() {
	counter ++;
	if (counter === 1) {
		moves.innerHTML = `${counter} Move`;
	}	else {
			moves.innerHTML = `${counter} Moves`;
	}
	if (counter > 12 && counter < 18) {
    		for (let  i= 0; i < 3; i++) {
	   		if (i > 1) {
			stars[i].style.visibility = "collapse";
	   		}
		}
	}
		else if (counter > 18) {
			for (let i= 0; i < 3; i++) {
	   			if (i > 0) {
					stars[i].style.visibility = "collapse";
	   			}
			}
		}
}

// timer functions
function beginTimer () {
	myTimer = setInterval(resetTimer, 1000);
	function resetTimer () {
		if (matchCards.length <= 15) {
			if (seconds  < 59) {
				seconds++;
				if (seconds === 59) {
					minutes++;
					seconds = 0;
				}
			}
		}
			else {
				clearInterval(myTimer);
			}
		timer.innerHTML = `${minutes} mins ${seconds} sec`;
	}
}

//add event listener to deck and rely on event delegation
deck.addEventListener('click', showCard);

function showCard(evt) {
	if (evt.target.nodeName === 'LI') {
		if (!evt.target.classList.contains('show', 'open') && !evt.target.classList.contains('match')) {
			openCards.push(evt.target);
			evt.target.classList.add('show','open');
			if (openCards.length === 1 && (minutes === 0, seconds === 0)){
				beginTimer();
			}
				else if (openCards.length === 2) {
				runMatch();
				}
		}
	}
}

function runMatch() {
	if (openCards[0].dataset.card === openCards[1].dataset.card)  {
		match();
	}
		else {
			noMatch();
		}
	openCards = []; // empty openCards array for next pair to be compared
	moveCounter();
	if (matchCards.length === 16) {
		endGame();
	}
}

// function for when cards do not match
function noMatch() {
	for (let openCard of openCards)  {
		setTimeout(function() {
			openCard.classList.add('no-match');
		}, 500);
		setTimeout(function() {
			openCard.classList.remove('no-match', 'show','open');
		}, 1200);
	}
}

// function for when cards do match
function match() {
	for (let openCard of openCards) {
		openCard.classList.add('match', 'pulse');
		openCard.classList.remove('show','open');
		matchCards.push(openCard);
	}
}

function endGame() {
	modal.style.display = 'block';
	finalTime.innerHTML = timer.innerHTML;
	finalMoves.innerHTML = moves.innerHTML;
	finalStars.innerHTML = "";
	for (let star of stars) {
		console.log(star.innerHTML);
		finalStars.appendChild(star);
	}
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
	   resetGame();
    }
}

//call preGame
 document.onload = preGame();
