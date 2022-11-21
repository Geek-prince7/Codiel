const express=require('express');
const expressLayout=require('express-ejs-layouts')
const port=8000;
const cookieParser=require('cookie-parser')
const db=require('./config/mongoose')


const app=express();
// add static files
app.use(express.static('./assests'))


//add default parser
app.use(express.urlencoded())
//add cookie parser
//cookie parser
app.use(cookieParser())


//layout
app.use(expressLayout)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// use express router
app.use('/',require('./routes/index'))


// set up view engine
app.set('view engine','ejs')
app.set('views','./views')


app.listen(port,function(error){
    if(error)
    {
        console.log(`error in firing server ${error}`)
        return

    }
    console.log(`server is running on port : ${port}`)
})