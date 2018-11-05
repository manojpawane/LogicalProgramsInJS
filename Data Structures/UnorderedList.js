var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)
var fs = require('fs');
var ReadFile = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('Data.txt', 'utf8', function(err, content){
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


function Linklist(){
    this.head = null;
    this.tail = null;
}

function Node(value, next, prev){
    this.value = value;
    this.next = next;
    this.prev = prev;
}

Linklist.prototype.addToHead = function(value){
    const newNode = new Node(value, this.head, null);
    if(this.head){
        this.head.prev = newNode;
    }    
    else{
        this.tail = newNode;
    }
    this.head = newNode;
}

Linklist.prototype.addToTail = function(value) {
    const newNode = new Node(value, null, this.tail);
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;
    this.tail = newNode;
  }

const list = new Linklist();
var readFileFromData = async function(){
    var data =  await ReadFile();
    return new Promise(function(resolve, reject){
        try{
            if(data){
                for(var i = 0;i<data.length;i++){
                    list.addToHead(data[i]);
                }
            }
            resolve(list);
    
        }
        catch(error){
            reject(error);
        }
           
    })
}

Linklist.prototype.deleteFromHead = function(){
    if (!this.head) return null;
    let value = this.head.value;
    this.head = this.head.next;
    
    if (this.head){
        this.head.prev = null;
        console.log('in if condition');
        console.log('head value: '+this.head.value);
    } 
    else{
        this.tail = null;
        console.log('in else part');
    } 
    console.log('head value: '+value);
    return value;
}

Linklist.prototype.deleteFromTail = function(){
    if (!this.tail) return null;
    let value = this.tail.value;
    this.tail = this.tail.prev;
    
    if (this.tail) {
        this.tail.next = null;
        console.log('in if condition');
    }
    else{
        this.head = null;
        console.log('in else condition')
    } 
    console.log('tails value: '+value+'test');
    return value;
}

Linklist.prototype.deleteByValue = function(value){
    let currentNode = this.head
    while(currentNode){
        if(currentNode.value === value.value){
           if(value.value === this.head.value){
                this.head = this.head.next;
                this.head.prev = null;
           }
           if(this.tail.value === this.head.value){
               this.tail = null;
               this.head = null;
           }
           else if(value.value ===  this.tail.value){
                this.tail = this.tail.prev
                this.tail.next = null;
           }
           else{
              let TempPrevNode = currentNode.prev;
              let TempNextNode  = currentNode.next;
              TempPrevNode.next = TempNextNode;
              TempNextNode.prev = TempPrevNode;
           }
            
        }
        currentNode = currentNode.next;
    }
}

Linklist.prototype.delete = async function(wordToBeDeleted){
    let deleteWordValue = null;
    if(wordToBeDeleted === this.head){
        console.log('test 1');
       deleteWordValue = await list.deleteFromHead();
    }
    else if(wordToBeDeleted === this.tail){
        deleteWordValue = await list.deleteFromTail();
        console.log('test 2');
    }
    else{
        deleteWordValue = await list.deleteByValue(wordToBeDeleted);
        console.log('test 3');
    }
  
}

Linklist.prototype.search = function(data, searchValue){
    let currentNode = this.tail;
    return new Promise(function(resolve, reject){
        try {
            while(currentNode){
                if(currentNode.value === searchValue){ 
                    console.log('word found');
                    resolve(currentNode);
                }
                currentNode = currentNode.prev;
            }
            resolve(null);            
        } catch (error) {
            reject(error)
        }
    })
}

var startList =async function(){
    var data = await readFileFromData();
    
    console.log(data);
    var response
    if(data){
        rl.question('Please enter the word you need to delete: ',async (answer)=>{
            response = answer
            if(response){
                var searchedWord = await data.search(data,response);
                console.log('searched word: '+searchedWord);
                if(searchedWord != null){
                    await data.delete(searchedWord);                       
                }
                else{
                    await data.addToHead(response);
                }
                var dataToWriteInFile = '';
                let currNode = data.tail
                while(currNode){
                   console.log('values: '+currNode.value);
                   dataToWriteInFile +=  currNode.value + " ";
                   currNode = currNode.prev;
                }
                fs.writeFile('data.txt', dataToWriteInFile, function(err, data){
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                });
             }
             rl.close();
        })
    }
}

startList();

