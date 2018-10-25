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
	console.log('Please enter the element: ');
	var arrayData = new Array(answer);
	for (var i = 0; i < answer; i++) {
		await GetData.IntergerAddtionLogic(rl).then( async function (result) {
			arrayData[i] = await result;
		}, function (err) {
			console.log(err);
		});
	}
	DisplayData(arrayData);
	rl.close();
});

var DisplayData = function (dataFromMethodToDisplay) {
	console.log(dataFromMethodToDisplay);
}






