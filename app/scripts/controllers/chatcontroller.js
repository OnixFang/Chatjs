(() => {
    const app = angular.module('chatjs');

    function chatController($scope) {
        $scope.message = 'This is working';
    }

    app.controller('chatController', chatController);
})();
