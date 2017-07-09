'use strict';

var app = angular.module("app", ["app.controllers", "ngRoute"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("se prendio esta mierda");
    $routeProvider

      .when('/', {
        templateUrl: '/login',
        controller: 'loginController'
      })

      .when('/main', {
        templateUrl: '/main',
        controller: 'mainController'
      })

        .otherwise({
          redirectTo: '/'
      });
}]);