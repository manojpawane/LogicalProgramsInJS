class Node{
    constructor(value, next, prev){
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class Deque{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    addFront(item){
        const newNode = (item, null, this.tail);
        if(this.tail){
            this.tail.next = newNode;
        }
        else{
            this.head = newNode;
        }
        this.tail = newNode;
    }

    addRear(item){
        const newNode = new Node(item, this.head, null);
        if(this.head){
            this.head.prev = newNode;
        }
        else{
            this.tail = newNode;
        }
        this.head = newNode;
    }

    removeFront(){
        if(!this.tail){
            return null;
        }
        let value = this.tail.value;
        this.tail = this.tail.prev;
        if(this.tail){
            this.tail.next = null;
        }
        else{
            this.head = null;
        }
        return value;
    }

    removeRear(){
        if(!this.head){
            return null;
        }
        let value = this.head.value;
        this.head = this.head.next;

        if(this.head){
            this.head.prev = null
        }
        else{
            this.tail = null;
        }
        return value;
    }

    size(){
        let counter = 0;
        let current = this.head;
        while(current){
            counter++;
            current = current.next;
        }
        return counter;
    }

    isEmpty(){
        return this.size() < 1;
    }
}


module.exports = Deque;