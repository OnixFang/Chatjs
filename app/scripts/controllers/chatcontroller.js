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

        function createRoomName(...args) {
            let roomName = '';

            for (let i = 0; i < args.length; i += 1) {
                roomName += args[i];
                if (i !== args.length - 1) {
                    roomName += '-';
                }
            }
            return roomName;
        }

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
