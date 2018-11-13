(() => {
    const app = angular.module('chatjs');

    function messages($http, $window) {
        function saveMessage(message) {
            return $http.post('/saveMessage', message);
        }

        function getConversationMessages(fromUsername, toUsername) {
            const users = {
                fromUsername: fromUsername,
                toUsername: toUsername,
            };

            return $http.post('/getConversationMessages', users)
                .then((response => response.data),
                    (error) => {
                        $window.alert('ERROR: ' + error.data);
                    });
        }

        return {
            saveMessage: saveMessage,
            getConversationMessages: getConversationMessages,
        };
    }

    app.factory('messages', messages);
})();
