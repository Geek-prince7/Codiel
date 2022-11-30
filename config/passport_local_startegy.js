const passport=require('passport')
const Localstartegy=require('passport-local').Strategy;

const userCollection=require('../models/user')


passport.use(new Localstartegy({
    usernameField:'email',
    passReqToCallback:true // optional , by settin this true we can use req in callback function

},function(req,email,password,done){
    userCollection.findOne({email:email},function(error,user){
        if(error){
            req.flash('error',error);
            return done(error);}
        if(!user || user.password!=password){
            req.flash('error','Invalid username/password');

            return done(null,false);
        }
        return done(null,user);
    })

}))

//serialize
passport.serializeUser(function(user,done){
    done(null,user._id);
})

//deserialize
passport.deserializeUser(function(id,done){
    userCollection.findById(id,function(error,user){
        if(error){
            return done(error);
        }
        return done(null,user);
    })
})

// acts as middleware everytime a request comes it check if auth required if required then if authenticated then next otherwise go to sign in page
passport.checkAuth=function(req,resp,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    return resp.redirect('/users/sign-in')
}
// passing user(name,email,id,pwd) to locals so that views can access it
passport.setAuth=function(req,resp,next){
    console.log("request users----------------------------------------->")
    console.log(req.user)
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        resp.locals.user=req.user
    }
    next();
}

passport.disableLogin=function(req,resp,next){
    if(req.isAuthenticated())
    {
        return resp.redirect('/users/profile');
    }
    return next();

}

module.exports=passport