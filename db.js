const mongoose = require('mongoose');
console.log("Trying to Connecte Mongodb.....  ")
mongoose.connect('mongodb://127.0.0.1:27017/express-app').then(()=>{
    console.log("Conncted to Mongodb Successfully")
}).catch((err)=>{
    console.error(err);
    process.exit(1)
    });