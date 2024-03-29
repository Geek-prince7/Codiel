const { app } = require('kue');

module.exports.chatSocket=(socketServerer)=>{
    let io=require('socket.io')(socketServerer,{
        cors:{
            origin:"*"
        }
    });
    io.sockets.on('connection',(socket)=>{
        console.log(`new connection received socket_id: ${socket.id} `)

        socket.on('disconnect',()=>{
            console.log(`socket connection disconnected`)
        })

        socket.on('join_room',(data)=>{
            console.log(`join room request received with data : ${data}`)

            //if chat room is created then it'll join to that room otherwise create
            socket.join(data.chatRoom)

            //server emits that the user has joined 
            io.in(data.chatRoom).emit('user_joined',data)

            
            

        })
        socket.on('send_msg',(data)=>{
            console.log(`msg to be send ${data.message} + from user ${data.userEmail} in chat room ${data.chatRoom}`);
            io.in(data.chatRoom).emit('msg_received',data);
        })

    })


}