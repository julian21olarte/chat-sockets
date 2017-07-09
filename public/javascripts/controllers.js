'use strict';

var socket = io.connect();


var app = angular.module('app.controllers', ['ngAnimate']);

app
  .factory('nicknameService',[ () => {

    var data = {};
    data.nickname = 'nick por defecto';
    return data;
  }])

  .controller('loginController', ['$scope', '$http', 'nicknameService', function($scope, $http, nicknameService)
  {

    /**
     *  aceptar un NICKNAME al pulsar la tecla ENTER
     */

    $('#form-login.form input#nickname').on('keyup' , function(e) {
      if(e.which === 13 && $(this).val() != '') {
         $('#form-login.form a#enviar').trigger('click');
      }
    });



    /**
     *  aceptar un NICKNAME al pulsar el boton de entrar en la interfaz
     */
    $('#form-login.form a#enviar').on('click', function(e) {
      
      var nickname = $('#form-login input#nickname').val();
      $http({
        method: 'POST',
        url: '/main',
        params: {
          nickname: nickname
        }
      }).then(function (res) {
          nicknameService.nickname = JSON.parse(JSON.stringify(res)).data;
        }, function (res) {
          alert('error');
        });
     });



  }])


  .controller('mainController', ["$scope",'$http', 'nicknameService', function ($scope, $http, nicknameService) 
  {

    $scope.messages = [];

    $.post('/sessions', function(data) {
      if(data !== undefined) {
        nicknameService.nickname = data;
      }
    });


    //load sound to play in new message send.
    var audio = new Audio('../sounds/filling.mp3');



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

       $(document).scrollTop($('body').height());
       audio.play();

    });





    /**
     *  emitir el mensaje a todo los sockets conectados y limpiar el campo de texto.
     */
    $('#form-chat button#enviar').on('click', function(e) {
      var text = $('#form-chat input#text').val();
      $('#form-chat input#text').val('');
      if(text !== '') {
        socket.emit('send-message', { 'message': text, 'nickname': nicknameService.nickname} );
      }
    });
   

  }]);



