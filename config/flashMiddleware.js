module.exports.setFlash=(req,resp,next)=>{
    resp.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}