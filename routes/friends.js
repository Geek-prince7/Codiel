const express=require('express');
const passport = require('passport');
const router=express.Router();
const friendsController=require('../controller/friends_controller')

router.get('/add-friend',passport.checkAuth,friendsController.addFriend)

module.exports=router