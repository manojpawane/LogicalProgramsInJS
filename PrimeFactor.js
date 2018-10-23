var readline = require('readline');
var r1 = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    }
);
var response 
r1.question("Enter the number to find prime factor:", function(answer){
 response = answer
 PrimeFactor();
 r1.close();
});

PrimeFactor =  function()
{
    if(response < 1){
        console.log('Please enter valid number.');
    }
    else
    {
        for(var i= 1; i<= response/2;i++)
        {
            if(response%i === 0)
            {
                var flag=0;
                for(var j=2;j<i;j++)
                {
                    if(i%j===0)
                    {
                        flag =1;
                        break;
                    }
                }
                if(flag === 0)
                {
                    console.log(i);
                }
            }
        }
    }
    }

