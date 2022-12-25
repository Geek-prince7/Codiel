const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    //this defines the object id of liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refpath:'onModel',

    },

    //this feild defines the type of likeable object since its a dynamic object( posts or comments).
    onModel:{
        type:String,
        required:true,
        enum:['posts','comments']
    }

    

},{
    timestamps:true
})

const likesCollection=mongoose.model('likes',likeSchema);
module.exports=likesCollection;