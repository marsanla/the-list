'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        injector: 'grunt-asset-injector'
    });

    // Time how long tasks take.
    require('time-grunt')(grunt);

    grunt.initConfig({
        // Project settings
        pkg: grunt.file.readJSON('package.json'),
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },
        watch: {
            injectJS: {
                files: [
                    '<%= config.app %>/{src,components}/**/*.js',
                    '!<%= config.app %>/{src,components}/**/*.spec.js',
                    '!<%= config.app %>/{src,components}/**/*.mock.js'],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: [
                    '<%= config.app %>/{src,components}/**/*.css',
                    '<%= config.app %>/{assets}/styles/**/*.css'
                ],
                tasks: ['injector:css']
            },
            jsTest: {
                files: [
                    '<%= config.app %>/{src,components}/**/*.spec.js',
                    '<%= config.app %>/{src,components}/**/*.mock.js'
                ],
                tasks: ['newer:jshint:all', 'karma']
            },
            injectLess: {
                files: [
                    '<%= config.app %>/{src,components}/**/*.less',
                    '<%= config.app %>/{assets}/styles/**/*.less'
                ],
                tasks: ['injector:less']
            },
            less: {
                files: [
                    '<%= config.app %>/{src,components}/**/*.less',
                    '<%= config.app %>/{assets}/styles/**/*.less'
                ],
                tasks: ['less', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{.tmp,<%= config.app %>}/*.{js,html,css}',
                    '{.tmp,<%= config.app %>}/{src,assets,components}/**/*.css',
                    '{.tmp,<%= config.app %>}/{src,components}/**/*.html',
                    '{.tmp,<%= config.app %>}/{src,components}/**/*.js',
                    '!{.tmp,<%= config.app %>}{src,components}/**/*.spec.js',
                    '!{.tmp,<%= config.app %>}/{src,components}/**/*.mock.js',
                    '<%= config.app %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '<%= config.app %>/.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= config.app %>/{src,components}/**/*.js',
                '!<%= config.app %>/{src,components}/**/*.spec.js',
                '!<%= config.app %>/{src,components}/**/*.mock.js'
            ],
            test: {
                src: [
                    '<%= config.app %>/{src,components}/**/*.spec.js',
                    '<%= config.app %>/{src,components}/**/*.mock.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            dev: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            dist: {
                src: '<%= config.app %>/index.html',
                ignorePath: '<%= config.app %>/',
                exclude: []
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/assets/{,*/}*.js',
                        '<%= config.dist %>/assets/{,*/}*.css',
                        '<%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= config.dist %>/assets/fonts/*'
                    ],
                    filter: 'isFile'
                }
            }
        },

        // Create manifest app.cache
        manifest: {
            generate: {
                options: {
                    basePath: './dist',
                    network: ['http://*', 'https://*'],
                    preferOnline: true,
                    verbose: false,
                    timestamp: true,
                    master: ['index.html']
                },
                src: [
                    'app/*.css',
                    'app/*.js',
                    'index.html'
                ],
                dest: 'dist/manifest.appcache'
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= config.app %>/index.html'],
            options: {
                dest: '<%= config.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/{,*/}*.css'],
            js: ['<%= config.dist %>/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/assets/images'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= config.app %>/assets/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.app %>/assets/images'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '*/**.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        // Package all the html partials into a single javascript payload
        ngtemplates: {
            options: {
                // This should be the name of your apps angular module
                module: 'theList',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                usemin: 'app.js'
            },
            main: {
                cwd: '<%= config.app %>',
                src: ['{src,components}/**/*.html'],
                dest: '.tmp/templates.js'
            },
            tmp: {
                cwd: '.tmp',
                src: ['{src,components}/**/*.html'],
                dest: '.tmp/tmp-templates.js'
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= config.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt,html,xml,json}',
                        '.htaccess',
                        'bower_components/**/*',
                        'assets/images/**/*',
                        'assets/fonts/**/*',
                        'index.html'
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            dist: [
                'less',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['app/{src,components}/**/*.spec.js']
        },

        // Compiles Less to CSS
        less: {
            options: {
                paths: [
                    '<%= config.app %>/bower_components',
                    '<%= config.app %>/src',
                    '<%= config.app %>/assets',
                    '<%= config.app %>/components'
                ]
            },
            server: {
                files: {
                    '<%= config.app %>/assets/app.css': '<%= config.app %>/assets/app.less'
                }
            }
        },

        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/app/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= config.app %>/index.html': [
                        ['{.tmp,<%= config.app %>}/{src,components}/**/*.js',
                            '!{.tmp,<%= config.app %>}/app.js',
                            '!{.tmp,<%= config.app %>}/{src,components}/**/*.spec.js',
                            '!{.tmp,<%= config.app %>}/{src,components}/**/*.mock.js']
                    ]
                }
            },

            // Inject component less into assets/app.less
            less: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/app/src/', '');
                        filePath = filePath.replace('/app/assets/', '');
                        filePath = filePath.replace('/app/components/', '');
                        return '@import \'' + filePath + '\';';
                    },
                    starttag: '// injector',
                    endtag: '// endinjector'
                },
                files: {
                    '<%= config.app %>/assets/app.less': [
                        '<%= config.app %>/{src,assets,components}/**/*.less',
                        '!<%= config.app %>/assets/app.less'
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/app/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= config.app %>/index.html': [
                        '<%= config.app %>/{src,assets,components}/**/*.css'
                    ]
                }
            }
        },

        connect: {
            dev: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    useAvailablePort: true,
                    base: 'app',
                    open: true,
                    livereload: true
                }
            },
            dist: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    useAvailablePort: true,
                    base: 'dist',
                    open: true
                }
            }
        }
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', function (target) {
        if (target === 'dist') {
            return grunt.task.run([
                'clean:dist',
                'build',
                'copy:dist',
                'cdnify',
                'cssmin',
                'uglify',
                'rev',
                'usemin',
                'manifest',
                'clean:dev'
            ]);
        }

        else grunt.task.run([
            'clean:dev',
            'injector:less',
            'concurrent:dist',
            'injector',
            'wiredep:dist',
            'useminPrepare',
            'autoprefixer',
            'ngtemplates',
            'concat',
            'ngAnnotate'
        ]);
    });

    grunt.registerTask('dist', [
        'build:dist',
        'wait',
        'connect:dist',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build',
        'wait',
        'connect:dev',
        'watch'
    ]);
};
