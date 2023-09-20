const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    age:{
        type:Number,
        index: true,

    }

}) ;


const User = mongoose.model('User', schema)
  

module.exports = User