(() => {
    const app = angular.module('chatjs');

    function userSearchController($scope, auth) {
        auth.getAll().then((response) => { $scope.users = response.data; });
    }

    app.controller('userSearchController', userSearchController);
})();
