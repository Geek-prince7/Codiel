const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;
const userCollection=require('../models/user')

//  authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email' //email in db is defined and we need to check on email
},function(email,password,done){
    userCollection.findOne({email:email},function(error,user){
        if(error){console.log('error in finding user ---> passport');return done(error);}
        // if user doesnt exist or password mistamatch
        if(!user || user.password!=password)
        {
            console.log("invalid username or password");
            return done(null,false);  //done(error,Authentication)
        }
        return done(null,user);
    })

}
))


//serialize the user(encrypt) -> decide which key to be in cookie
passport.serializeUser(function(user,done){
    // done(error,key which is being sent to cookie)
    done(null,user.id);  //id from db is being send as cookie in encrpted form

})

//deserialize the user(decrypt) from the key in cookies
passport.deserializeUser(function(id,done){
    userCollection.findById(id,function(error,user){
        if(error){console.log("error in finding iser --> de serialize");return done(error);}
        
        return done(null,user);
        
    })
})


//check if user is authenticated or not
passport.checkAuthentication=function(req,resp,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    //else
    resp.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,resp,next){
    if(req.isAuthenticated())
    {
        console.log('----------------start----------- \n',req.user,'\n -----------------------end------------')
        resp.locals.user=req.user
        
    }
    next();
}

module.exports=passport
