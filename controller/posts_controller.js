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
        req.flash('success','post created successfully');
        return resp.redirect('back')
    })
    

}


//converting it to async await
//delete post
module.exports.destroy=async (req,resp)=>{
    //post id
    const post_id=req.params.id
    /*
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
    */


    try{
        let post=await post_collection.findById(post_id);
        // id means string(_id) auto convert
        if(post.user==req.user.id)
        {
            await post.remove();
            await comment_collection.deleteMany({post:post_id})
            req.flash('success','post deleted')
            return resp.redirect('back');

            
        }
        else{
            req.flash('error','you are not authorized to delete it')
            return resp.redirect('back');

        }
        
    }
    catch(err)
    {
        req.flash('error','post not deleted error occured')
        console.log("Error",err);
        return resp.redirect('back');
    }

   

}


