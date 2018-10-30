(() => {
    const app = angular.module('chatjs');

    function userSearchController($scope, auth) {
        $scope.message = 'I works!';

        auth.getAll().then(response => console.log(response.data));
    }

    app.controller('userSearchController', userSearchController);
})();
