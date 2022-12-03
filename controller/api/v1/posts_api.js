const posts_collection=require('../../../models/posts');
const comment_collection=require('../../../models/comment')

module.exports.index=async (req,resp)=>{
    let posts=await posts_collection.find({})
        .select('content user comments createdAt')   //selecting only id content user and comments from posts
        .sort('-createdAt')
        .populate('user','email name avatar') //from user select only id email and name id
        .populate({path:'comments',populate:{path:'user',select:'name email avatar'}}); //from user in array of comments select name email avatar id 
    return resp.json(200,{
        messsage:"list of posts",
        posts:posts
    })
}


//delete post
module.exports.destroy=async (req,resp)=>{ 
    try{

        //post id
        const post_id=req.params.id
        let post=await posts_collection.findById(post_id);
        // id means string(_id) auto convert
        
            await post.remove();
            await comment_collection.deleteMany({post:post_id})
            return resp.json(200,{
                message:'posts and associated comment deleted successfully'
            })

            
        
        
        
    }
    catch(err)
    {
        console.log("Error",err);
        return resp.json(500,{
            messsage:'Internal server error'
        })
    }
}
