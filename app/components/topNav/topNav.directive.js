(function () {
    'use strict';

    angular.module('topNav', [
        'ngMaterial',
        'ngSanitize'
    ])
        .directive('topNav', function () {
            return {
                template:   '<md-toolbar md-scroll-shrink layout="row" class="top-nav">' +
                                '<div class="md-toolbar-tools">' +
                                    '<md-button class="menu" hide-gt-sm ng-click="toggleList()" aria-label="Show User List">' +
                                        '<md-icon class="material-icons">dehaze</md-icon>' +
                                    '</md-button>' +
                                    '<md-icon hide show-gt-sm class="md-default-theme" md-svg-icon="logo"></md-icon>' +
                                    '<h1 ng-bind-html="title"></h1>' +
                                    '<span flex></span>' +
                                '</div>'+
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
                }
            };
        });

})();