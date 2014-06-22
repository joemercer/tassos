# Tassos

A quirky card game.

This is being built with PhoneGap and [Adobe PhoneGap Build](https://build.phonegap.com/apps).

config.xml is what tells Adobe PhoneGap Build what to do. We load the files into Adobe PhoneGap Build through the Github repo. By placing the config.xml in /public we are indicating that is the root of our app. 


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