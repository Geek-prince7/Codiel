const express=require('express')
const router=express.Router()
const passport=require('passport')
const homeController=require('../controller/home_controller')
console.log("-------------- router loaded -------------")


router.get('/',passport.checkAuth,homeController.home)
router.use('/users',require('./user'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))
router.use('/likes',require('./likes'))



//for api requests

//by default it''ll go to index.js so -> we can avoid writing this require('./api/index')
router.use('/api',require('./api'))

module.exports=router