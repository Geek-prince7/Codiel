module.exports.user=function(req,resp){
    //we have used cookie parser in index.js so we can see cookie
    console.log(req.cookies)
    //we can change cookie val also
    resp.cookie('name','abc')
    //add new cookie
    resp.cookie('new cookie','new val')
    return resp.end("<h1>user is rendered</h1>")
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
    
}