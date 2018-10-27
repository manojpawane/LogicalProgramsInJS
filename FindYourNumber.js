var N =parseInt(process.argv.slice(2));

var readline = require('readline');
var rl =  readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var Search = function(low, high){
    return new Promise(function(resolve, reject){
        try{
        if(high - low == 1)
        {
         resolve(low);
        }
        var mid = low + (high - low) / 2;
        console.log('Is it less than: '+mid);
         rl.on('line', (answer)=>{
             if(answer === 'true')
             {    console.log('check 1: '+parseInt(high-low))
                  console.log('testing true');
                  return(Search(low, mid));
             }
             else
             {
                 console.log('check 2: '+parseInt(high-low))
                 console.log('testing false');
                 return(Search(mid, high));
             }
         })}
         catch(error)
         {
             reject(error)
         }
    })
                      
}

var FindYourNumber = async function(){
    var n = parseInt(Math.pow(2, N));
    await console.log('Think of an integer between 0 and '+ parseInt(n-1));
    var secret = await Search(0, n);
    console.log('Your number is: '+secret);
}

FindYourNumber();
