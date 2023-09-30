const express = require('express');
const User = require('../model/user');
const { userValidationRules, validate }  = require('../middleware/checkRequired');
const {check, validationResult} = require('express-validator');
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs');
     


const error_mes =()=> (req, res,next)=> {
  const {errors} = validationResult(req);
  //console.log(req.body);
  
  if (errors.length) {
    const errors = new Error('Validation Error');
    errors.statusCode =442 

    return res.status(422).jsonp(errors.array());
  } else {
    next();
  }
}



//const saltRounds = 7;
router.get('/',(req,res)=>{
    User.find({})

});



router.post('/',
userValidationRules()
,validate,

  async(req,res,next)=>{
    try{
        //const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        const createdUser = new User({
            username:req.body.username,
            age:req.body.age,
            password:req.body.password
        }) 
         
        const user = await createdUser.save();
        res.status(200).send(user);
    }catch(err){
        err.statusCode = 422
        next(err)
    }
a
});

router.post('/:login',async (req, res,next)=>{
    try{
    const user = await User.findOne({username: req.body.username});
    if(!user){
      const error = new Error('Wronge username or password');
      error.statusCode = 401;
      throw error;
    }
    const isMatch = await user.checkPassword(req.body.password)
    if(!isMatch){
      const error = new Error('Wronge username or password');
      error.statusCode = 401;
      throw error;
    }
    res.send()
  }catch(error){
    next(error)
}

})


router.patch('/:id',()=>{

});

router.delete('/:id',()=>{

});



module.exports = router






//if else login user