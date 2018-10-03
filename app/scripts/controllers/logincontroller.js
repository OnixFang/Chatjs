(() => {
    const app = angular.module('chatjs');

    function loginController($scope, $window, $location, auth, store) {
        $scope.login = () => {
            const credentials = {
                username: $scope.username,
                password: CryptoJS.AES.encrypt($scope.password, 'ChatJS Password').toString(),
            };

            auth.login(credentials)
                .then((response) => {
                    store.set('user', response.data);
                    $location.path('/');
                }, (error) => {
                    $window.alert('ERROR: ' + error.data);
                });
        };
    }

    app.controller('loginController', loginController);
})();
