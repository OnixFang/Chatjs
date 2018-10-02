(() => {
    const app = angular.module('chatjs');

    function authentication($http) {
        function login(username) {
            return $http.get('/user/' + username);
        }

        function saveUser(user) {
            return $http.post('/user/', user);
        }

        return {
            login: login,
            saveUser: saveUser,
        };
    }

    app.factory('authentication', authentication);
})();
