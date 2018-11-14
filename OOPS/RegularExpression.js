var readline  = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var feebackMessage = 'Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz 01/01/2016.'

var mobileNumber = '';
var firstName = '';
var lastName = '';
rl.question('Please enter your first name: ',(answer)=>{
    rl.question('Please enter your lastname: ',(answer1)=>{
        rl.question('Please enter your mobile number: ',(answer3)=>{
            firstName = answer;
            lastName = answer1;
            mobileNumber = answer3;
            regularExpressionDemonstration();
            rl.close();
        })
    })
})

/// logic to manipulate regular expression
var regularExpressionDemonstration = function(){
    var dateForToday = getDateFormat();
    /// regex for replacing <<name>>
    var re = /<<name>>/
    /// regex for replacing <<full name>>
    var re1= /<<full name>>/;
    /// regex for replacing xxxxxxxxxx by mobile number
    var re2 = /x{1,10}/;
    /// regex to replace date with current date
    var re3 = /\d\d[- /.]\d\d[- /.]\d\d\d\d/;
    var newString = feebackMessage.replace(re, firstName);
    newString = newString.replace(re1, firstName + ' '+ lastName);
    newString = newString.replace(re2, mobileNumber);
    newString = newString.replace(re3, dateForToday);
    console.log(dateForToday);
    console.log(newString);
}

/// function to get the current date with format DD/MM/YYYY
var getDateFormat = function(){
    var today =  new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if((dd) < 10){
        dd = '0' + dd;
    }
    if(mm < 10){
        mm < '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy
    return today;
}