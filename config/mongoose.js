const mongoose=require('mongoose')
const env=require('./environment');
mongoose.connect(`mongodb://127.0.0.1/${env.db_name}`); // env.db containes the name of database or document

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
