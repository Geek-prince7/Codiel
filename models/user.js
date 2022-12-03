const mongoose=require('mongoose')

const multer=require('multer')
const path=require('path')

const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true

    },
    avatar:{
        type:String
    }

},
{
    timestamps:true  //this will keep a log of created on and updated on
})

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AVATAR_PATH));

    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+'.png')

    }
})


//static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar')
userSchema.statics.avatar_path=AVATAR_PATH;

//tell mongoose that its a schema
const user=mongoose.model('users',userSchema)

module.exports=user