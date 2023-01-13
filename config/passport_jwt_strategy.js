const passport=require('passport')
const jwtStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;
const env=require('./environment')


const user_collection=require('../models/user');

let opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.passport_jwt_secret_key   //we can use hex code here instead of string
}


//jwt payload contain the user info
passport.use(new jwtStrategy(opts,function(jwt_payload,done){
    user_collection.findById(jwt_payload._id,(error,user)=>{
        if(error)
        {
            console.log(error);
            return done(null);

        }
        if(user)
        {
            return done(null,user);
        }
        return done(null,false);
    })

}))

// passport.checkJwtAuth=(req,resp,next)=>{
//     console.log(req.isAuthenticated())
//     if(req.isAuthenticated())
//     {
//         return next();
//     }
//     return resp.json(500,{message:"bhai jwt bhej header m "})

// }


module.exports=passport;
