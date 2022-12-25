const express=require('express');
const router=express.Router();
const likesController=require('../controller/likes_controller');
const passport=require('passport')

router.get('/toggle',likesController.toggleLike);

module.exports=router;