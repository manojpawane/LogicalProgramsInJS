var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)
/// Importing linkedlist object from utility class
var Linkedlist = require('./LinkedList');
/// importing stock model from commercial data
const {Stock} = require('./CommercialData');
/// importing funtion to read and write the file
var fs = require('fs');

/// startup function
var startUp =async function(){
var respone = null;
do{
    console.log('1. Add Stock');
    console.log('2. Remove Stock');
    console.log('3. View Stock');
    console.log('4. Save');
    respone = await switchControl();
}
while(respone != 6)
}

/// switch control to select operation
var switchControl = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice: ',async (answer)=>{
                switch(answer){
                    /// option 1 to add stock
                    case '1':await addStock();
                             break;
                    /// option 2 to remove existing stock                             
                    case '2':await removeStock();
                             break;
                    /// option 3 to display the stock                             
                    case '3':await displayDataFromList();
                             break;
                    /// option 4 to save into file                             
                    case '4':await saveDataIntoFile()                             ;
                             break;
                }
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// list in which company stock list is added
var companyShareList = new Linkedlist();
/// stock model imported from commercial data
var stock = new Stock();
/// array declartion to get a data
var stockCompanyData = new Array();

/// function to save data into file
var saveDataIntoFile = function(){
    return new Promise(function(resolve, reject){
        try {
            /// get the current head node for list to save all data
            let current = companyShareList.head;
            while(current){
                stockCompanyData.push(current.value);
                current = current.next;
            }
            /// write funtion to write the data into file
            fs.writeFileSync('Stock.json', JSON.stringify(stockCompanyData));
            resolve(stockCompanyData);
        } catch (error) {
            reject(error);
        }
    })
}

/// function to remove the stock from list
var removeStock = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// call display function to display the data
            await displayDataFromList();
            rl.question('Please enter the id to delete the stock',async (answer)=>{
            /// calling the delete logic function
             var deleteValue =  await deleteStock(answer);
            resolve(deleteValue);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// delete logic for stock which accept parameter as id
var deleteStock = function(id){
    return new Promise(function(resolve, reject){
        try {
            id = parseInt(id);
            let currentNode = companyShareList.head;
            let valueFound = null;
                while(currentNode){
                    /// here it checks to find the enter value is present in the list
                    if(currentNode.value._id === id){
                        valueFound = currentNode.value._id
                        /// here it will check if value is present 
                        if(companyShareList.head.value._id === id){
                            if(!companyShareList.tail){
                                resolve (null);
                            }
                            companyShareList.head = companyShareList.head.next;
                            /// here it will delete if value is present in head
                            if(companyShareList.head){
                                companyShareList.head.prev = null;
                            }
                            else{
                                companyShareList.tail = null;
                            }	
                        }
                        /// here it will delete if value is present in the tail
                        else if(companyShareList.tail.value._id === id){
                            if(!companyShareList.tail){
                                resolve(null);
                            }
                            companyShareList.tail = companyShareList.tail.prev
                            if(companyShareList.tail){
                                companyShareList.tail.next = null;
                            }
                            else{
                                companyShareList.head = null
                            }
                        }   
                        /// here it will delete value if it is present at any node 
                        else{
                            let tempPrevNode = currentNode.prev;
                            let tempNextNode = currentNode.next;
                            tempPrevNode.next = tempNextNode;
                            tempNextNode.prev = tempPrevNode;
                        }
                    }
                    currentNode = currentNode.next;
    }
    resolve (valueFound);

        } catch (error) {
            reject(error)
        }
    })
}

/// logic to add stock
var addStock = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// get the id for new stock
                rl.question('Please enter the id for new stock: ',(answer)=>{
                    /// get the name for new stock
                    rl.question('Please enter the name for new stock: ',(answer1)=>{
                        /// get the price of new stock
                        rl.question('Please enter the price per share: ',(answer2)=>{
                            /// get the number of total share for stock
                            rl.question('Please enter the total number of share: ',async (answer3)=>{
                                /// adding all values in the model
                                var stockDatal = new Stock();
                                stockDatal._id = parseInt(answer);
                                stockDatal._name = answer1;
                                stockDatal._price = parseInt(answer2);
                                stockDatal._availableShares = parseInt(answer3);
                                companyShareList.addToHead(stockDatal);
                                resolve(companyShareList);
                            })
                        })
                    })
                })         
        } catch (error) {
            reject(error);
        }
    })
}

/// logic to display the data
var displayDataFromList = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// getting the head node of the list
            let current = companyShareList.head;
            while(current){
                /// getting data to display on console
                stockInfo = current.value;
                let id = stockInfo._id;
                let name = stockInfo._name;
                let availableShares = stockInfo._availableShares;
                let price = stockInfo._price;
                console.log(id +'   '+ name + ' ' + availableShares + '  ' + price);
                current = current.next;
            }
            resolve(current);
        } catch (error) {
            reject(error);
        }
    })
}

/// this logic is render at the beginning to read the file and add data in linklist to perform operation easily
var addDataToList = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// reading data from file
            var stockData = await readDataFromFile('Stock.json');
            for(var stk = 0; stk < stockData.length; stk++){
                 stock = stockData[stk];
                 /// adding data into the linklist from the head
                companyShareList.addToHead(stock);
                resolve(companyShareList);
            }

        } catch (error) {
            reject(error)
        }
    })
}

/// logic to read data from file
var readDataFromFile = function(fileName){
    return new Promise(function(resolve, reject){
        try {
                fs.readFile(fileName, (err, data)=>{
                    if(err){
                        throw err;
                    }
                    else{
                        let datal = JSON.parse(data);
                        resolve(datal);
                    }
                })            
        } catch (error) {
            reject(error)
        }
    })
}
startUp();
addDataToList();