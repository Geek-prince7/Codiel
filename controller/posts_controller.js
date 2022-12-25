const post_collection=require('../models/posts')
const comment_collection=require('../models/comment')
const likes_collection=require('../models/like')

// /posts -> handle
module.exports.posts=function(req,resp){
    return resp.end("<h3>posts page</h3")
}


//new post create --> post form handle
module.exports.newPost=async function(req,resp){
    try{
        //detect if its an ajax request
        if(req.xhr){
            
            let post=await (await post_collection.create({content:req.body.content,user:req.user.id})).populate('user')
            return resp.status(200).json({
                data:{
                    post:post
                },
                message:'post created'
            })
        }
        //if its not an ajax request 
        let post=await post_collection.create({content:req.body.content,user:req.user.id})
        if(post)
        {
            req.flash('success','post created successfully');
        }
        return resp.redirect('back')
    }
    catch(error)
    {
        req.flash('error','post not created');
        return resp.redirect('back')
    }
    

}


//converting it to async await
//delete post
module.exports.destroy=async (req,resp)=>{
    
    /*
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
    */


    try{

        //post id
        const post_id=req.params.id
        let post=await post_collection.findById(post_id);
        // id means string(_id) auto convert
        if(post.user==req.user.id)
        {
            //delete likes on post
            await likes_collection.deleteMany({likeable:post,onModel:'posts'})

            //delete likes assosiated on comments
            await likes_collection.deleteMany({_id:{$in:post.comments}})

            await post.remove();
            await comment_collection.deleteMany({post:post_id})
            if(req.xhr)
            {
                return resp.status(200).json({
                    data:{
                        post_id:post_id
                    },
                    message:'deleted successfully'
                })
            }
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


