var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
);

rl.question('Please enter the value of A: ',(answer)=>{
    rl.question('Please enter the value of B: ',(answer1)=>{
        rl.question('Please enter the value of C: ',(answer2)=>{
            var delta = answer1*answer1 - 4 * answer * answer2;
            var rootOne =  (-answer1 + Math.sqrt(delta))/(2*answer);
            var rootTwo = (-answer1 - Math.sqrt(delta))/(2*answer);
            console.log('Root 1 of x ' + rootOne);
            console.log('Root 2 of x ' + rootTwo);
            rl.close();
        })
    })
})