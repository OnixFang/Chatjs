(() => {
    const app = angular.module('chatjs');

    function loginController($scope, authentication) {
        $scope.login = () => {
            console.log($scope.username);
            authentication.login($scope.username)
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log('ERROR: ' + error.data);
                });
        };
    }

    app.controller('loginController', loginController);
})();
