const mongoose=require('mongoose')
// const user=require('./user')

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //defining 1:M relation 1user:Many posts
    user:{
        type:mongoose.Schema.Types.ObjectId, //the object id is used here from user schema
        ref:'users' //from users schema

    },
    //storing array comment ids  for faster fetch
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ],
    //storing likes object ids array associated to that post to fetch faster
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'likes'
        }
    ]

},{
    timestamps:true
})

const postCollection=mongoose.model('posts',postSchema);
module.exports=postCollection;