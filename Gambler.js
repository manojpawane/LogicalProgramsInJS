var readline = require('readline');
var r1= readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    });

var win=0;
var loss=0;
var count=0;
var price=0;
var goal=0;
var stake=0;
var bet=0;

r1.question("Enter the stake with you.", (answer)=>{
    r1.question("Enter the number of times you want to bet: ", (answer1)=>{
        r1.question("Enter the Goal amount.", (answer2)=>{
            stake = answer;
            bet = answer1;
            goal = answer2;
            GamblingLogic();
            r1.close();
        });        
    });
});

GamblingLogic = function()
{
while(count<bet && stake<goal && stake!=0)
{
    var gamble = Math.random();
    if(gamble>0.5)
	{
		win++;
		stake=stake+2;
		count++;
	}
	else
	{
		loss++;
		stake=stake-1;
		count++;
    }
}
var winnerPercentage = (win/count)*100;
var lossPercentage = (loss/count)*100;

console.log("No. of times gambler win: "+win);
console.log("No of time gambler loose: "+loss);
console.log("Wining percentage: "+Math.round(winnerPercentage*100)/100 + " %");
console.log("Lossing percentage: "+Math.round(lossPercentage*100)/100 + " %");
console.log("Stake: "+ stake);
console.log("Goal: "+ goal);
}

