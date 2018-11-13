var Queue = require('./Queue');
var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
);

var queue = new Queue();
rl.question('Please enter the minimum number of the range: ', (answer)=>{
    rl.question('please enter the maximum number of the range: ',async (answer2)=>{
       var primeNumber = await EvaluatePrimeNumber(answer, answer2)
       var array4 = new Array();
       var anagramInRange = await anagramChecker(primeNumber);
        for(var m = 0; m < anagramInRange.length ; m++){
            queue.enqueue(anagramInRange[m]);
        }
        await displayQueue();
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

var anagramChecker =  function(arr){
    var arr1 = new Array();
    var x = 0;
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var a1 = '' + parseInt(arr[i]);
            var a2 = '' + parseInt(arr[j]);
            if ((((a1.split('')).sort()).join()) === (((a2.split('')).sort()).join())) //checking for anagram
            {
                str = (a1+ ' '+a2);
                arr1.push(str);
                str = "";
            }
        }
}
return arr1;
}

var displayQueue = function(){
            let current = queue.head;
            while(current){
                console.log(current.value);
                current = current.next;
      
}
}