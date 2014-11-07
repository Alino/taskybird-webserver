var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('new client');
	
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('my other event', function(data){
	console.log("client " + data.client + " succesfully recieved message " + data.msg);
	//console.log(data);
    //io.emit('chat message', msg);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});