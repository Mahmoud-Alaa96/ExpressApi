const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util')
const _ = require('lodash')



const singJWT = util.promisify(jwt.sign);
const verifyJWT = util.promisify(jwt.verify);



const saltRounds = 7;
const jwtSecret = "bankikenkomzakorasansai"

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
    
},{
    toJSON:{ 
        transform:(doc, ret) => _.omit(ret, ['__v','password'])
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

schema.methods.generateToken = function(){
    const currentDocment = this;
    return singJWT({id:currentDocment.id}, jwtSecret, {expiresIn: '1h'})

}


schema.statics.getUserFromToken = async function(token) {
    const User = this;
    const {id} = await verifyJWT(token,jwtSecret);
    const user = await User.findById(id);
    return user;

}

const User = mongoose.model('User', schema)
  

module.exports = User