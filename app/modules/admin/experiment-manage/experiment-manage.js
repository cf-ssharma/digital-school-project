define([
  '../../../app',
  '../../../directives/ueditor-directive',
  '../../../services/studentService',
  '../../../services/adminService'
], function(controllers) {
  controllers.controller('phyManagementCtrl', phyManagementFn);
  phyManagementFn.$inject = ['$scope', '$timeout', '$log', 'stuService'];

  function phyManagementFn($scope, $timeout, $log, stuService) {
    // ueditor配置
        $scope.editorConfig = {
          initialFrameHeight: 100,
          initialFrameWidth: 740,
          toolbars: [
            ["bold", "italic", "underline", "simpleupload", "spechars", "insertunorderedlist", "insertorderedlist"]
          ]
        }
    stuService.getLessons(function(res){
     $scope.lessons=res.lesson;
    });
    $scope.items = ['A', 'B', 'C', 'D', 'E', 'F'];
    $scope.selected = [];
    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
    };
    $scope.options= ['测试题目', '基本内容', '试验视频'];
    $scope.exists = function(item, list) {
      return list.indexOf(item) > -1;
    };
    基本内容
    var tabs=stuService.query({dataName:'lesson'});
      selected = null,
      previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 1;
    $scope.$watch('selectedIndex', function(current, old) {
      previous = selected;
      selected = tabs[current];
      // if (old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      // if (current + 1) $log.debug('Hello ' + selected.title + '!');
    });
    $scope.editorContentConfig={
      initialFrameHeight: 400,
      initialFrameWidth: 722,
      toolbars: [
        ["bold", "italic", "underline", "simpleupload", "spechars", "insertunorderedlist", "insertorderedlist"]
      ]
    }
    $scope.addTab = function(title, view) {
      view = view || title + " Content View";
      tabs.push({
        title: title,
        content: view,
        disabled: false
      });
      $scope.selectedIndex=$scope.tabs.length;
    };
    $scope.removeTab = function(tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };
    //视频管理
    var videos=[];
    $scope.videos=videos;
    $scope.addVideo = function(title, src) {
      videos.push({
        title: title,
        src: src
      });
    };
    $scope.removeVideo = function(tab) {
      var index = videos.indexOf(tab);
      videos.splice(index, 1);
    };
  }
});