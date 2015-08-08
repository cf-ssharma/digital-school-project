define([
   '../../../app',
   '../../../directives/ueditor-directive'
], function(controllers) {
   controllers.controller('boardManagementCtrl', boardManagementFn);
   boardManagementFn.$inject = ['$scope', '$timeout', '$sce','$log'];

   function boardManagementFn($scope, $timeout, $sce,$log) {
      $scope.editorConfig = {
         focus: true //自动把光标放到UEditor中。测试config配置
      }
      $scope.nowTime = new Date();
      $scope.$watch('board', function() {
         $scope.html = $sce.trustAsHtml($scope.board);
         console.log('change')
         $scope.nowTime = new Date();
      })
   }
});