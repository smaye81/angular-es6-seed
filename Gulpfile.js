var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var exec = require('child_process').exec;

gulp.task('watch', function () {

    gulp.watch(['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'], ['traceur']);
});

/* Sourcemaps seem to not be working when a base is specified */
gulp.task('traceur', function () {
    return gulp.src(['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'], {base: './app'})
        //.pipe(sourcemaps.init())
        .pipe(traceur({
            modules: 'register',
            moduleName : true
        }))
        .pipe(concat('bundle.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['traceur', 'watch', 'connect']);