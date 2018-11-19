var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)
var fs = require('fs');
const {Person} = require('./AddressBookUtility');
var Linkedlist = require('./LinkedList');
var contentOfContacts;
var person = new Person();
var contacts =  new Array();
var contactsObj = function(){
    this.contacts = contacts;
}
var startUp = async function(){
    var dataReadFromFile = await readData();
    contacts = dataReadFromFile.contacts;
    do{
        console.log(' 1. Add person. \n 2. Edit Person. \n 3. Delete Contact. \n 4. Sort By lastname. \n 5. Sort by zip code. \n 6. Display \n 7. Save into file.');
        var response = await switchControl();
    }
    while(response != 8);
}

var switchControl = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice: ',async (answer)=>{
                switch(answer){
                    case '1' :await addPerson();
                              break;
                    case '2' :
                              break;
                    case '3' :
                              break;
                    case '4' :
                              break;
                    case '5' :
                              break;
                    case '6' :await display();
                              break;
                    case '7' :await saveIntoFile();
                              break;
                }
                resolve(answer);
            })
            
        } catch (error) {
            reject(error)
        }
    })
}

var editContact = function(){
    return new Promise(function(resolve, reject){
        try {
            
        } catch (error) {
            reject(error)
        }
    })
}
var display = function(){
    return new Promise(async function(resolve, reject){
        try {
            var read = await readData();
            console.log('Id              Name      Address   City    State       Zip         Phone');
            for(var d = 0; d < read.contacts.length; d++){
                let name = read.contacts[d]._firstName + ' ' + read.contacts[d]._lastName;
                let address = read.contacts[d]._address;
                let city = read.contacts[d]._city;
                let state = read.contacts[d]._state;
                let zip = read.contacts[d]._zip;
                let phone = read.contacts[d]._phoneNumber;
                let id = read.contacts[d]._id;  
                console.log(id+'  '+ name + '  '+ address + '  ' + city + '  ' + state + '    ' + zip + '    ' + phone);
            }
            resolve(read);
        } catch (error) {
            reject(error)
        }
    })
}

var addPerson = function(){
    return new Promise(async function(resolve, reject){
        try {
            rl.question('Please enter contact full name: ',(answer)=>{
                rl.question('Please enter address of contact person: ',(answer1)=>{
                    rl.question('Please enter city of contact person: ',(answer2)=>{
                        rl.question('Please enter the state for your contact: ',(answer3)=>{
                            rl.question('Please enter the zip of your contact person: ',(answer4)=>{
                                rl.question('Please enter the phone number of your contact: ',(answer5)=>{
                                    rl.question('Please enter Id of contact: ',async (answer6)=>{
                                    let words = answer.toString().split(' ');
                                    person._firstName = words[0];
                                    person._lastName = words[1];
                                    person._address = answer1;
                                    person._city = answer2;
                                    person._state = answer3;
                                    person._zip = answer4;
                                    person._phoneNumber = answer5;
                                    person._id = answer6;
                                    contacts.push(person);
                                    await saveIntoFile();
                                    resolve(contacts);
                                   })
                                })
                            })
                        })
                    })
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

var readData = function(){
    return new Promise(function(resolve, reject){
        try {
             fs.readFile('AddressBook.json','utf8', (err, content)=>{
                if(err){
                    throw err
                }
                else{
                  contentOfContacts = JSON.parse(content);
                }
                resolve(contentOfContacts);
            })
        } catch (error) {
            reject(error)
        }
    })
}

var saveIntoFile = function(){
    return new Promise(function(resolve, reject){
        try {
            var obj = new contactsObj();
            fs.writeFileSync('AddressBook.json', JSON.stringify(obj))
            resolve(contacts);
        } catch (error) {
            reject(error);
        }
    })
}
startUp();