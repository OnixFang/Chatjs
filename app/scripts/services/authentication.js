(() => {
    const app = angular.module('chatjs');

    function authentication($resource) {
        // API resource path for user data
        const resource = $resource('/user/:username', { username: '@username' });

        function login(username) {
            return resource.get(username);
        }

        function saveUser(user) {
            return resource.save(user);
        }

        return {
            login: login,
            saveUser: saveUser,
        };
    }

    app.factory('authentication', authentication);
})();
