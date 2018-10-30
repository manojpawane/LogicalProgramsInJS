var readline = require('readline')
var rl =  readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

console.log('Temperature conversion');
console.log('1. Fahrenheit to Celsius');
console.log('2. Celsius to Fahrenheit');
var response
rl.question('Please select the choice: ', (answer)=>{
    response = parseInt(answer)
 switch(response){
    case 1: FahToCel();
            break;
    case 2: CelToFah();
            break;
    default: console.log('Invalid entry')
}
})

var FahToCel = function(){
    var celsius
    rl.question('Please enter temperature in Fahrenhrit: ',(answer)=>{
        celsius =(answer - 32) * 5/9
        console.log('Temperature in celsius is: '+celsius);
        rl.close();
    })
}

var CelToFah = function(){
    var fahrenheit;
    rl.question('Please enter temperature in Celsius: ',(answer)=>{
        fahrenheit = (answer * 9/5) + 32
        console.log('Temperature in fahrenheit is: '+fahrenheit);
        rl.close();
    })
}