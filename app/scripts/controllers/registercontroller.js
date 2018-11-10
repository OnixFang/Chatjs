(() => {
    const app = angular.module('chatjs');

    function registerController($scope, auth) {
        const user = {
            firstname: null,
            lastname: null,
            username: null,
            password: null,
        };

        $scope.register = () => {
            user.firstname = $scope.firstname;
            user.lastname = $scope.lastname;
            user.username = $scope.username.toLowerCase();
            user.password = CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString();
            user.passcode = $scope.passcode;

            auth.saveUser(user);
        };
    }
    app.controller('registerController', registerController);
})();
