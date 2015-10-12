(function () {
    'use strict';

    angular.module('users')
        .service('userService', UserService);

    /**
     * Users DataService
     */
    function UserService($q, localStorageService, _, $timeout) {
        var users = [];

        var inputs = {
            firstName: {
                label: 'First name',
                required: true,
                icon: 'person',
                pattern: null,
                type: 'text',
                name: 'firstName'
            },
            lastName: {
                label: 'Last name',
                required: true,
                icon: 'person_outline',
                pattern: null,
                type: 'text',
                name: 'lastName'
            },
            email: {
                label: 'Email',
                required: true,
                icon: 'email',
                pattern: null,
                type: 'email',
                name: 'email'
            },
            address: {
                label: 'Address',
                required: false,
                icon: 'my_location',
                pattern: null,
                type: 'text',
                name: 'address'
            },
            city: {
                label: 'City',
                required: false,
                icon: 'location_city',
                pattern: null,
                type: 'text',
                name: 'city'
            },
            zipCode: {
                label: 'Zip-code',
                required: false,
                icon: 'explore',
                pattern: /^\d{5}$/,
                type: 'text',
                name: 'zipCode'
            },
            country: {
                label: 'Country',
                required: false,
                icon: 'public',
                pattern: null,
                type: 'text',
                name: 'country'
            },
            notes: {
                label: 'Notes',
                required: false,
                icon: 'assignment',
                pattern: null,
                type: 'text',
                name: 'notes'
            }
        };


        if (localStorageService.isSupported) {
            var usersStorage = localStorageService.get('users');
            if (!_.isEmpty(usersStorage)) {
                users = usersStorage;
            }
        }

        // Promise-based API
        return {
            // Load users
            loadAllUsers: function loadAllUsers() {
                return $q.when(users);
            },

            // Get inputs
            getInputs: function getInputs(type) {
                if (type) {
                    return inputs[type];
                } else {
                    return inputs
                }
            },

            // Delete user
            deleteUser: function deleteUser(user) {
                var deletedUser = _.remove(users, function (u) {
                    return _.isEqual(u, user)
                });
                users = _(users).value();
                localStorageService.set('users', users);

                return $q
                    .when(deletedUser);
            },

            // Update users
            updateUser: function updateUser(userList) {
                if (userList) {
                    users = userList;
                    $timeout(function () {
                        users = _(users).value();
                        localStorageService.set('users', users);
                    }, 200);
                }

                return $q
                    .when(users);
            },

            // Add user
            addUser: function addUser(user) {
                if (user) {
                    users = _(users).push(user).value();
                    localStorageService.set('users', users);
                }

                return $q.when(user);
            }
        };
    }

})();
