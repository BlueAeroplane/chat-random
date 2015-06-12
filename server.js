var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var waitingUserId;

function initialize(socket) {
  console.log('A user connected.');

  // if someone is waiting, start the chat
  if (io.sockets.connected[waitingUserId]) {
    var waitingUser = io.sockets.connected[waitingUserId];

    // pairing
    socket.partner = waitingUser.id;
    waitingUser.partner = socket.id;

    // notifiy clients
    socket.emit('start');
    waitingUser.emit('start');

    // remove the waiting user reference
    waitingUserId = null;
    console.log('chat start');
  } else {
    // set the user waiting
    waitingUserId = socket.id;
    socket.emit('waiting');
  }
}

function onConnect(socket) {

  // send messages to the users partner
  socket.on('message', function(message) {
    io.to(socket.partner).emit('message', message);
  });

  // repair the partner if needed
  socket.on('disconnect', function() {
    if (socket.partner) {
      io.sockets.connected[socket.partner].partner = null;
      initialize(io.sockets.connected[socket.partner]);
    }
  });

  initialize(socket);
}

app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + "/public"));

io.on('connection', onConnect);

http.listen(app.get('port'), function() {
  console.log('listening on ' + app.get('port'));
});