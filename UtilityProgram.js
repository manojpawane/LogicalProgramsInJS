var Stopwatch = require("node-stopwatch").Stopwatch;
var binarySearch = async function(array, value) {
   var sortedArray = await Bubble_Sort(array);
    return  new Promise(function(resolve, reject) {
        try{
        var firstIndex  = 0,
        lastIndex   = sortedArray.length - 1,
        middleIndex = Math.floor((lastIndex + firstIndex)/2);
       while(sortedArray[middleIndex] != value && firstIndex < lastIndex)
       {
       if (value < sortedArray[middleIndex])
        {
            lastIndex = middleIndex - 1;
        } 
       else if (value > sortedArray[middleIndex])
        {
            firstIndex = middleIndex + 1;
        }
        middleIndex = Math.floor((lastIndex + firstIndex)/2);
    }
  return (sortedArray[middleIndex] != value) ? resolve(-1) : resolve(middleIndex);
     }
      catch(error)
      {
          reject(error);
      }  
})
}

var Bubble_Sort = function(arr){
    return new Promise(function(resolve, reject){
        try {
            var len = arr.length,
            i, j, stop;
    
        for (i=0; i < len; i++){
            for (j=0, stop=len-i; j < stop; j++){
                if (arr[j] > arr[j+1]){
                    swap(arr, j, j+1);
                }
            }
        }
        resolve(arr);
        } catch (error) {
            reject(error)
        }
    })
}

function swap(arr, first_Index, second_Index){
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
}

function insertion_Sort(arr)
{
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

var Utility = async function(){
    //Search for Integer
    var stopWatch =await Stopwatch.create();
    var numberArray = [12,25,41,8,6,45,14,65,54,21,1,5,4,7]
    var valueToSearch = 45;
    await stopWatch.start();
    var postionOfElement =await binarySearch(numberArray,valueToSearch);
    console.log('\nNo. found for Binary search at postion after sorting: '+ postionOfElement);
    console.log("seconds: " + stopWatch.elapsed.seconds + ' for Binary search for integer');
    await stopWatch.stop();

    var stopWatch1 =await Stopwatch.create();
    //Search for strings
    var fruits = ["Banana", "Orange", "Apple", "Mango", "One", "Two","Three", "Four", "Five"];
    var valueToSearchInFruitArray = 'Orange';
    await stopWatch1.start();
    var postionOfString = await binarySearch(fruits,valueToSearchInFruitArray);
    console.log('\nString found for Binary search at postion after sorting: '+ await postionOfString);
    console.log("seconds: " + stopWatch1.elapsed.seconds + ' for Binary search for string');
    await stopWatch1.stop();

    var stopWatch3 = await Stopwatch.create();
    await stopWatch3.start();
    var sortedDataForInteger =await Bubble_Sort(numberArray);
    console.log('\nSorted Data for integer as follows: ');
    console.log(sortedDataForInteger);
    console.log('Time for sorting integer using bubble sort: '+await stopWatch3.elapsed.seconds);
    await stopWatch3.stop();

    var stopWatch4 = await Stopwatch.create();
    await stopWatch4.start();
    var sortedDataForString =await Bubble_Sort(fruits);
    console.log('\nSorted Data for string as follows: ');
    console.log(sortedDataForString);
    console.log('Time for sorting string using bubble sort: '+await stopWatch4.elapsed.seconds);
    await stopWatch4.stop();

    var stopWatch5 = await Stopwatch.create();
    await stopWatch5.start();
    var sortedDataForStringInsertionSort =await insertion_Sort(fruits);
    console.log('\nSorted Data for string as follows using inserton sort: ');
    console.log(sortedDataForStringInsertionSort);
    console.log('Time for sorting string using insertion sort: '+await stopWatch5.elapsed.seconds);
    await stopWatch5.stop();

    var stopWatch6 = await Stopwatch.create();
    await stopWatch6.start();
    var sortedDataForInteger =await insertion_Sort(numberArray);
    console.log('\nSorted Data for integer as follows using insertion sort: ');
    console.log(sortedDataForInteger);
    console.log('Time for sorting integer using insertion sort: '+await stopWatch6.elapsed.seconds);
    await stopWatch6.stop();
}


Utility();


module.exports = {
BinarySearchFunction: binarySearch()
}