var readline = require('readline');
var rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

var note1000 = 0;
var note500 = 0;
var note100 = 0;
var note50 = 0;
var note10 = 0;
var note5 = 0;
var note2 = 0;
var note1 = 0;

var response
rl.question('Enter the amount for which you need change: ', (answer)=>{
    response = answer
     VendingMachine.CheckValue();
    console.log('Notes Required are as belows...')
    console.log('Rs. 1000 '+note1000);
    console.log('Rs. 500  '+note500);
    console.log('Rs. 100  '+note100);
    console.log('Rs. 50   '+note50);
    console.log('Rs. 10   '+note10);
    console.log('Rs. 5    '+note5);
    console.log('Rs. 2    '+note2);
    console.log('Rs. 1    '+note1);
    var minimumNoteRequired = note1000 + note500 + note100 + note50 + note10 + note5 + note2 + note1;
    console.log('Minimum note required for change of Rs.'+response + ' are ' + minimumNoteRequired);
    rl.close();
})

class VendingMachine{
   static CheckValue(){
        if(response > 1000){
            ChangeCalculator.Note1000(response)
        }
        else if(response > 500){
            ChangeCalculator.Note500(response)
        }
        else if(response > 100){
            ChangeCalculator.Note100(response)
        }
        else if(response > 50){
            ChangeCalculator.Note50(response)
        }
        else if(response > 10){
            ChangeCalculator.Note10(response)
        }
        else if(response > 5){
            ChangeCalculator.Note5(response)
        }
        else if(response > 2){
            ChangeCalculator.Note2(response)
        }
        else if(response > 1){
            ChangeCalculator.Note1(response)
        }
        else{
            console.log('Please enter valid amount!');
        }
    }
}

class ChangeCalculator{
   static Note1000(change){
     note1000 = parseInt(change / 1000);
     change = parseInt(change % 1000);
     ChangeCalculator.Note500(change)   
    }

   static Note500(change){
        note500 = parseInt(change / 500);
        change = parseInt(change % 500);
        ChangeCalculator.Note100(change);
    }

   static Note100(change){
        note100 = parseInt(change / 100);
        change = parseInt(change % 100);
        ChangeCalculator.Note50(change);
    }

   static Note50(change){
        note50 = parseInt(change / 50);
        change = parseInt(change % 50);
        ChangeCalculator.Note10(change);
    }

   static Note10(change){
        note10 = parseInt(change / 10);
        change = parseInt(change % 10);
        ChangeCalculator.Note5(change);
    }

   static Note5(change){
        note5 = parseInt(change / 5);
        change = parseInt(change % 5);
        ChangeCalculator.Note2(change);
    }

    static Note2(change){
        note2 = parseInt(change / 2);
        change = parseInt(change % 2);
        ChangeCalculator.Note1(change);
    }

   static Note1(change){
        note1 = parseInt(change / 1);
        change = parseInt(change % 1)
    }
}