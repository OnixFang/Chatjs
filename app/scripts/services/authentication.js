(function () {
    const app = angular.module('chatjs');

    function authentication($resource) {
        // API resource path for user data
        const resource = $resource('/user/:id', { id: '@id' });

        function getUser(userId) {
            return resource.get({ id: userId });
        }

        function saveUser(user) {
            return resource.save(user);
        }

        return {
            getUser: getUser,
            saveUser: saveUser,
        };
    }

    app.factory('authentication', authentication);
}());
