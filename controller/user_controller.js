const userCollection=require('../models/user')

module.exports.user=function(req,resp){
    //we have used cookie parser in index.js so we can see cookie
    console.log(req.cookies)
    //we can change cookie val also
    // resp.cookie('name','abc')
    //add new cookie
    // resp.cookie('new cookie','new val')
    return resp.render('profile',{title:'Codiel | profile'})
}

//render sign in page
module.exports.signin=function(req,resp){
    return resp.render('user_sign_in',{title:"Codiel | Sign In"})
}

//render signup page
module.exports.signup=function(req,resp){
    return resp.render('user_sign_up',{title:"Codeil | Sign Up"})
}


//signup response
module.exports.createUser=function(req,resp){
    if(req.body.password!=req.body.cnf_password)
    {
        return resp.redirect('back')
    }
    userCollection.create(req.body,function(error,data){
        if(error)
        {
            console.log("----------------------------- error in saving data --------------------------------")
            return resp.redirect('back')
        }
        console.log(data)
        return resp.redirect('/users/sign-in')

    })

}


//login request
module.exports.login=function(req,resp){
    resp.redirect('/');

}

module.exports.destroySession=function(req,resp){
    /*
    req.session.destroy(function(error){
        if(error)
        {
            console.log("error in logging out ---------")
        }

    })
    */
   //or
   req.logout(function(error){
    console.log("Error in logging out");
   });
    return resp.redirect('/users/sign-in')
}