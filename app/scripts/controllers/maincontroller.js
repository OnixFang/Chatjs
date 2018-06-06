(function () {
    const app = angular.module('chatjs');

    function mainController($scope, $http) {
        $scope.message = "I am working!";

        $scope.getMessages = function getMessages() {
            $http.get("/getMessages").then(function (response) {
                $scope.messages = response.data;
                console.log($scope.messages);
            }, function (response) {
                console.log(response);
            });
        }
    }

    app.controller('mainController', mainController);
}());