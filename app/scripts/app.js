(() => {
    const app = angular.module('chatjs', ['ngRoute', 'ngResource', 'angular-storage']);

    app.config(($routeProvider, $locationProvider, storeProvider) => {
        // Provider configurations
        $locationProvider.html5Mode(true);
        storeProvider.setStore('sessionStorage');

        // App routing
        $routeProvider
            .when('/chat', {
                templateUrl: 'templates/chat.html',
                controller: 'chatController',
                resolve: {
                    user: ($location, auth) => {
                        if (auth.authenticate()) {
                            console.log('Access permitted.');
                            return auth.authenticate();
                        }
                        console.log('Access denied.');
                        return $location.path('/login');
                    },
                },
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController',
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController',
            })
            .when('/test', {
                templateUrl: 'templates/test.html',
                controller: 'testController',
            })
            .otherwise('/chat', {
                templateUrl: 'templates/chat.html',
                controller: 'chatController',
            });
    });
})();
