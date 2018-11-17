"use strict"
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
    let newNode = new Node(value, this.head, null)
    if(this.head){
        this.head.prev = newNode;
    }
    else{ 
        this.tail = newNode;
    }
    this.head = newNode;
 }

 pop(){
     if(!this.tail){
         console.log('Queue empty');
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

 size(){
     let current = this.head;
     let counter = 0;
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
    
module.exports = Stack;