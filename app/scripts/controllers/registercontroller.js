(function () {
    const app = angular.module('chatjs');

    function registerController($scope, authentication) {
        $scope.register = function register() {
            let user = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                username: $scope.username,
                password: CryptoJS.AES.encrypt($scope.password, "ChatJS Password").toString()
            }

            console.log("Successfully saved the following object into database:");
            console.log(user);
        }

        let yuser = {}
        $scope.test = function test() {
            authentication.saveUser(yuser)
        }
    }

    app.controller('registerController', registerController);
}());