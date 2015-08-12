define( [
    '../../app'
] , function ( controllers ) {
 	controllers.controller('headerCtrl', headerFn);
 	headerFn.$inject = ['$scope','$rootScope','$interval','$location', '$timeout', 'AUTH_EVENTS', 'AuthService', 'USER_ROLES'];

 	function headerFn($scope,$rootScope,$interval,$location, $timeout, AUTH_EVENTS, AuthService, USER_ROLES) {
 		var $this=$scope,speed,stop;
 		$this.load=function(){
 			$this.determinateValue=0;
 			$this.progressState=false;
 			stop=$interval(function(){
 				if ($this.determinateValue>=100) {$interval.cancel(stop);$this.progressState=true;}
 				else{
 					speed=Math.ceil((100-$this.determinateValue)/5);
 					$this.determinateValue+=speed;
 				}				
 			},100,0,true);
 		}
	    $this.$on('$stateChangeSuccess', function(evt){
	           $this.load();
	    })
	    $this.login = function(credentials) {
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
 		var vm = $this.vm = {};
 		vm.menus = [{
 			name: '实验课堂',
 			href: 'student.index'
 		}, {
 			name: '讨论区',
 			href: 'student.discussion'
 		}, {
 			name: '个人中心',
 			href: 'student.zone'
 		}];
 	}
} );

