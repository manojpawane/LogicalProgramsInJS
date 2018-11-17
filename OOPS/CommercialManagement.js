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

const {Transaction, Customer, Stock} = require('./CommercialData');

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

var switchControl = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice: ',async (answer)=>{
                switch(answer){
                    case '1':await viewCustomer();
                             break;
                    case '2':await viewStock();
                             break;
                    case '3':await trans();
                             break;
                    case '4':
                             break;
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

var viewCustomer = function(){
    return new Promise(async function(resolve, reject){
        try {
            var customerData = await readFile('Customer.json');
            console.log('Id' + '    ' + 'Name' + '        '+ 'Total Valuation' + ' ');
            for(var customer = 0; customer < customerData.Customer.length; customer ++){
                let id = customerData.Customer[customer].id;
                let name = customerData.Customer[customer].name;
                let totalVal = customerData.Customer[customer].totalValuation;
                
                console.log(id + '    ' + name + '               '+ totalVal);
            }
            resolve(customerData);
        } catch (error) {
            reject(error)
        }
    })
}

var viewStock = function(){
    return new Promise(async function(resolve, reject){
        try {
            var stockData = await readFile('Stock.json');
            console.log('Id' + '    ' + 'Name' + '        '+ 'Available Shares' + '     '+ ' Price/Share ');
            for(var stockD = 0; stockD < stockData.Stock.length; stockD ++){
                let id = stockData.Stock[stockD].id;
                let name = stockData.Stock[stockD].name.trim();
                let noOfShares = stockData.Stock[stockD].noOfShares;
                let pricePerShare = stockData.Stock[stockD].pricePerShare;
                
                console.log(id + ' ' + name + '            '+noOfShares+'            '+pricePerShare);
            }
            resolve(stockData);
        } catch (error) {
            reject(error)
        }
    })


}
// var transaction = new Transaction('Name','STock','Buy', 'NIGHt', '7');

var showTransaction = function(){
    return new Promise(async function(resolve, reject){
        try {
            var transaction1 = new Transaction();
            var transactionData = await readFile('commerTrans.json');
            console.log('Customer Name    Stock Name     Transaction Type   Transaction Time   No. of Shares');
            console.log(transactionData.length);
            console.log();
            for(let transData = 0; transData < transactionData.length ; transData ++){
                transaction1 = transactionData[transData];
                let nameOfCust = transaction1._nameOfCustomer;
                let stockNam =  transaction1._stockName;
                let transType = transaction1._transactionType;
                let transTime = transaction1._transactionTime;
                let nameOfShare = transaction1._nameOfShares;
                console.log(nameOfCust+'   '+stockNam+'   '+transType+'   '+transTime+'   '+nameOfShare);
            }
            resolve(transactionData);
        } catch (error) {
            reject(error)
        }
    })
}
var transactionDetails = new Array();

var transactionForStock = function(nameOfCust, stockName, transactionType, noOfShare){
    return new Promise(function(resolve, reject){
        try {
            var transaction = new Transaction();
            var dateTime = new Date();
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



var trans =async function(){
   var resp = await transactionForStock('John','facebook','buy',10);
   await writeIntoFile(JSON.stringify(resp));
   var resp1 = await transactionForStock('John','twitter','buy',105);
   await writeIntoFile(JSON.stringify(resp1));
   var resp2 = await transactionForStock('Mike','facebook','sell',510);
   await writeIntoFile(JSON.stringify(resp2));
   var resp3 = await transactionForStock('harry','oracle','buy',104);
   console.log(resp3);
   await writeIntoFile(JSON.stringify(resp3));
    
}

var writeIntoFile =  function(data){
    return new Promise(function(resolve, reject){
        try {
            fs.writeFileSync('commerTrans.json', data);
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}
startUp();