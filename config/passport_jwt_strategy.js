const passport=require('passport')
const jwtStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;

const user_collection=require('../models/user');

let opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'codiel' //we can use hex code here
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


module.exports=passport;
