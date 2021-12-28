const fs = require('fs');

module.exports = function(message,status){
    const content = `${new Date()} - ${message} - status ${status}\n`;
    const file = new Date(Date.now()).toISOString().split('T')[0];
    
    fs.appendFile(rootDirectory+'/logs/'+file+'.log',content,(err)=>{
        if(err) console.log(err)
    })
}