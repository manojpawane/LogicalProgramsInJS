class Person{
    constructor(){

    }
   
    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get fullName(){
        return this._firstName + ' ' + this._lastName;
    }

    set fullName(name){
        let words = name.toString().split(' ');
        this._firstName = words[0] || '';
        this._lastName = words[1] || '';
    }
   
    get address(){
        return this._address;
    }

    set address(address){
        this._address = address;
    }

    get city(){
        return this._city;
    }

    set city(city){
      this._city = city
    }

    get state(){
        return this._state;
    }
    
    set state(state){
        this._state = state;
    }

    get zip(){
        return this._zip;
    }

    set zip(zip){
        this._zip = zip;
    }

    get phoneNumber(){
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber){
        this._phoneNumber = phoneNumber;
    }
}
module.exports.Person = Person;