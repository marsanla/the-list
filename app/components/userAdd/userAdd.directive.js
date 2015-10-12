(function () {
    'use strict';

    angular.module('userAdd', [
        'ngMaterial'
    ])
        .controller('DialogController', function DialogController(userService, $scope, $mdDialog) {
            var self = $scope;

            self.user = {};
            self.inputs = userService.getInputs();

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function (form) {
                if (form.$valid) {
                    $mdDialog.hide(self.user);
                }
            };
        })
        .directive('userAdd', function (userService, $mdDialog, $mdToast) {
            return {
                template: '<md-button ng-click="addContact($event)" class="md-fab md-fab-bottom-right" aria-label="Add">' +
                '<md-tooltip md-direction="left">Add contact</md-tooltip>' +
                '<md-icon class="material-icons">add</md-icon>' +
                '</m-button>',
                restrict: 'E',
                scope: false,
                link: function (scope) {
                    var self = scope;

                    self.addContact = addContact;

                    // Private

                    // Add contact
                    function addContact(ev) {
                        $mdDialog.show({
                            controller: 'DialogController',
                            template: '<md-dialog class="user-add" aria-label="Create new contact" ng-cloak>' +
                            '<form name="form" novalidate>' +
                            '<md-toolbar>' +
                            '<div class="md-toolbar-tools">' +
                            '<h2>Create new contact</h2>' +
                            '<span flex></span>' +
                            '<md-button class="md-icon-button" ng-click="cancel()">' +
                            '<md-icon class="material-icons" aria-label="Close dialog">close</md-icon>' +
                            '</md-button>' +
                            '</div>' +
                            '</md-toolbar>' +
                            '<md-dialog-content>' +
                            '<md-input-container class="md-icon-float" ng-repeat="elem in inputs">' +
                            '<label>{{ elem.label }}</label>' +
                            '<md-icon class="material-icons">{{ elem.icon }}</md-icon>' +
                            '<input ng-model="user[elem.name]" type="{{ elem.type }}" ng-pattern="elem.pattern" ng-required="{{ elem.required }}">' +
                            '</md-input-container>' +
                            '</md-dialog-content>' +
                            '<div class="md-actions" layout="row">' +
                            '<span flex></span>' +
                            '<md-button class="md-raised md-primary" aria-label="Save user" ng-disabled="!form.$valid" ng-click="save(form)">' +
                            'Create' +
                            '</md-button>' +
                            '</div>' +
                            '</form>' +
                            '</md-dialog>',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true
                        })
                            .then(function (user) {
                                userService
                                    .addUser(user)
                                    .then(function (user) {
                                        $mdToast.show(
                                            $mdToast.simple()
                                                .content('User ' + user.firstName + ' created!')
                                                .hideDelay(3000)
                                        );
                                        scope.$emit('updateUsers');
                                    });
                            });
                    }
                }
            };
        });

})();