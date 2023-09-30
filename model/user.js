const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 7;


const schema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    age:{
        type:Number,
        index: true,

    },
    password:{
        type: String,
        require:true, 
    }
    
}) ;


schema.pre("save", async function(){
    const currentDocment = this;
    if(currentDocment.isModified("password")){
        currentDocment.password = await bcrypt.hash(currentDocment.password,
            saltRounds)
    }
})

schema.methods.checkPassword = function(plainPassword){
    const currentDocment = this;
    return bcrypt.compare(plainPassword, currentDocment.password);
}



const User = mongoose.model('User', schema)
  

module.exports = User