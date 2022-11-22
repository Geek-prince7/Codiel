const express=require('express');
const expressLayout=require('express-ejs-layouts')
const port=8000;
const cookieParser=require('cookie-parser')
const db=require('./config/mongoose')
//  used for session cookie
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport_local_startegy')


const app=express();

/* ---------Middle ware ------------- */

//add default parser
app.use(express.urlencoded())
//add cookie parser
//cookie parser
app.use(cookieParser())
// add static files
app.use(express.static('./assests'))

//layout
app.use(expressLayout)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// set up view engine
app.set('view engine','ejs')
app.set('views','./views')


app.use(session({
    name:'codiel',
    secret:'hello123', // key
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) // milliseconds 

    } 
    
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// use express router
app.use('/',require('./routes/index'))

app.listen(port,function(error){
    if(error)
    {
        console.log(`error in firing server ${error}`)
        return

    }
    console.log(`server is running on port : ${port}`)
})