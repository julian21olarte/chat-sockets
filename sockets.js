'use strict';

module.exports = function(io) {
  var nicknames={};
  var _id = '';

  io.on('connection', function (socket) {

    socket.on('new-login', function(data) {
      console.log('socket-id servidor = '+socket.id);
      nicknames[socket.id] = data.nick;
      _id = socket.id;
    });

    socket.on('send-message', function(data) {
      console.log('si llega el mensaje '+data.message+"  "+nicknames[socket.id]);
      io.sockets.emit('new-message', { 'message': data.message, 'nickname': nicknames[socket.id]} );
    });  
 
  });
};