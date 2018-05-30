/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //array to hold <i> element classes for shuffling
const cardIconClasses = ['fa fa-diamond', 'fa fa-diamond',
							'fa fa-anchor',  'fa fa-anchor',
							'fa fa-bolt', 'fa fa-bolt',
							'fa fa-cube', 'fa fa-cube',
							'fa fa-bomb','fa fa-bomb',
							'fa fa-bicycle', 'fa fa-bicycle',
							'fa fa-leaf', 'fa fa-leaf',
							'fa fa-paper-plane-o', 'fa fa-paper-plane-o'
							];

//selecting <i> elements and store them in array
const card = document.querySelectorAll('i');
const cardz = [...card];

//for every element in card array, remove classes
function removeCardClasses() {
	for (let i = 0; i < cards.length; i++) {
		cards[i].setAttribute('class','');
	}
}

//for every element in card array, add class from cardIconClasses array
function addCardClasses() {
	for (let i = 0; i < cards.length; i++) {
		cardIconClasses.forEach(function() {
			cards[i].setAttribute('class', cardIconClasses[i]);
		});
	}
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

 //grab all li elements with class of 'card'
let cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
	card.addEventListener('click', function (event) {
		console.log(event);
	})
})
//function to display cards when clicked
function showCard() {
	this.classList.toggle('open');
	this.classList.toggle('show');
}

//create array to hold cards for comparison
let tempCardHold = [];

//function to push cards into comparison array
function pushCardHold() {
	tempCardHold.push(this);
	if (tempCardHold.length === 2) {
		let x = tempCardHold[0].innerHTML;
		let y = tempCardHold[1].innerHTML;
		if (x === y) {
			cardMatch();
		}
			else {
				noCardMatch();
			}
	}
}

//function defining actions for matching cards
function cardMatch () {
	tempCardHold[0].classList.toggle('match');
	tempCardHold[1].classList.toggle('match');
	tempCardHold = [];
}

//function defining actions for non-matching cards
function noCardMatch () {
	for (let i = 0; i < tempCardHold.length; i++) {
	tempCardHold[i].classList.toggle('no-match');
	}
	for (let i = 0; i < tempCardHold.length; i++) {
	// tempCardHold[1].classList.toggle('no-match');
	tempCardHold[i].classList.remove('show', 'open', 'no-match');
	// tempCardHold[0].classList.remove('open');
	// tempCardHold[1].classList.remove('show');
	// tempCardHold[1].classList.remove('open');
	}
	tempCardHold = [];
}

//set up variables for the game "statistics"
let moves = document.querySelector('.moves');
let stars = document.querySelector('.stars');
