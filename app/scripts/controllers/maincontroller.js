(() => {
    const app = angular.module('chatjs');

    function mainController($scope, $location, $routeParams, auth) {
        $scope.auth = auth;
        $scope.routeParams = $routeParams;
        $scope.$watch('auth.isLoggedIn', () => { $scope.user = auth.getLoggedUser(); });

        $scope.fetchUsers = () => {
            auth.getAll().then((response) => { $scope.users = response.data; });
        };

        $scope.clearSearch = () => {
            $scope.search = '';
        };

        $scope.logout = () => {
            auth.logout();
            $location.path('/login');
        };
    }

    app.controller('mainController', mainController);
})();
