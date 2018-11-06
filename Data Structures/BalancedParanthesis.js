var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var BalancedExpression = function(){
    rl.question('Please enter the expression: ',(answer)=>{
        ExpressionChecker(answer);
        rl.close();
    })
}

var ExpressionChecker = function(value){
    var stack = [];
    var expression = value.trim().toString().split('');
    for(var i=0 ; i<expression.length; i++){
        if(expression[i] === '('){
            stack.push('(');
        }
        if(expression[i] === ')'){
            stack.pop(')');
        }
    }
    if(stack.length > 0){
        console.log('Expression not balanced..');
    }
    else{
        console.log('Expression is balanced..');
    }
    
    console.log(stack);
}

BalancedExpression();