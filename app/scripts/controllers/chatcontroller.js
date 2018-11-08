(() => {
    const app = angular.module('chatjs');

    function chatController($scope, user, toUser) {
        $scope.user = user;
        $scope.toUser = toUser;
    }

    app.controller('chatController', chatController);
})();
