const express=require('express');
const router=express.Router();
const passport=require('passport');
const likes_api=require('../../../controller/api/v1/likes_api');

router.post('/toggle',likes_api.toggleLike);
module.exports=router
