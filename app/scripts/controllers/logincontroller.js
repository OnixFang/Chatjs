(() => {
    const app = angular.module('chatjs');

    function loginController($scope, authentication) {
        $scope.message = 'I am working!';
        $scope.login = () => {
            authentication.login($scope.credentials).$promise
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log('ERROR: ' + error.data);
                });
        };
    }

    app.controller('loginController', loginController);
})();
