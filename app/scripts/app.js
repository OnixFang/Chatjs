(function () {
    const app = angular.module('chatjs', ['ngRoute']);

    function routes($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
        .when('/chat', {
            templateUrl: 'templates/chat.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html'
        })
        .when('/register', {
            templateUrl: 'templates/register.html'
        })
        .otherwise('/chat', {
            templateUrl: 'templates/chat.html',
            controller: 'MainController'
        });
    }

    app.config(routes);
}());