(() => {
    const app = angular.module('chatjs');

    function mainController($scope) {
        $scope.message = 'This is working';
    }

    app.controller('mainController', mainController);
})();
