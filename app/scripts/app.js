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
            templateUrl: 'templates/login.html',
            controller: 'MainController'
        })
        .otherwise('/chat', {
            templateUrl: 'templates/chat.html',
            controller: 'MainController'
        });
    }

    app.config(routes);
}());