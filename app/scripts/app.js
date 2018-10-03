(() => {
    const app = angular.module('chatjs', ['ngRoute', 'ngResource', 'angular-storage']);

    function routes($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/chat', {
                templateUrl: 'templates/chat.html',
                controller: 'chatController',
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
    }

    app.config(routes);
})();
