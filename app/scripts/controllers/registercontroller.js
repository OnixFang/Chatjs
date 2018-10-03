(() => {
    const app = angular.module('chatjs');

    function registerController($scope, $location, $window, auth) {
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

            auth.saveUser(user).$promise
                .then(() => {
                    $window.alert('Register successful');
                    $location.path('/login');
                }, (error) => {
                    $window.alert('Error registering your user: ' + error.data);
                });
        };
    }
    app.controller('registerController', registerController);
})();
