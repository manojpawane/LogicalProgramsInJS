'use strict'
var readline = require('readline');
var fs = require('fs');
var Linkedlist = require('./LinkedList');
var rl = readline.createInterface(
    {
        input: process.stdin,
        output:process.stdout
    }
)   
var Stack = require('.././Data Structures/Stack');
var stack = new Stack();

/// Importing models from utility class
const {Transaction, Customer, Stock} = require('./CommercialData');

/// startUp class for Commercial management
var startUp =async function(){
    var response = null;
    do{
        console.log('1. View Customers');
        console.log('2. View Stock');
        console.log('3. Buy Stock');
        console.log('4. Sell Stock');
        console.log('5. Show Transactions');
        var resp = await switchControl()
    }
    while(resp != 6)
}

/// function to read file in json format
var readFile = function(fileName){
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
            reject(error);
        }
    })
}

/// switch statement to select option for transaction
var switchControl = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice: ',async (answer)=>{
                switch(answer){
                    /// option 1 is use to view customer
                    case '1':await viewCustomer();
                             break;
                    ///  option 2 is use to view stock
                    case '2':await viewStock();
                             break;
                    /// option 3 is use to buy the stock
                    case '3':stack.push('buy');
                             var res = await buyStock();
                             if(res === 'buy'){
                                 console.log('share buy successful');
                             }
                             else{
                                 console.log('Failure');
                             }
                             break;
                    /// option 4 is use to sell the stock
                    case '4':stack.push('sell');
                             var respo = await sellStock();
                             if(respo === 'sell'){
                                 console.log('shares sell successful');
                             }
                             else{
                                 console.log('Failure');
                             }
                             break;
                    /// option 5 is use to display transaction held                             
                    case '5':await showTransaction();
                             break;
                }
              resolve(answer)  ;
            })
        } catch (error) {
            reject(error);
        }
    })
}

var customerData = new Array();
/// function is use to view the customer read from file
var viewCustomer = function(){
    return new Promise(async function(resolve, reject){
        try {
            var customerObj = new Customer();
            var customerData = await readFile('Customer.json');
            console.log('Id' + '    ' + 'Name' + '        '+ 'Total Valuation' + ' ');
            /// loop to iterate the data which need to display
            for(var customer = 0; customer < customerData.length; customer ++){
                customerObj = customerData[customer];
                let id = customerObj._id;
                let name = customerObj._name;
                let totalVal = customerObj._totalValue;
                
                console.log(id + '    ' + name + '               '+ totalVal);
            }
            resolve(customerData);
        } catch (error) {
            reject(error)
        }
    })
}

var stockData = new Array();
/// function to view the stock
var viewStock = function(){
    return new Promise(async function(resolve, reject){
        try {
            var stockObj = new Stock();
            /// here i am calling funtion to read a data from file
            stockData = await readFile('Stock.json');
            console.log('Id' + '    ' + 'Name' + '        '+ 'Available Shares' + '     '+ ' Price/Share ');

            /// for loop to iterate a data to show as a stock
            for(var stockD = 0; stockD < stockData.length; stockD ++){
                stockObj = stockData[stockD];
                let id = stockObj._id;
                let name = stockObj._name;
                let noOfShares = stockObj._availableShares;
                let pricePerShare = stockObj._price;
                
                console.log(id + ' ' + name + '            '+noOfShares+'            '+pricePerShare);
            }
            resolve(stockData);
        } catch (error) {
            reject(error)
        }
    })


}

/// function to display a transaction held.
var showTransaction = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// object model from commerical data class
            var transaction1 = new Transaction();
            /// read the file to display a tranasaction
            var transactionData = await readFile('commerTrans.json');
            console.log('Customer    Stock     Transaction           Time                    No. of Shares');
            /// for loop to iterate the transaction present in file
            for(let transData = 0; transData < transactionData.length ; transData ++){
                transaction1 = transactionData[transData];
                let nameOfCust = transaction1._nameOfCustomer;
                let stockNam =  transaction1._stockName;
                let transType = transaction1._transactionType;
                let transTime = transaction1._transactionTime;
                let nameOfShare = transaction1._nameOfShares;
                console.log(nameOfCust+'        '+stockNam+'   '+transType+'            '+transTime+'               '+nameOfShare);
            }
            resolve(transactionData);
        } catch (error) {
            reject(error)
        }
    })
}
var transactionDetails = new Array();

/// funtion is use to insert data into file for transaction for writing into file
var transactionForStock = function(nameOfCust, stockName, transactionType, noOfShare){
    return new Promise(async function(resolve, reject){
        try {
            /// reading data from file so i should not overwrite while inserting new data
            transactionDetails = await readFile('commerTrans.json');
            var transaction = new Transaction();
            /// taking current date and time to insert it as transaction time
            var dateTime = new Date();
            /// assigning each value to its respective to model value
            transaction.nameOfCustomer = nameOfCust;
            transaction.stockName = stockName;
            transaction.transactionType = transactionType;
            transaction.transactionTime = dateTime;
            transaction.numberOfShares = noOfShare;
            transactionDetails.push(transaction);
            resolve(transactionDetails);
        } catch (error) {
            reject(error)
        }
    })
}

/// funtion to sell the stock and write it into file
var sellStock = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// to display the customer
            await viewCustomer();
            // to get customer id from user
            var customerId = await getCustomerId();
            /// to getting customer data from customer id
            var customerDatById = await getCustomerById(customerId);
            /// to use the stock
            await viewStock();
            /// to get the stock id from user
            var stockId = await getStockId();
            /// to get the stock data from the stock id inserted by user
            var stockDataById = await getStockById(stockId);
            /// get the quantity of shares to sell
            var qtyOfShares = await getShareQuantity();
            qtyOfShares = parseInt(qtyOfShares);
            /// validation to check the user
            if(customerDatById._totalValue < 0){
                console.log('Inavlid entry');
                resolve(false);
            }
            else{
                /// substracting the valuation from customer after selling the stocks
                customerDatById._totalValue = customerDatById._totalValue - parseInt(stockDataById._price * qtyOfShares); 
                /// adding a shares to stoock back to whom it is sell
                stockDataById._availableShares = stockDataById._availableShares + qtyOfShares;
                /// function call to write data for transaction
                var transData = await transactionForStock(customerDatById._name, stockDataById._name, 'Sell', qtyOfShares);
                /// calling write funtion to write data into transaction file
                await writeIntoFile(JSON.stringify(transData), 'commerTrans.json');
                /// calling write functionto write the data into customer file
                await writeIntoFile(JSON.stringify(customerData), 'Customer.json');
                /// calling write function to write the data into stock file
                await writeIntoFile(JSON.stringify(stockData), 'Stock.json');
                var respSell = stack.pop();
                resolve(respSell);
             }
            
        } catch (error) {
            reject(error);
        }
    })
}

var buyStock = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// function call to view customer
            await viewCustomer();
            /// funcition call to get customer id from user
            var customerId = await getCustomerId();
            /// function to get user detail from the customer if insert by customer
            var customerDatById = await getCustomerById(customerId);
            /// function call to view the stock
            await viewStock();
            /// funtion to get stock id from user
            var stockId = await getStockId();
            /// to get the stock data by stock id
            var stockDataById = await getStockById(stockId);
            /// to get the quantity of shares from user
            var qtyOfShares = await getShareQuantity();
            qtyOfShares = parseInt(qtyOfShares);
            /// validating if enter shares are present in stock
            if(qtyOfShares > stockData._availableShares){
                console.log('Amount of shares not available with customer');
                resolve(false);
            }
            else{
                /// adding total valuation after purchase of stock
                customerDatById._totalValue = customerDatById._totalValue + parseInt(stockDataById._price * qtyOfShares); 
                /// subtracting number of share from stock after purchase of customer
                stockDataById._availableShares = stockDataById._availableShares - qtyOfShares;
                /// inserting into object the data for making entry into file
                var transData = await transactionForStock(customerDatById._name, stockDataById._name, 'Buy', qtyOfShares);
                /// calling write function to write data for transaction into file
                await writeIntoFile(JSON.stringify(transData), 'commerTrans.json');
                /// calling write function to write into customer file
                await writeIntoFile(JSON.stringify(customerData), 'Customer.json');
                /// calling function to write into stock file
                await writeIntoFile(JSON.stringify(stockData), 'Stock.json');
                var resBuy = stack.pop();
                resolve(resBuy);
             }
            
        } catch (error) {
            reject(error);
        }
    })
}

/// function to get data from id
var getCustomerById = function(id){
    return new Promise(async function(resolve, reject){
        try {
            let flag = false;
            var customerObj = new Customer();
            /// getting customer data from customer file
             customerData = await readFile('Customer.json');
            console.log('Id' + '    ' + 'Name' + '        '+ 'Total Valuation' + ' ');
            /// for loop to iterate a data
            for(var customer = 0; customer < customerData.length; customer ++){
                customerObj = customerData[customer];
                /// if condtion to check if the enter id is valid
                if(customerObj._id === parseInt(id)){
                  let id = customerObj._id;
                  let name = customerObj._name;
                  let totalVal = customerObj._totalValue;
                console.log(id + '    ' + name + '               '+ totalVal);
                flag = true;
                resolve(customerObj);
                }
                
                
            }
            /// throwing message on invalid id number
            if(flag === false){
                console.log('Invalid customer Id');
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

/// function to get stock details by id
var getStockById = function(id){
    return new Promise(async function(resolve, reject){
        try {
            let flag = false;
            var stockObj = new Stock();
            stockData = await readFile('Stock.json');
            console.log('Id' + '    ' + 'Name' + '        '+ 'Available Shares' + '     '+ ' Price/Share ');
            /// for loop to iterate a data to get respective data
            for(var stockD = 0; stockD < stockData.length; stockD ++){
                stockObj = stockData[stockD];
                ///  if condition to check valid id
                if(stockObj._id === parseInt(id)){
                    let id = stockObj._id;
                    let name = stockObj._name;
                    let noOfShares = stockObj._availableShares;
                    let pricePerShare = stockObj._price;
                    console.log(id + ' ' + name + '            '+noOfShares+'            '+pricePerShare);
                    flag = true;
                    resolve(stockObj);
                }
                
            }
            if(flag === false){
                console.log('Invalid Id');
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

/// function to get customer id insert  from user
var getCustomerId = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter Id of customer: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// function to get stock id enter by user
var getStockId = function(){
    return new Promise(function(resolve, reject){
        try{
            rl.question('Please enter the Id of Stock: ',(answer)=>{
                resolve(answer);
            })
        }
        catch(error){
            reject(error)
        }
    })
}

/// function to get quantity of shares from user
var getShareQuantity = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the quantity of shares: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// function to write data into file
var writeIntoFile =  function(data, fileNameToWrite){
    return new Promise(function(resolve, reject){
        try {
            fs.writeFileSync(fileNameToWrite, data);
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}
startUp();