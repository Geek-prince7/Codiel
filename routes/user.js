const express=require('express')
const router=express.Router()

const userController=require('../controller/user_controller')
const passport=require('passport')

console.log("user controller")

router.get('/profile',passport.checkAuthentication,userController.user);

router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);

//form signup 
router.post('/create',userController.createUser)

//form signin
// use passport as middleware to authenticate
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.login)

module.exports=router
