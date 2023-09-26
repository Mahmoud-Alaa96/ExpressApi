module.exports = (params) => (req, res, next)=>{
    const receivedParams = Object.keys(req.body);
    const missingParams = params.filter(paramName => 
        !receivedParams.includes(paramName))
    
    if (missingParams.length) {
        const error = new Error('required parameter missing');
        error.statusCode = 422;
        error.errors = missingParams.reduce((agg, param) => {
        agg[param] = {type:'required'};
        return agg;
    
    },{});
    return next(error)
    }
    next();
}



