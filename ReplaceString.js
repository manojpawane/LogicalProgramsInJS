var readline = require('readline');
var r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
var stringName = 'Hello <<UserName>>, How are you?';
var response
r1.question("Enter the Name. ", function(answer)
{
response = answer
outside ();
r1.close();
});
outside = function(){
if(response.length>3)
{
 stringName = stringName.replace(/<<UserName>>/i , response);
 console.log(stringName);
}
else
{
    console.log('Please enter valid name');
}
}
