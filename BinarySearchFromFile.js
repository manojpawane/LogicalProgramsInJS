var UtilityFileClass = require('./UtilityProgram').binarySearch;
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
            console.log('data')
            fs.readFile('Data.txt',  function(err, contents){
                if(!err){
                      resolve(contents.toString());
                }
                
            })
        }
       catch(error)
       {
           reject(error)
       }
    })
}

var ReadForBinarySearch = async function(){
    var readData = await ReadFile();
    console.log('ReadData: ' +readData);
    await rl.question('Please enter the word you need to search in the file',async (answer)=>{
        var postion =await UtilityFileClass.BinarySearchFunction(readData, answer);
        console.log('The value is present in the file and present at postion: '+ postion);
        rl.close();
    })
    
}

ReadForBinarySearch();