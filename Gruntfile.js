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
    // uses node require() style
    browserify: {
      vendor: {
        src: ['client/requires/**/*.js'],
        dest: 'build/<%= ops.browserify.vendor %>.js',
        options: {
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
            'client/styles/reset.css',
            'client/requires/*/css/*',
            'client/styles/less/main.less'
          ]
        }
      }
    },

    // concatanates js files
    concat: {
      'build/<%= ops.built.js %>.js': ['build/<%= ops.browserify.vendor %>.js', 'build/<%= ops.browserify.app %>.js']
    },

    // copies files
    // !!! will need to add more copying for data and html files
    copy: {
      dev: {
        files: [{
          src: 'build/<%= ops.built.js %>.js',
          dest: 'public/js/<%= ops.name.js %>.js'
        }, {
          src: 'build/<%= ops.built.css %>.css',
          dest: 'public/css/<%= ops.name.css %>.css'
        }, {
          src: 'client/img/*',
          dest: 'public/img/'
        }]
      },
      prod: {
        files: [{
          src: ['client/img/*'],
          dest: 'dist/img/'
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

    // runs tasks when front-end code changes
    watch: {
      scripts: {
        files: ['client/templates/*.hbs', 'client/src/**/*.js'],
        tasks: ['clean:dev', 'browserify:app', 'concat', 'copy:dev']
      },
      less: {
        files: ['client/styles/**/*.less'],
        tasks: ['less:transpile', 'copy:dev']
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
        tasks: ['nodemon:dev', 'watch:scripts', 'watch:less', 'watch:test'],
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

  grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'copy:dev']);
  grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint:all', 'less:transpile', 'concat', 'cssmin', 'uglify', 'copy:prod']);

  grunt.registerTask('heroku', ['init:dev', 'build:dev']);

  grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
  grunt.registerTask('test:server', ['simplemocha:server']);

  grunt.registerTask('test:client', ['karma:test']);
  grunt.registerTask('tdd', ['karma:watcher:start', 'concurrent:test']);

  grunt.registerTask('test', ['test:server', 'test:client']);
};
