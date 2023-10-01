const User = require('../model/user');

module.exports = async (req, res, next)=>{
    try{
      const authorization = req.headers.authorization
      if(!authorization) throw new Error("Authorization requried");  
      req.user = await User.getUserFromToken(authorization)
      if(!req.user) throw new Error("Authorization requried");
      next()
        
    }catch(err){
      err.statusCode = 401;
      next(err);
    }
  
  }