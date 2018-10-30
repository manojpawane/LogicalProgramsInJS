var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var response
rl.question('Please enter number to find binary representation. ',(answer)=>{
 response = answer
 var data = BinaryRepresentation.binaryRepresentation();
 console.log(data);
 rl.close();
})

class BinaryRepresentation{
    static binaryRepresentation(){
            return (response >> 0).toString(2);
    }
}