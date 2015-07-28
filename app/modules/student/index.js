define( [
    '../../app'
] , function ( controllers ) {
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
 			name: '实验课堂',
 			href: 'student.index'
 		}, {
 			name: '讨论区',
 			href: 'student.discussion'
 		}, {
 			name: '个人中心',
 			href: 'student.zone'
 		}];
 	}
} );

