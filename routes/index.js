const express=require('express')
const router=express.Router()
const passport=require('passport')
const homeController=require('../controller/home_controller')
console.log("-------------- router loaded -------------")


router.get('/',passport.checkAuth,homeController.home)
router.use('/users',require('./user'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))
module.exports=router