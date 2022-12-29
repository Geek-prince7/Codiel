class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail)
        {
            this.connectionHandler();
        }

    }
    connectionHandler(){
        this.socket.on('connect',()=>{
            console.log('connection established using sockets ....');
            this.socket.emit('join_room',{
                userEmail:this.userEmail,
                chatRoom:'codiel_chat_room'
            })

            this.socket.on('user_joined',(data)=>{
                console.log(`this user has joined the chat room ${data.userEmail}`)
            })
        })


        $('#send-msg').click(()=>{
            let msg=$('#chat-msg-input').val()
            document.getElementById('chat-msg-input').value='';
            $('#form-send-msg').submit((event)=>event.preventDefault());
            if(msg!=''){
                this.socket.emit('send_msg',{
                    message:msg,
                    chatRoom:'codiel_chat_room',
                    userEmail:this.userEmail
                })
            }
        })

        this.socket.on('msg_received',(data)=>{
            console.log(data);
            //we need to set in chat box
            let newmsg=$('<li>')
            let msg_type='other-msg'
            if(data.userEmail==this.userEmail){

                msg_type='self-msg'
            }
            newmsg.append($('<span>',{
                'html':data.message
            }))
            newmsg.append($('<sub>',{
                'html':data.userEmail
            }))
            newmsg.addClass(msg_type);
            $('#chat-messages-list').append(newmsg)

        })
    }
}