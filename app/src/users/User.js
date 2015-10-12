(function () {
    'use strict';

    angular.module('users', [
        'ngMaterial',
        'LocalStorageModule'
    ])
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('theList');
        });
})();
