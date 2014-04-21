module.exports = function(grunt) {

  // displays the elapsed execution time of grunt tasks when done
  require('time-grunt')(grunt);
  // load all grunt tasks matching the `grunt-*` pattern
  // grunt modules defined in package.json
  require('load-grunt-tasks')(grunt);

  // define some app specific options
  var ops = {
    // final filenames
    name: {
      css: 'styles',
      js: 'main'
    },
    // root src filenames
    // these are the files that require/import the rest of the files
    // !!! not dynamic yet
    src: {
      css: 'main',
      js: 'main'
    },

    // don't change names below here

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
      build: ['build'],
      dev: {
        src: ['build/<%= ops.browserify.app %>.js', 'build/<%= ops.built.css %>.css', 'build/<%= ops.built.js %>.js']
      },
      'public': ['public'],
      prod: ['dist']
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
                underscore: 'underscore'
              }
            },
            'backbone.marionette': {
              path: 'client/requires/backbone.marionette/js/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: '$',
                backbone: 'Backbone',
                underscore: '_'
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
          transform: ['hbsfy'],
          external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
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
          external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
        }
      }
    },

    // checks for good JavaScript coding practices
    jshint: {
      all: ['Gruntfile.js', 'server.js', 'client/src/**/*.js', 'client/spec/**/*.js'],
      dev: ['client/src/**/*.js'],
      test: ['client/spec/**/*.js']
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
    // copies the file structure in hbs/views
    // uses data from hbs/data
    'compile-handlebars': {
      dev: {
        template: 'hbs/views/**/*.hbs',
        templateData: 'hbs/data/**/*.json',
        output: 'public/**/*.html',
        //helpers: 'hbs/helpers/**/*.js',
        //partials: 'hbs/partials/**/*.hbs',
        globals: [
          'hbs/global.json'
        ]
      },
      prod: {
        template: 'hbs/views/**/*.hbs',
        templateData: 'hbs/data/**/*.json',
        output: 'dist/**/*.html',
        //helpers: 'hbs/helpers/**/*.js',
        //partials: 'hbs/partials/**/*.hbs',
        globals: [
          'hbs/global.json'
        ]
      }
    },

    // copies files
    // everything in content is copied as is
    copy: {
      dev: {
        files: [{
          src: 'build/<%= ops.built.js %>.js',
          dest: 'public/js/<%= ops.name.js %>.js'
        }, {
          src: 'build/<%= ops.built.css %>.css',
          dest: 'public/css/<%= ops.name.css %>.css'
        }, {
          expand: true,
          cwd: 'content/',
          src: '**/*',
          dest: 'public/'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'content/',
          src: '**/*',
          dest: 'dist/'
        }]
      }
    },

    // css minification
    // puts the file to /dist
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
    watch: {
      scripts: {
        files: ['client/templates/*.hbs', 'client/src/**/*.js'],
        tasks: ['clean:dev', 'browserify:app', 'concat', 'copy:dev']
      },
      less: {
        files: ['client/styles/**/*.less'],
        tasks: ['less:transpile', 'copy:dev']
      },
      hbs: {
        files: ['hbs/views/**/*.hbs', 'hbs/data/**/*.json'],
        tasks: ['clean:public', 'compile-handlebars:dev', 'copy:dev']
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

    // restarts server when server.js changes
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
        tasks: ['nodemon:dev', 'watch:scripts', 'watch:less', 'watch:hbs', 'watch:test'],
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
    }

  });

  // cleans the build, then downloads front end packages
  grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);

  // builds dev/prod
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'compile-handlebars:dev', 'copy:dev']);
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
