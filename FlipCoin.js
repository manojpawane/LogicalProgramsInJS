var readline = require('readline');
var r1 = readline.createInterface({
 input: process.stdin,
 output:process.stdout
});

var response
r1.question("Enter number of time to flip the coin ", function(answer)
{
response = answer
FlipCoin();
r1.close();
});

FlipCoin = function()
{
    if(response>0)
    {
       var tails = 0;
       var head = 0;
       for(var number = 0; number < response; number++)
       {
          var toss = Math.random()
          console.log(toss);
          if(toss<0.5)
          {
             tails++;
          }
          else
          {
              head++;
          }
       }
       let tailPercentage = (tails/response)*100;
       let headPercentage = (head/response)*100;
       console.log('Number of time(s) you tossed the coin ' + response);
       console.log('The Percentage of tails you tossed ' + tailPercentage + '%');
       console.log('The percentage of Heads you tossed ' + headPercentage + '%');
    }
    else
    {
        console.log('Value cant be negative');
    }
}
