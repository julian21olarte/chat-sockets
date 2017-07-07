'use strict';

var socket = io.connect('http://localhost:3000', {'forceNew': true});

console.log('si entra');
socket.on('new-message', function(data) {
  var nick = data.nickname;
  var message = data.text;
  var html = `<h4>${nick} dice: </h4>
              <p> ${message}</p>`;

  $('.mensajes').append(html);
});


$('#form-chat').on('submit', function(e) {
  e.preventDefault();
  var text = $('#form-chat input#text').val();
  $('#form-chat input#text').val('');

  socket.emit('send-message', { 'message': text } );
});


$('#form-login').on('submit', function(e) {
  var nick = $('#form-login input#nick').val();
  socket.emit('new-login', { 'nick': nick } );
});