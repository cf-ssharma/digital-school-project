define(['../app'], function(services) {
	// RESOURCE
	'use strict';
	services.factory('AuthService', AuthServiceFn);
	AuthServiceFn.$injector = ['$http', 'Session','USER_ROLES'];
	function AuthServiceFn($http, Session,USER_ROLES) {
		var authService = {};
		authService.login = function(credentials) {
			return $http
				.post('/Digital_School/pub/Login', credentials)
				.then(function(res) {
					if(res.data.tip!='fail'){
						Session.create(res.data.username,res.data.role);
						return res.data.role;
					}
					return false;
				});
		};
		authService.getUserInfo=function(){
				return $http.get('/Digital_School/stu/GetStuInfo');
		}
		authService.isAuthenticated = function() {
			return !!Session.userId;
		};

		authService.isAuthorized = function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			if (authorizedRoles[0] == USER_ROLES.all)
				return true;
			return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
		};
		return authService;
	}
	services.service('Session', function() {
		this.create = function(userId, userRole) {
			this.userId = userId;
			this.userRole = userRole;
		};
		this.destroy = function() {
			this.userId = null;
			this.userRole = null;
		};
		return this;
	})
});