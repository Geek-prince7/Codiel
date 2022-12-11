const nodemailer=require('nodemailer')
//we are using ejs template engine
const ejs=require('ejs')
const path=require('path')

//create transporter
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false, // for two factor authentiction
    auth:{
        user:'email@gmail.com',
        pass:'app_password'
    }
});

let renderTemplate=(data,relativePath)=>{  //relativepath -> from where the mail is being send
    //to store HTML that is to send in mail
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        //callback function
        (error,template)=>{
            if(error)
            {
                console.log('*************error in rendering template***************\n',error);
                return;
            }
            mailHTML=template;

        }
    )
    return mailHTML;



}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}