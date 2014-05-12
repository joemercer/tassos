module.exports = function(grunt) {

  // displays the elapsed execution time of grunt tasks when done
  require('time-grunt')(grunt);
  // load all grunt tasks matching the `grunt-*` pattern
  // grunt modules defined in package.json
  require('load-grunt-tasks')(grunt);

  // define some app specific options
  var ops = {

    // output filenames:
    // styles.css
    // main.js
    name: {
      css: 'styles',
      js: 'main'
    },

    // input filenames:
    // main.less imports the rest of the less files
    // main.js requires the rest of the javascript files
    src: {
      css: 'main',
      js: 'main'
    },

    // don't change names below here
    // _____________________________

    // options for built directory naming
    built: {
      css: 'built-styles',
      js: 'built-main'
    },
    // options for browserify naming
    // also used in the karma.conf.js
    browserify: {
      app: 'browserify-app',
      vendor: 'browserify-vendor',
      test: 'browserify-tests'
    }
  };

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ops: ops,

    // deletes files
    // clean:dev does not delete vendor.js because it rarely changes
    clean: {
      scripts: ['public/js', 'build/<%= ops.browserify.app %>.js', 'build/<%= ops.built.js %>.js'],
      styles: ['public/css', 'build/<%= ops.built.css %>.css'],
      templates: ['public/**/*.html'],
      img: ['public/img'],
      build: ['build'],
      'public': ['public'],
      dev: {
        src: ['public', 'build/<%= ops.browserify.app %>.js', 'build/<%= ops.built.css %>.css', 'build/<%= ops.built.js %>.js']
      },
      prod: ['dist']
    },

    // copies files
    // TODO(joe) would be nice to create copy:dev from copy:scripts, copy:styles, etc to improve code resuse
    copy: {
      scripts: {
        files: [{
          src: 'build/<%= ops.built.js %>.js',
          dest: 'public/js/<%= ops.name.js %>.js'
        }]
      },
      styles: {
        files: [{
          src: 'build/<%= ops.built.css %>.css',
          dest: 'public/css/<%= ops.name.css %>.css'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'client/fonts',
          src: '**/*',
          dest: 'public/fonts'
        },
        {
          expand: true,
          cwd: 'client/requires/fontawesome/fonts',
          src: '**/*',
          dest: 'public/fonts'
        }]
      },
      img: {
        files: [{
          expand: true,
          cwd: 'client/img',
          src: '**/*',
          dest: 'public/img'
        }]
      },
      dev: {
        files: [{
          src: 'build/<%= ops.built.js %>.js',
          dest: 'public/js/<%= ops.name.js %>.js'
        }, {
          src: 'build/<%= ops.built.css %>.css',
          dest: 'public/css/<%= ops.name.css %>.css'
        },
        {
          expand: true,
          cwd: 'client/fonts',
          src: '**/*',
          dest: 'public/fonts'
        },
        {
          expand: true,
          cwd: 'client/requires/fontawesome/fonts',
          src: '**/*',
          dest: 'public/fonts'
        },
        {
          expand: true,
          cwd: 'client/img',
          src: '**/*',
          dest: 'public/img'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'client/fonts',
          src: '**/*',
          dest: 'dist/fonts'
        },
        {
          expand: true,
          cwd: 'client/requires/fontawesome/fonts',
          src: '**/*',
          dest: 'dist/fonts'
        },
        {
          expand: true,
          cwd: 'client/img',
          src: '**/*',
          dest: 'dist/img'
        }]
      }
    },

    // front end package manager
    // like npm but for the front end
    bower: {
      install: {
        options: {
          targetDir: 'client/requires',
          layout: 'byComponent'
        }
      }
    },

    // front end dependency management
    // use node require() style to include modules
    // note: vendor.js includes all javascript from dependencies in bower.json
    // but we're ignoring the bootstrap js files
    browserify: {
      vendor: {
        src: ['client/requires/**/*.js'],
        dest: 'build/<%= ops.browserify.vendor %>.js',
        options: {
          ignore: [
            'client/requires/bootstrap-less/js/*.js'
          ],
          shim: {
            jquery: {
              path: 'client/requires/jquery/js/jquery.js',
              exports: '$'
            },
            underscore: {
              path: 'client/requires/underscore/js/underscore.js',
              exports: '_'
            },
            backbone: {
              path: 'client/requires/backbone/js/backbone.js',
              exports: 'Backbone',
              depends: {
                underscore: 'underscore',
                // we're including jquery as a dependency even though it technically isn't
                // because Backbone.router seems to complain about not doing so
                jquery: '$'
              }
            }
          }
        }
      },
      app: {
        files: {
          'build/<%= ops.browserify.app %>.js': ['client/src/main.js']
        },
        options: {
          // hbsfy allows you to require handlebars templates in your javascript
          transform: ['hbsfy'],
          external: ['jquery', 'underscore', 'backbone']
        }
      },
      test: {
        files: {
          'build/<%= ops.browserify.test %>.js': [
            'client/spec/**/*.test.js'
          ]
        },
        options: {
          transform: ['hbsfy'],
          external: ['jquery', 'underscore', 'backbone']
        }
      }
    },

    // checks for good JavaScript coding practices
    jshint: {
      all: ['Gruntfile.js', 'server.js', 'client/src/**/*.js', 'client/spec/**/*.js'],
      dev: ['client/src/**/*.js'],
      test: ['client/spec/**/*.js'],
      options: {
        debug: true
      }
    },

    // compiles less files to css files
    less: {
      transpile: {
        files: {
          'build/<%= ops.built.css %>.css': [
            'client/styles/less/main.less'
          ]
        }
      }
    },

    // concatanates js files
    concat: {
      'build/<%= ops.built.js %>.js': ['build/<%= ops.browserify.vendor %>.js', 'build/<%= ops.browserify.app %>.js']
    },

    // precompiles handlebars templates to html on the server
    // TODO(joe) check this for helpers and partials
    'compile-handlebars': {
      dev: {
        template: 'client/templates/views/**/*.hbs',
        templateData: 'client/templates/views/**/*.json',
        output: 'public/**/*.html',
        //helpers: 'client/templates/helpers/**/*.js',
        //partials: 'client/templates/partials/**/*.hbs',
        globals: [
          'client/data/global.json'
        ]
      },
      prod: {
        template: 'client/templates/views/**/*.hbs',
        templateData: 'client/templates/views/**/*.json',
        output: 'dist/**/*.html',
        //helpers: 'client/templates/helpers/**/*.js',
        //partials: 'client/templates/partials/**/*.hbs',
        globals: [
          'client/data/global.json'
        ]
      }
    },

    // css minification
    // puts the file in /dist
    cssmin: {
      minify: {
        src: ['build/<%= ops.built.css %>.css'],
        dest: 'dist/css/<%= ops.name.css %>.css'
      }
    },

    // javascript minification
    // puts the file in /dist
    uglify: {
      compile: {
        options: {
          compress: true,
          verbose: true
        },
        files: [{
          src: 'build/<%= ops.built.js %>.js',
          dest: 'dist/js/<%= ops.name.js %>.js'
        }]
      }
    },

    // runs tasks when code changes
    // TODO(joe) test this and make sure it works
    // TODO(joe) test a watcher for images
    watch: {
      scripts: {
        files: ['client/src/**/*.js'],
        tasks: ['clean:scripts', 'browserify:app', 'concat', 'copy:scripts']
      },
      less: {
        files: ['client/styles/**/*.less'],
        tasks: ['clean:styles', 'less:transpile', 'copy:styles']
      },
      templates: {
        files: ['client/templates/views/**/*.hbs', 'client/templates/views/**/*.json'],
        tasks: ['clean:templates', 'compile-handlebars:dev']
      },
      test: {
        files: ['build/<%= ops.browserify.app %>.js', 'client/spec/**/*.test.js'],
        tasks: ['browserify:test']
      },
      karma: {
        files: ['build/<%= ops.browserify.test %>.js'],
        tasks: ['jshint:test', 'karma:watcher:run']
      }
    },

    // restarts server when server.js or watchedFolders files change
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          nodeArgs: ['--debug'],
          watchedFolders: [],
          env: {
            PORT: '3300'
          }
        }
      }
    },

    // run slow tasks concurrently to speed them up
    // can also run multiple blocking tasks (like nodemon and watch)
    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch:scripts', 'watch:less', 'watch:templates', 'watch:test'],
        options: {
          logConcurrentOutput: true
        }
      },
      test: {
        tasks: ['watch:karma'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // runs arbitrary shell commands
    // supports background processes
    shell: {

    },

    // runs server tests
    simplemocha: {
      options: {
        globals: ['expect', 'sinon'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },

      server: {
        src: ['spec/spechelper.js', 'spec/**/*.test.js']
      }
    },

    // for front-end tdd
    karma: {
      options: {
        configFile: 'karma.conf.js',
        files: [
          'build/<%= ops.browserify.vendor %>.js',
          'build/<%= ops.browserify.test %>.js'
        ]
      },
      watcher: {
        background: true,
        singleRun: false
      },
      test: {
        singleRun: true
      }
    },

    // host site using github pages
    // !!! (grunt build:prod first to build it then this to push to gh-pages)
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }

  });

  // cleans the build, then downloads front end packages
  grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);

  // builds dev
  // 1. deletes /public
  // 2. builds assets except vendor.js
  // 3. copies assets to /public
  // TODO(joe) consider not copying over images and other large files
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'compile-handlebars:dev', 'copy:dev']);
  // builds prod
  grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint:all', 'less:transpile', 'concat', 'compile-handlebars:prod', 'cssmin', 'uglify', 'copy:prod']);

  // builds dev then starts the server
  grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
  // tests the server code
  grunt.registerTask('test:server', ['simplemocha:server']);

  // tests the client code
  grunt.registerTask('test:client', ['karma:test']);
  // continuously tests the client code when files change
  grunt.registerTask('tdd', ['karma:watcher:start', 'concurrent:test']);

  // runs all the tests once
  grunt.registerTask('test', ['test:server', 'test:client']);
};
