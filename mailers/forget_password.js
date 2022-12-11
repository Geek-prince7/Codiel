const nodemailer=require('../config/nodemailer');

module.exports.forgetPassword=(user)=>{
    // console.log('inside new comment mailer',user)
    let HtmlString=nodemailer.renderTemplate({user:user},'/password/forget_password.ejs')
    console.log('inside new comment mailer',user,HtmlString)
    nodemailer.transporter.sendMail({
        from:'prince@codeil.com',
        to:user.email,
        subject:'Reset password Codiel',
        html:HtmlString
    },(error,info)=>{
        if(error)
        {
            console.log("error in sending forgot owd mail",error);
            return;
        }
        console.log(info);

    })


}