angular-es6-seed
================

Seed project using Angular and all ES6 syntax (especially modules)

Uses:

* Angular
* Angular UI Router
* Traceur
* Bootstrap
* Gulp
* Karma
* Jasmine


To run app:

* Clone repo
* Install Gulp globally using `npm install gulp -g`
* Run `npm install` from project root
* Run `bower install` from project root
* Run `gulp` from the project root
* Navigate to localhost:9000
* $$$

NOTE:  If making changes, gulp-traceur is currently broken.  To compile output, use traceur from command line:

* Install traceur globally using 'npm install traceur -g'
* Run the following command `traceur app/app.js --out app/dist/cli.js --modules=register`


To run tests:

* Install karma-cli `npm install -g karma-cli`
* Run npm and bower install tasks from above if not already run
* Run `karma start` from the project root
