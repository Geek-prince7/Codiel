const comment_collection=require('../models/comment');
const post_collection=require('../models/posts');

const comment_mailer=require('../mailers/comments_mailer')

// add a comment
module.exports.addComment=async function(req,resp){
    // console.log(req.body)

    // find the post using post id
    /*
    post_collection.findById(req.body.post_id,(error,post)=>{
        if(error){
            console.log('error');
            return;
            
        }
        //if post not found
        if(!post)
        {
            console.log('--------------------post not found--------------------------------');
            return resp.redirect('back');
        }
        //if post exist
        //add comment in comment collection
        comment_collection.create(
            {
                content:req.body.comment,
                user:req.user.id,
                post:req.body.post_id
            },(error,comm)=>{
                //handle error
                if(error){console.log("---------error-------");return;}
                // update posts.comment array

                post.comments.push(comm); //it'll automatically fetch the id from comm and push it
                post.save(); //update
                console.log(comm);
                resp.redirect('back');
        })


    })
    */

    try{
        let post=await post_collection.findById(req.body.post_id)
        if(post)
        {
            let comm=await comment_collection.create(
            {
                content:req.body.comment,
                user:req.user.id,
                post:req.body.post_id
            })
            await post.comments.push(comm); //it'll automatically fetch the id from comm and push it
            await post.save(); //update
            console.log(comm);
            //call the mailer
            comm=await comm.populate('user','name email')
            // comment_mailer.newComment(comm); //we have commented mailer service

        }
        resp.redirect('back');

    }
    catch(err)
    {
        console.log("Error",err);
        return;
    }
    
    

    
   
    
}


//remove a comment
module.exports.destroy=async (req,resp)=>{
    const comment_id=req.params.comment_id;
    //find comment
    /*
    comment_collection.findById(comment_id,(error,comment)=>{
        //authorize that the comment is posted by same user who is logged in or not
        if(req.user.id==comment.user){
            let post_id=comment.post;
            comment.remove();
            //find the post and delete that comment from comments array
            post_collection.findByIdAndUpdate(post_id,{$pull:{comments:comment_id}},(err,post)=>{
                return resp.redirect('back');
            })
            
            

        }
        else
        {
            let post_id=comment.post
            post_collection.findById(post_id,(error,post)=>{
                //if post is yours and some one else is commented u can delete it
                if(req.user.id==post.user)
                {
                    comment.remove();
                    post_collection.findByIdAndUpdate(post_id,{$pull:{comments:comment_id}},(err,post)=>{
                        return resp.redirect('back');
                    })
                    

                }
                else{
                    resp.redirect('back')

                }
            })
            
        }
    })
   */
  try{
        let comment=await comment_collection.findById(comment_id);
        let post_id=comment.post;
        //checking if the logged in person is post creator then he can delete all comments in his post
        let post=await post_collection.findById(post_id);
        if(req.user.id==comment.user || req.user.id==post.user){
        comment.remove();
        //find the post and delete that comment from comments array
        await post_collection.findByIdAndUpdate(post_id,{$pull:{comments:comment_id}})


        }
        resp.redirect('back')
    }
    catch(err){
        console.log("Error",err);
        return;
    }
  
}