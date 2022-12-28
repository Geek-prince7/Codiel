const mongoose=require('mongoose')

const friendsSchema=new mongoose.Schema({
    req_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    friend_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})

const friendsCollection=mongoose.model('friends',friendsSchema);
module.exports=friendsCollection;