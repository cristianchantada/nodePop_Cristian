const jsonWT = require('jsonwebtoken');
const httpError = require('http-errors');

module.exports = (req, res, next) => {
    try{
        const userSignedToken = req.get('Authorization') || req.body.token || req.query.token;
        console.log(userSignedToken);
    
        if(!userSignedToken){
            const err = httpError(401, 'No ha proporcionado un token. Realice un Login por favor');
            next(err);
            return
        }
    
        const result = jsonWT.verify(userSignedToken, process.env.JWT_POWER_SECRET);
    
        next();

    } catch(err){
        next(err);
    }

}