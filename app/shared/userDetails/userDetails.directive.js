(function () {
    'use strict';

    angular.module('userDetails', [
        'ngMaterial'
    ])
        .directive('userDetails', userDetails);

    function userDetails($mdBottomSheet, $mdDialog, $mdToast, userService) {
        return {
            template: '<md-whiteframe class="md-whiteframe-1dp user-details" flex="100" layout="column" ng-if="user">' +
            '<md-toolbar>' +
            '<div class="md-toolbar-tools">' +
            '<span flex></span>' +
            '<md-button class="md-icon-button" ng-click="deleteUser($event)" aria-label="Delete User">' +
            '<md-tooltip>Delete {{ user.firstName }} {{ user.lastName }}</md-tooltip>' +
            '<md-icon class="material-icons">delete</md-icon>' +
            '</md-button>' +
            '<md-button class="md-icon-button" ng-click="showContactOptions($event)" aria-label="Contact User">' +
            '<md-tooltip>Contact {{ user.firstName }} {{ user.lastName }}</md-tooltip>' +
            '<md-icon class="material-icons">more_vert</md-icon>' +
            '</md-button>' +
            '</div>' +
            '</md-toolbar>' +
            '<div class="layout-fill flex user-header" layout="row">' +
            '<div flex="15">' +
            '<img gravatar-src="user.email" gravatar-size="100" alt="{{ user.firstName }} {{ user.lastName }}" class="md-avatar"/>' +
            '</div>' +
            '<div flex>' +
            '<h2>' +
            '<span editable-text="user.firstName" placeholder="{{ inputs.firstName.label }}" on-change="validateAndSave(value, \'firstName\')"></span>' +
            '<span editable-text="user.lastName" placeholder="{{ inputs.lastName.label }}" on-change="validateAndSave(value, \'lastName\')"></span>' +
            '</h2>' +
            '<p class="gray email" editable-text="user.email" placeholder="{{ inputs.email.label }}" on-change="validateAndSave(value, \'email\')"></p>' +
            '</div>' +
            '</div>' +
            '<div class="layout-fill layout-row flex user-info" layout="row">' +
            '<div flex>' +
            '<div class="user-info-element" ng-repeat="input in inputs track by $index" ng-if="hideInputs(input)">' +
            '<md-icon title="{{ input.label }}" class="material-icons">{{ input.icon }}</md-icon>' +
            '<span editable-text="user[input.name]" placeholder="{{ input.label }}" on-change="validateAndSave(value, input.name)"></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</md-whiteframe>' +
            '<div layout="column" layout-align="center center" ng-show="!user" class="empty details-empty">' +
            '<md-icon class="material-icons md-48">account_circle</md-icon>' +
            '<p>You Rock, but... you don\'t have any contact.</p>' +
            '</div>',
            restrict: 'E',
            scope: {
                user: '=',
                onDelete: '&',
                onSave: '&'
            },
            link: function (scope) {
                var self = scope;

                // Watch if user selected is changed
                scope.$watch('user', function (user) {
                    self.user = user;
                }, true);

                self.inputs = userService.getInputs();
                self.deleteUser = deleteUser;
                self.showContactOptions = showContactOptions;
                self.validateAndSave = validateAndSave;
                self.hideInputs = hideInputs;

                // Show extra options button
                function showContactOptions($event) {
                    var user = self.selected;

                    return $mdBottomSheet.show({
                        parent: angular.element(document.getElementById('content')),
                        template: '<md-bottom-sheet class="md-list md-has-header">' +
                        '<md-list>' +
                        '<md-item ng-repeat="item in cp.actions">' +
                        '<md-button href="{{ item.url }}" target="_blank" ng-click="cp.submitContact(item)" id="item_{{$index}}">' +
                        '<md-icon md-svg-icon="{{ item.icon }}"></md-icon>' +
                        ' {{item.name}}' +
                        '</md-button>' +
                        '</md-item>' +
                        '</md-list>' +
                        '</md-bottom-sheet>',
                        controller: ['$mdBottomSheet', ContactPanelController],
                        controllerAs: 'cp',
                        bindToController: true,
                        targetEvent: $event
                    }).then(function (clickedItem) {
                        console.log(clickedItem.name + ' contact!');
                    });

                    /**
                     * Bottom Sheet controller for the Avatar Actions
                     */
                    function ContactPanelController($mdBottomSheet) {
                        this.user = user;
                        this.actions = [
                            {
                                name: 'Phone',
                                icon: 'phone',
                                url: 'https://www.viber.com'
                            },
                            {
                                name: 'Twitter',
                                icon: 'twitter',
                                url: 'https://www.twitter.com'
                            },
                            {
                                name: 'Google+',
                                icon: 'google_plus',
                                url: 'https://plus.google.com'
                            },
                            {
                                name: 'Hangout',
                                icon: 'hangouts',
                                url: 'https://hangouts.google.com'
                            }
                        ];
                        this.submitContact = function (action) {
                            $mdBottomSheet.hide(action);
                        };
                    }
                }

                // Hide inputs to show in the details
                function hideInputs(item) {
                    if (['firstName', 'lastName', 'email'].indexOf(item.name) <= -1) {
                        return true;
                    }

                    return false;
                }

                // Delete user action
                function deleteUser(ev) {
                    // Show a confirm modal
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete ' + self.user.firstName + ' ' + self.user.lastName + '?')
                        .ariaLabel('Confirm delete user')
                        .targetEvent(ev)
                        .ok('Delete')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        // If confirm make the delete action
                        self.onDelete()(self.user)
                            .then(function () {
                                // Update users updating the selected user
                                scope.$emit('updateUsers', true);

                                // Create Toast with information about deleted user
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content(self.user.firstName + ' ' + self.user.lastName + ' was deleted!')
                                        .hideDelay(3000)
                                );
                            });
                    });
                }

                // Validate and save details
                function validateAndSave(value, type) {
                    var validate = true;
                    var errorMessage = 'There was an error, please check your changes.';

                    // Validate if is required
                    if (self.inputs[type].required && !value) {
                        validate = false;
                        errorMessage = self.inputs[type].label + ' is required.'
                    }

                    // Validate patterns
                    if (self.inputs[type].pattern && value) {
                        validate = (self.inputs[type].pattern).test(value);
                        errorMessage = self.inputs[type].label + ' is not correct.'
                    }

                    // If valid, save user action
                    if (validate) {
                        self.onSave()();
                        return value;
                    } else {
                        // If there is an error, show the message
                        $mdToast.show(
                            $mdToast.simple()
                                .content(errorMessage)
                                .hideDelay(3000)
                        );

                        return false;
                    }
                }
            }
        };
    }

})();