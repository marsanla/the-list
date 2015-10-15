(function () {
    'use strict';

    angular.module('topNav', [
        'ngMaterial'
    ])
        .directive('topNav', topNav);

    // Create a top navigation
    function topNav() {
        return {
            template: '<md-toolbar md-scroll-shrink layout="row" class="top-nav">' +
            '<div class="md-toolbar-tools">' +
            '<md-button class="menu" hide-gt-sm ng-click="toggleList()" aria-label="Show User List">' +
            '<md-icon class="material-icons">dehaze</md-icon>' +
            '</md-button>' +
            '<md-icon hide show-gt-sm class="md-default-theme" md-svg-icon="logo"></md-icon>' +
            '<h1 ng-bind-html="title"></h1>' +
            '<span flex></span>' +
            '<md-button ui-sref="{{ item.route }}" ng-repeat="item in menu track by $index" title="{{ item.label }}" class="md-icon-button" aria-label="Favorite">' +
            '{{ item.label }}' +
            '</md-button>' +
            '</div>' +
            '</md-toolbar>',
            restrict: 'E',
            scope: {
                title: '@',
                toggleList: '&'
            },
            replace: true,
            link: function (scope) {
                var self = scope;
                self.title = scope.title || '';
                self.toggleList = scope.toggleList();
                self.menu = [{
                    label: 'Users',
                    route: 'users'
                }];
            }
        };
    }

})();