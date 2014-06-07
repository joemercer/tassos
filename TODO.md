# TODO
________


- also edit the TODO file (split it into sections, make it nice looking, etc)
- edit the README !!!
- edit package.json (name, etc)
- edit bower.json (name, etc)



# Backlog
___________

- livereload plugin?

- run npm-check-updates on a init:dev perhaps

- move to folder static-seed and install to test installing on a new box


- add a nice markdown compiler that plays nicely with other json data



# Notes
_________

## favicon.ico
- reference: https://github.com/audreyr/favicon-cheat-sheet
- for converting pngs to ico: http://convertico.org/Multi_Image_to_one_icon/
- chrome needed a 256x256 to work (dunno why)



## how browserify works
http://aeflash.com/2014-05/grunt-browserify-2-x-update.html
http://aeflash.com/2014-05/watchify-and-grunt.html




_______________________

# Installing Node/Npm
- by @jomrcr
_______________________

# NVM
- https://github.com/creationix/nvm

We will use nvm to manage our node and npm installation (instead of using Homebrew).

<p>1. Install nvm</p>

Run this script to install Nvm and update your .bash_profile:

`curl https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh`

<p>2. Restart your terminal</p>

or run

`source ~/.bash_profile`

<p>3. Test that you have Nvm installed correctly:</p>

`nvm --version`

<p>4. Install Node</p>

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











