var readline = require('readline');
var Deque = require('./Deque');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var wordArr = [];
var wordStr = '';
var flag = true;
var deque = new Deque();
var startUp = async function(){
   await rl.question('Please enter the string to check whether it is palindrome or not: ',async (answer)=>{
        wordStr = answer;
        wordArr = wordStr.split('');
        for(var i = 0; i < wordArr.length; i++){
            deque.addRear(wordArr[i]);
        } 
        var res= await PalindromeChecker();
        if(res){
            console.log('Palindrome');
        }
        else{
            console.log('Not palindrome');
        }
        rl.close();
    })
}

var PalindromeChecker = function(){
    return new Promise(function(resolve, reject){
        try {
            if(deque.size() % 2 == 0){
                while(deque.size() > 0){
                    var rearElement = deque.removeRear();
                    var frontElement = deque.removeFront();
                    if(rearElement !== frontElement){
                        flag = false;
                    }
                }
            }
            else{
                while(deque.size() > 1){
                    var rearElement = deque.removeRear();
                    var frontElement = deque.removeFront();
                    if(rearElement !== frontElement){
                        flag = false;
                    }
                }
            }
           resolve(flag);
        } catch (error) {
            reject(error)
        }
    })
}
startUp();