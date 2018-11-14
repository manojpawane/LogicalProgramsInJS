'use strict'

class Node{
    constructor(value, next, prev){
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    addToHead(value){
        let newNode =  new Node(value, this.head, null);
        if(this.head){
            this.head.prev = newNode;
        }
        else{
            this.tail =  newNode;
        }
        this.head = newNode;
    }

    addToTail(){
        let newNode =  new Node(value,  null, this.tail);
        if(this.tail){
            this.tail.next = newNode;
        }
        else{
            this.head =  newNode;
        }
        this.next = newNode;
    }

    removerFromHead(){
        if(!this.head){
            return null;
        }
        let value = this.head.value;
        this.head = this.head.next;

        if(this.head){
            this.head.prev = null;
        }
        else{
            this.tail = null;
        }
        return value;
    }

    removeFromTail(){
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
}

module.exports = LinkedList;