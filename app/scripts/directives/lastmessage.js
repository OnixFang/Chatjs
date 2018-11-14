(() => {
    const app = angular.module('chatjs');

    function lastMessage($location, $anchorScroll) {
        return {
            link: (scope) => {
                if (scope.$last) {
                    $location.hash('bottom-of-the-page');
                    $anchorScroll();
                }
            },
        };
    }

    app.directive('lastMessage', lastMessage);
})();
