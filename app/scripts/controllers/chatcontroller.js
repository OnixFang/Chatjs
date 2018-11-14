/* eslint no-param-reassign: "error" */
(() => {
    const app = angular.module('chatjs');

    function chatController($scope, $window, user, toUser, messages) {
        $scope.user = user;
        $scope.toUser = toUser;

        messages.getConversationMessages($scope.user.username, $scope.toUser.username)
            .then((response) => {
                $scope.messages = response.data;
            }, (error) => {
                $window.alert('ERROR: ' + error.data);
            });

        $scope.sendMessage = () => {
            const message = {
                body: $scope.message,
                fromUsername: $scope.user.username,
                toUsername: $scope.toUser.username,
            };
            messages.saveMessage(message);
            $scope.message = '';
        };
    }

    app.controller('chatController', chatController);
})();
