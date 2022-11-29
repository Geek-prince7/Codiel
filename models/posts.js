const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, //the object id is used here from user schema
        ref:'user' //from user schema

    }

},{
    timestamps:true
})

const postCollection=mongoose.model('posts',postSchema)
module.exports=postCollection;