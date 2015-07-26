require.config( {
    paths : {
        angular : 'vendor/angular/angular',
        'angular-route': 'vendor/angular-ui-router/angular-ui-router',
        'angular-animate':'vendor/angular-animate/angular-animate',
        'angular-aria':'vendor/angular-aria/angular-aria',
        'angular-material':'vendor/angular-material/angular-material',
        'angular-resource':"vendor/angular-resource/angular-resource",
        'angular-sanitize': "vendor/angular-sanitize/angular-sanitize",
        'ueditor-config':'vendor/ueditor/ueditor.config',
        'ueditor':'vendor/ueditor/ueditor.all',
        'echarts': 'vendor/echarts/echarts',
        'echarts/chart/pie': 'vendor/echarts/echarts',
        'echarts/chart/line': 'vendor/echarts/echarts',
        'echarts/chart/bar': 'vendor/echarts/echarts',
    } ,
    shim : {
        angular : {
            exports : 'angular' ,
            init : function () {
                // ---------------------重要代码段！------------------------------
                // 应用启动后不能直接用 module.controller 等方法，否则会报控制器未定义的错误，
                // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = function () {
                                    $controllerProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.directive = function () {
                                    $compileProvider.directive.apply( this , arguments );
                                    return this;
                                };
                                newModule.filter = function () {
                                    $filterProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.factory = function () {
                                    $provide.factory.apply( this , arguments );
                                    return this;
                                };
                                newModule.service = function () {
                                    $provide.service.apply( this , arguments );
                                    return this;
                                };
                                newModule.provider = function () {
                                    $provide.provider.apply( this , arguments );
                                    return this;
                                };
                                newModule.value = function () {
                                    $provide.value.apply( this , arguments );
                                    return this;
                                };
                                newModule.constant = function () {
                                    $provide.constant.apply( this , arguments );
                                    return this;
                                };
                                newModule.decorator = function () {
                                    $provide.decorator.apply( this , arguments );
                                    return this;
                                };
                            }
                        ] );
                    }
                    return newModule;
                };
            }
        } ,
        "angular-route": {
            deps: ["angular"],
            exports: "angular-route"
        },
        "angular-resource": {
            deps: ["angular"],
            exports: "ngResource"
        },
        "angular-animate": {
            deps: ["angular", "angular-route"],
            exports: "angular-animate"
        },
        "angular-aria": {
            deps: ["angular-animate"],
            exports: "angular-aria"
        },
        "angular-material": {
            deps: ["angular-aria"],
            exports: "angular-material"
        },
        ueditor: {
            deps: ["ueditor-config"],
            exports: "ueditor"
        },
        "angular-sanitize": {
            deps: ["angular"],
            exports: "angular-sanitize"
        }     
    } ,
    map : {
        '*' : {
            'css' : 'vendor/require/css'
        }
    }
} );

require( [
    'angular' ,

    // 第三方库只需要列在这里就可以了
    'angular-route',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-resource',
    'angular-sanitize',
    // 别忘了依赖 app 模块
    './app' , // 前面的 ./ 必须带上，否则 gulp-rev-all 不会更新引用

    // 公用的服务和指令列在下面。
    // 这些模块因为都依赖 app.js ，所以必须声明在这里而不是 app.js 里。
] , function ( angular ) {
    angular.module( 'all' , [ 'ui.router' ,'ngResource','ngMaterial','ngSanitize','app' ] ); // 注意：app 模块只能放在最后一个，因为它依赖前面的第三方模块！
    angular.module( 'bootstrap' , [ 'all' ] ); // 单独加一个 all 模块的原因见 test/protractor.conf.js 的 onPrepare 事件
    angular.bootstrap( document , [ 'bootstrap' ] );
} );
