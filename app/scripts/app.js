(() => {
    const app = angular.module('chatjs', ['ngRoute', 'ngResource']);

    function routes($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/chat', {
                templateUrl: 'templates/chat.html',
                controller: 'mainController',
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController',
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController',
            })
            .otherwise('/chat', {
                templateUrl: 'templates/chat.html',
                controller: 'mainController',
            });
    }

    app.config(routes);
})();
