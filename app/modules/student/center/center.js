define( [
    '../../../app' ,
    '../../../services/studentGetResource'
] , function ( controllers ) {
    controllers.controller('stuCenterCtrl', stuCenterFn); 
	stuCenterFn.$inject = ['$scope', '$timeout','getInfoService']

	function stuCenterFn($scope,$timeout,getInfoService) {
        $scope.nums=[{num:1},{num:2},{num:3}]
        	var vm = $scope.vm = {};
        	vm.course =getInfoService.query();
        	vm.response = [];
        	for (var i = 0; i < 15; i++) {
        		vm.response.push(i);
        	}
        }
} );

