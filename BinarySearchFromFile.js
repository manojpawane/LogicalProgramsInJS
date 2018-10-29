var readline = require('readline');
var rl =  readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

var fs = require('fs');
var content = {}
var ReadFile = function(){
    return new Promise(function(resolve, reject){
        try{
            fs.readFile('Data.txt',  function(err, contents){
                if(!err){
                      resolve(contents.toString().split(","));
                }
                
            })
        }
       catch(error)
       {
           reject(error)
       }
    })
}

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
var ReadForBinarySearch = async function(){
    var readData = await ReadFile();
    await rl.question('Please enter the word you need to search in the file: ',async (answer)=>{
        var postion =await binarySearch(readData, answer);
        if(postion === -1)
        {
            console.log('Value not present');
        }
        else{
            console.log('The value is present in the file and present at postion: '+ postion);
        }
        rl.close();
    })
    
}

ReadForBinarySearch();