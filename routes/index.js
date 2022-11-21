const express=require('express')
const router=express.Router()
const homeController=require('../controller/home_controller')
console.log("-------------- router loaded -------------")


router.get('/',homeController.home)
router.use('/users',require('./user'))
router.use('/posts',require('./posts'))
module.exports=router