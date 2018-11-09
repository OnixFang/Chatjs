(() => {
    const app = angular.module('chatjs');

    function mainController($scope, $location, auth) {
        auth.getAll().then((response) => { $scope.users = response.data; });
        $scope.auth = auth;

        $scope.user = auth.getLoggedUser();

        $scope.logout = () => {
            auth.logout();
            $location.path('/login');
        };
    }

    app.controller('mainController', mainController);
})();
