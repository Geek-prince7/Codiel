const express=require('express');
const env=require('./config/environment');
const morgan_logger=require('morgan')
const expressLayout=require('express-ejs-layouts')
const port=8000;
const cookieParser=require('cookie-parser')
const db=require('./config/mongoose')
//  used for session cookie
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport_local_startegy');
const passport_jwt=require('./config/passport_jwt_strategy');
const passport_github=require('./config/passport_github_oauth')
const  userCollection  = require('./models/user');
// const postsCollection=require('./models/posts')
// const MongoStore=require('connect-mongodb-session')(session)
const MongoStore=require('connect-mongo')
const userController=require('./controller/user_controller')
// const MongoStore=require('connect-mongo')
const sassMiddleware=require('node-sass-middleware')
const flash=require('connect-flash')
const customMiddleware_flash=require('./config/flashMiddleware')
// const kue=require('kue')
const cors=require('cors')


const app=express();

//allowing for local use
app.use(cors({
    origin:'*'
}))

//setup chat server to be used with socket.io
const chatServer=require('http').Server(app)
const chatSocket=require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log(`chat server is running on port : 5000`)

if(env.name=='development'){
    /* ---------Middle ware ------------- */
    app.use(sassMiddleware({
        src:'./assests/scss',
        dest:'./assests/css',
        debug:true,
        outputStyle:'extended',
        prefix:'/css'  

    }))
}

//add default parser
app.use(express.urlencoded())
//add cookie parser
//cookie parser
app.use(cookieParser())
// add static files
app.use(express.static(env.asset_path))

//jooning the path
app.use('/uploads',express.static(__dirname+'/uploads'))

//logger middleware
app.use(morgan_logger(env.morgan.mode,env.morgan.options))

//layout
app.use(expressLayout)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// set up view engine
app.set('view engine','ejs')
app.set('views','./views')


app.use(session({
    name:'codiel11',//key of cookie
    secret:env.session_cookie_key, // secret key
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*100 // milliseconds 

    },
    store: new MongoStore({
        mongoUrl :'mongodb://localhost/codiel_development',
        autoRemove:'interval',
        autoRemoveInterval:'1'
    }),function(error){
        console.log(error || 'connect-mongo setup ok')
    }
    
    
     
    
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuth)
//after the session is defined and all then use flash 
app.use(flash());

app.use(customMiddleware_flash.setFlash);

// use express router
app.use('/',require('./routes/index'))



// app.get('/users/sign-in'/*,passport.disableLogin*/,userController.signin);
// app.get('/users/sign-up'/*,passport.disableLogin*/,userController.signup);

// //form signup 
// app.post('/users/create',userController.createUser)

// //form signin
// // use passport as middleware to authenticate
// app.post('/users/login',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.login)

app.listen(port,function(error){
    if(error)
    {
        console.log(`error in firing server ${error}`)
        return

    }
    console.log(`server is running on port : ${port}`)
})