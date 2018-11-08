(() => {
    const app = angular.module('chatjs');

    function resetPasswordController($scope, auth) {
        $scope.resetPassword = () => {
            const credentials = {
                username: $scope.username,
                passcode: $scope.passcode,
            };

            auth.resetPassword(credentials);
        };
    }

    app.controller('resetPasswordController', resetPasswordController);
})();
