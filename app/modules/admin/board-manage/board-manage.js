define([
   '../../../app',
   '../../../directives/ueditor-directive'
], function(controllers) {
   controllers.controller('boardManagementCtrl', boardManagementFn);
   boardManagementFn.$inject = ['$scope', '$timeout', '$sce'];

   function boardManagementFn($scope, $timeout, $sce) {
      $scope.editorConfig = {
         focus: true //自动把光标放到UEditor中。测试config配置
      }
      $scope.nowTime = new Date();
      $scope.$watch('content', function() {
         $scope.html = $sce.trustAsHtml($scope.content);
         $scope.nowTime = new Date();
      })
   }
});