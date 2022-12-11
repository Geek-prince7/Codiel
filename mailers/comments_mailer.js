const nodemailer=require('../config/nodemailer');


//export  function
exports.newComment=(comment)=>{
    console.log('inside new comment mailer')
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from:'prince@codeiel.com',
        to:comment.user.email,
        subject:'New commment published',
        html:htmlString
    },(error,info)=>{
        if(error)
        {
            console.log("error in sending mail",error);
            return;
        }
        console.log("mail delivered",info);
        return;

    })

}