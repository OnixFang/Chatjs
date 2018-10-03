(() => {
    const app = angular.module('chatjs');

    function auth($resource, $http) {
        // API variables for user data
        const users = $resource('/user');

        function login(credentials) {
            return $http.post('/authenticate', credentials);
        }

        function saveUser(user) {
            return users.save(user);
        }

        return {
            login: login,
            saveUser: saveUser,
        };
    }

    app.factory('auth', auth);
})();
