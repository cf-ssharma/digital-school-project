define([
	'../app',
	'ueditor'
], function(directives, ec) {
	// echarts指令
	'use strict';
	// ueditor指令
	directives.directive("ueditor", ueditorFn);

	function ueditorFn() {
		return {
			restrict: 'AE',
			transclude: true,
			replace: true,
			template: '<script name="content" type="text/plain" ng-transclude></script>',
			require: '?ngModel',
			scope: {
				config: '='
			},
			link: function(scope, element, attrs, ngModel) {
				var editor = new UE.ui.Editor(scope.config || {});
				editor.render(element[0]);
				if (ngModel) {
					//Model数据更新时，更新百度UEditor
					ngModel.$render = function() {
						try {
							editor.setContent(ngModel.$viewValue);
						} catch (e) {

						}
					};
					editor.addListener('selectionchange', function() {
						setTimeout(function() {
							scope.$apply(function() {
								ngModel.$setViewValue(editor.getContent());
							})
						}, 0);
					})
				}

			}
		}
	};
});