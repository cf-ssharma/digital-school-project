define([
  '../../../app',
    '../../../services/studentGetResource'
], function(controllers) {
  controllers.controller('gradeManagementCtrl', gradeManagementFn);
  gradeManagementFn.$inject = ['$scope', '$timeout', 'getInfoService'];

  function gradeManagementFn($scope, $timeout, getInfoService) {
    var vm = $scope.vm = {};
    $scope.changeCollege = function() {
      $timeout(function() {
        vm.defaultClasses = vm.classmanagement[vm.defaultCollege][0];
      });
    }
    vm.defaultCollege = '计算机学院';
    vm.defaultCourse = '用拉伸法测量杨氏弹性模量';
    vm.defaultClasses = '软件工程1班';
    vm.course = getInfoService.query();
    vm.classmanagement = getInfoService.get({
      dataName: 'classmanagement'
    });
    vm.gradeDate = getInfoService.query({
      dataName: 'gradedata'
    });
  }
});