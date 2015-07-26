define([
   '../../../app',
   '../../../services/studentGetResource'
], function(controllers) {
   controllers.controller('forumManagementCtrl', forumManagementFn);
   forumManagementFn.$inject = ['$scope', '$timeout', 'getInfoService']

   function forumManagementFn($scope, $timeout, getInfoService) {
      var vm = $scope.vm = {};
      vm.course = getInfoService.query();
      vm.response = [];
      for (var i = 0; i < 15; i++) {
         vm.response.push(i);
      }
   }
});