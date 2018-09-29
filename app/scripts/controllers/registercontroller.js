(() => {
    const app = angular.module('chatjs');

    function registerController($scope, $location, authentication) {
        const user = {
            firstname: null,
            lastname: null,
            username: null,
            password: null,
        };

        function register() {
            user.firstname = $scope.firstname;
            user.lastname = $scope.lastname;
            user.username = $scope.username.toLowerCase();
            user.password = CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString();

            console.log('User object to register:');
            console.log(user);

            authentication.saveUser(user);
        }

        $scope.register = register;
    }
    app.controller('registerController', registerController);
})();
