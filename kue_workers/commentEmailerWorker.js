const queue=require('../config/kue')
//comments mailer push in queue
const commentsMailer=require('../mailers/comments_mailer');


//if queue is present then job is created and if queue deosnt exist queue is created
queue.process('emails',(job,done)=>{
    console.log("job is processing",job.data);
    commentsMailer.newComment(job.data);
    done();
})
// module.exports=queue;-
