var myArgs = process.argv.slice(2);
var x = myArgs[0];
var y = myArgs[1];

var distance = Math.sqrt((x*x) + (y*y));
console.log('The Euclidean distance is: ' + distance);

