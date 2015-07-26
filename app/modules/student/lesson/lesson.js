define( [
    '../../../app' ,
    '../../../services/studentGetResource'
] , function ( controllers ) {
    controllers.controller('stuLessonCtrl', stuLessonFn);
    stuLessonFn.$inject = ['$scope', '$timeout','getInfoService']

    function stuLessonFn($scope, $timeout,getInfoService) {
        var vm = $scope.vm = {};
        vm.lessonstep=getInfoService.query({dataName:'lessonstep'});
        vm.lesson =getInfoService.query({dataName:'lesson'});
    }
} );

