# TODO
________

- revise package.json - remove unused modules
- revise Gruntfile
- revise bower.json
- revise karma.conf.js
- revise tests (do the run?)

- move to folder static-seed and install to try installing on a new box


- split this project into its two parts
- put it into the joemercer.github repo
- save the existing joemercer.github repo

- also edit the TODO file (split it into sections, make it nice looking, etc)
- edit the README !!!
- edit package.json



# Backlog
___________

- add some margin top to the side in the sections
- img-circle css not working on first page load



- also edit the TODO file (split it into sections, make it nice looking, etc)
- add a nice markdown compiler that plays nicely with other json data
- fix the pipeline
- - perhaps use a grunt plugin to only run moved tasks
- condense the list of grunt plugins
- - probably don't need the karma plugins / don't even know what they do



# Notes
_________

## favicon.ico
- reference: https://github.com/audreyr/favicon-cheat-sheet
- for converting pngs to ico: http://convertico.org/Multi_Image_to_one_icon/
- chrome needed a 256x256 to work (dunno why)

## Grunt error about not being able to watch enough files
- change the ulimit: `ulimit -n 2048`






_______________________

# Installing Node/Npm
_______________________

# NVM
- https://www.npmjs.org/package/nvm

We will use nvm to manage our node and npm installation (instead of using Homebrew).

1. Install nvm

If you don't yet have Node but you do have Homebrew:

`brew install nvm`

If you already have Node/Npm:

`npm install -g nvm`



2. Follow the setup instructions for nvm: https://www.npmjs.org/package/nvm

In my case this meant:

2.1. What is said to do in the console

Add the following to your ~/.bash_profile:

```
# nvm node package for installing and managing different versions of node
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

- 

2.2. What is said to do on the site

- Update your path to include ./node_modules/.bin

In your ~/.bash_profile replace

```
export PATH
```

with


```
PATH=./node_modules/.bin:$PATH
export PATH
```

2.3. Source ~/.bash_profile

`source ~/.bash_profile`



3. Install Node/Npm

`nvm install <version>`

For example, in my case I installed Node version 0.10.24

`nvm install v0.10.24`



4. Check that is worked

Display your version of Node:

`node --version`

Display your version of Npm

`npm --version`




### Log of the problems I encountered

- node/npm seem to have a problem with ~ or ^ in links: https://github.com/npm/npm/issues/4587

- the solution is to upgrade npm: https://github.com/npm/npm/issues/1840

- for some reason npm has trouble upgrading when node was installed with Homebrew: https://github.com/Homebrew/homebrew/issues/22408



_____________________________________________________________________




- curl nvm sh script thing

- restart bash_profile (or do the source thing)

- nvm install <version> (uses .nvmrc by default)

- nvm use <version> to use a a specific version

- note that the .nvmrc is what is handling the version number here

- !!! specify a default

-check











"description": "A seed app for quickly creating and deploying a static website. Includes Handlebars for templating, LESS, a customized version of Bootstrap, Golden for spacing, Font Awesome for icons, Bower and Browserify for frontend JavaScript dependency management, Underscore, jQuery, Grunt for the build pipeline, a simple Express web server, Mocha for testing the server, Karma for testing the frontend, and Github for hosting. Made by @jomrcr.