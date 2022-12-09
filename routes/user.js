const express=require('express')
const router=express.Router()

const userController=require('../controller/user_controller')
const passport=require('passport')

console.log("user controller")

router.get('/profile/:id',passport.checkAuth,userController.user);

//update user info name email
router.post('/update/:id',passport.checkAuth,userController.update)

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

router.get('/sign-out',userController.destroySession);


//for github signin auth
router.get('/auth/github',passport.authenticate('github',{scope:['user:email','read:user']}))

router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/users/sign-in'}),userController.login);







module.exports=router
