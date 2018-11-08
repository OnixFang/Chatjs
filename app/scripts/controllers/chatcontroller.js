(() => {
    const app = angular.module('chatjs');

    function chatController($scope, user, $routeParams) {
        $scope.user = user;
        $scope.toUsername = $routeParams.toUsername;
    }

    app.controller('chatController', chatController);
})();
