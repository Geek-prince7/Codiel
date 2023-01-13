const user_collection=require('../../../models/user')
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment')

module.exports.createSession=async(req,resp)=>{
    try{
        let user=await user_collection.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password)
        {
            return resp.json(422,{
                message:'invalid username/password'
                
            })


        }
        return resp.json(200,{
            message:"sign in successful .keep your token",
            data:{
                token:jwt.sign(user.toJSON(),env.passport_jwt_secret_key,{expiresIn:1000*1000})
            }

        })
        

    }
    catch(error){
        console.log("**********error***************",error);
        return resp.json(500,{
            message:'internal server error'
        })
    }
    
}