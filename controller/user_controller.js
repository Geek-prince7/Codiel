const userCollection=require('../models/user')

//to delete existing avatar if new updated
const fs=require('fs')
const path=require('path')


const userPwdCollection=require('../models/user_pwd');
const passwordMailer=require('../mailers/forget_password');
const user = require('../models/user');
const friendsCollection = require('../models/friends');

module.exports.user=async function(req,resp){
    //we have used cookie parser in index.js so we can see cookie
    console.log(req.cookies)
    //we can change cookie val also
    // resp.cookie('name','abc')
    //add new cookie
    // resp.cookie('new cookie','new val')
    let user=await userCollection.findById(req.params.id)
    let friend;
    if(user)
    {
        //check if req.user is friend with this user or not
        friend=await friendsCollection.findOne({req_user:req.user,friend_user:user})
        if(!friend){
            friend=await friendsCollection.findOne({friend_user:req.user,req_user:user})
            
        }

    }
    
    return resp.render(
        'profile',
        {
            title:'Codiel | profile',
            profile_user:user,
            friend:friend
        }
    )
    
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
    let country=['India','Indonesia']
    return resp.render('user_sign_up',{title:"Codeil | Sign Up",country:country})
}


//signup response
module.exports.createUser=function(req,resp){


    console.log("req body is ---------------------------> \n",req.body)
    if(req.body.password!=req.body.cnf_password)
    {
        return resp.redirect('back')
    }
    userCollection.create(req.body,function(error,data){
        if(error)
        {
            console.log("----------------------------- error in saving data --------------------------------",error)
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


//forget password page
module.exports.forgetPwdPage=(req,resp)=>{
    resp.render('forget_pwd',{title:'Codiel |reset password'});
}

//reset pwd form handle
module.exports.resetPwd=async(req,resp)=>{
   let user=await userPwdCollection.find({email:req.body.email});
   console.log(user)
   if(user)
   {
        await userPwdCollection.findOneAndUpdate({email:req.body.email},{isValid:1});
        await passwordMailer.forgetPassword(user);
        resp.end("<h1>Check your mail reset link is provided</h1>")



   }
   else{
    console.log("not a valid user")
    resp.redirect("back")
   }
    
}


module.exports.setNewPwdPage=async(req,resp)=>{
    // console.log("accss token",req.query.accessToken)
    let accessToken=req.query.accessToken
    let user=await userPwdCollection.find({isValid:1,password:accessToken})
    if(user)
    {
        resp.render('set_password',{title:'codiel | set password',accessToken:req.query.accessToken});
    }
    resp.end('<h1>Broken link</h1>')

}

module.exports.changePwd=async(req,resp)=>{
    console.log("request body is ",req.body);
    if(req.body.password!=req.body.cnf_password)
    {
        resp.redirect('back');
    }
    let accessToken=req.body.accessToken;
    let user=await userPwdCollection.findOne({isValid:1,password:accessToken})
    if(user)
    {
        let ur=await userCollection.findOneAndUpdate({email:user.email},{password:req.body.password});
        
        await userPwdCollection.findOneAndUpdate({password:accessToken,isValid:1},{isValid:0});
        resp.redirect('/users/sign-in');
    }
    resp.redirect('back');

    
}

