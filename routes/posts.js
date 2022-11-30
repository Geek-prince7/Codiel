const express=require('express')
const passport = require('passport')
const router=express.Router()
const postsController=require('../controller/posts_controller')
console.log('posts controller')
router.get('/',postsController.posts)


// create new post 
router.post('/new-post',passport.checkAuth,postsController.newPost)


//delete a post
router.get('/destroy/:id',passport.checkAuth,postsController.destroy);



module.exports=router