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
            '$stateProvider', '$locationProvider', '$urlRouterProvider', '$animateProvider', '$mdThemingProvider',
            //'$urlRouterProvider' ,
            function($stateProvider, $locationProvider, $urlRouterProvider, $animateProvider, $mdThemingProvider) {
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
                        controller: 'loginCtrl',
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
                        resolve: {
                            load: loadDeps([
                                'modules/admin/discussion-manage/discussion-manage'
                            ])
                        }
                    })
                $stateProvider.state('otherwise', {
                    url: '*path',
                    template: '',
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
        ]);
});
