var args = process.argv.slice(2);
var k=1;
console.log('Value passed was: '+ args)
    if(args>0 && args<31){
        console.log('Value of N \t\tPower of 2' + '\n');
        for(var i=0;i<=args;i++)
        {
            console.log(i);
            for(var j=1;j<=i;j++)
            {
                k=k*2;
            }
            console.log('\t\t\t\t'+ k);
            k=1;
        }
    }
    else{
        console.log('Invalid Value passed.')
    }

