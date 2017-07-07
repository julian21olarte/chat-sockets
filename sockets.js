'use strict';

module.exports = function(io) {
  var nicknames={};

  io.on('connection', function (socket) {

    socket.on('new-login', function(data) {
      nicknames[socket.id] = data.nick;
    });

    socket.on('send-message', function(data) {
      io.sockets.emit('new-message', { 'message': data.message, 'nickname': nicknames[socket.id]} );
    });  
 
  });
};