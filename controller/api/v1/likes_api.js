const likesCollection=require('../../../models/like');
const postsCollection=require('../../../models/posts');
const commentCollection=require('../../../models/comment');
module.exports.toggleLike=async(req,resp)=>{
    //get id of likeable and type of likeable
    let type=req.query.type;
    let id=req.query.id;
    let deleted=false;
    let likeable;
    if(type=='posts')
    {
        likeable=await postsCollection.findById(id).populate('likes')

    }
    else{
        likeable=await commentCollection.findById(id).populate('likes');
    }
    

}