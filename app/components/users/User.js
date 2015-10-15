(function () {
    'use strict';

    angular.module('users', [
        'ngMaterial',
        'LocalStorageModule'
    ])
        // Config localstorage
        .config(function configLocalStorage(localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('theList');
        })

        // Routes
        .config(function configUserRoutes($stateProvider) {
            $stateProvider
                .state('users', {
                    url: '/',
                    templateUrl: 'components/users/User.html',
                    controller: 'UserController as u'
                })
        });
})();
