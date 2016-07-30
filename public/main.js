var socket = io()

$(function(){
  $('form').submit(function(e){
    e.preventDefault()
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('message', function(data){
    console.log(data)
  })

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
})
