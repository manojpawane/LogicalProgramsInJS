"use strict"
class Node{
    constructor(value, next, prev){
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
    }

enqueue(value){
    console.log('In queue file');
    let newNode = new Node(value, null, this.tail)
    if(this.tail){
        this.tail.next = newNode;
    }
    else{
        this.head = newNode;
    }
    this.tail = newNode;
 }

 dequeue(){
     if(!this.head){
         console.log('Queue empty');
     }
     else{
         this.head = this.head.next;
     }
     if(this.head){
         this.head.prev = null;
     }
     else{
         this.tail = null;
     }
 }

 display(){
  let current = this.head;
//   while(current){
//       console.log(current.value);
//       current = current.next;
//   }
    return current;
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

module.exports = Queue;