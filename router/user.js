const express = require('express');
const User = require('../model/user');
const checkRequiredParams = require('../middleware/checkRequired');
const {check, validationResult} = require('express-validator');
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs');

//a
     







const saltRounds = 7;
router.get('/',(req,res)=>{
    User.find({})

});



router.post('/',
[check('username').isEmail(),
check('password').isLength({min:5})],function (req, res,next) {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      next();
    }
  },async(req,res,next)=>{
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

router.post('/:login', checkRequiredParams(['username','password']),async (req, res)=>{
    
    const user = await User.findOne({username: req.body.username});
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    console.log(isMatch)

})


router.patch('/:id',()=>{

});

router.delete('/:id',()=>{

});



module.exports = router