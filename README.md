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

### Setting up the dev environment

<p>1. Install Git</p>

I like using the [Github instructions](https://help.github.com/articles/set-up-git). Once you're done, check that you've installed it properly:

`$ git --version`

<p>2. Install Node</p>

!!! Publish the notes in TODO as a gist and reference it here. Then check that your Node version is at least `0.10.28`

`$ node --version`

Node comes packaged with Npm. Check that your Npm version is at least `1.4.9`

`$ npm --version`

<p>3. Install the Grunt-cli ([official docs](http://gruntjs.com/getting-started))</p>

`$ npm install -g grunt-cli`

### Clone the project

`$ git clone https://github.com/joemercer/static-seed.git <directory>` will clone the project into a new directory called <directory>.

`$ git clone https://github.com/joemercer/static-seed.git` will clone the project into a new directory called static-seed.

### Install the dependencies

<p>1. Install the server dependencies</p>

`$ npm install`

<p>2. Install the client dependencies</p>

`$ grunt init:dev`

### Start the app

<p>1. Launch the web server</p>

`$ grunt server`

This also starts a watch task that will rebuild the app and restart the server when files are changed.

<p>2. Open the app</p>

In a browser, navigate to `http://localhost:3300/`.

### Run the tests

<p>1. Run the server tests</p>

`$ grunt test:server`

<p>2. Run the client tests (requires Chrome)</p>

`$ grunt test:client`

<p>3. Run all the tests</p>

`$ grunt test`

### Release (requires that you've pushed your project to Github)

Builds the app, then pushes the built directory to a gh-pages branch on Github. 

`$ grunt release`

Give it a couple minutes, then check to see if worked by navigating to `<username>.github.io/<repo>` where <username> is your Github username and <repo> is the Github repo for your project.



# FAQ

### How do I fix the error: `EMFILE: Too many opened files.`?

This error is because you've reached your system's max open file limit.

To see this limit: ulimit -n

To temporarily increase this limit: `ulimit -n 2048`

If that didn't work then see more info [here](http://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6). 



# Updating

`npm-check-updates`

`npm outdated`



# Acknowledgements

This project is loosely inspired by [this blog post](http://kroltech.com/2013/12/boilerplate-web-app-using-backbone-js-expressjs-node-js-mongodb/)