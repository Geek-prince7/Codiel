const express=require('express')
const router=express.Router();
const posts_api=require('../../../controller/api/v1/posts_api')
const passport=require('passport')


router.get('/',passport.authenticate('jwt',{session:false}),posts_api.index);
router.post('/create',passport.authenticate('jwt',{session:false}),posts_api.create)
router.delete('/:id',passport.authenticate('jwt',{session:false}),posts_api.destroy);





module.exports=router;