define([
	'../app',
	'echarts',
	'echarts/chart/pie',
	'echarts/chart/line',
	'echarts/chart/bar'
], function(directives, ec) {
	// echarts指令
	directives.directive("echarts", echartsFn);

	function echartsFn() {
		return {
			restrict: 'AE',
			transclude: true,
			replace: true,
			require: '?ngModel',
			template: '<div style="width:100%; height:400px;outline:none;"></div>',
			scope: {
				option: '='
			},
			link: function(scope, element, attrs, ngModel) {
				var option = scope.option || {};
				var myChart = ec.init(element[0]);
				myChart.setOption(option);
				if (ngModel) {
					//Model数据更新时，更新Echarts
					ngModel.$render = function() {
						try {
							myChart.setOption(ngModel.$viewValue);
						} catch (e) {

						}
					};
				}
			}
		}
	};
});