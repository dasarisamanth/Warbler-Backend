//require("dotenv").load()
const jwt = require('jsonwebtoken');



exports.isLoggedIn = function(req , res , next){

    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY, function(err , payload){
            if(payload){
                return next()
            }
            else{
                return next({
                    status:401,
                    message: "Please Login first"
                })
            }
        })
        
    } catch (err) {
        return next({
            status:401,
            message: "Please Login first"
        })
    }
}


exports.isAuthorized = function(req , res , next){
    try {
          debugger
        const token = req.headers.authorization.split(" ")[1]
       // console.log(token);
        jwt.verify(token,process.env.SECRET_KEY, function(err , payload){
            console.log(payload)
            console.log(req.params.id)
            if(payload && payload.id === req.params.id){
                
                next()
            }
            else{
                return next({
                    status:401,
                    message: "UnAuthorized"
                })
            }
        })
        
    } catch (err) {
        return next({
            status:401,
            message: "UnAuthorized" 
        })
    }
}