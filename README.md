# Static-Seed

Seed app for a basic static website. Includes...

- Github Pages for hosting
- Express web server for testing locally
- Grunt to do all the things
- Handlebars for templating
- LESS for styling
- Custom Bootstrap
- Golden
- FontAwesome for icons
- Bower and Browserify for JavaScript dependency management
- jQuery and lodash on the front end
- jshint
- Handlebars precompilation
- CSS minifaction and JS uglification
- Karma for testing the client
- Mocha for testing the server

# Getting Started

1. Make sure you have git and node installed (see below if you don't)

!!! plus you need grunt cli (hmmm)

`$ git --version`

`$ node --version` > v0.10.0

`$ npm --version` > v1.4.0

2. Clone this repository

`$ git clone https://github.com/joemercer/static-seed.git <directory>`

3. Install the server dependencies

`$ npm install`

(Note: This can take a couple minutes.)

4. Install the client dependencies

`$ grunt init:dev`

5. Start up the server

`$ grunt server`

6. Open a browser and navigate to `http://localhost:3300/`

7. Do your stuff :)

8. Test

`$ grunt test`

9. Release

!!! this requires that you have set your thing up as a github repo

`$ grunt release`

10. Done :)


<<<<<<< HEAD
ulimit -n
ulimit -n 2048


A detailed blog post covering this entire application can be found here:
http://kroltech.com/2013/12/boilerplate-web-app-using-backbone-js-expressjs-node-js-mongodb/

 * Backbone.js
  * Handlebars
  * Browserify
  * Jasmine tests
  * Basic UI app
 * Express / Node.js
  * Handlebars
  * Mocha test runner
  * Chai, Sinon, Proxyquire tests
 * MongoDB
  * Mongoose
 * Bower
  * package.json
 * Grunt:
  * Bower install
  * Browserify
  * Handlebars (precompiled)
  * jsHinting
  * LESS
  * Minification/Uglification
  * Karma client testing/tdd
  * Mocha node testing
  * Watchers
  * Concatenation/Copy
  * Concurrent runs (server, karma, mongod, etc)

## Requirements

node 0.10+ (and npm), mongodb - visit nodejs.org and mongodb.com to download
each.

    $ sudo npm install -g grunt-cli
    $ npm install
    $ grunt init:dev

Grunt init:dev only needs to be run the first time to prepare the vendor.js
files.

## Running the App:

Start the server in DEV mode, with nodemon watching the app for a relaunch,
watchers on scripts and less files for rebuild.

    $ grunt server

Note: Windows users, for some reason the grunt shell task will not launch
mongod during runtime (so the node server will crash).  Be sure to launch
mongod in another window before starting grunt server.

### Front-end Tests/TDD:

Requires PhantomJS to be installed globally:

    $ sudo npm install -g phantomjs

To run tests in TDD watch mode:

    $ grunt tdd

To run tests once:

    $ grunt test:client

### Server Tests:

Server tests have been added using Mocha, Chai, and Proxyquire.  To run the
tests:

    $ grunt test:server

Note:

    $ grunt test

(will run all tests - both server and client)
=======
static-seed
===========
>>>>>>> 1053cc399bc49c9cb725c1dd63e5f774da9a4c49
