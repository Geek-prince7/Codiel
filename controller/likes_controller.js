const likesCollection=require('../models/like');
const postsCollection=require('../models/posts');
const commentsCollection=require('../models/comment');

module.exports.toggleLike=async(req,resp)=>{
    try{
        if(req.query.id==null)
        {
            return resp.json(212,{message:"bhai id bhej query param m"})
        }
        console.log("request query--------------------->\n",req.query,req.user);
        let likeable;
        let deleted=false;

        //get the post/comment on which we want to like or unlike
        if(req.query.type=='posts')
        {
            likeable= await postsCollection.findById(req.query.id).populate('likes');

        }
        else{
            likeable=await commentsCollection.findById(req.query.id).populate('likes');

        }


        //check if already liked
        let existingLike=await likesCollection.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        })

        //if like already there delete it
        if(existingLike)
        {
            console.log("existing like id---------------->",existingLike)
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted=true;

        }
        //create a new like
        else{
            var newlike=await likesCollection.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            })
            console.log("new like created in likes collection ",newlike)
            likeable.likes.push(newlike._id);
            likeable.save();

        }
        if(req.xhr)
        {
            return resp.json(200,{
                message:'success',
                data:{
                    deleted:deleted,
                    data:newlike

                }
                
            })
        }
        resp.redirect('back');



    }
    catch(error){
        console.log("error in toggling likes",error);
        resp.json(500,{message:"internal server error"})
    }


}