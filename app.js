var express = require('express');
var http = require('http');
var socket = require('socket.io');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


var io = socket.listen(server);
io.on('connection', function(socket) {
  socket.on('new_player', function(data) {
    //Save player login information to database. Oh, and implement a database.
    socket.emit('player_saved', data)
    console.log(data);
  });
});