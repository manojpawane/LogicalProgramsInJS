

 class Stock{
    constructor(){
    }

    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get name(){
        return this._name;
    }

    set name(name){
         this._name = name;
    }

    get availableShares(){
        return this._availableShares;
    }

    set availableShares(availableShares){
        this._availableShares = availableShares;
    }

    get price(){
       return this._price;
    }

    set price(price){
        this._price = price;
    }
}

class Customer{
    constructor(){
    }
    
    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get name(){
        return this._name;
    }

    set name(newName){
        this._name = newName;
    }
   
    get totalValue(){
        return this._totalValue;
    }

    set totalValue(totalValue){
        this._totalValue = totalValue;
    }
    
}

class Transaction{
constructor(){

}

    get nameOfCustomer(){
        return this._nameOfCustomer;
    }

    set nameOfCustomer(nameOfCustomer){
        this._nameOfCustomer = nameOfCustomer;
    }

    get stockName(){
        return this._stockName;
    }

    set stockName(stockName){
        this._stockName = stockName;
    }

    get transactionType(){
        return this._transactionType;
    }

    set transactionType(transactionType){
        this._transactionType = transactionType;
    }

    get transactionTime(){
        return this._transactionTime;
    }

    set transactionTime(transactionTime){
        this._transactionTime = transactionTime;
    }

    get numberOfShares(){
        return this._numberOfShares;
    }

    set numberOfShares(numberOfShares){
        this._nameOfShares = numberOfShares;
    }
}

module.exports.Transaction = Transaction;
module.exports.Customer = Customer;
module.exports.Stock = Stock;