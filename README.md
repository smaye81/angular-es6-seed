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

NOTE:  gulp-traceur is currently broken and does not seem to generate register modules correctly.  So, temporarily,
    until this is fixed, gulp is using traceur CLI to run a traceur command to build the compile output file.

I filed an issue here:

https://github.com/sindresorhus/gulp-traceur/issues/43

To Do:

* Tests
