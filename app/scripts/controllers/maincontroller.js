(function () {
    const app = angular.module('chatjs');

    function mainController($scope, $http) {
        $scope.getMessages = function getMessages() {
            $http.get('/getMessages').then(function (response) {
                $scope.messages = response.data;
                console.log($scope.messages);
            }, function (response) {
                console.log(response);
            });
        };
    }

    app.controller('mainController', mainController);
}());
