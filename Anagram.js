var readline = require('readline');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question('Please enter first string: ',(answer)=>{
    rl.question('please enter second string: ',(answer2)=>{
        var string1 = Array.from(answer).sort();
        var string2 = Array.from(answer2).sort();
        if(string1.toString().localeCompare(string2.toString()))
        {
            console.log('Strings are not anagram');
        }
        else{
            console.log('strings are anagram');
        }
        rl.close();
    })
    
})