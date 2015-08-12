define([
    'angular'
], function(angular) {
    return angular.module('app', [])
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            teacher: 'teacher',
            student: 'student'
        })
        .config([
            '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$animateProvider', '$mdThemingProvider', 'USER_ROLES',
            //'$urlRouterProvider' ,
            function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $animateProvider, $mdThemingProvider, USER_ROLES) {
                // Use x-www-form-urlencoded Content-Type
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function(obj) {
                    var query = '',
                        name, value, fullSubName, subName, subValue, innerObj, i;

                    for (name in obj) {
                        value = obj[name];

                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null)
                            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }

                    return query.length ? query.substr(0, query.length - 1) : query;
                };

                // Override $http service's default transformRequest
                $httpProvider.defaults.transformRequest = [function(data) {
                    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
                }];
                $httpProvider.interceptors.push([
                    '$injector',
                    function($injector) {
                        return $injector.get('AuthInterceptor');
                    }
                ]);
                $mdThemingProvider.theme('default')
                    // .primaryPalette('indigo')
                    // .accentPalette('blue');
                $mdThemingProvider.theme('greenTheme')
                    .primaryPalette('green')
                    .accentPalette('light-green');
                // 设置路由
                $stateProvider.state('login', {
                        url: '/login',
                        templateUrl: 'modules/login/login.html',
                        controller: 'LoginController',
                        data: {
                            authorizedRoles: [USER_ROLES.all]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/login/module',
                                'css!./styles/login.css'
                            ])
                        }
                    })
                    .state('student', {
                        abstract: true,
                        templateUrl: 'modules/student/index.html',
                        controller: 'headerCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.all, USER_ROLES.student]
                        },
                        resolve: {
                            load: loadDeps([
                                'css!styles/student-style.css',
                                'modules/student/index'
                            ])
                        }
                    })
                    .state('student.index', {
                        url: '/index',
                        templateUrl: 'modules/student/center/center.html',
                        controller: 'stuCenterCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.all, USER_ROLES.student]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/student/center/center'
                            ])
                        }
                    })
                    .state('student.lesson', {
                        url: '/lesson',
                        templateUrl: 'modules/student/lesson/lesson.html',
                        controller: 'stuLessonCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.student]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/student/lesson/lesson'
                            ])
                        }
                    })
                    .state('student.discussion', {
                        url: '/discussion',
                        templateUrl: 'modules/student/discussion/discussion.html',
                        controller: 'stuDiscussionCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.student]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/student/discussion/discussion'
                            ])
                        }
                    })
                    .state('student.zone', {
                        url: '/zone',
                        templateUrl: 'modules/student/zone/zone.html',
                        controller: 'stuZoneCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.student]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/student/zone/zone'
                            ])
                        }
                    })
                    .state('student.wenda', {
                        url: '/wenda',
                        templateUrl: 'modules/student/wenda/wenda.html',
                        controller: 'stuwendaCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.student]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/student/wenda/wenda'
                            ])
                        }
                    })
                    .state('teacher', {
                        abstract: true,
                        url: '/teacher',
                        templateUrl: 'modules/teacher/index.html',
                        controller: 'headerCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.teacher]
                        },
                        resolve: {
                            load: loadDeps([
                                'css!styles/teacher-style.css',
                                'modules/teacher/index'
                            ])
                        }
                    })
                    .state('teacher.index', {
                        url: '/index',
                        templateUrl: 'modules/teacher/mark/mark.html',
                        controller: 'MarkCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.teacher]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/teacher/mark/mark'
                            ])
                        }
                    })
                    .state('teacher.grade', {
                        url: '/grade',
                        templateUrl: 'modules/teacher/grade/grade.html',
                        controller: 'GradeManegeCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.teacher]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/teacher/grade/grade'
                            ])
                        }
                    })
                    .state('teacher.discussion', {
                        url: '/discussion',
                        templateUrl: 'modules/teacher/discussion/discussion.html',
                        controller: 'DiscussionCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.teacher]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/teacher/discussion/discussion'
                            ])
                        }
                    })
                    .state('teacher.state', {
                        url: '/state',
                        templateUrl: 'modules/teacher/state/state.html',
                        controller: 'StateCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.teacher]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/teacher/state/state'
                            ])
                        }
                    })
                    .state('admin', {
                        abstract: true,
                        url: '/admin',
                        templateUrl: 'modules/admin/index.html',
                        controller: 'headerCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'css!styles/admin-style.css',
                                'modules/admin/index'
                            ])
                        }
                    })
                    .state('admin.experiment-manage', {
                        url: '/experiment-manage',
                        templateUrl: 'modules/admin/experiment-manage/experiment-manage.html',
                        controller: 'phyManagementCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/admin/experiment-manage/experiment-manage'
                            ])
                        }
                    })
                    .state('admin.board-manage', {
                        url: '/board-manage',
                        templateUrl: 'modules/admin/board-manage/board-manage.html',
                        controller: 'boardManagementCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/admin/board-manage/board-manage'
                            ])
                        }
                    })
                    .state('admin.grade-manage', {
                        url: '/grade-manage',
                        templateUrl: 'modules/admin/grade-manage/grade-manage.html',
                        controller: 'gradeManagementCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/admin/grade-manage/grade-manage'
                            ])
                        }
                    })
                    .state('admin.student-manage', {
                        url: '/student-manage',
                        templateUrl: 'modules/admin/student-manage/student-manage.html',
                        controller: 'stuManagementCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/admin/student-manage/student-manage'
                            ])
                        }
                    })
                    .state('admin.teacher-manage', {
                        url: '/teacher-manage',
                        templateUrl: 'modules/admin/teacher-manage/teacher-manage.html',
                        controller: 'tecManagementCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/admin/teacher-manage/teacher-manage'
                            ])
                        }
                    })
                    .state('admin.discussion-manage', {
                        url: '/discussion-manage',
                        templateUrl: 'modules/admin/discussion-manage/discussion-manage.html',
                        controller: 'forumManagementCtrl',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        },
                        resolve: {
                            load: loadDeps([
                                'modules/admin/discussion-manage/discussion-manage'
                            ])
                        }
                    })
                $stateProvider.state('otherwise', {
                    url: '*path',
                    template: '',
                    data: {
                        authorizedRoles: [USER_ROLES.all]
                    },
                    controller: [
                        '$state',
                        function($state) {
                            $state.go('login');
                        }
                    ]
                });

                /**
                 * 加载依赖的辅助函数
                 * @param deps
                 * @returns {*[]}
                 */
                function loadDeps(deps) {
                    return [
                        '$q',
                        function($q) {
                            var def = $q.defer();
                            require(deps, function() {
                                def.resolve();
                            });
                            return def.promise;
                        }
                    ];
                }

            }
        ])
        // .run(['$rootScope', '$location', '$timeout', 'AUTH_EVENTS', 'AuthService','USER_ROLES','Session', function($rootScope, $location, $timeout, AUTH_EVENTS, AuthService,USER_ROLES,Session) {
        //     $rootScope.$on('$stateChangeStart', function(event, toState) {
        //         var authorizedRoles = toState.data.authorizedRoles;
        //         if (!AuthService.isAuthorized(authorizedRoles)) {
        //             event.preventDefault();
        //             if (AuthService.isAuthenticated()) {
        //                 // user is not allowed
        //                 $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        //             } else {
        //                 // user not login in
        //                 $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        //             }
        //         }
        //     });
        //     $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
        //         $timeout(function() {
        //             $location.path('/login').replace();
        //         }, 0, true)
        //     })
        //     $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
        //         $timeout(function() {
        //             $location.path('/login').replace();
        //         }, 0, true)
        //     })
        //     $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
        //     })
        // }])
        .controller('ApplicationController', ApplicationControllerFn)
        .factory('AuthInterceptor', AuthInterceptorFn)
    AuthInterceptorFn.$injector = ['$rootScope', '$q', 'AUTH_EVENTS'];
    //错误码拦截
    function AuthInterceptorFn($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function(response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }
    ApplicationControllerFn.$injector = ['$scope', 'USER_ROLES', 'AuthService'];

    function ApplicationControllerFn($scope, USER_ROLES, AuthService) {
        $scope.currentUser = null;
        $scope.currentUserInfo=null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };
        $scope.currentUserInfo = function(userInfo) {
            $scope.currentUserInfo = userInfo;
        };
    }
});