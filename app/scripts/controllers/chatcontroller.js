/* eslint no-param-reassign: "error" */
(() => {
    const app = angular.module('chatjs');

    function chatController($scope, $window, user, toUser, messages) {
        const socket = io();
        $scope.user = user;
        $scope.toUser = toUser;
        const usernamesArray = [$scope.user.username, $scope.toUser.username];
        usernamesArray.sort();
        let eventName = '';

        // Sets the eventName as 'username-username' alphabetically (already supporting multiple usernames)
        for (let i = 0; i < usernamesArray.length; i += 1) {
            eventName += usernamesArray[i];
            if (i !== usernamesArray.length - 1) {
                eventName += '-';
            }
        }

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
                eventName: eventName,
            };
            socket.emit('chat-message', message);
            $scope.message = '';
        };

        socket.on(eventName, (msg) => {
            $scope.$apply(() => {
                $scope.messages.push(msg);
            });
        });
    }

    app.controller('chatController', chatController);
})();
