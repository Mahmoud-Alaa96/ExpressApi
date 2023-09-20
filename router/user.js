const express = require('express');
const User = require('../model/user');
const app = express()
const router = express.Router()


router.get('/',(req,res)=>{
    User.find({})

});

router.post('/',()=>{
    const createdUser = new User({
        username:"mo mo 2",
        age:27
    })
     
    createdUser.save()
    console.log("Done add")
});

router.patch('/:id',()=>{

});

router.delete('/:id',()=>{

});



module.exports = router