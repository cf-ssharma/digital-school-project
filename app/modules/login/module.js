define([
  '../../app'
], function(controllers) {
  'use strict';
  controllers.controller('LoginController', LoginControllerFn);
  LoginControllerFn.$inject = ['$scope', '$rootScope', '$location', '$timeout', 'AUTH_EVENTS', 'AuthService', 'USER_ROLES'];

  function LoginControllerFn($scope, $rootScope, $location, $timeout, AUTH_EVENTS, AuthService, USER_ROLES) {
    $scope.credentials = {
      number: '',
      password: ''
    };
    $scope.login = function(credentials) {
      AuthService.login(credentials).then(function(user) {
        if (!user) $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        else {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          if (user == USER_ROLES.student) {
            AuthService.getUserInfo().then(function(res) {
                $scope.currentUserInfo(res.data[user]);
                $timeout(function() {
                  $location.path('/index').replace();
                }, 0, true)
              })
            }
          else if (user == USER_ROLES.admin)
            $timeout(function() {
              $location.path('/admin/experiment-manage').replace();
            }, 0, true)
          else if (user == USER_ROLES.teacher)
            $timeout(function() {
              $location.path('/teacher/grade').replace();
            }, 0, true)
        }
      });
    };
  }
});