var inputData
var IntergerAddtionLogic = function(rl)
{
    return new Promise(function(resolve, reject) {
        try{
            rl.on('line', (input) => {
                resolve(input);
            });
        }
        catch(error){
            reject(error);
        }
    });
}


module.exports.IntergerAddtionLogic = IntergerAddtionLogic;

