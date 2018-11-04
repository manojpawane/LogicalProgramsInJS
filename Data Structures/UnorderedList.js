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
        catch(reject){
            reject(error);
        }
           
    })
        
}

// Linklist.prototype.delete = function(data, deleteWord){
//     return new Promise(resolve, reject){
//         try {
            
//         } catch (error) {
//             reject(error)
//         }
//     }
// }

Linklist.prototype.search = function(data, searchValue){
    let currentNode = this.head;
    return new Promise(function(resolve, reject){
        try {
            console.log('current node: '+currentNode);
            while(currentNode){
                if(currentNode.value === searchValue){
                    resolve(currentNode);
                }
                currentNode = currentNode.next;
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
                // if(searchedWord != null){

                // }
                // 
                console.log('data for search word: '+searchedWord.value);
             }
             console.log('response: '+response);
             rl.close();
        })
    }
    
   

}

startList();

