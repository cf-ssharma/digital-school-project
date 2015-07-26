define([
  '../../../app'
], function(controllers) {
  controllers.controller('stuManagementCtrl', stuManagementFn);
  stuManagementFn.$inject = ['$scope', '$timeout', 'getInfoService'];

  function stuManagementFn($scope, $timeout, getInfoService) {
    var vm = $scope.vm = {};
    $scope.changeCollege = function() {
      $timeout(function() {
        vm.defaultClasses = vm.classmanagement[vm.defaultCollege][0];
      });
    }
    vm.defaultCollege = '计算机学院';
    vm.defaultClasses = '软件工程1班';
    vm.classmanagement = getInfoService.get({
      dataName: 'classmanagement'
    });
    vm.gradeDate = getInfoService.query({
      dataName: 'studentdata'
    });
  }
});