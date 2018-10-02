(() => {
    const app = angular.module('chatjs');

    function authentication($http, $window, $location) {
        function getUser(userId) {
            return $http.get('/user/' + userId)
                .then(() => {
                    $location.path('/login');
                }, (error) => {
                    $window.alert('Error registering your user: ' + error.data);
                });
        }

        function saveUser(user) {
            return $http.post('/user/', user)
                .then(() => {
                    $window.alert('Register successful');
                    $location.path('/login');
                }, (error) => {
                    $window.alert('Error registering your user: ' + error.data);
                });
        }

        return {
            getUser: getUser,
            saveUser: saveUser,
        };
    }

    app.factory('authentication', authentication);
})();
