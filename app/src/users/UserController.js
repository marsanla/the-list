(function () {

    angular
        .module('users')
        .controller('UserController', UserController);

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
                    self.users = [].concat(users);

                    if (selectFirstUser) {
                        self.selectUser(self.users[0]);
                    }
                });
        };
        loadUsers();
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

        // Select user
        function selectUser(user) {
            self.selected = (!user) ? null : (angular.isNumber(user) ? self.users[user] : user);
            self.toggleList();
        }

        // Save users
        function saveUsers() {
            return userService
                .updateUser(self.users);
        }

        // Delete users
        function deleteUser(user) {
            return userService
                .deleteUser(user);
        }
    }
})();
