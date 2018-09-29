(() => {
    const app = angular.module('chatjs');

    function authentication($http, $window) {
        // API resource path for user data
        function getUser(userId) {
            return $http.get('/user/' + userId)
                .then((response) => {
                    console.log('GET successful.');
                    console.log(response);
                }, (error) => {
                    console.log('Error performing GET.');
                    console.log(error);
                });
        }

        function saveUser(user) {
            return $http.post('/user/', user)
                .then(() => {
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
