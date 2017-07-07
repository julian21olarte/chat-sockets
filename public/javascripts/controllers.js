'use strict';

var app = angular.module('app.controllers', ['ngAnimate']);
var socket = io.connect();

app
  .controller('loginController', ['$scope', '$http', function($scope, $http)
  {
    $scope.title = "CHAT SOCKETS";

    $('#form-login.form input#nick').on('keyup' , function(e) {
      if(e.which === 13 && $(this).val() != '') {
         $('#form-login.form a#enviar').trigger('click');
      }
    });

    $('#form-login.form a#enviar').on('click', function(e) {
      
      var nick = $('#form-login input#nick').val();
      socket.emit('new-login', { 'nick': nick } );
     });
  }])


  .controller('mainController', ["$scope",'$http', function ($scope, $http) 
  {
    $scope.messages = [];
    socket.on('new-message', function(data) {
      
      var nick = data.nickname;
      var message = data.message;

      var msg = {
        'author': nick,
        'message': message
      };

      $scope.$apply(function() {
        $scope.messages.push(msg);

      });
    });


    $('#form-chat button#enviar').on('click', function(e) {
      var text = $('#form-chat input#text').val();
      $('#form-chat input#text').val('');
      if(text !== '') {
        socket.emit('send-message', { 'message': text } );
      }
    });
   

  }]);



