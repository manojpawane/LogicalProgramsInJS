var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var fs = require('fs');
//const Transaction = require('./CommercialData');
const {Transaction, Customer, Stock} = require('./CommercialData');

var Queue = require('.././Data Structures/Queue');

var startUp = async function(){
    var dataFromFile = await readTransactionFile();
    await addDataToQueue(dataFromFile);
    await displayTransaction();
    console.log('Transaction Details')
}
var transaction = new Transaction();
var queue = new Queue();

var readTransactionFile = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('commerTrans.json',(err, data)=>{
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

var addDataToQueue = function(transactionData){
    return new Promise(function(resolve, reject){
        try {
            for(let i = 0; i < transactionData.length; i++){
                transaction = transactionData[i];
                queue.enqueue(transaction);
            }
            resolve(queue);
        } catch (error) {
            reject(error)
        }
    })
}

var displayTransaction = function(){
    return new Promise(function(resolve, reject){
        try {
            let currentNode = queue.head;
            while(currentNode){
               transaction = currentNode.value;
               let nameeOfCustomer = transaction._nameOfCustomer;
               let stockName = transaction._stockName;
               let transactionType = transaction._transactionType;
               let transactionTime = transaction._transactionTime;
               let numberOfShare = transaction._nameOfShares;
               console.log(nameeOfCustomer + '        ' + stockName + '        '+transactionType + '      ' + transactionTime + '         ' +numberOfShare);
               currentNode = currentNode.next; 
            }
            resolve(currentNode);
        } catch (error) {
            reject(error);
        }
    })
}

startUp();