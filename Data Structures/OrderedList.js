var fs = require('fs');
var readline = require('readline');
var rl=  readline.createInterface(
    {
        input: process.stdin,
        output:process.stdout
    }
)

var readfile = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('NumberFile.txt','utf8', function(err, content){
                if(!err){
                    var contents = content.trim().toString().split(' ');
                    resolve(contents);
                }

            })
        } catch (error) {
            reject(error);
        }
    })
}
fs.readFile('NumberFile.txt')