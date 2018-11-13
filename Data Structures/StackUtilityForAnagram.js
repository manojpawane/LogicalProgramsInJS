class Node{
    constructor(value, next, prev){
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class Stack{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    push(value){
        let newNode = new Node(value, this.head, null);
            if(this.head){
                this.head.prev = newNode;
            }
            else{
                this.tail = newNode
            }
            this.head = newNode;
    }
}


module.exports = Stack;