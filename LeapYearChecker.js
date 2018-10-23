var readline = require('readline');
var r1 = readline.createInterface({
input:process.stdin,
output:process.stdin
});

var response
r1.question('Enter the year to check whether it is leap or not ',  function(answer)
{
    response = answer
    leapYear();
    r1.close();
});

leapYear = function()
{
    if(response > 999 && response < 10000)
    {
        if((response % 400 === 0) || ((response % 4 === 0) && (response % 100 !== 0)))
        {
            console.log(response + ' is leap year');
        }
        else
        {
            console.log(response + ' is not leap year');
        }
    }
    else
    {
        console.log('Please enter valid year.');
    }
}