(() => {
    const app = angular.module('chatjs');

    function loginController($scope, auth) {
        $scope.login = () => {
            const credentials = {
                username: $scope.username,
                password: CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString(),
            };

            auth.login(credentials);
        };
    }

    app.controller('loginController', loginController);
})();
