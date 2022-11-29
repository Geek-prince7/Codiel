const express=require('express')
const router=express.Router()

const userController=require('../controller/user_controller')
const passport=require('passport')

console.log("user controller")

router.get('/profile',passport.checkAuth,userController.user);

router.get('/sign-in',passport.disableLogin,userController.signin);
router.get('/sign-up',passport.disableLogin,userController.signup);

//form signup 
router.post('/create',userController.createUser)

//form signin
// use passport as middleware to authenticate
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.login)

router.get('/sign-out',userController.destroySession)

module.exports=router
