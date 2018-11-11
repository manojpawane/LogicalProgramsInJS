class Node{
constructor(value, next, prev){
    this.value = value;
    this.next = next;
    this.prev = prev;
}
}

class HashingUtility{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    addToTail(item){
    const newNode = new Node(item, null, this.tail);
    if(this.tail){
        this.tail.next = newNode;
    }
    else{
        this.head = newNode;
    }
    this.tail = newNode;
    }
}

module.exports = HashingUtility;