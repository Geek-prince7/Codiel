const friendsCollection=require('../models/friends');
const userCollection=require('../models/user')
module.exports.addFriend=async(req,resp)=>{
    
    try {
        console.log("request query------------------------------------->\n",req.query)
        let newfriend=await friendsCollection.create({req_user:req.user,friend_user:req.query.friend_id});
        let user1=await userCollection.findById(req.user);
        let user2=await userCollection.findById(req.query.friend_id);
        user1.friends.push(newfriend);
        user2.friends.push(newfriend);
        await user1.save();
        await user2.save();
        
        resp.redirect('back');
        
    } catch (error) {
        console.log("----------------- error in creating friend -----------------------------------------------------\n",error)
        
    }



}