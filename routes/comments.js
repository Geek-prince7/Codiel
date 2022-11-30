const express=require('express')
const passport = require('passport')
const router=express.Router()
const commentsController=require('../controller/comments_controller')
console.log('comments controller')



//add a comment on a post
router.post('/create',passport.checkAuth,commentsController.addComment)

//remove a comment
router.get('/destroy/:comment_id',passport.checkAuth,commentsController.destroy);

module.exports=router