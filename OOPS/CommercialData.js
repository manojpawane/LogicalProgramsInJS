class Stock{
    constructor(id, name, availableShares, price){
        this.Id = id;
        this.Name = name;
        this.AvailableShares = availableShares;
        this.Price = price;
    }
}

class Customer{
    constructor(Id, Name, TotalValue){
        this.Id = id;
        this.Name = name;
        this.TotalValue = totalValue;
    }
}

class Transaction{

    constructor(nameOfCustomer, stockName, transactionType, time, noOfShares){
        this.NameOfCustomer = nameOfCustomer;
        this.StockName = stockName;
        this.TransactionType = transactionType;
        this.Time = time;
        this.NoOfShares = noOfShares;
    }
}








class Person {
    constructor() {
      this.id = 'id_1';
    }
    set name(name) {
      this._name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    get name() {
      return this._name;
    }
    set age(age){
      this._age = age;
    }
    get age(){
        return this._age;
    }
    sayHello() {
      console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id  + ' , My age is ' + this.age);
    }
  }
  
  var justAGuy = new Person();
  justAGuy.name = 'martin'; // The setter will be used automatically here.
  justAGuy.age = 25;
  justAGuy.sayHello(); // Will output 'Hello, my name is Martin, I have ID: id_