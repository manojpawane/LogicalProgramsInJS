var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
);

var palindromeArray = new Array(100);
var anagramArray = new Array(100);

rl.question('Please enter the minimum number of the range: ', (answer)=>{
    rl.question('please enter the maximum number of the range: ',async (answer2)=>{
       var primeNumber = await EvaluatePrimeNumber(answer, answer2)
       var lengthOFArray = primeNumber.length;
       console.log('min range ' +answer);
       console.log('max range ' +answer2);
       console.log('Prime Number: '+primeNumber);
       rl.close();
    })
})

var EvaluatePrimeNumber = function(minRange, maxRange){
return new Promise(function(resolve, reject){
         try {
             var flag;
             var k=0;
             var primeNumber = new Array(maxRange);
             for(var i = (minRange*1) +1 ; i < maxRange ;  ++i){
             flag = 0;
             for(var j=2;j<=i/2;++j){
                if(i % j == 0)
                {
                   flag = 1;
                   break;
                }
            }
            if(flag == 0)
            {
                primeNumber[k] = i;
                k++;
            }
        } 
         resolve(primeNumber);
     } catch (error) {
         reject(error)
     }
    })  
}


var palidrome = function(){
  
}