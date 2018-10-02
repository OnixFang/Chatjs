(() => {
    const app = angular.module('chatjs');

    function authentication($resource, $window, $location) {
        // API resource path for user data
        const resource = $resource('/user/:id', { id: '@id' });

        function getUser(userId) {
            return resource.get({ id: userId }).$promise
                .then((response) => {
                    console.log('GET successful.');
                    console.log(response);
                }, (error) => {
                    console.log('Error performing GET.');
                    console.log(error);
                });
        }

        function saveUser(user) {
            return resource.save(user).$promise
                .then(() => {
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
