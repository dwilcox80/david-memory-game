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

function createCard(card) {
	return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
 //grab the moves counter
 let moves = document.querySelector('.moves');
 let counter = 0;

 //declare time variables
let timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
let hours = 0;
let myTimer;

 //grab stars in stat section
 const stars = document.querySelectorAll('.stars li');

//grab the deck
let deck = document.querySelector('.deck');

//create array to hold cards for comparison
let openCards = [];

//create array for cards that are matched
let matchCards = [];

//grab all <li> elements with class of '.card'
let cards = document.querySelectorAll('.card');

 //dynamically generate game board with randomized cards
 function preGame() {
 	// map cardClasses
 	let cardHTML = shuffle(cardClasses).map(function(card) {
 		return createCard(card);
 	});
 	//join mapped cardHTML to the game board
 	deck.innerHTML = cardHTML.join('');
 	counter = 0;
	moves.innerHTML = `${counter} Moves`;
	timer.innerHTML = `${hours} hrs ${minutes} mins ${seconds} sec`;
 }

 //call preGame
 document.onload = preGame();

//function to increment moves
 function moveCounter() {
	counter ++;
	if (counter === 1) {
		moves.innerHTML = `${counter} Move`;
	}	else {
			moves.innerHTML = `${counter} Moves`;
	}
	if (counter > 10 && counter < 16) {
    		for (let  i= 0; i < 3; i++) {
	   		if (i > 1) {
		 	stars[i].style.color = "#000";
	   		}
		}
	}
		else if (counter > 16) {
			for (let i= 0; i < 3; i++) {
	   			if (i > 0) {
		  			stars[i].style.color = "#000";
	   			}
			}
		}
}

//function to track time
// let beginTimer = setInterval(function(){
// 	timer.innerHTML = `${hours} hrs ${minutes} mins ${seconds} sec`;
// 	if (seconds === 59) {
// 		if (minutes === 59) {
// 			hours++;
// 			minutes = 0;
// 			seconds = 0;
// 		}	else {
// 				minutes++;
// 				seconds = 0;
// 		}
// 	}	else {
// 			seconds++;
// 		}
// }, 1000);

function beginTimer () {
	console.log('inside begin');
	let myTimer = setInterval(resetTimer, 1000);
	function resetTimer () {
		console.log('inside reset');
		if (matchCards.length !== 16) {
			console.log('inside counter');
			if (seconds === 59) {
				if (minutes === 59) {
					hours++;
					minutes = 0;
					seconds = 0;
				}	else {
						minutes++;
						seconds = 0;
				}
			}	else {
					seconds++;
				}
		timer.innerHTML = `${hours} hrs ${minutes} mins ${seconds} sec`;
		} else {
			console.log('inside clear');
			clearInterval(myTimer);
		}
	}
}

//add event listener to deck and rely on event delegation
deck.addEventListener('click', showCard);

//function to show a card and prevent double clicking
function showCard(evt) {
	if (evt.target.nodeName === 'LI') {
		if (!evt.target.classList.contains('show', 'open') && !evt.target.classList.contains('match')) {
			openCards.push(evt.target);
			evt.target.classList.add('show','open');
			if (openCards.length === 1 && (hours === 0 && minutes === 0 && seconds === 0)) {
				console.log('timer start');
				beginTimer();
			}
			if (openCards.length === 2) {
				if (openCards[0].dataset.card === openCards[1].dataset.card)  {
					match();
				}
					else {
						noMatch();
					}
				openCards = []; // empty openCards array for next pair to be compared
				moveCounter();
			}
			if (matchCards.length === 16) {
				endGame();
				// clearInterval(beginTimer);
			}
		}
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

// add option to reset Game
let reset = document.getElementById('reset-button');
reset.addEventListener('click', resetGame);
function resetGame (cards, stars) {
	for (let card of cards) {
		card.classList.remove('show','open','match');
	}
	counter = 0;
	moves.innerHTML = `${counter} Moves`;
	// resetTimer();
}

function endGame () {
	modal.style.display = "block";

}

// modal variables
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
