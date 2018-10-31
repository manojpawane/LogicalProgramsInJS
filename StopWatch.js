var readline = require('readline');


var read = readline.createInterface({
input: process.stdin,
output: process.stdout
});

var startTime;
var stopTime;
var elapsedTime;

function stopWatch() {
read.question("Enter 1 to start watch : ",(start) => {
startTime = getCurrentTime();
if(start) {
read.question("Enter 0 to stop watch : ",(stop) => {
stopTime = getCurrentTime();
elapsedTime = elapsedTime(startTime,stopTime);
/*
* Prints the calculated elapsed time between start and stop.
*/
console.log("Total elapsed time in miliseconds: "+elapsedTime+"ms");
console.log("Total elapsed time in seconds: "+(elapsedTime/1000)+"sec.");
});
}
});
}


var getCurrentTime = function() {
    var d = new Date();
    var n = d.getTime();
    return n;
    }
    
  var  elapsedTime = function(start, stop) {
    elapsesTime = stop - start;
    return elapsesTime;
    }

    stopWatch();