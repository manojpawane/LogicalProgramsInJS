'use strict'
var readline = require('readline');
var Queue = require('./Queue');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

var Linklist =function(){
    this.head = null;
    this.tail = null;
}

function Node(value, next, prev){
    this.value = value;
    this.next = next;
    this.prev = prev;
}

var Customer = function(name, accountNumber){
    this.name = name;
    this.accountNumber = accountNumber;
}

const list = new Linklist();
var cashWithBank = 1000000;
var queue = new Queue();
var switchControl = function(){
    return new Promise(function(resolve, reject){
    try {
        rl.question('Please enter your choice: ',async (answer)=>{
            //response = answer
                switch(answer){
                    case '1' : await addCustomerAccount(rl); 
                               console.log('testing swithc');
                               break;
                    case '2' : await Deposit(rl);
                               break;
                    case '3' : await withdrawCash(rl);
                               break;
                    case '4' : console.log('Cash with Bank: '+cashWithBank);
                               break;
                    case '5' : await DisplayCustomer() ;
                               break;
                }
            
         resolve(answer);   
            //rl.close;
        })   
    } catch (error) {
        reject(error)
    }    
    })
}

var StartUp = async function(){
    var response = null;
    do{
    console.log('1. Add Customer.');
    console.log('2. Deposit cash.');
    console.log('3. Withdraw Cash');
    console.log('4. Cash with Bank');
    console.log('5. View Customers')
    await switchControl();
}
while(response != 6);
}

var queue = new Queue();
var addCustomerAccount = function(rl){
    return new Promise(function(resolve, reject){
        try{
            rl.question('Enter name of Customer: ',(custName)=>{
                rl.question('Enter account number of customer: ',async (accountNum)=>{
                            const newUser =await new Customer(custName, accountNum);
                            await queue.enqueue(newUser);
                            resolve(queue) ;
                });
                
            }); 
        }
        catch(error){
            reject(error);
        }
            
    })
}


var DisplayCustomer = function(){
    let currentNode = queue.head;
    let count = 0;
    console.log('Name '+'Acc No. ');
    while(currentNode){
        console.log(currentNode.value.name+' '+currentNode.value.accountNumber+' ');
        currentNode = currentNode.next;
    }
}

var withdrawCash = function(rl){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Enter the amount need to withdraw: ',(answer)=>{
                if(answer > cashWithBank){
                    console.log('Insuffcient cash with bank..')
                    resolve(queue);
                }
                else{
                    cashWithBank = cashWithBank - answer;
                    queue.dequeue();
                    resolve(queue);
                }
            })            
        } catch (error) {
            reject(error)
        }
    })

}

var Deposit = function(rl){
 return new Promise(function(resolve, reject){
     rl.question('Enter the amount need to deposit: ',(answer)=>{
         if(answer > 0){
            cashWithBank = parseInt(cashWithBank) + parseInt(answer);
            console.log(cashWithBank);
            queue.dequeue();
            resolve(queue);
         }
         else{
             console.log('Please enter valid amount: ');
             resolve(queue);
         }
     })
 })
}


StartUp();