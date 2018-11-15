
var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var Linkedlist = require('./LinkedList');

var productDetails = function(id, name, weight, price){
   this.id = id;
   this.name = name;
   this.weight = weight;
   this.price = price;
}

var Product = function(rice, wheat, pulses){
 this.rice = rice;
 this.wheat = wheat;
 this.pulses= pulses;
}

var rice = new Array();
var wheat = new Array();
var pulses = new Array();
var linklist = new Linkedlist();

var dataEntered = function(){
    console.log('inside the dta enterd');
    var prod = new Product(rice,wheat, pulses);
    let data = JSON.stringify(prod);
    fs.writeFileSync('InventoryDetails.json', data); 
}

var startUp = async function(){
    var respone = null;
    do{
        console.log('1. Add content');
        console.log('2. Modify content');
        console.log('3. Delete COntent');
        console.log('4. View Content');
        await switchControl();
    }while(respone !=5)
}



var switchControl =  function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter you choice: ',async (answer)=>{
                switch(answer){
                    case '1': await chooseProduct() ;
                              break;
                    case '2': break;
                    case '3': await deleteProduct();
                              break;
                    case '4': await viewProduct();
                              break;
                    default:  break;
                }
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

var chooseProduct = function(){
    return new Promise(function(resolve, reject){
        try {
            console.log('1. Add Rice');
            console.log('2. Add Wheat');
            console.log('3. Add Pulses');
            rl.question('Please enter the variety you want to add: ',async (answer)=>{
                switch(answer){
                    case '1':var riceDet = await addProduct();
                             await rice.push(riceDet);
                             await dataEntered();
                             break;
                    case '2':var wheatDet = await addProduct();
                             await wheat.push(wheatDet);
                             await dataEntered();
                             break;
                    case '3':var pulsesDet = await addProduct();
                             await pulses.push(pulsesDet);
                             await dataEntered();
                             break;
                }
                resolve(answer);
            })
        } catch (error) {
            reject(error);
        }
    })
}

var addProduct = function(){
    return new Promise(function(resolve, reject){
        try {
                rl.question('Please enter the name of prodct: ',(answer1)=>{
                    rl.question('Please enter the id for product: ',(answer2)=>{
                        rl.question('please enter the price for product: ',(answer3)=>{
                            rl.question('Please enter the weight of the product: ',async (answer4)=>{
                                    var productObject = await new productDetails(answer2, answer1, answer4, answer3);
                                    resolve(productObject);
                            })
                        })
                    })
                })      
        } catch (error) {
            reject(error);
        }
    })
}

var viewProduct =async function(){
    var dataFromFile = await readFileForJson();
    console.log('Id   Name   Price   Quantity   Total');
    
    /// logic to display json data of Rice which is present in file
    for(let i = 0; i < dataFromFile.rice.length; i++){
        console.log(dataFromFile.rice[i].id  +  '   ' +
                    dataFromFile.rice[i].name  +  '   ' +
                     dataFromFile.rice[i].price  + '      ' +
                     dataFromFile.rice[i].weight   + '        '+
                     dataFromFile.rice[i].weight * dataFromFile.rice[i].price);
    }
    console.log('\n');

    /// logic to display json data of wheat which is present in file
    for(let i = 0; i < dataFromFile.wheat.length; i++){
        console.log(dataFromFile.wheat[i].id  +  '   ' +
                     dataFromFile.wheat[i].name  +  '   ' +
                     dataFromFile.wheat[i].price  + '      ' +
                     dataFromFile.wheat[i].weight   + '        '+
                     dataFromFile.wheat[i].weight * dataFromFile.wheat[i].price);
    }
    console.log('\n');

    /// logic to display json data of pulses which is present in file
    for(let i = 0; i < dataFromFile.pulses.length; i++){
        console.log(dataFromFile.pulses[i].id  +  '   ' +
                     dataFromFile.pulses[i].name  +  '   ' +
                     dataFromFile.pulses[i].price  + '      ' +
                     dataFromFile.pulses[i].weight   + '        '+
                     dataFromFile.pulses[i].weight * dataFromFile.pulses[i].price);
    }
}


/// function to read data from json file
var readFileForJson = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('InventoryDetails.json',(err, data)=>{
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

var deleteProduct = function(){
    return new Promise(function(resolve, reject){
        try {
            console.log('1. Delete Rice');
            console.log('2. Delete Wheat');
            console.log('3. Delete Pulses');
            rl.question('Please enter the choice to delete the product',async (answer)=>{
                    switch(answer){
                        case '1': await deleteRice();
                                 await dataEntered();
                                 break;
                        case '2':await deleteWheat();
                                 await dataEntered();
                                 break;
                        case '3':await deletePulses();
                                 await dataEntered();
                                break;
                                 break;
                    }
                    resolve(answer);
            })         
        } catch (error) {
            reject(error);
        }
    })
   
}

var deleteRice = function(){
    return new Promise(async function(resolve, reject){
        try {
            var dataFromFile = await readFileForJson();
            console.log('Id   Name   Price   Quantity   Total');
    
    /// logic to display json data of Rice which is present in file
    for(let i = 0; i < dataFromFile.rice.length; i++){
        console.log(dataFromFile.rice[i].id  +  '   ' +
                    dataFromFile.rice[i].name  +  '   ' +
                     dataFromFile.rice[i].price + '      ' +
                     dataFromFile.rice[i].weight + '      '+
                     dataFromFile.rice[i].weight * dataFromFile.rice[i].price);
    }
    var response = await deleteOption();

   for( var j = 0; j < rice.length; j++){ 
    if ( rice[j].id === response) {
        rice.splice(j, 1); 
    }
   }
   resolve(rice);
        } catch (error) {
            reject(error);
        }
    })
}

var deleteWheat = function(){
    return new Promise(async function(resolve, reject){
        try {
            var dataFromFile = await readFileForJson();
            console.log('Id   Name   Price   Quantity   Total');
    
    /// logic to display json data of Rice which is present in file
    for(let i = 0; i < dataFromFile.wheat.length; i++){
        console.log(dataFromFile.wheat[i].id  +  '   ' +
                    dataFromFile.wheat[i].name  +  '   ' +
                     dataFromFile.wheat[i].price + '      ' +
                     dataFromFile.wheat[i].weight + '      '+
                     dataFromFile.wheat[i].weight * dataFromFile.wheat[i].price);
    }
    var response = await deleteOption();

   for( var j = 0; j < wheat.length; j++){ 
    if ( wheat[j].id === response) {
        wheat.splice(j, 1); 
    }
   }
   resolve(wheat);
        } catch (error) {
            reject(error);
        }
    })
}

var deleteRice = function(){
    return new Promise(async function(resolve, reject){
        try {
            var dataFromFile = await readFileForJson();
            console.log('Id   Name   Price   Quantity   Total');
    
    /// logic to display json data of Rice which is present in file
    for(let i = 0; i < dataFromFile.rice.length; i++){
        console.log(dataFromFile.rice[i].id  +  '   ' +
                    dataFromFile.rice[i].name  +  '   ' +
                     dataFromFile.rice[i].price + '      ' +
                     dataFromFile.rice[i].weight + '      '+
                     dataFromFile.rice[i].weight * dataFromFile.rice[i].price);
    }
    var response = await deleteOption();

   for( var j = 0; j < rice.length; j++){ 
    if ( rice[j].id === response) {
        rice.splice(j, 1); 
    }
   }
   resolve(rice);
        } catch (error) {
            reject(error);
        }
    })
}

var deletePulses = function(){
    return new Promise(async function(resolve, reject){
        try {
            var dataFromFile = await readFileForJson();
            console.log('Id   Name   Price   Quantity   Total');
    
    /// logic to display json data of Rice which is present in file
    for(let i = 0; i < dataFromFile.pulses.length; i++){
        console.log(dataFromFile.pulses[i].id  +  '   ' +
                    dataFromFile.pulses[i].name  +  '   ' +
                     dataFromFile.pulses[i].price + '      ' +
                     dataFromFile.pulses[i].weight + '      '+
                     dataFromFile.pulses[i].weight * dataFromFile.pulses[i].price);
    }
    var response = await deleteOption();

   for( var j = 0; j < pulses.length; j++){ 
    if ( pulses[j].id === response) {
        pulses.splice(j, 1); 
    }
   }
   resolve(pulses);
        } catch (error) {
            reject(error);
        }
    })
}

var deleteOption = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the choice you want to delete: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error);
        }
    })
}

startUp();