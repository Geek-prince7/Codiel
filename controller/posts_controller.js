const post_collection=require('../models/posts')
const comment_collection=require('../models/comment')

// /posts -> handle
module.exports.posts=function(req,resp){
    return resp.end("<h3>posts page</h3")
}


//new post create --> post form handle
module.exports.newPost=function(req,resp){
    post_collection.create({content:req.body.content,user:req.user.id},function(error,usr){
        if(error){console.log("error in saving post --------");return;}
        console.log(usr);
        return resp.redirect('back')
    })
    

}


//delete post

module.exports.destroy=(req,resp)=>{
    //post id
    const post_id=req.params.id
    post_collection.findById(post_id,(error,post)=>{
        //authorization
        // id means string(_id) auto convert
        if(post.user==req.user.id)
        {
            post.remove();
            comment_collection.deleteMany({post:post_id},(error)=>{
                if(error)
                {
                    return;
                }
                return resp.redirect('back');

            })
            
        }
        //user isnt authorized to delete
        else
        {
            resp.redirect('back')
        }
    })
}


