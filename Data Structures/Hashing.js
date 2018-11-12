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
var chainForSlot = new Array();

var startUp = async function(){
    var dataFromFile = await readFileForHashing();
    var response =  await addDataInSlot(dataFromFile);
    await addSlotForChain();
    rl.question('Please enter number to search: ',async (answer)=>{
      var value = await searchAndDelete(answer);
      console.log('value returned: '+value);
      if(value != null){
          console.log('Value deleted: '+value);
      }
      else{
          let rem = answer % 11;
          let slotChain = chainForSlot[rem];
          slotChain.addToTail(answer);
      }
      var dataToWriteInFile = '';
      for(let k = 0; k <= 10; k++){
          let conNode = chainForSlot[k];
          let curHead = conNode.head;
          while(curHead){
              dataToWriteInFile += curHead.value + ' ';
              curHead = curHead.next;
          }
      }
      fs.writeFile('HashData.txt',dataToWriteInFile, function(err, data){
        if(err){
            console.lof(err);
        }
        else{
            console.log('File written successfully');
        }
    })
    rl.close();
    })
}

var addDataInSlot = function(data){
    for(var i=0; i < data.length; i++){
        if(data[i] % 11 === 0){
            slotFor0.addToTail(data[i]);
        }
        else if(data[i] % 11 === 1){
            slotFor1.addToTail(data[i]);
        }
        else if(data[i] % 11 === 2){
            slotFor2.addToTail(data[i]);
        }
        else if(data[i] % 11 === 3){
            slotFor3.addToTail(data[i]);
        }
        else if(data[i] % 11 === 4){
            slotFor4.addToTail(data[i]);
        }
        else if(data[i] % 11 === 5){
            slotFor5.addToTail(data[i]);
        }
        else if(data[i] % 11 === 6){
            slotFor6.addToTail(data[i]);
        }
        else if(data[i] % 11 === 7){
            slotFor7.addToTail(data[i]);
        }
        else if(data[i] % 11 === 8){
            slotFor8.addToTail(data[i]);
        }
        else if(data[i] % 11 === 9){
            slotFor9.addToTail(data[i]);
        }
        else if(data[i] % 11 === 10){
            slotFor10.addToTail(data[i]);
        }
    }
}

var addSlotForChain = function(){
    chainForSlot[0] = slotFor0;
    chainForSlot[1] = slotFor1;
    chainForSlot[2] = slotFor2;
    chainForSlot[3] = slotFor3;
    chainForSlot[4] = slotFor4;
    chainForSlot[5] = slotFor5;
    chainForSlot[6] = slotFor6;
    chainForSlot[7] = slotFor7;
    chainForSlot[8] = slotFor8;
    chainForSlot[9] = slotFor9;
    chainForSlot[10] = slotFor10;
}

var searchAndDelete = function(number){
    let value = number % 11;
    let slotNumber = chainForSlot[value];
    let currentNode = slotNumber.head;
    var valueFound = null;
    // console.log(currentNode);
    while(currentNode){
        if(currentNode.value === number){
            valueFound = currentNode.value
            if(slotNumber.head.value === value){
                if(!slotNumber.tail){
                    return null;
                }
                slotNumber.head = slotNumber.head.next;
                if(slotNumber.head){
                    slotNumber.head.prev = null;
                }
                else{
                    slotNumber.tail = null;
                }
            }
            else if(slotNumber.tail.value === number){
                if(!slotNumber.tail){
                    return null;
                }
                slotNumber.tail = slotNumber.tail.prev
                if(slotNumber.tail){
                    slotNumber.tail.next = null;
                }
                else{
                    slotNumber.head = null
                }
            }   
            else{
                let tempPrevNode = currentNode.prev;
                let tempNextNode = currentNode.next;
                tempPrevNode.next = tempNextNode;
                tempNextNode.prev = tempPrevNode;
            }
        }
        currentNode = currentNode.next;
    }
    return valueFound;
    }

startUp();