var args = process.argv.slice(2);
var month = parseInt(args[0]);
var date = parseInt(args[1]);
var year = parseInt(args[2]);
var d0;

class FindADay{
    static Validation(){
        if((month > 12  && month < 1) || ( date < 1 && date > 31) || (year < 1000 && year > 9999) || (month == 2 && date > 29)){
            console.log('Please enter valid data');
        }
        else{
            FindADay.DayFinder();
            FindADay.Display();
        }
    }

    static DayFinder(){
        var y0 = parseInt(year - parseInt((14 - month) /12));
        console.log('y0 '+y0);
        var x = parseInt(y0 + parseInt(y0/4) - parseInt(y0/100) + parseInt(y0/400));
        console.log('x ' +x);
        var m0 = month + parseInt(12 * parseInt((14 - month) / 12)) - 2
        console.log('month: '+m0);
        d0 = parseInt(((date + x + parseInt((31*m0) / 12))) % 7)
        console.log('day: '+d0);
    }

    static Day(){
        if(d0 == 0){
            console.log('Hey Dude its Sunday..');
        }
        else if(d0 == 1){
            console.log('Hey Dude its Monday..');
        }
        else if(d0 == 2){
            console.log('Hey Dude its Tuesday..');
        }
        else if(d0 == 3){
            console.log('Hey Dude its Wednesday..');
        }
        else if(d0 == 4){
            console.log('Hey Dude its Thursday..');
        }
        else if(d0 == 5){
            console.log('Hey Dude its Friday..');
        }
        else if(d0 == 6){
            console.log('Hey Dude its Saturday..');
        }
    }

    static Display(){
        console.log('The day for date - Month: '+ month + ' Date: '+ date + ' Year: '+year + ' is ' +d0);
        FindADay.Day();
    }
}


FindADay.Validation();

