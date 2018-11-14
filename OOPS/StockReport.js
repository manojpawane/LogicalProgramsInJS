var readline = require('readline');
var rl =  readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
var LinkedList = require('./LinkedList');
var startUp = function(){
    rl.question('Please enter the number of stocks you want to buy: ',async (answer)=>{
        await shareManipulation(answer);
        await calculateAndDisplayStocks();
        rl.close();
    })
}
var shareDetails = function(shareName, sharePrice, noOfShares){
    this.shareName = shareName;
    this.sharePrice = sharePrice;
    this.noOfShares = noOfShares;
}
var linkedlist = new LinkedList();

var shareManipulation =async function(quantity){
            for(let i = 0; i < quantity; i++){
               var sName = await shareName(i);
               var sPrice = await sharePri(i);
               var shrQty = await shareQty(i);
               var newNodeOfStock =  new shareDetails(sName, sPrice,shrQty);
               linkedlist.addToHead(newNodeOfStock);
            }
}

var shareName = function(n){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the name of '+ parseInt(n+1) +' share: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error);
        }
    })
}

var sharePri = function(n){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the price of '+ n+1 +' share: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error);
        }
    })
}

var shareQty = function(n){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the Qty of '+ n+1  +' share: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error);
        }
    })
}

var calculateAndDisplayStocks = function(){
    let currentNode = linkedlist.head;
    console.log('Name  Price  Qty    Cost');
    while(currentNode){
        let shrName = currentNode.value.shareName;
        let shrPrice = currentNode.value.sharePrice;
        let shrQty = currentNode.value.noOfShares;
        let shrStock = shrPrice * shrQty;
        console.log(shrName + '      '+ shrPrice+'      '+ shrQty+ '      ' + shrStock);
        currentNode = currentNode.next;
    }
}

startUp();