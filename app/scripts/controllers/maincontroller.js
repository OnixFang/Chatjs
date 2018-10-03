(() => {
    const app = angular.module('chatjs');

    function mainController($scope, $location, auth) {
        $scope.message = 'Logout';

        $scope.logout = () => {
            auth.logout();
            $location.path('/login');
        };
    }

    app.controller('mainController', mainController);
})();
