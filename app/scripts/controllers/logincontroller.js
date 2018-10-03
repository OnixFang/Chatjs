(() => {
    const app = angular.module('chatjs');

    function loginController($scope, auth) {
        $scope.login = () => {
            const credentials = {
                username: $scope.username,
                password: CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString(),
            };
            console.log(credentials);
            auth.login(credentials)
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log('ERROR: ' + error.data);
                });
        };
    }

    app.controller('loginController', loginController);
})();
