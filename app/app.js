(function () {

    angular
        .module('theList', [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ui.router',
            'ui.gravatar',
            'ngMaterial',
            'lodash',
            'gg.editableText',
            'topNav',
            'userList',
            'userDetails',
            'userAdd',
            'users'
        ])

        // Config material theme
        .config(function configMaterialTheme($mdThemingProvider, $mdIconProvider) {
            $mdIconProvider
                .icon("logo", "./assets/images/svg/addressbook.svg", 24)
                .icon("google_plus", "./assets/images/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/images/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/images/svg/twitter.svg", 512)
                .icon("phone", "./assets/images/svg/phone.svg", 512);

            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('pink');
        })

        // General routes
        .config(function configUserRoutes($urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        });

})();
