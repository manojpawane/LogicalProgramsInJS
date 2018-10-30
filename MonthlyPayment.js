var args = process.argv.slice(2);

//Principal
var p =parseInt(args[0]); 

//year
var y = parseInt(args[1]);

//percent
var R = parseInt(args[2]);

class MonthlyPayment{
     
    static Calculator(){
        var n = 12 * y;
        var r = parseFloat(R / (12*100));
        var payment = (p * r) / 1 - Math.pow((1 + r),(-n))
        return payment
    }

    static Display(){
        var value = MonthlyPayment.Calculator();
        console.log('Payment: '+Math.round(value * 100) / 100);
    }

}

MonthlyPayment.Display();