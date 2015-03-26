var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var jshint = require('gulp-jshint');

var SOURCE_FILES = ['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'];

// Runs JSHint Report against all JS files in app
gulp.task('lint', function () {
    return gulp.src(SOURCE_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {

    // Lint the JS files when they change
    gulp.watch(SOURCE_FILES, ['lint', 'traceur']);
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

gulp.task('default', ['traceur', 'lint', 'watch', 'connect']);