(() => {
    const app = angular.module('chatjs');

    function lastMessage($location, $anchorScroll, $timeout) {
        return {
            link: (scope) => {
                if (scope.$last) {
                    $timeout(() => {
                        $location.hash('bottom-of-the-page');
                        $anchorScroll();
                    }, 0);
                }
            },
        };
    }

    app.directive('lastMessage', lastMessage);
})();
