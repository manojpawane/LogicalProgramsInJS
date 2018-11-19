var Queue = require('./../Data Structures/Queue');
/// declartion of suits where C = CLUBS, D = DIAMOND,  H = HEARTS, S = SPADES
var SUITS = ['C', 'D', 'H', 'S']

/// declartion of respective cards rank where 11 =  JACK, 12 = QUEEN, 13 = KING, 14 = ACE
var RANKS = ['2','3','4','5','6','7','8','9','10','11','12','13','14'];

/// size of deck
var n = SUITS.length * RANKS.length;
var deck = new Array(n);

/// assigning suits and rank for the cards in deck
for(var i = 0; i < RANKS.length; i++){
    for(var k = 0; k < SUITS.length ; k ++){
        deck[SUITS.length * i + k] = RANKS[i] + ' ' + SUITS[k];
    }
}

/// random function to set the cards in deck in random way as we distribute the card
for(var j = 0; j < n; j++){
    var r = j + parseInt(Math.random() * (n-j));
    var temp = deck[r];
    deck[r] = deck[j];
    deck[j] = temp;
}
/// array declartion to satisfy multi dimenton array
var deckBox = new Array();
/// declared array for player one so after distribution card can be stored to player one.
var playerOne = new Array();
/// declared array for player two so after distribution card can be stored to player two.
var playerTwo = new Array();
/// declared array for player three so after distribution card can be stored to player three.
var playerThree = new Array();
/// declared array for player four so after distribution card can be stored to player four.
var playerFour = new Array();
var commonArray = new Array();

/// here we pushed all random cards which was distributed to one common array
for(var l = 0; l < n; l++){
    commonArray.push(deck[l]);
}

/// here accordingly we are pushing cards for players accordingly their turn
for(var m = 0; m < n ; m ++){
    if(m < 13){
        playerOne.push(commonArray[m]);
    }
    if(m < 26 && m >= 13){
        playerTwo.push(commonArray[m]);
    }
    if(m < 39 && m >=26){
        playerThree.push(commonArray[m]);
    }
    if(m < 52 && m >= 39){
        playerFour.push(commonArray[m]);
    }
}

var playerOneQueue = new Queue();
var playerTwoQueue = new Queue();
var playerThreeQueue = new Queue();
var playerFourQueue = new Queue();

/// loop to add data in queue for player one
for(let size = 0; size < playerOne.length; size ++ ){
   playerOneQueue.enqueue(playerOne[size]);
}

/// loop to add data in queue for player two
for(let size = 0; size < playerTwo.length; size ++ ){
    playerTwoQueue.enqueue(playerTwo[size]);
 }

 /// loop to add data in queue for player three
 for(let size = 0; size < playerThree.length; size ++ ){
    playerThreeQueue.enqueue(playerThree[size]);
 }

 /// loop to add data in queue for player four
 for(let size = 0; size < playerFour.length; size ++ ){
    playerFourQueue.enqueue(playerFour[size]);
 }

/// displaying the card for player one in queue
let currentNodeForPOne = playerOneQueue.head;
console.log('Player One');
while(currentNodeForPOne){
    console.log(currentNodeForPOne.value);
    currentNodeForPOne = currentNodeForPOne.next;
}

/// displaying the card for player two in queue
let currentNodeForPTwo = playerTwoQueue.head;
console.log('Player Two');
while(currentNodeForPTwo){
    console.log(currentNodeForPTwo.value);
    currentNodeForPTwo = currentNodeForPTwo.next;
}

/// displaying the card for player three in queue
let currentNodeForPThree = playerThreeQueue.head;
console.log('Player Three');
while(currentNodeForPThree){
    console.log(currentNodeForPThree.value);
    currentNodeForPThree = currentNodeForPThree.next;
}

/// displaying the card for player four in queue
let currentNodeForPFour = playerFourQueue.head;
console.log('Player Four');
while(currentNodeForPFour){
    console.log(currentNodeForPFour.value);
    currentNodeForPFour = currentNodeForPFour.next;
}