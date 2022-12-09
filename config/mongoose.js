const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/codiel_development');

const db=mongoose.Connection;
// console.log(db)

/*
db.on('error',function(){
    console.log("error!!")
})

db.once('open',function(){
    console.log("connected to mongo db ")
})
*/


module.exports=db;
