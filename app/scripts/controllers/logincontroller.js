(() => {
    const app = angular.module('chatjs');

    function loginController($scope) {
        $scope.message = 'I am working!';
    }

    app.controller('loginController', loginController);
})();
