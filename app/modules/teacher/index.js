define([
	'../../app'
], function(controllers) {
	controllers.controller('headerCtrl', headerFn);
	headerFn.$inject = ['$scope','$interval'];

	function headerFn($scope,$interval) {
		var $this=$scope,speed,stop;
 		$this.load=function(){
 			$this.determinateValue=0;
 			$this.progressState=false;
 			stop=$interval(function(){
 				if ($this.determinateValue>=100) {$interval.cancel(stop);$this.progressState=true;}
 				else{
 					speed=Math.ceil((100-$this.determinateValue)/5);
 					$this.determinateValue+=speed;
 				}				
 			},100,0,true);
 		}
	    $this.$on('$stateChangeStart', function(evt){
	           $this.load();
	    })
 		var vm = $this.vm = {};
		vm.menus = [{
			name: '学生评价',
			href: 'teacher.index'
		}, {
			name: '学习情况',
			href: 'teacher.state'
		}, {
			name: '成绩管理',
			href: 'teacher.grade'
		}, {
			name: '讨论区',
			href: 'teacher.discussion'
		}];
	}
});