const express = require('express');
const User = require('../model/user');
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs');

const saltRounds = 7;
router.get('/',(req,res)=>{
    User.find({})

});


router.post('/',async(req,res,next)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        const createdUser = new User({
            username:req.body.username,
            age:req.body.age,
            password:hashedPassword
        })
         
        const user = await createdUser.save();
        res.status(200).send(user);
    }catch(err){
        err.statusCode = 422
        next(err)
    }

});

router.patch('/:id',()=>{

});

router.delete('/:id',()=>{

});



module.exports = router