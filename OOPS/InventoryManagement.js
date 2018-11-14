'use strict';
const fs = require('fs');


/// function to read data from json file
var readFileForJson = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('Inventory.json',(err, data)=>{
                if(err){
                    throw err;
                }
                else{
                    let datal = JSON.parse(data);
                    resolve(datal);
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

var startUp =async function(){
    var dataFromFile = await readFileForJson();
    // console.log(dataFromFile.Rice[0].Price);
    console.log('Name   Price   Quantity   Total');
    
    /// logic to display json data of Rice which is present in file
    for(let i = 0; i < dataFromFile.Rice.length; i++){
        console.log(dataFromFile.Rice[i].name  +  '   ' +
                     dataFromFile.Rice[i].price  + '      ' +
                     dataFromFile.Rice[i].weight   + '        '+
                     dataFromFile.Rice[i].weight * dataFromFile.Rice[i].price);
    }
    console.log('\n');

    /// logic to display json data of wheat which is present in file
    for(let i = 0; i < dataFromFile.Wheat.length; i++){
        console.log(dataFromFile.Wheat[i].name  +  '   ' +
                     dataFromFile.Wheat[i].price  + '      ' +
                     dataFromFile.Wheat[i].weight   + '        '+
                     dataFromFile.Wheat[i].weight * dataFromFile.Wheat[i].price);
    }
    console.log('\n');

    /// logic to display json data of pulses which is present in file
    for(let i = 0; i < dataFromFile.Pulses.length; i++){
        console.log(dataFromFile.Pulses[i].name  +  '   ' +
                     dataFromFile.Pulses[i].price  + '      ' +
                     dataFromFile.Pulses[i].weight   + '        '+
                     dataFromFile.Pulses[i].weight * dataFromFile.Pulses[i].price);
    }
}

startUp();