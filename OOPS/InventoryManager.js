
var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var Linkedlist = require('./LinkedList');

/// model for product details
var productDetails = function(id, name, weight, price){
   this.id = id;
   this.name = name;
   this.weight = weight;
   this.price = price;
}

/// model for product update
var Product = function(rice, wheat, pulses){
 this.rice = rice;
 this.wheat = wheat;
 this.pulses= pulses;
}

/// array declarion
var rice = new Array();
var wheat = new Array();
var pulses = new Array();
var linklist = new Linkedlist();

/// logic to update information in file
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


/// switch control for CRUD operation
var switchControl =  function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter you choice: ',async (answer)=>{
                switch(answer){
                    case '1': await chooseProduct() ;
                              break;
                    case '2': await updateProduct();
                              break;
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

/// choose product logic
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

/// add product logic
var addProduct = function(){
    return new Promise(function(resolve, reject){
        try {
            // async.series([
            //     function(callback){
            //         rl.question('Please enter the name of product: ',(answer1)=>{
            //             callback(null, answer1);
            //         });
            //     },
            //     function(data1, callback){
            //         rl.question('Please enter the id for product: ',(answer2)=>{
            //             callback(null, answer2);
            //         });
            //     },
            //     function(data2, callback){
            //         rl.question('please enter the price for product: ',(answer3)=>{
            //             callback(null, answer3);
            //         });
            //     },
            //     function(data3, callback){
            //         rl.question('Please enter async jhgthe weight of the product: ',async (answer4)=>{
            //             callback(null, answer4);
            //         });
            //     }
            // ], 
            // function(error, data){

            // })
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

/// view product logic
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

    /// logic to display json data of wheat which is present in file
    for(let i = 0; i < dataFromFile.wheat.length; i++){
        console.log(dataFromFile.wheat[i].id  +  '   ' +
                     dataFromFile.wheat[i].name  +  '   ' +
                     dataFromFile.wheat[i].price  + '      ' +
                     dataFromFile.wheat[i].weight   + '        '+
                     dataFromFile.wheat[i].weight * dataFromFile.wheat[i].price);
    }
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

/// logic to delete the product
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

/// logic to delete rice
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

/// logic to delete wheat information
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

/// logic to delete pulses
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

/// method to select which variety is need to update
var updateProduct = function(){
    return new Promise(function(resolve, reject){
        try {
            console.log('1. Update Rice');
            console.log('2. Update Wheat');
            console.log('3. Update Pulses');
            rl.question('Please enter the choice to update your data',async (answer)=>{
                switch(answer){
                    case '1':await updateRice();
                             await dataEntered();
                             break;
                    case '2':await updateWheat();
                            await dataEntered();
                            break;
                    case '3':await updatePulses();
                             await dataEntered();
                             break;
                }
                resolve(answer);
            })

        } catch (error) {
            reject(error)
        }
    })
}

/// logic to update information for rice
var updateRice = function(){
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
            var id = await getUpdateId();
                     displayChoice();
            var choice = await getChoice();
            var information = await getUpdateInformation(); 
            console.log('pl'+id);
            
            /// this loop is used to update specific information
            for(var ij = 0;ij < rice.length; ij++){
                console.log(rice[ij].id);
                if(rice[ij].id === id){
                    console.log('choice: '+choice);
                    if(choice === '1'){
                        console.log('one in if');
                        rice[ij].name = information;
                    }
                    else if(choice === '2'){  
                        console.log('one in else if');
                        rice[ij].price = information;
                    }
                    else{
                        console.log('in test');
                        rice[ij].weight = information;
                    }
                }
            }         
            console.log('hi')    ;
        resolve(rice);
    }
        } catch (error) {
            reject(error)       ;
        }
    })
}

/// logic to update information for wheat
var updateWheat = function(){
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
            var id = await getUpdateId();
                     displayChoice();
            var choice = await getChoice();
            var information = await getUpdateInformation(); 
            /// this loop is used to update specific information
            for(var ij = 0;ij < wheat.length; ij++){
                console.log(wheat[ij].id);
                if(wheat[ij].id === id){
                    console.log('choice: '+choice);
                    if(choice === '1'){
                        console.log('one in if');
                        wheat[ij].name = information;
                    }
                    else if(choice === '2'){  
                        console.log('one in else if');
                        wheat[ij].price = information;
                    }
                    else{
                        console.log('in test');
                        wheat[ij].weight = information;
                    }
                }
            }         
            console.log('hi')    ;
        resolve(wheat);
    }
        } catch (error) {
            reject(error)       ;
        }
    })
}

/// logic to update information for pulses
var updatePulses = function(){
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
            var id = await getUpdateId();
                     displayChoice();
            var choice = await getChoice();
            var information = await getUpdateInformation(); 
            
            /// this loop is used to update specific information
            for(var ij = 0;ij < pulses.length; ij++){
                console.log(pulses[ij].id);
                if(pulses[ij].id === id){
                    console.log('choice: '+choice);
                    if(choice === '1'){
                        console.log('one in if');
                        pulses[ij].name = information;
                    }
                    else if(choice === '2'){  
                        console.log('one in else if');
                        pulses[ij].price = information;
                    }
                    else{
                        console.log('in test');
                        pulses[ij].weight = information;
                    }
                }
            }         
            console.log('hi')    ;
        resolve(pulses);
    }
        } catch (error) {
            reject(error)       ;
        }
    })
}

/// method to display the choice to update
var displayChoice = function(){
    console.log('1. Update Name. ');
    console.log('2. Update Price ');
    console.log('3. Update Weight ');
}

///  method to know which information need to update
var getChoice = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice to edit the information: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error);
        }
    })
    }

/// method to get id for which information need to update
var getUpdateId = function(){
return new Promise(function(resolve, reject){
    try {
        rl.question('Please enter the Id to which information is to edit: ',async (answer)=>{
            resolve(answer);
        })
    } catch (error) {
        reject(error);
    }
})
}

/// method to get the update information which need to update
var getUpdateInformation = function(){
return new Promise(function(resolve, reject){
    try {
        rl.question('Please enter the information to update: ',(answer)=>{
            resolve(answer);
        })
    } catch (error) {
        reject(error);
    }
})
}

startUp();