(() => {
    const app = angular.module('chatjs');

    function loginController($scope, auth) {
        $scope.login = () => {
            console.log($scope.credentials);
            auth.login($scope.credentials)
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log('ERROR: ' + error.data);
                });
        };
    }

    app.controller('loginController', loginController);
})();
