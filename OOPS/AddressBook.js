var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)
var fs = require('fs');
const {Person} = require('./AddressBookUtility');
var contentOfContacts;
var person = new Person();
var contacts =  new Array();
var contactsObj = function(){
    this.contacts = contacts;
}

/// start function
var startUp = async function(){
    var dataReadFromFile = await readData();
    contacts = dataReadFromFile.contacts;
    do{
        console.log(' 1. Add person. \n 2. Edit Person. \n 3. Delete Contact. \n 4. Sort By lastname. \n 5. Sort by zip code. \n 6. Display \n 7. Save into file.');
        var response = await switchControl();
    }
    while(response != 8);
}

/// switch control to control the overall operation
var switchControl = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice: ',async (answer)=>{
                switch(answer){
                    /// to add contact in address book
                    case '1' :await addPerson();
                              break;
                    /// edit option to edit contact details in address book except name
                    case '2' :await editContact();
                              await saveIntoFile();
                              break;
                    /// delete contacts from address book                              
                    case '3' :await deleteContact();
                              await saveIntoFile();
                              break;
                    /// sort the contact by last name and displays                              
                    case '4' :await sortByLastName();
                              break;
                    /// sort the contact by zip code and displays                              
                    case '5' :await sortByZipCode();
                              break;
                    /// displays contact from file                              
                    case '6' :await display();
                              break;
                    /// save a contact list in address book at any instance                              
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

/// function to sort the contact by zip code
var sortByZipCode = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// function reads a data from file
            let read = await readData();
            var zipCollection = new Array();
            /// get the zip code of all contact because it can be further use to sort
            for(var d = 0; d < read.contacts.length; d++){
                zipCollection[d] = read.contacts[d]._zip;
            }
            var sortedContacts = new Array();
            let e = 0;
            /// sort the collected zip code
            var zipCollection = await zipCollection.sort();
            /// get the contacts into the sorted order by zip code
            for(var size = 0; size < zipCollection.length; size ++){
                for(var nameSize = 0; nameSize < contacts.length; nameSize ++){
                    if(zipCollection[size] === contacts[nameSize]._zip){
                        sortedContacts[e] = contacts[nameSize];
                        e++;
                    }
                }
            }
            /// method call to display a contact in sorted order
            await displaySortedContacts(sortedContacts);
            resolve(sortedContacts);
        } catch (error) {
            reject(error)
        }
    })
}

/// method to sort the contacts by last name
var sortByLastName = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// reads a data from  file
            let read = await readData();
            var lastNameCollection = new Array();
            /// stores the last name of the contacts
            for(var d = 0; d < read.contacts.length; d++){
                lastNameCollection[d] = read.contacts[d]._lastName;
            }
            var sortedContacts = new Array();
            let e = 0;
            /// sorts the array by last name
            var lastNameCollection = await lastNameCollection.sort();
            /// stores the contacts in sorted order
            for(var size = 0; size < lastNameCollection.length; size ++){
                for(var nameSize = 0; nameSize < contacts.length; nameSize ++){
                    if(lastNameCollection[size] === contacts[nameSize]._lastName){
                        sortedContacts[e] = contacts[nameSize];
                        e++;
                    }
                }
            }
            /// display the array in sorted order by zip code
            await displaySortedContacts(sortedContacts);
            resolve(sortedContacts);
        } catch (error) {
            reject(error);
        }
    })
}

/// common method to display the sorted contacts by zip or last name
var displaySortedContacts = function(sortContact){
    return new Promise(function(resolve, reject){
        try {
            console.log('Id              Name      Address   City    State       Zip         Phone');
            /// iterate the contacts to display a sorted contacts
            for(var d = 0; d < sortContact.length; d++){
                let name = sortContact[d]._firstName + ' ' + sortContact[d]._lastName;
                let address = sortContact[d]._address;
                let city = sortContact[d]._city;
                let state = sortContact[d]._state;
                let zip = sortContact[d]._zip;
                let phone = sortContact[d]._phoneNumber;
                let id = sortContact[d]._id;  
                console.log(id+'  '+ name + '  '+ address + '  ' + city + '  ' + state + '    ' + zip + '    ' + phone);
            }
            resolve(sortContact);
        } catch (error) {
            reject(error)
        }
    })
}

/// method to delete the contact
var deleteContact = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// method call to read data from file
            var read = await readData();
            console.log('Id              Name     Address   City    State       Zip         Phone');
            /// for loop to iterate a contact from the array to display the list of contacts present in list
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
    var response = await deleteOption();

    /// delete the contacts
   for( var j = 0; j < contacts.length; j++){ 
    if ( contacts[j]._id === response) {
        contacts.splice(j, 1); 
    }
   }
   resolve(contacts);
        } catch (error) {
            reject(error);
        }
    })
}

/// gets the id to delete the contact
var deleteOption = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the Id to delete contact: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// edit contact logic for address book
var editContact = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// method call to read a data from file
            var read = await readData();
            console.log('Id              Name      Address   City    State       Zip         Phone');
            /// for loop to iterate a data to display a contact
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
            /// function call to get user id for which contact is to edit
                var userId = await getId() ;
                /// display the option to edit excpet name
                console.log('\n 1. Edit address.  \n 2. Edit City.  \n 3. Edit State. \n 4. Edit Zip.  \n 5. Edit Phone.  ');
                /// get the choice for which we have to edit
                var choice = await getChoice();
                /// get the information which need to modify
                var information = await getInformation();
                /// loop to get the contact to which information need to modify
                for(var ij = 0;ij < contacts.length; ij++){
                    if(contacts[ij]._id === userId){
                        /// choice 1 is to edit contact address
                        if(choice === '1'){
                            contacts[ij]._address = information;
                        }
                        /// choice to is to edit the city
                        else if(choice === '2'){  
                            contacts[ij]._city = information;
                        }
                        /// choice 3 is to edit state
                        else if(choice === '3'){
                            contacts[ij]._state = information;
                        }
                        /// choice 4 is to edit zip
                        else if(choice === '4'){
                            contacts[ij]._zip = information;
                        }
                        /// choice 5 is to edit phone number
                        else if(choice === '5'){
                            contacts[ij]._phoneNumber = information;
                        }
                    }
                }  
                resolve(contacts);
        } catch (error) {
            reject(error)
        }
    })
}

/// get the id from user for respective operation
var getId = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter the id for which information need to edit: ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// get the information which is use to modify the data
var getInformation = function(){
return new Promise(function(resolve, reject){
    try {
        rl.question('Please enter the information need to modify: ',(answer)=>{
            resolve(answer);
        })
    } catch (error) {
        reject(error)
    }
})
}

/// get the choice to edit the information
var getChoice = function(){
    return new Promise(function(resolve, reject){
        try {
            rl.question('Please enter your choice to edit. ',(answer)=>{
                resolve(answer);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// display the contact in the sequence present in the file
var display = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// reads data in the file
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

/// logic to add contact in the address book
var addPerson = function(){
    return new Promise(async function(resolve, reject){
        try {
            /// this get the user information add adds to the model and pust it into array which further store into the file.
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

/// reads data from the file
var readData = function(){
    return new Promise(function(resolve, reject){
        try {
            /// AddressBook.json is file use to read a data
             fs.readFile('AddressBook.json','utf8', (err, content)=>{
                if(err){
                    throw err
                }
                else{
                    /// data in the file is in json format so need to parse before use
                  contentOfContacts = JSON.parse(content);
                }
                resolve(contentOfContacts);
            })
        } catch (error) {
            reject(error)
        }
    })
}

/// save the contact data which is present in the file
var saveIntoFile = function(){
    return new Promise(function(resolve, reject){
        try {
            var obj = new contactsObj();
            /// writes the data into AddressBook.json file
            fs.writeFileSync('AddressBook.json', JSON.stringify(obj))
            resolve(contacts);
        } catch (error) {
            reject(error);
        }
    })
}
startUp();