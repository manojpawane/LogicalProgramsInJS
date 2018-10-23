var readline = require('readline');
var r1 = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)
var response
var k=1;
var value = 0.0;
r1.question("Please enter number to find nth Harmonic Number: ", function(answer)
{
response = answer;
HarmonicLogic();
r1.close;
});

HarmonicLogic = function()
{
    if(response!=0){
        for(var i=1;i<=response;i++){
        value =  value + (1/i);
        console.log('h'+k+'\t'+value);
        k++;
        }
        console.log('The nth harmonic number is: ' +value);
    }
    else{
        console.log('Entered value is invalid.');
    }
}