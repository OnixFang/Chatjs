(() => {
    const app = angular.module('chatjs');

    function auth($resource, $http, $location, $window, store) {
        // API variables for user data
        const users = $resource('/user');

        this.isLoggedIn = false;

        function getLoggedUser() {
            if (this.isLoggedIn) {
                return store.get('user');
            }
            return false;
        }

        function login(credentials) {
            return $http.post('/authenticate', credentials)
                .then((response) => {
                    store.set('user', response.data);
                    this.isLoggedIn = true;
                    $location.path('/');
                }, (error) => {
                    $window.alert('ERROR: ' + error.data);
                });
        }

        function logout() {
            store.remove('user');
            this.isLoggedIn = false;
        }

        function saveUser(user) {
            return users.save(user);
        }

        return {
            login: login,
            logout: logout,
            saveUser: saveUser,
            getLoggedUser: getLoggedUser,
        };
    }

    app.factory('auth', auth);
})();
