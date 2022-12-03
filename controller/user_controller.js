const userCollection=require('../models/user')

//to delete existing avatar if new updated
const fs=require('fs')
const path=require('path')

module.exports.user=function(req,resp){
    //we have used cookie parser in index.js so we can see cookie
    console.log(req.cookies)
    //we can change cookie val also
    // resp.cookie('name','abc')
    //add new cookie
    // resp.cookie('new cookie','new val')
    userCollection.findById(req.params.id,(error,user)=>{
        return resp.render('profile',{title:'Codiel | profile',profile_user:user})

    })
    
}


//update user's info
module.exports.update=async(req,resp)=>{
    // if(req.user.id==req.params.id)
    // {
    //     userCollection.findByIdAndUpdate(req.params.id,req.body,(error,user)=>{
    //         if(error){return;}
    //         return resp.redirect('back')

    //     })
    // }
    // else{
    //     return resp.status(401).send('unauthorized')
    // }


    if(req.user.id==req.params.id)
    {
        try{
            let user=await userCollection.findById(req.params.id)
            userCollection.uploadedAvatar(req,resp,(error)=>{
                if(error){
                    console.log("************* Multer error ***********",error)
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    //check if in database avatar of this user already exist
                    if(user.avatar)
                    {
                        //check if file can be accessible
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                            //deleting the file
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                        }
                    }
                    user.avatar=userCollection.avatar_path+'/'+req.file.filename;
                }
                user.save()
                return resp.redirect('back')
            })
            
            
        }
        catch(error)
        {
            console.log("error");
            return;
        }
    }
    else{
        return resp.status(401).send('unauthorized')
    }

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
    req.flash('success','successfully logged in ')
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
   req.flash('success','successfully logged out ')
    return resp.redirect('/users/sign-in')
}

