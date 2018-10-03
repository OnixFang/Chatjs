(() => {
    const app = angular.module('chatjs');

    function chatController($scope, user) {
        $scope.user = user;
    }

    app.controller('chatController', chatController);
})();
