const express=require('express')
const router=express.Router()
const userCollection=require('../models/user')
const userController=require('../controller/user_controller')
console.log("user controller")

router.get('/profile',userController.user);

router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);

//form signup 
router.post('/create',function(req,resp){
    if(req.body.password!=req.body.cnf_password)
    {
        return resp.redirect('back')
    }
    userCollection.create(req.body,function(error,data){
        if(error)
        {
            console.log("----------------------------- error in saving data --------------------------------")
            return resp.redirect('back')
        }
        console.log(data)
        return resp.redirect('/users/sign-in')

    })

})

module.exports=router
