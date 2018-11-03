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
            fs.readFile('Data.txt', function(err, content){
                if(!err){
                    resolve(content.toString().split(" "));
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

var readFileFromData = async function(){
    var data =  await ReadFile();
    return new Promise(function(resolve, reject){
        try{
            const list = new Linklist();
            if(data){
                for(var i = 0;i<data.length;i++){
                    list.addToHead(data[i]);
                }
            }
            resolve(list);
    
        }
        catch(reject){
            reject(error);
        }
           
    })
        
}

Linklist.prototype.search = function(searchValue){
    let current = this.head;
    while(currentNode){
        if(currentNode.value === searchValue){
            return currentNode;
        }
        currentNode = currentNode.next;
    }
    return null;
}


var startList =async function(){
    var data = await readFileFromData();
    console.log(data);
    while(data)
    {
        console.log('data: '+data.head.value)
        data = data.head.next;
        //console.log(`Middle node value: ${data.head.next.value}`);
    }
    
}

startList();

