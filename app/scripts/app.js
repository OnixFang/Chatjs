(() => {
    const app = angular.module('chatjs', ['ngRoute', 'ngResource', 'angular-storage']);

    app.config(($routeProvider, $locationProvider, storeProvider) => {
        // Provider configurations
        $locationProvider.html5Mode(true);
        storeProvider.setStore('localStorage');

        // App routing
        $routeProvider
            .when('/chat', {
                templateUrl: 'templates/chat.html',
                controller: 'chatController',
                resolve: {
                    user: ($location, auth) => {
                        if (auth.isLoggedIn) {
                            console.log('Access permitted.');
                            return auth.getLoggedUser();
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
            .when('/usersearch', {
                templateUrl: 'templates/usersearch.html',
                controller: 'userSearchController',
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
