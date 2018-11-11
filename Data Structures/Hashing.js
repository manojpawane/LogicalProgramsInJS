var fs = require('fs');

var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)
var HashingUtility = require('./HashingUtility');
var readFileForHashing = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('hash.txt','utf8',function(err, content){
                var contents = content.trim().toString().split(' ');
                resolve(contents);
            })
        } catch (error) {
            reject(error)
        }
    })
}

var keyValue = function(key, value){
    this.key = key;
    this.value = value;
}

var slotFor0 = new HashingUtility();
var slotFor1 = new HashingUtility();
var slotFor2 = new HashingUtility();
var slotFor3 = new HashingUtility();
var slotFor4 = new HashingUtility();
var slotFor5 = new HashingUtility();
var slotFor6 = new HashingUtility();
var slotFor7 = new HashingUtility();
var slotFor8 = new HashingUtility();
var slotFor9 = new HashingUtility();
var slotFor10 = new HashingUtility();
var chainForSlot = new HashingUtility();

var startUp = async function(){
    var dataFromFile = await readFileForHashing();
    var response =  await addDataInSlot(dataFromFile);
    await addSlotForChain();
    rl.question('Please enter number to search: ',(answer)=>{
        searchAndDelete(answer);
    })
}

var addDataInSlot = function(data){
    for(var i=0; i < dataFromFile.length; i++){
        if(dataFromFile[i] % 11 === 0){
            slotFor0.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 1){
            slotFor1.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 2){
            slotFor2.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 3){
            slotFor3.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 4){
            slotFor4.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 5){
            slotFor5.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 6){
            slotFor6.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 7){
            slotFor7.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 8){
            slotFor8.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 9){
            slotFor9.addToTail(dataFromFile[i]);
        }
        else if(dataFromFile[i] % 11 === 10){
            slotFor10.addToTail(dataFromFile[i]);
        }
    }
}

var addSlotForChain = function(){
    var newArrayData = new keyValue(0, slotFor0);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(1, slotFor1);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(2, slotFor2);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(3, slotFor3);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(4, slotFor4);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(5, slotFor5);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(6, slotFor6);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(7, slotFor7);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(8, slotFor8);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(9, slotFor9);
    chainForSlot.addToTail(newArrayData);

    newArrayData = new keyValue(10, slotFor10);
    chainForSlot.addToTail(newArrayData);
}

var searchAndDelete = function(number){
    let value = number % 11;
    let current = chainForSlot.head;
    while(current){
        if(current.value.key === value){
            let currentValueNode = current.value.head;
            while(currentValueNode){
                if(currentValueNode.value === number){
                    console.log('value found');
                }
            }
        }
        current = current.next;
    }
}