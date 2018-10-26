var myArgs = process.argv.slice(2);
var t = parseFloat(myArgs[0]);
var v = parseFloat(myArgs[1]);

if(t > 50 || v > 120 || v < 3)
{
    console.log('Please note that temperature cant be greater than 50, wind speed cant be greater than 120 and less than 3');
}
else
{
    var w = 35.74 + 0.6215*t + (0.4275*t - 35.75) * Math.pow(v, 0.16);
    console.log('Temperatur: '+t);
    console.log('Wind speed: '+v);
    console.log('Windchill: '+w);
}
