var readline = require('readline');
var GetData = require('./GetData');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

var TakeInputForInsertionSort =async function(){
rl.question('Enter the length of number you want to sort: ',async (answer)=>{
    var array = new Array(answer);
    console.log('Please enter the words in list');
            for(var i =0; i< answer; i++){
                var result = await GetData.IntergerAddtionLogic(rl);
                array[i] = result;
            }
            var sortedData = await InsertionSort(array);
            console.log('Sorted data: '+sortedData);   
            rl.close();     
})
}

var InsertionSort = function(arr){
    for (var i = 1; i < arr.length; i++) 
    {
      if (arr[i] < arr[0]) 
      {
        //move current element to the first position
        arr.unshift(arr.splice(i,1)[0]);
      } 
      else if (arr[i] > arr[i-1]) 
      {
        //leave current element where it is
        continue;
      } 
      else {
        //find where element should go
        for (var j = 1; j < i; j++) {
          if (arr[i] > arr[j-1] && arr[i] < arr[j]) 
          {
            //move element
            arr.splice(j,0,arr.splice(i,1)[0]);
          }
        }
      }
    }
    return arr;
  }


  TakeInputForInsertionSort();