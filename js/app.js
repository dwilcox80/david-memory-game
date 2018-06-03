/*
* Create a list that holds all of your cards
*/
let cardIconClasses = ['fa-diamond','fa-diamond',
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
 let seconds = 0;
 let minutes = 0;
 let hours = 0;
 let timer = document.querySelector('.timer');

 //dynamically generate game board with randomized cards
 function preGame() {
 	//grab deck and map cardIconClasses
 	let deck = document.querySelector('.deck');
 	let cardHTML = shuffle(cardIconClasses).map(function(card) {
 		return createCard(card);
 	});
 	//join mapped cardHTML to the game board
 	deck.innerHTML = cardHTML.join('');
 	counter = 0;
 	timer.innerHTML = '0 hrs 0 min 0 sec';
 }

 //call preGame
 preGame();

//function to increment moves
 function moveCounter() {
	counter ++;
	moves.innerHTML = counter + '&nbsp; ';
 }

//function to track time
function beginTimer() {
		let interval = setInterval(function() {
		timer.innerHTML = hours + "&nbsp;hrs " + minutes + "&nbsp;min " + seconds + "&nbsp;sec";
		if (seconds === 59) {
			if (minutes === 59) {
				hours++;
				minutes = 0;
			}	else {
					minutes++;
			   		seconds = 0;
			}
          }	else {
				seconds++;
		}
	},1000);
}

//create array to hold cards for comparison
let tempOpenCard = [];

//create array for cards that are matched
let matchedCards = [];

//grab all <li> elements with class of '.card'
let cards = document.querySelectorAll('.card');

//loop through nodeList and add event listener
cards.forEach(function(card) {
	card.addEventListener('click', function(evt) {
		//show some cards and add them to the tempOpenCard array for comparison
		if (!card.classList.contains('show', 'open') && !card.classList.contains('match')) {
			tempOpenCard.push(card);
			card.classList.add('show','open');
		}
		//when tempOpenCard array reaches two cards, compare cards
		if (tempOpenCard.length === 2) {
			disable();
			//if cards do not match
			if (tempOpenCard[0].dataset.card !== tempOpenCard[1].dataset.card) {
				setTimeout(function() {
					tempOpenCard.forEach(function(card) {
						card.classList.add('no-match');
					});
				}, 500);
				setTimeout(function() {
					tempOpenCard.forEach(function(card){
						card.classList.remove('show','open');
						card.classList.remove('no-match');
					});
					enable();
					tempOpenCard = [];
				}, 1200);
				moveCounter();
			}
				else {
					tempOpenCard.forEach(function(card) {
						card.classList.add('match', 'pulse');
						card.classList.remove('show', 'open');
						matchedCards.push(card);
					});
					enable();
					moveCounter();
					tempOpenCard = [];
				}
		}
	});
});

//function to temporarily disable card 'click' event
function disable() {
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

disable();

//function to re-enable card 'click' event
function enable() {
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
    });
}

//grab begin game button
let beginButton = document.getElementById('begin-button');

beginButton.addEventListener('click', function(evt) {
	enable();
	beginTimer();
});

// //winning the game!
// if (matchedCards.length === 16) {
// 	//stop timer
// 	//grab time
// 	//grab move count
// 	//grab stars
// 	//display modal
// 	if (playAgain) {
// 		startGame();
// 	}
// }

let stars = document.querySelector('.stars');
