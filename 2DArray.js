var prompt = require('prompt');
var multiArray ;
//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get(['arrayRow', 'arrayCol'], function (err, result) {
var arrayRowLength = parseInt(result.arrayRow);
var arrayColLength = parseInt(result.arrayCol);

// create array
multiArray = new Array(arrayRowLength);
for (var i = 0; i < multiArray.length; i++) {
multiArray[i] = new Array(arrayColLength);
}
ask(0,0);

});

function ask(i,j) {
prompt.get(['value'], function(err, result) {
multiArray[i][j] = result.value;
if(j<multiArray[i].length-1)
{
j=j+1;
ask(i,j);
}
else if(i<multiArray.length-1){
j=0;
i=i+1;
ask(i,j);
}
else{
console.log("result",multiArray);
}
});
//}
}