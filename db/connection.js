const mongoose = require('mongoose')
const connectionstring =   process.env.DBCONNECTIONSTRING

mongoose.connect(connectionstring).then(res =>{
    console.log("BookStore db connected successfully");
    
}).catch(err=>{
    console.log("Mogodb Atlas connection failed");
    console.log(err);
    
    
})