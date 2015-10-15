(function () {

    angular
        .module('users')
        .controller('UserController', UserController);

    // User controller
    function UserController($scope, userService, $mdSidenav, $mdBottomSheet, $q) {
        var self = this;

        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.saveUsers = saveUsers;
        self.deleteUser = deleteUser;
        self.toggleList = toggleUsersList;

        // Load all registered users
        var loadUsers = function (selectFirstUser) {
            userService
                .loadAllUsers()
                .then(function (users) {
                    // Get users and normalize the object
                    self.users = [].concat(users);

                    // Select first user
                    if (selectFirstUser) {
                        self.selectUser(self.users[0]);
                    }
                });
        };
        loadUsers();

        // Listener when a new user is created, load again the list
        $scope.$on('updateUsers', function (selectFirstUser) {
            loadUsers(selectFirstUser);
        });


        // Private
        // ----------

        // Toggle sidebar user list
        function toggleUsersList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        // Select user when click
        function selectUser(user) {
            self.selected = (!user) ? null : (angular.isNumber(user) ? self.users[user] : user);
            self.toggleList();
        }

        // Save users list
        function saveUsers() {
            return userService
                .updateUser(self.users);
        }

        // Delete user from list
        function deleteUser(user) {
            return userService
                .deleteUser(user);
        }
    }
})();
