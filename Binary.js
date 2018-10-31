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
 console.log('Binary representation for entered integer: '+data);
 var firstNibble = data.slice(0,4);
 var secondNibble = data.slice(4,9);
 var swapNibble = secondNibble + firstNibble;
 var dataSwapped = parseInt(swapNibble,2); 
 console.log('Binary representation after swapping nibble(s) of entered integer: '+swapNibble);
 var dataSwap=  Math.log2(dataSwapped) % 1;
 if(dataSwap === 0){
     console.log('After swapping ' +response+ ' we get '+ dataSwapped +' which is Power of 2')
 }
 else{
    console.log('After swapping ' +response+ ' we get '+ dataSwapped +' which is not Power of 2')
 }
 rl.close();
})

class BinaryRepresentation{
    static binaryRepresentation(){
            return (response >> 0).toString(2);
    }
}