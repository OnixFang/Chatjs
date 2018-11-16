(() => {
    const app = angular.module('chatjs');

    function testController($scope) {
        const socket = io();
        $scope.messages = [];

        socket.on('test-message', (msg) => {
            $scope.$apply(() => {
                console.log('Message from socket: ' + msg);
                $scope.messages.push(msg);
            });
        });

        $scope.sendMessage = () => {
            socket.emit('test-message', $scope.message);
            $scope.message = '';
        };
    }

    app.controller('testController', testController);
})();
