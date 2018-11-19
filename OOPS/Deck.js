/// declartion of suits where C = CLUBS, D = DIAMOND,  H = HEARTS, S = SPADES
var SUITS = ['C', 'D', 'H', 'S']

/// declartion of respective cards rank
var RANKS = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];

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

/// all player card are pushed in common array to print it into 2D format
deckBox.push(playerOne);
deckBox.push(playerTwo);
deckBox.push(playerThree);
deckBox.push(playerThree);

/// displaying the card in 2D format where each row shows player number
for(var size = 0; size < deckBox.length ; size ++){
    console.log('Player '+ (size + 1) + ' '+deckBox[size].join('    '));
}