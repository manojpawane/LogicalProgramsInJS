var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    });

    var response
    rl.question('Please enter the size of array.', (answer)=>{
        response = answer
        AdditionToZero()
        rl.close();
    });

    AdditionToZero = function(){
        var arrayData = new Array[response];
        var count = 0;
        
    }


    