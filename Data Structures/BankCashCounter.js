var readline = require('readline');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

var Linklist =function(){
    this.head = null;
    this.tail = null;
}

var Node = function(value, prev, next){
    this.value = value;
    this.prev = prev;
    this.next = next;
}

var Customer = function(name, balance, accountNumber, amount){
    this.name = name;
    this.balance = balance;
    this.accountNumber = accountNumber;
    this.amount = amount;
}

const list = new Linklist();
var cashWithBank = 1000000;

var StartUp = async function(){
    var response = null;
    do{
    console.log('1. Add Customer.');
    console.log('2. Deposit cash.');
    console.log('3. Withdraw Cash');
    console.log('4. Cash with Bank');
    console.log('5. View Customers')
     rl.question('Please enter your choice: ',async (answer)=>{
        response = answer
            switch(response){
                case '1' : await list.addCustomerAccount(rl); 
                           console.log('testing swithc');
                           break;
                case '2' : break;
                case '3' : break;
                case '4' : console.log('Cash with Bank: '+cashWithBank);
                           break;
                case '5' : list.DisplayCustomer() ;
                           break;
            }
        
        
        rl.close;
    })
}
while(response != 6);
}



Linklist.prototype.addCustomerAccount = function(rl){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Enter name of Customer: ',(custName)=>{
                rl.question('Enter account number of customer: ',(accountNum)=>{
                    rl.question('Enter Balance with customer: ', (balanceAmt)=>{
                        rl.question('Enter amount need to deposit or withdraw: ',(trsAmount)=>{
                            const newUser = new Customer(custName, balanceAmt, accountNum, trsAmount);
                            const newNode = new Node(newUser, null, this.tail);
                            if(this.tail){
                                this.tail.next = newNode;
                            }
                            else{
                                this.head = newNode
                            }
                            this.tail = newNode
                            resolve(newNode)  
                        });
                    });
                });
            }); 
               ;
        } catch (error) {
            reject(error);
        }
    })
}

Linklist.prototype.DisplayCustomer = function(){
    let currentNode = this.head;
    console.log('Name '+'Acc No. '+'Balance '+'Amount ');
    while(currentNode){
        console.log(currentNode.value.name+' '+currentNode.value.accountNumber+' '+currentNode.value.balance+' '+currentNode.value.amount);
        currentNode = currentNode.next;
    }
}

StartUp();