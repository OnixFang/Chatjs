(() => {
    const app = angular.module('chatjs');

    function testController($scope) {
        $scope.test = () => {
            $scope.output = CryptoJS.AES.encrypt($scope.testinput, 'ChatJS Password');
        };

        $scope.test2 = () => {
            $scope.output2 = CryptoJS.AES.decrypt($scope.output, 'ChatJS Password').toString(CryptoJS.enc.Utf8);
        };
    }

    app.controller('testController', testController);
})();
