define([
   '../../../app',
   '../../../services/studentGetResource',
   '../../../directives/echart-directive.js'
], function(controllers) {
   controllers.controller('StateCtrl', StateFn);
   StateFn.$inject = ['$scope', '$timeout']

   function StateFn($scope, $timeout) {
      $scope.echartOption = {
         title: {},
         tooltip: {
            trigger: 'axis',
            formatter: function(a) {
               var relVal = "",
                  len = a.length - 1,
                  i = 0;
               relVal += "各班级单/多选题正确率<br/>";
               for (; i < len; i++)
                  relVal += a[i] + "%<br/>";
               relVal += a[i] + "%";
               return relVal;
            }
         },
         legend: {
            data: ['单选题', '多选题']
         },
         lineStyle: {
            color: '#3f51b5'
         },
         toolbox: {
            show: true,
            feature: {
               magicType: {
                  show: true,
                  type: ['line', 'bar']
               }
            }
         },
         calculable: true,
         xAxis: [{
            type: 'category',
            data: ['软件工程1班', '软件工程2班', '软件工程3班', '软件工程4班', '数字与媒体3班', '数字与媒体4班', '数字与媒体5班']
         }],
         yAxis: [{
            type: 'value',
            axisLabel: {
               formatter: function(value) {
                  return value + "%";
               }
            }
         }],
         series: [{
            name: '单选题',
            type: 'line',
            data: [77, 56, 89, 60, 55, 60, 88],
            markPoint: {
               data: [{
                  type: 'max',
                  name: '单选题答题正确率最高'
               }, {
                  type: 'min',
                  name: '单选题答题正确率最低'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '多选题',
            type: 'line',
            data: [54, 42, 75, 80, 30, 70, 88],
            markPoint: {
               data: [{
                  type: 'max',
                  name: '单选题答题正确率最高'
               }, {
                  type: 'min',
                  name: '单选题答题正确率最低'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }]
      };
      $scope.class = angular.copy($scope.echartOption);
      $scope.radiusQuestion = angular.copy($scope.echartOption);
      $scope.radiusQuestion.legend = {
         data: ['软件工程1班', '软件工程2班', '软件工程3班', '软件工程4班', '数字与媒体3班', '数字与媒体4班', '数字与媒体5班']
      }
      $scope.radiusQuestion.xAxis = [{
         type: 'category',
         data: ['第一题', '第二题', '第三题', '第四题', '第五题', '第六题', '第七题']
      }];
      $scope.radiusQuestion.tooltip = {
            trigger: 'axis',
            formatter: function(a) {
               var relVal = "",
                  len = a.length - 1,
                  i = 0;
               relVal += "各班级各题目正确率<br/>";
               for (; i < len; i++)
                  relVal += a[i] + "%<br/>";
               relVal += a[i] + "%";
               return relVal;
            }
         },
         $scope.radiusQuestion.series = [{
            name: '软件工程1班',
            type: 'line',
            data: [27, 46, 79, 65, 25, 40, 68],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '软件工程2班',
            type: 'line',
            data: [27, 56, 89, 60, 75, 70, 28],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '软件工程3班',
            type: 'line',
            data: [77, 56, 69, 70, 35, 50, 48],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '软件工程4班',
            type: 'line',
            data: [71, 54, 59, 20, 55, 70, 48],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '数字与媒体3班',
            type: 'line',
            data: [47, 26, 89, 40, 25, 40, 78],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '数字与媒体4班',
            type: 'line',
            data: [27, 36, 89, 70, 65, 50, 48],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }, {
            name: '数字与媒体5班',
            type: 'line',
            data: [87, 59, 79, 68, 44, 65, 58],
            markPoint: {
               data: [{
                  type: 'min',
                  name: '各班级错误最多题目'
               }]
            },
            markLine: {
               data: [{
                  type: 'average',
                  name: '平均值'
               }]
            }
         }];
      $scope.checkboxQuestion = angular.copy($scope.radiusQuestion);
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