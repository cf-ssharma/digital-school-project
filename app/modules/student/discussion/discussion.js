define([
	'../../../app',
	'../../../services/studentGetResource'
], function(controllers) {
	controllers.controller('stuDiscussionCtrl', stuDiscussionFn);
	stuDiscussionFn.$inject = ['$scope', '$timeout', 'getInfoService']

	function stuDiscussionFn($scope, $timeout, getInfoService) {
		var vm = $scope.vm = {};
		vm.course = getInfoService.query();
		vm.response = [];
		for (var i = 0; i < 15; i++) {
			vm.response.push(i);
		}
	}
});