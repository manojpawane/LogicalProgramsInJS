var SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
var RANKS = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];

var n = SUITS.length * RANKS.length;
var deck = new Array(n);

for(var i = 0; i < RANKS.length; i++){
    for(var k = 0; k < SUITS.length ; k ++){
        deck[SUITS.length * i + k] = RANKS[k] + " of " + SUITS[k];
    }
}

for(var j = 0; j < n; j++){
    var r = j + parseInt(Math.random() * (n-j));
    var temp = deck[r];
    deck[r] = deck[j];
    deck[j] = temp;
}

for(var l = 0; l < n; l++){
    console.log(deck[l]);
}