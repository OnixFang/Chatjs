(() => {
    const app = angular.module('chatjs');

    function mainController($scope, $location, auth) {
        $scope.fetchUsers = () => {
            auth.getAll().then((response) => { $scope.users = response.data; });
        };

        $scope.clearSearch = () => {
            $scope.search = '';
        };

        $scope.auth = auth;

        $scope.user = auth.getLoggedUser();

        $scope.logout = () => {
            auth.logout();
            $location.path('/login');
        };
    }

    app.controller('mainController', mainController);
})();
