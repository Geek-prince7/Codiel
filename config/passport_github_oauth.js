const passport=require('passport')
const githubStrategy=require('passport-github2').Strategy;
const crypto=require('crypto');


const user_collection=require('../models/user');

//tell passport to use a new strategy for github sign in
passport.use(new githubStrategy({
        clientID:'e10cf7f89bbdbdbc9b5e',
        clientSecret:'00a1106a3d90cc30e2c80b60eefe13d73efe28c3',
        callbackURL:'http://localhost:8000/users/auth/github/callback'
    },(accessToken,refreshToken,profile,done)=>{
        // console.log(profile)
        //find a user
        user_collection.findOne({email:profile._json.email},(error,user)=>{
            if(error)
            {
                console.log(error)
                return done(null);
            }
            //if user found set this user as req.user
            else if(user)
            {
                return done(null,user);
            }
            //if user not found create new user with random password and set in req.user
            else{
                //create new user in db and then login
                user_collection.create({
                    name:profile.displayName,
                    email:profile._json.email,
                    password:crypto.randomBytes(20).toString('hex') //20 size password in hexa decimal
                },(error,usr)=>{
                    if(error)
                    {
                        console.log("----------------------error in creating user ---------------------",error);
                        return done(null);
                    }
                    return done(null,usr);

                    

                })

            }
        })

    }
));



module.exports=passport;