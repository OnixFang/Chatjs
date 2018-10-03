(() => {
    const app = angular.module('chatjs');

    function auth($resource, $http, store) {
        // API variables for user data
        const users = $resource('/user');

        function authenticate() {
            if (store.get('user') != null) {
                return store.get('user');
            }
            return false;
        }

        function login(credentials) {
            return $http.post('/authenticate', credentials);
        }

        function logout() {
            store.remove('user');
        }

        function saveUser(user) {
            return users.save(user);
        }

        return {
            login: login,
            logout: logout,
            saveUser: saveUser,
            authenticate: authenticate,
        };
    }

    app.factory('auth', auth);
})();
