const fs = require('fs');

module.exports = function(message,status){
    const content = `${new Date()} - ${message} - status ${status}\n`;
    const file = new Date(Date.now()).toISOString().split('T')[0];
    const logFolder = rootDirectory+'/logs/'
    const isLogFolderExist = fs.existsSync(logFolder);
    if(!isLogFolderExist) fs.mkdirSync(logFolder);
    
    fs.appendFile(logFolder+file+'.log',content,(err)=>{
        if(err) console.log(err)
    })
}