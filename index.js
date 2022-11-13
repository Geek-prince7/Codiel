const express=require('express');
const port=8000;


const app=express();
app.listen(port,function(error){
    if(error)
    {
        console.log(`error in firing server ${error}`)
        return

    }
    console.log(`server is running on port : ${port}`)
})