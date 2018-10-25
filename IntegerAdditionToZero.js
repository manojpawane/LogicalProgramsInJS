var readline = require('readline');
var rl = readline.createInterface(
	{
		input: process.stdin,
		output: process.stdout
	}
);
var GetData = require('./GetData');
var response
var data
rl.question('Please enter the size of array.', async (answer) => {
	console.log('Entered value ', answer);
	response = answer
	console.log('Please enter the element: ');
	var arrayData = new Array(answer);
	for (var i = 0; i < answer; i++) {
		await GetData.IntergerAddtionLogic(rl).then( async function (result) {
			arrayData[i] = await result;
		}, function (err) {
			console.log(err);
		});
	}
	AdditionToZero(arrayData);
	rl.close();
});


var AdditionToZero = function (arr) {
	var count = 0;
	for(var j = 0 ; j < response ; j++)
		{
			for(var k = 0 ; k < response ; k++)
			{
				for(var l = 0 ; l < response ; l++)
				{
					if( (arr[j]*1) + (1*arr[k]) + (1*arr[l]) === 0)
					{
						console.log("Sum of "+arr[j]+" "+arr[k]+" "+arr[l]+" is Equal to Zero" );
						count++;
					}
				}
			}

		}
console.log("The no. of distinct varaible: " +count);
}






