(() => {
    const app = angular.module('chatjs');

    function userSearchController($scope, auth) {
        $scope.message = 'I works!';
        $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        auth.getAll().then((response) => { $scope.users = response.data; });
    }

    app.controller('userSearchController', userSearchController);
})();
