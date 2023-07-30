const socket = io();
const roomid = prompt("Enter room id");
socket.emit("roomno",roomid);
socket.on('newuser',function(data){
    $("#chat-content").append('<div class="media media-chat"><img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."><div class="media-body"><p>'+data.msg+'</p><p class="meta"><time datetime="2018">00:12</time></p></div></div>');
});
var roomids=roomid;
$( "#sendm" ).click(function() {
    var bla = $('#masg').val();
    socket.emit('conroom', { roomids, msg: bla });
  });
  socket.on('conroom',function(data){
    console.log(data);
    $("#chat-content").append('<div class="media media-chat"><img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."><div class="media-body"><p>'+data.msg+'</p><p class="meta"><time datetime="2018">00:12</time></p></div></div>');
});