var args = process.argv.slice(2);

var month = args[0];
var year = args[1];

var Stack = require('./StackUtilityForAnagram');

var day = function(month, daay, year){
    return new Promise(function(resolve, reject){
        try {
            var y = Math.round( year*1 - (14 - month) / 12);
            var x = Math.round( y + y/4 - y/100 + y/400);
            var m = parseInt(month)  + 12 * parseInt(((14 - month) / 12)) - 2;
            var dy = parseInt((daay*1) + x + (31 * m) / 12) % 7;
            resolve(dy);
        } catch (error) {
            reject(error);
        }
    })
}

var isLeapYear = function(year){
    return new Promise(function(resolve, reject){
        try {
            if((year % 4 === 0) && (year % 100 != 0))
            {
                console.log('leap: '+year % 4);
                console.log('leap year 2:'+year % 100);
                resolve(true);
            }
            else{
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

var months = ["","january", "february", "march", "april", "may", "june" , "july", "august", "september","october", "november", "december"]

var days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var stack =  new Stack();
// var daysQueue = new Queue();
var startUp = async function(){
    
    var arr1 = new Array();
    var arr2 = new Array();
    if(month == 2 && isLeapYear(year)){
        days[month] = 29;
    }
    console.log('      ' + months[month] + ' ' + year);
    console.log('  S   M   Tu   W   Th   F   S');
    let da =await day(month, 1, year);
    var k = 0;

    for(var i = 0; i < da; i++){
        arr1[k] = 0;
        k++;
    }
        for(var i = 1; i <= days[month]; i++){
                arr1[k] = i;
                k++;
            if(((i*1 + da) % 7 == 0) || (i == days[month])){
                stack.push(arr1);
                arr1 = [];
                k = 0;
            }
        }
    var stack2 = new Stack();
    let current = stack.head;
    while(current){
        let number = stack.pop();
        stack2.push(number);
        current = current.next;
    }
     let currentNode = stack2.head;
     while(currentNode){
         console.log(currentNode.value);
         currentNode = currentNode.next;
     }
}

startUp();