define([
	'../../app'
], function(controllers) {
	controllers.controller('headerCtrl', headerFn);
 	headerFn.$inject = ['$scope'];

 	function headerFn($scope) {
 		var vm = $scope.vm = {};
 		vm.menus = [{
 			name: '实验管理',
 			href: 'admin.experiment-manage'
 		}, {
 			name: '成绩管理',
 			href: 'admin.grade-manage'
 		}, {
 			name: '教师管理',
 			href: 'admin.teacher-manage'
 		}, {
 			name: '学生管理',
 			href: 'admin.student-manage'
 		}, {
 			name: '公告栏',
 			href: 'admin.board-manage'
 		}, {
 			name: '讨论区',
 			href: 'admin.discussion-manage'
 		}];
 	}
});