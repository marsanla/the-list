module.exports = function (config) {
    config.set({
        basePath: '',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-gravatar/build/angular-gravatar.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-scenario/angular-scenario.js',
            'app/bower_components/lodash/lodash.js',
            'app/components/**/*.js',
            'app/components/**/*.html',
            'app/src/**/*.js',
            'app/src/**/*.html'
        ],

        autoWatch: false,

        frameworks: ['jasmine'],

        preprocessors: {
            '**/*.html': 'html2js',
            '{app,app/!(bower_components|assets)/**}/!(*spec).js': 'coverage'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/'
        },

        // web server port
        port: 8082,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        browsers: ['PhantomJS', 'Chrome', 'Firefox'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }

    });
};