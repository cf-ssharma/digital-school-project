define([
	'../../../app',
	'../../../services/studentGetResource'
], function(controllers) {
	controllers.controller('stuZoneCtrl', stuZoneFn);
	stuZoneFn.$inject = ['$scope', '$timeout', 'getInfoService'];

	function stuZoneFn($scope, $timeout, getInfoService) {
		var vm = $scope.vm = {};
		vm.course = vm.course = getInfoService.query();
		vm.response = [];
		for (var i = 0; i < 15; i++) {
			vm.response.push(i);
		}
	}
});