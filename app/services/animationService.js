define( [ '../app' ] , function ( services ) {
    // 定义转场动画
    services.factory('animateCSSBuild', animateFn);
    animateFn.$inject = ['$timeout'];

    function animateFn($timeout) {
       return function(baseClass, classNames) {
         if (arguments.length == 3) {
           var a = classNames;
           var b = arguments[2];
           classNames = {
             enter: a,
             move: a,
             leave: b,
             show: a,
             hide: b,
             addClass: a,
             removeClass: b
           };
         }
         var timeoutKey = '$$animate.css-timer';
         var animateCSSStart = function(element, className, delay, done) {
           element.addClass(className);
           element.addClass('animated');
           var timer = $timeout(done, delay || 2000, false);
           element.data(timeoutKey, timer);
         };
         var animateCSSEnd = function(element, className) {
           return function(cancelled) {
             var timer = element.data(timeoutKey);
             if (timer) {
               $timeout.cancel(timer);
               element.removeData(timeoutKey);
             }
             element.removeClass(className);
             element.removeClass('animated');
           };
         };
         return {
           enter: function(element, done) {
             animateCSSStart(element, classNames.enter, classNames.delay, done);
             return animateCSSEnd(element, classNames.enter);
           },
           leave: function(element, done) {
             animateCSSStart(element, classNames.leave, classNames.delay, done);
             return animateCSSEnd(element, classNames.leave);
           },
           move: function(element, done) {
             animateCSSStart(element, classNames.move, classNames.delay, done);
             return animateCSSEnd(element, classNames.move);
           },
           beforeAddClass: function(element, className, done) {
             var klass = className == 'ng-hide' &&
               (classNames.hide ||
                 (angular.isFunction(classNames.addClass) ?
                   classNames.addClass(className) :
                   classNames.addClass));
             if (klass) {
               animateCSSStart(element, klass, classNames.delay, done);
               return animateCSSEnd(element, klass);
             }
             done();
           },
           addClass: function(element, className, done) {
             var klass = className != 'ng-hide' &&
               (angular.isFunction(classNames.addClass) ?
                 classNames.addClass(className) :
                 classNames.addClass);
             if (klass) {
               animateCSSStart(element, klass, classNames.delay, done);
               return animateCSSEnd(element, klass);
             }
             done();
           },
           removeClass: function(element, className, done) {
             var klass = (className == 'ng-hide' && classNames.show) ||
               (angular.isFunction(classNames.removeClass) ?
                 classNames.removeClass(className) :
                 classNames.removeClass);
             if (klass) {
               animateCSSStart(element, klass, classNames.delay, done);
               return animateCSSEnd(element, klass);
             }
             done();
           }
         }
       };
     }
     //
     // Flip Animations
     //
    services
     .animation('.fade-in-animation', ['animateCSSBuild', function(animateCSSBuild) {
       return animateCSSBuild('.fade-in-animation', 'fadeIn', 'page-hidden');
     }])
     .animation('.show-animation', ['animateCSSBuild', function(animateCSSBuild) {
       return animateCSSBuild('.show-animation', 'fadeInUp', 'fadeOutDown');
     }])
     .animation('.bounce-animation', ['animateCSSBuild', function(animateCSSBuild) {
       return animateCSSBuild('.bounce-animation', 'bounceIn', 'bounceOut');
     }])
     .animation('.slide-in-animation', ['animateCSSBuild', function(animateCSSBuild) {
       return animateCSSBuild('.slide-in-animation', 'slideInRight', 'slideOutLeft');
     }])
} );


