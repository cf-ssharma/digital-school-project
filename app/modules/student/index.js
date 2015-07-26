define( [
    '../../app'
] , function ( controllers ) {
 	controllers.controller('headerCtrl', headerFn);
 	headerFn.$inject = ['$scope'];

 	function headerFn($scope) {
 		var vm = $scope.vm = {};
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

