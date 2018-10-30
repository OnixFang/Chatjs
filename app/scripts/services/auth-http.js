(() => {
    const app = angular.module('chatjs');

    function auth($http, $location, $window, store) {
        if (store.get('user')) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }

        function getLoggedUser() {
            if (this.isLoggedIn) {
                return store.get('user');
            }
            return null;
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
            return $http.post('/user', user)
                .then(() => {
                }, (error) => {
                    $window.alert('ERROR: ' + error.data);
                });
        }

        function getAll() {
            return $http.post('/getAllUsers');
        }

        return {
            isLoggedIn: this.isLoggedIn,
            login: login,
            logout: logout,
            saveUser: saveUser,
            getLoggedUser: getLoggedUser,
            getAll: getAll,
        };
    }

    app.factory('auth', auth);
})();
