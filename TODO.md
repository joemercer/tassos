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
- by @jomrcr
_______________________

# NVM
- https://github.com/creationix/nvm

We will use nvm to manage our node and npm installation (instead of using Homebrew).

1. Install nvm

Run this script to install Nvm and update your .bash_profile:

`curl https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh`

2. Restart your terminal

or run

`source ~/.bash_profile`

3. Test that you have Nvm installed correctly:

`nvm --version`

4. Install Node

`nvm install <version>` will install the version specified in the command.
`nvm install` will install the version specified in the .nvmrc file in the project's root

If you've cloned this repo then you have a .nvmrc file specifying the correct version of Node, so run:

`nvm install`

5. Test that Node installed correctly

`node --version`

And Node comes packaged with Npm

`npm --version`

6. Open a new tab

You will see that `node --version` no longer works. This is because we have to specify which version of Node to use with Nvm:

`nvm use <version>` will install the version specified in the command.
`nvm use` will install the version specified in the .nvmrc file in the project's root

If you cloned this repo then:

`nvm use`

7. Test that Node works

`node --version`
`npm --version`

8. Set a version of Node as the default

(so that you don't have to type `nvm use` each time)

`nvm alias default <version>`

9. Done

:)






### Log of the problems I've encountered

- node/npm seem to have a problem with ~ or ^ in links: https://github.com/npm/npm/issues/4587

- the solution is to upgrade npm: https://github.com/npm/npm/issues/1840

- for some reason npm has trouble upgrading when node was installed with Homebrew: https://github.com/Homebrew/homebrew/issues/22408

- the instructions to install nvm on the npm page don't work. use the github page instead: https://github.com/creationix/nvm



_____________________________________________________________________














"description": "A seed app for quickly creating and deploying a static website. Includes Handlebars for templating, LESS, a customized version of Bootstrap, Golden for spacing, Font Awesome for icons, Bower and Browserify for frontend JavaScript dependency management, Underscore, jQuery, Grunt for the build pipeline, a simple Express web server, Mocha for testing the server, Karma for testing the frontend, and Github for hosting. Made by @jomrcr.