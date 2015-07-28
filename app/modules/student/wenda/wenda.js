define([
	'../../../app',
	'../../../services/studentGetResource',
	'../../../directives/ueditor-directive'
], function(controllers) {
	controllers.controller('stuwendaCtrl', stuZoneFn);
	stuZoneFn.$inject = ['$scope', '$sce', 'getInfoService'];

	function stuZoneFn($scope, $sce, getInfoService) {
		var vm = $scope.vm = {};
		vm.course = vm.course = getInfoService.query();
		vm.wendaRichText = $sce.trustAsHtml('<div ><i class="from-student-icon"></i><h3>如何用拉伸法测量杨氏弹性模量?如何用拉伸法测量杨氏弹性模量?如何用拉伸法测量杨氏弹性模量?如何用拉伸法测量杨氏弹性模量?</h3></div>')
		$scope.editorConfig = {
	      initialFrameHeight: 100,
	      initialFrameWidth: 912,
	      toolbars: [
	        ["bold", "italic", "underline", "simpleupload", "spechars", "insertunorderedlist", "insertorderedlist"]
	      ]
	    }
	}
});