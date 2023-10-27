const express = require('express');
const User = require('../model/user');
const { userValidationRules, validate }  = require('../middleware/checkRequired');
const  authorization = require('../middleware/authorization');
const {check, validationResult} = require('express-validator');
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs');
const CustomError = require('../helper/customError')


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
});

router.post('/:login',async (req, res,next)=>{
    try{
    const user = await User.findOne({username: req.body.username});
    if(!user){
      throw new CustomError('Wronge username or password',401);
    }
    const isMatch = await user.checkPassword(req.body.password)
    if(!isMatch){

     throw new CustomError('Wronge username or password',401);
   
    }

    const token = await user.generateToken();
    res.json({
      user,
      token,
      message:"Hello again",
    })

  }catch(error){
    res.send(error)
}

})


router.get("/profile",authorization,
(req, res, next)=>{
    res.send(req.user)    

})


router.patch('/:id',()=>{

});

router.delete('/:id',()=>{

});



module.exports = router






 