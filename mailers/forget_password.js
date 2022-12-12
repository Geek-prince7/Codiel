const nodemailer=require('../config/nodemailer');

exports.forgetPassword=(user)=>{
    // console.log('inside new comment mailer',user)
    let HtmlString=nodemailer.renderTemplate({user:user[0]},'/password/forget_password.ejs')
    console.log('inside new comment mailer',user,HtmlString)
    console.log("recepient",user.email);
    nodemailer.transporter.sendMail({
        from:'prince@codeil.com',
        to:user[0].email,
        subject:'Reset password Codiel',
        html:HtmlString
    },(error,info)=>{
        if(error)
        {
            console.log("error in sending forgot pwd mail",error);
            return;
        }
        console.log(info);

    })


}