const express = require('express')
var app = require('express')
const server = express()
var http = require('http').Server(server)
var io = require('socket.io')(http)

const request = require('request')




server.use(express.static('public'))

server.get('/', function(req, res){
  res.status(200).sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
  console.log('un usuario conectado con socket.io');



  request('http://randomuser.me/api', (err, res, body)=>{
    if (!err && res.statusCode == 200) {
      body = JSON.parse(body)
      socket.emit('randomuser', body.results[0])
    }
  })
  socket.emit('message', {text: "Hola mundo", author: "Miguel"})
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  })


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});