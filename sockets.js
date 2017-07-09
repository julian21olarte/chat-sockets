'use strict';

module.exports = function(io) {
  var nicknames={};

  io.on('connection', function (socket) {

    socket.on('send-message', function(data) {
      io.sockets.emit('new-message', { 'message': data.message, 'nickname': data.nickname } );
    });  
 
  });
};