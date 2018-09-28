(() => {
    const app = angular.module('chatjs');

    function registerController($scope, $window, authentication) {
        const user = {
            firstname: null,
            lastname: null,
            username: null,
            password: null,
        };

        $scope.register = function register() {
            user.firstname = $scope.firstname;
            user.lastname = $scope.lastname;
            user.username = $scope.username.toLowerCase();
            user.password = CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString();

            console.log(user);
            try {
                authentication.saveUser(user);
                console.log('Registration completed successfully.');
            } catch (error) {
                $window.alert('Could not register user.');
            }
        };
    }
    app.controller('registerController', registerController);
})();
