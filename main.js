const express = require('express')
const app = express()
const http=require('http').Server(app)
const path=require('path');
const io =require('socket.io')(http);
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',function(req,res){
    res.render('index')
});
http.listen(3000,function(){
console.log('server on 3000');
})
//socket connection starts
var roomno=0;
io.on('connection',function(socket){

    console.log('a user connected');

    socket.on('roomno',function(data){
        
        console.log(data);
        socket.emit("newuser",{msg:'welcome to room no '+data})
        roomno=data;
    });
        
    socket.join("room_"+roomno);
    socket.on('conroom', ({ roomids, msg }) => {
        console.log(msg+roomids);
        io.sockets.in("room_" + roomids).emit('conroom', { msg: msg }); // Emit the message to the specific room
      });

    socket.on('disconnect',function(){
        console.log('user disconnected');
    })
})
