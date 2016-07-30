const express = require('express')
var app = require('express')
const server = express()
var http = require('http').Server(server)
var io = require('socket.io')(http)


server.use(express.static('public'))

server.get('/', function(req, res){
  res.status(200).sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('un usuario conectado con socket.io');
  socket.emit('message', {text: "Hola mundo", author: "Miguel"})
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});