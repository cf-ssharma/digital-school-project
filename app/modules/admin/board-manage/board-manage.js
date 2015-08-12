define([
   '../../../app',
   '../../../directives/ueditor-directive'
], function(controllers) {
   controllers.controller('boardManagementCtrl', boardManagementFn);
   boardManagementFn.$inject = ['$scope', '$timeout', '$sce','$mdDialog', 'pubService','adminService'];

   function boardManagementFn($scope, $timeout, $sce,$mdDialog,pubService,adminService) {
      $scope.editorConfig = {
         focus: true //自动把光标放到UEditor中。测试config配置
      }
      pubService.getNews(function(res){
         console.log(res)
         $timeout(function(){
         $scope.news=res.news.content;
         $scope.$watch('news', function() {
            $scope.html = $sce.trustAsHtml($scope.news);
            $scope.nowTime = new Date();
         })
         },200,true)
      });
      $scope.updateNews=function(news,time,event){
         adminService.updateNews({title:time,content:news},function(res){
             $mdDialog.show(
               $mdDialog.alert()
                 .parent(angular.element(document.body))
                 .title('提示信息')
                 .content('样式还需修缮')
                 .ok('确认')
                 .targetEvent(event)
             );
         })
      }
      $scope.nowTime = new Date();
   }
});