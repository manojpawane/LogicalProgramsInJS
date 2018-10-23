var readline = require('readline');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

var i=0;
var j=0;
var k=0;
var response
rl.question("Enter the number of coupons need to generate: ", (answer)=>{
    response = answer
    CouponsGeneration()
});
var numberOfCoupons = new Array(response)

CouponsGeneration = function()
{
for (k = 0; j < response; k++) {
    var flag = 0;
    var random = randomIntInc(1, response)

    for(i=0;i<j;i++)
    {
        if(numberOfCoupons[i] === random)
        {
            flag =1;
            break;
        }
    }
    if(flag === 0)
    {
        numberOfCoupons[j] = random;
        j++;
    }
  }

  console.log('No. of coupons need to generated: ' +j);
  console.log('No. of random calls need to generate unique coupons. ' + k);

  for(var l=0;l<j;l++)
  {
      console.log(numberOfCoupons[l]);
  }
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
  }