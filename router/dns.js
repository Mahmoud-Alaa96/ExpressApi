const express = require('express')
const dns = require('dns')
const app = express()
const router = express.Router()


router.get('/:domain', (req,res,next) =>{
    dns.resolve(req.params.domain, (err, records)=>{
      if (err) {
        //err.statusCode = 404;
        return next(err);
    }else{
        res.send(records)
        };
    });
});


module.exports = router