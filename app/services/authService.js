define(['../app'], function(services) {
	// RESOURCE
	'use strict';
	services.factory('AuthService', AuthServiceFn);
	AuthServiceFn.$injector = ['$http', 'Session'];
	function AuthServiceFn($http, Session) {
		var authService = {};
		authService.login = function(credentials) {
			return $http
				.post('/Digital_School/pub/Login', credentials)
				.then(function(res) {
					Session.create(res.data.id, res.data.user.id,
						res.data.user.role);
					return res.data.user;
				});
		};

		authService.isAuthenticated = function() {
			return !!Session.userId;
		};

		authService.isAuthorized = function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			if (authorizedRoles[0] == '*')
				return true;
			return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
		};
		return authService;
	}
	services.service('Session', function() {
		this.create = function(sessionId, userId, userRole) {
			this.id = sessionId;
			this.userId = userId;
			this.userRole = userRole;
		};
		this.destroy = function() {
			this.id = null;
			this.userId = null;
			this.userRole = null;
		};
		return this;
	})
});