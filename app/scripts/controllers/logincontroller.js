(function () {
    const app = angular.module('chatjs');

    function loginController($scope, $http) {
        $scope.message = "I am working!";
    }

    app.controller('loginController', loginController);
}());