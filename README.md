# Tassos

A quirky card game.

This project was extended from [yo angular](https://github.com/yeoman/generator-angular) using [Yeoman](http://yeoman.io/) (yea, that's how we got that image of the weird looking guy everywhere)

This is being built for mobile with PhoneGap and [Adobe PhoneGap Build](https://build.phonegap.com/apps).

We load the files into Adobe PhoneGap Build through the Github repo in the gh-pages branch (which is the same branch from which we build the website). The config.xml file is what tells Adobe PhoneGap Build some options (like where the logo is). We also have hydration turned on so you only need to install the app once and then you can see the new versions.


# Getting started

### Get Git, Node, Npm, Grunt, Bower, etc

just google for it

### Get the source

`git clone https://github.com/joemercer/tassos.git`

#### (you might need to get the dependencies)

`npm install`

`bower install`

### Serve the app locally

`grunt serve`

### Test the app

`grunt test`

### Build the app for production

`grunt build`

### Release the app into the wild

`grunt release` will run tests, build the app and then release it

`grunt gh-pages` will just release whatever was previously built using grunt build

### Check it out

You should be able to find the app on the web at [joemercer.github.io/tassos/](http://joemercer.github.io/tassos/)

Additionally we should have a build being made on [Adobe PhoneGap Build](https://build.phonegap.com/apps/965848/builds) (not sure if that link will work)