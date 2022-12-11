const { Int32 } = require('mongodb')
const mongoose=require('mongoose')

const pwdSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isValid:{
        type:Number
    }
})
const user_pwd=mongoose.model('user_pwd',pwdSchema);
module.exports=user_pwd;