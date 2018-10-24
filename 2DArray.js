var readline = require('readline');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

var rows
var columns
rl.question('Enter the number of rows in array', (answer)=>
{
    rl.question('Enter the number of columns in array', (answer1)=>
    {
        rows = answer;
        columns = answer1;
        martrix();
        rl.close();
    });
});

