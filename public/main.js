var socket = io()
var dataUser = ''

$(function(){
  $('form').submit(function(e){
    e.preventDefault()
    socket.emit('chat message', {msg: $('#m').val(), user: dataUser});
    $('#m').val('');
    return false;
  });

  socket.on('message', function(data){
    console.log(data)
  })

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.user+": "+msg.msg));
  });

  socket.on('randomuser', function(user){
    dataUser = user.name.first
  })
})
