define( [
    '../../app'
] , function ( controllers ) {
    'use strict';
    controllers.controller('LoginController', LoginControllerFn);
    LoginControllerFn.$inject = ['$scope', '$rootScope', AUTH_EVENTS, AuthService];
    function LoginControllerFn($scope, $rootScope, AUTH_EVENTS, AuthService) {
      $scope.credentials = {
        username: '',
        password: ''
      };
      $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
      };javascript:void(0); 
    }
} );