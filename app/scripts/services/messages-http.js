(() => {
    const app = angular.module('chatjs');

    function messages($http) {
        function saveMessage(message) {
            return $http.post('/saveMessage', message);
        }

        function getConversationMessages(fromUsername, toUsername) {
            const users = {
                fromUsername: fromUsername,
                toUsername: toUsername,
            };

            return $http.post('/getConversationMessages', users);
        }

        return {
            saveMessage: saveMessage,
            getConversationMessages: getConversationMessages,
        };
    }

    app.factory('messages', messages);
})();
