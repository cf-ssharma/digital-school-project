define( [
    '../../app'
] , function ( controllers ) {
    'use strict';
    controllers.controller('LoginController', LoginControllerFn);
    LoginControllerFn.$inject = ['$scope', '$rootScope', '$location','AUTH_EVENTS', 'AuthService'];
    function LoginControllerFn($scope, $rootScope,$location, AUTH_EVENTS, AuthService) {
      $scope.credentials = {
        number: '',
        password: ''
      };
      $scope.login = function (credentials) {
        console.log(credentials)
        AuthService.login(credentials).then(function (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          console.log(user);
          $scope.setCurrentUser(user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
      }; 
    }
} ); 