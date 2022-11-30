const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // defining 1:M relation 1user:Many comments
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    // defining 1:M relation 1post:Many comments
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'

    }
},{
    timestamps:true
})

const commentCollection=mongoose.model('comments',commentSchema)

module.exports=commentCollection;