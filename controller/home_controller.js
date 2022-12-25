const postsCollection=require('../models/posts')
const userCollection=require('../models/user')
const likesCollection=require('../models/like')



module.exports.home=async function(req,resp){
    // send all posts to render



    //----- this will get posts and then using user id of user find the user from user collection
    // postsCollection.find({}).populate('user').exec((error,posts)=>
    // {
    //     if(error){console.log("-------------------error in populating ---------------------\n",error);return;}
    //     resp.render('home',{title:'home',posts});

    // })
    

    // ------- this will get post and then using user id check user collection to know which user has posted it ... 
    // then it ll go to comments array and comments_ids -> comment collection fetch comment content and user(id) which commented on it -> then in comment collection ..
    //go to user collection to fetch the user details that which user has added this comment on this post
    /*
    postsCollection.find({})
    .populate('user')
    .populate({path:'comments',populate:{path:'user'}})
    .exec((error,posts)=>
    {
        if(error){console.log("-------------------error in populating ---------------------\n",error);return;}

        //we also need to send all the users to view ..view need to render all the users
        userCollection.find({},(error,users)=>{
            resp.render(
            'home',
            {
                title:'codiel | home',
                posts,
                all_users:users
            });

        })
        

    })
    */


    //converting code to async await
    try{
        let posts=await postsCollection.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({path:'comments',populate:{path:'user'}})
        .populate({path:'likes',populate:{path:'user'}});

        let users=await userCollection.find({});
        // console.log("--------------------------posts------------------------\n",posts,'\n----------------------------->')


        resp.render(
            'home',
            {
                title:'codiel | home',
                posts,
                all_users:users
            });
        }
    catch(error)
    {
        console.log("error :",error)
    }


    
    
}