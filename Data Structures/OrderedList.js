var fs = require('fs');
var readline = require('readline');

/// Interface object for readline
var rl=  readline.createInterface(
    {
        input: process.stdin,
        output:process.stdout
    }
)

/// Linklist function
function Linklist(){
    this.head = null;
    this.tail = null;
}

/// Node decalartion
function Node(value, next, prev){
    this.value = value;
    this.next = next;
    this.prev = prev;
}

/// add element from tail
Linklist.prototype.addToTail = function(value){
 const newNode = new Node(value, null, this.tail);
    if(this.tail){
        this.tail.next = newNode;
    }
    else{
        this.head = newNode;
    }
    this.tail = newNode;
}

/// function to read data from file
var readfile = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('NumberFile.txt','utf8', function(err, content){
                if(!err){
                    var contents = content.trim().toString().split(' ');
                    resolve(contents);
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

const list = new Linklist();

/// data which ever read from file are added in list after sorting
var readAndAdd = async function(){
    var unSortedData = await readfile();
    return new Promise(function(resolve, reject){
        try {
            var sortedData = unSortedData.sort(function (a, b) { return a*1 - b*1; });            
            for(var i = 0; i < sortedData.length; i++){
                list.addToTail(sortedData[i]);
            }
            resolve(list);
        } catch (error) {
            reject(error)
        }
    })
}

/// function to delete element on search
Linklist.prototype.searchAndDeleteNumber =  function(value){
    let currentNode = this.head;
    let valueFound = null;
    while(currentNode){
        if(currentNode.value === value){
            valueFound = currentNode.value
            if(this.head.value === value){
                if(!this.tail){
                    return null;
                }
                this.head = this.head.next;
                if(this.head){
                    this.head.prev = null;
                }
                else{
                    this.tail = null;
                }
            }
            else if(this.tail.value === value){
                if(!this.tail){
                    return null;
                }
                this.tail = this.tail.prev
                if(this.tail){
                    this.tail.next = null;
                }
                else{
                    this.head = null
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

/// function to add the number if not found
var startProgram = async function(){
   var sortedList = await readAndAdd();
   if(sortedList != null){
       rl.question('Please enter the number you want to search: ',async (answer)=>{
         var deletedData =  await list.searchAndDeleteNumber(answer);
         console.log('value: '+deletedData);
         if(deletedData ===  null){
             await list.addToTail(answer);
         }
         var dataToBeWriteInFile = '';
         let currNode = sortedList.head
         while(currNode){
             dataToBeWriteInFile += currNode.value + " "; 
             currNode = currNode.next;
         }
         fs.writeFile('afterProcessing.txt', dataToBeWriteInFile, function(err, data){
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
         rl.close();
       })
         
   }
   else{
       console.log('File is empty.')
   }
}

startProgram();