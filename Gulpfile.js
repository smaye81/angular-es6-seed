var gulp = require('gulp');
var connect = require("gulp-connect");
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var Builder = require('systemjs-builder');
var runSequence = require('run-sequence').use(gulp);
var jshint = require('gulp-jshint');
var path = require('path');
var source = require('vinyl-source-stream');

var config = {
    SOURCE_FILES : ['!./app/**/*_test.js', './app/*.js', './app/modules/**/*.js'],
    BABEL_DEST_DIR : 'systemBuild',
    BUNDLE_NAME : 'dist/bundle.js'
};

var options = {
    config : {
        baseURL : path.resolve('systemBuild')
    }
};

gulp.task('watch', function () {

    gulp.watch(config.SOURCE_FILES, ['build', 'lint']);
});

// Runs JSHint Report against all JS files in app
gulp.task('lint', function () {
    return gulp.src(config.SOURCE_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('babel', function () {

    return gulp.src(config.SOURCE_FILES, {"base" : "./app"})
        .pipe(babel({
            modules : "system"
        }))
        .pipe(gulp.dest(config.BABEL_DEST_DIR));
});

gulp.task('systemjs-build', function () {

    var builder = new Builder({
        baseURL : path.resolve(config.BABEL_DEST_DIR),

        // opt in to Babel for transpiling over Traceur
        transpiler: 'babel'
    });

    builder.buildSFX('app', config.BUNDLE_NAME, options)
        .then(function() {
            gutil.log('Build Bundle', gutil.colors.cyan('done'));
        })
        .catch(function(err) {
            gutil.log('Build Bundle Err', gutil.colors.red(err));
        });
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['dist'],
        port: 9000
    });
});

gulp.task('build', function(cb) {
    runSequence('babel', ['systemjs-build'], cb);
});

gulp.task('default', ['build', 'watch', 'connect']);
