var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var response
var firstNibble;
var secondNibble;
var swapNibble;
rl.question('Please enter number to find binary representation. ',(answer)=>{
 response = answer
 var data = BinaryRepresentation.binaryRepresentation();
 console.log(data);
 var firstNibble = data.slice(0,4);
 var secondNibble = data.slice(4,9);
 var swapNibble = secondNibble + firstNibble;

 console.log(swapNibble);
 var dataSwap=  Math.log2(data) % 1;
 if(dataSwap === 0)
 {
     console.log('After swapping ' +swapNibble+ 'the integer  + ' is Power of 2')
 }
 else{
    console.log('After swapping the integer '+swapNibble + ' is not Power of 2')
 }
 console.log(data);
 rl.close();
})

class BinaryRepresentation{
    static binaryRepresentation(){
            return (response >> 0).toString(2);
    }
}