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

        function resetPassword(credentials) {
            return $http.post('/passwordreset', credentials)
                .then((response) => {
                    $window.alert(response.data);
                    $location.path('/login');
                }, (error) => {
                    $window.alert('ERROR: ' + error.data);
                });
        }

        function saveUser(user) {
            return $http.post('/user', user)
                .then(() => {
                    $window.alert('Register successful');
                    $location.path('/login');
                }, (error) => {
                    $window.alert('Error registering your user: ' + error.data);
                });
        }

        function getUser(username) {
            const toUserRequest = { username: username };
            return $http.post('/getUser', toUserRequest);
        }

        function getAll() {
            return $http.post('/getAllUsers');
        }

        return {
            isLoggedIn: this.isLoggedIn,
            login: login,
            logout: logout,
            resetPassword: resetPassword,
            saveUser: saveUser,
            getLoggedUser: getLoggedUser,
            getAll: getAll,
            getUser: getUser,
        };
    }

    app.factory('auth', auth);
})();
