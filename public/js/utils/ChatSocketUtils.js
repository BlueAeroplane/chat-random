var SocketActions = require('../actions/SocketActions.js');

var socket = io();

socket.on('waiting', SocketActions.onWaiting);

socket.on('start', SocketActions.onStart);

socket.on('message', SocketActions.onMessage);

module.exports = {
  send: function(message) {
    return socket.send(message);
  }
};