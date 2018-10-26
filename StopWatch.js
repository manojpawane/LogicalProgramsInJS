var readline = require('readline');
var StopWatch =  require('node-stopwatch').Stopwatch;

var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

var stopWatch = StopWatch.create();

var StartStopWatch = function(){
    return new Promise(function(resolve, reject){
     try{
        stopWatch.start();
        console.log('PRESS ENTER TO STOP THE STOPWATCH');
        rl.on('line', (input)=>{
            resolve(input);
        })
     }   
     catch(error)
     {
        reject(error)
     }
    })
}

var StopWatchStopped = function(){
     new Promise(function(resolve, reject){
     try{
       resolve(stopWatch.stop());
     }   
     catch(error)
     {
        reject(error)
     }
    })
}

var ElapsedTimeForStopWatch =  function(){
    console.log('Elapsed Time in Seconds: '+stopWatch.elapsed.seconds);
}

 var StopWatchApplication = async function()
 {
    await StartStopWatch();
    await StopWatchStopped();
    await ElapsedTimeForStopWatch();
 }

 StopWatchApplication();

 
