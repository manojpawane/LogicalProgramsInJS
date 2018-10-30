var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var t
rl.question('Please enter non negative number to find the square root:',(answer)=>{
    if(answer > 0){
        t = answer 
        NewtonsRule.FindSquareRoot();
        rl.close();
    }
    else{
        console.log('Please enter non negative number...')
        rl.close();
    }
})

class NewtonsRule{
   static async FindSquareRoot(){
       console.log('test 123');
       var data = await NewtonsRule.LogicToFindSquareRoot();
       console.log('value: '+data);
   }

    static LogicToFindSquareRoot(){
        return new Promise(function(resolve, reject){
            try {
                var c = t 
                var epsilon = Math.pow(10,-15)

                while (Math.abs(t - c/t) > epsilon*t) {
                    t = (c/t + t) / 2.0;
                }
                 
                // print out the estimate of the square root of c
                resolve(t);
            }
             catch (error) {
                reject(error)            
            }
        })
    }
}

