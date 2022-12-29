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
    }
}