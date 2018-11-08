(() => {
    const app = angular.module('chatjs');

    function resetPasswordController($scope, auth) {
        $scope.resetPassword = () => {
            const credentials = {
                username: $scope.username,
                password: CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString(),
                passcode: $scope.passcode,
            };

            auth.resetPassword(credentials);
        };
    }

    app.controller('resetPasswordController', resetPasswordController);
})();
