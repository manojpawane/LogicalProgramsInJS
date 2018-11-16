'use strict'
var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface(
    {
        input: process.stdin,
        output:process.stdout
    }
)   

var CommercialData = require('./CommercialData');
var Transaction = new CommercialData.Transaction();

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
                    case '5':
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
var transaction = new Transaction();
var transactionDetails = new Array();

var transactionForStock = function(nameOfCust, stockName, transactionType, noOfShare){
    return new Promise(function(resolve, reject){
        try {
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
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

var writeIntoFile = new function(data){
    return new Promise(function(resolve, reject){
        try {
            fs.writeIntoFile('commerTrans.json', data);
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
   await writeIntoFile(JSON.stringify(resp3));
    
}
startUp();