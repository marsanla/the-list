(function () {
    'use strict';

    angular.module('userList', [
        'ngMaterial'
    ])
        .directive('userList', function () {
            return {
                template: '<md-list class="user-list" ng-cloak>' +
                '<md-input-container flex>' +
                '<label>&nbsp;</label>' +
                '<input ng-model="search" placeholder="Search...">' +
                '</md-input-container>' +
                '<md-subheader class="md-sticky">Your list has {{ users.length }} contacts.</md-subheader>' +
                '<md-list-item ng-repeat="user in filtered=(users | filter:filterSearch) track by $index" ng-click="selectUser(user, $event)" ng-class="{\'selected\' : user === selected }">' +
                '<img gravatar-src="user.email" gravatar-size="100" alt="{{ user.firstName }} {{ user.lastName }}" class="md-avatar" />' +
                '<p><strong>{{ user.firstName }}</strong> {{ user.lastName }}</p>' +
                '</md-list-item>' +
                '<div layout="column" layout-align="center center" ng-hide="filtered.length" class="empty">' +
                '<md-icon class="material-icons md-48">people_outline</md-icon>' +
                '<p>Upps, there aren\'t contacts.</p>' +
                '</div>' +
                '</md-list>',
                restrict: 'E',
                scope: {
                    users: '=',
                    onSelect: '&'
                },
                replace: true,
                link: function (scope) {
                    var self = scope;

                    self.users = scope.users || [];
                    self.selected = scope.selected || null;

                    scope.$watch('users', function(users) {
                        if(!self.selected) {
                            self.selectUser(users[0])
                        }
                    });

                    self.selectUser = function (user) {
                        self.selected = user;

                        if (scope.onSelect && scope.onSelect()) {
                            scope.onSelect()(user);
                        }
                    };

                    self.filterSearch = function (item) {
                        if(!self.search) {
                            return  true;
                        } else {
                            if ((String(item.firstName).toLowerCase().indexOf(self.search) != -1) || (String(item.lastName).toLowerCase().indexOf(self.search) != -1) ){
                                return true;
                            }
                            return false;
                        }
                    };
                }
            };
        });

})();