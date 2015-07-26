define([
	'../../app'
], function(controllers) {
	controllers.controller('headerCtrl', headerFn);
	headerFn.$inject = ['$scope'];

	function headerFn($scope) {
		var vm = $scope.vm = {};
		vm.menus = [{
			name: '学生评价',
			href: 'teacher.index'
		}, {
			name: '学习情况',
			href: 'teacher.state'
		}, {
			name: '成绩管理',
			href: 'teacher.grade'
		}, {
			name: '讨论区',
			href: 'teacher.discussion'
		}];
	}
});