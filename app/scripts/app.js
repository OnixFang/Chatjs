/* eslint no-param-reassign: "error" */
(() => {
    const app = angular.module('chatjs', ['ngRoute', 'ngResource', 'angular-storage']);

    app.config(($routeProvider, $locationProvider, storeProvider) => {
        // Provider configurations
        $locationProvider.html5Mode(true);
        storeProvider.setStore('localStorage');

        // App routing
        $routeProvider
            .when('/chat/:toUsername?', {
                templateUrl: 'templates/nouserchat.html',
                controller: 'chatController',
                resolve: {
                    toUser: ($route, $location, auth) => {
                        if ($route.current.params.toUsername !== undefined) {
                            $route.current.templateUrl = 'templates/chat.html';
                            return auth.getUser($route.current.params.toUsername)
                                .then(response => response.data, () => $location.path('/chat'));
                        }
                        return null;
                    },
                    user: ($location, auth) => {
                        if (auth.isLoggedIn) {
                            return auth.getLoggedUser();
                        }
                        return $location.path('/login');
                    },
                },
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController',
                resolve: {
                    user: ($location, auth) => {
                        if (auth.isLoggedIn) {
                            return $location.path('/chat');
                        }
                        return null;
                    },
                },
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController',
            })
            .when('/resetpassword', {
                templateUrl: 'templates/resetpassword.html',
                controller: 'resetPasswordController',
            })
            .when('/usersearch', {
                templateUrl: 'templates/usersearch.html',
                controller: 'userSearchController',
                resolve: {
                    user: ($location, auth) => {
                        if (auth.isLoggedIn) {
                            return auth.getLoggedUser();
                        }
                        return $location.path('/login');
                    },
                },
            })
            .when('/test', {
                templateUrl: 'templates/test.html',
                controller: 'testController',
            })
            .otherwise('/chat');
    });
})();
