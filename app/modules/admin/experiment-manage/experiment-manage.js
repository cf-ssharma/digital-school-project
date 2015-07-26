define([
  '../../../app',
  '../../../directives/ueditor-directive',
  '../../../services/studentGetResource'
], function(controllers) {
  controllers.controller('phyManagementCtrl', phyManagementFn);
  phyManagementFn.$inject = ['$scope', '$timeout', 'getInfoService'];

  function phyManagementFn($scope, $timeout, getInfoService) {
    var vm = $scope.vm = {};
    $scope.editorConfig = {
      initialFrameHeight: 100,
      initialFrameWidth: 740,
      toolbars: [
        ["bold", "italic", "underline", "simpleupload", "spechars", "insertunorderedlist", "insertorderedlist"]
      ]
    }
    vm.course = getInfoService.query();
    $scope.items = ['A', 'B', 'C', 'D', 'E', 'F'];
    $scope.selected = [];
    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
    };
    $scope.exists = function(item, list) {
      return list.indexOf(item) > -1;
    };
  }
});