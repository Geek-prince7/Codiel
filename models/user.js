const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true

    }

},
{
    timestamps:true  //this will keep a log of created on and updated on
})

//tell mongoose that its a schema
const user=mongoose.model('user',userSchema)

module.exports=user