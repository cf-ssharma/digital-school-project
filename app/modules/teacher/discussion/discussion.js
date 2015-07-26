define([
	'../../../app',
	'../../../services/studentGetResource'
], function(controllers) {
	controllers.controller('DiscussionCtrl', DiscussionFn);
	DiscussionFn.$inject = ['$scope', '$timeout']

	function DiscussionFn($scope, $timeout) {
		var vm = $scope.vm = {};
		vm.course = [
			'用拉伸法测量杨氏弹性模量',
			'用光栅法测定氢原子光谱线的波长',
			'冷却法测量金属的比热容',
			'迈克耳逊干涉仪',
			'超声波在空气中传播速度的测定',
			'密立根油滴实验',
			'夫兰克－赫兹实验',
			'光电效应和普朗克常量测定',
			'铁磁材料的磁滞回线和基本磁化曲线',
			'电子和场',
			'激光全息照相',
			'弹簧振子周期经验公式总结',
			'双光栅测量微弱振动的位移量',
			'光导纤维中光速的实验测定',
			'半导体热敏电阻特性的研究',
			'用光栅法测定光栅常数和超声波的波速',
			'电表改装与校准',
			'利用霍尔效应测量磁场分布和磁阻',
			'落体法测转动惯量',
			'用拉脱法测定液体表面张力系数',
			'用模拟法测绘静电场'
		];
		vm.response = [];
		for (var i = 0; i < 15; i++) {
			vm.response.push(i);
		}
	}
});